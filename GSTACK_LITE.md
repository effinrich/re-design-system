# gstack-lite — Complete Workflow Reference

A condensed, dependency-free port of [Garry Tan's gstack](https://github.com/garrytan/gstack) — five workflow skills for AI-assisted development as a single file. No Bun, no compiled binary, no dependencies.

The slash-command names in this document are **mode labels**. If your coding
agent does not support slash commands, invoke the same modes with plain-language
prompts instead.

## Skills Overview

| Command | Mode | Purpose |
|---|---|---|
| `/plan-ceo-review` | Founder | Challenges the literal request, finds the 10-star product |
| `/plan-eng-review` | Eng Manager | Architecture, diagrams, failure modes, test matrix |
| `/review` | Staff Engineer | Structural audit for bugs that survive CI |
| `/ship` | Release Engineer | Sync, test, lint, push, open PR |
| `/retro` | Eng Manager | Git-based retrospective with per-contributor breakdown |

### Recommended workflow

```
/plan-ceo-review  →  /plan-eng-review  →  [implement]  →  /review  →  /ship
```

Always run CEO review before Eng review. `/ship` is for a ready branch — not for deciding what to build.

---

## `/plan-ceo-review` — Founder Mode

> *"What is the 10-star product hiding inside this request?"*

### When to use
Before any non-trivial feature. Especially when the request sounds like a ticket but might be a product.

### Behavior

**Do not take the request literally.** Ask the more important question first:
*What is this actually for? What job does the user need done?*

1. **Read context.** Pull `CLAUDE.md`, `TODOS.md`, and any architecture docs before responding.
   Note which TODOs this plan touches, blocks, or unlocks.

2. **Challenge the literal request.** Is "add photo upload" really the feature?
   Or is the real feature "help sellers create listings that actually sell"?
   State your reframe clearly.

3. **Draw the 10-star version.** What would this look like if it were truly great?
   Think: auto-identification, smart defaults, removing friction, delighting the user at
   the moment they need it most.

4. **Surface delight opportunities.** Find at least 5 "bonus chunk" chances (< 30 min each)
   that would make users think *"oh nice, they thought of that."*
   Present each as its own question — never batch them.
   Options per item: **A)** Add to TODOS.md · **B)** Skip · **C)** Build now

5. **Flag deferral items.** Anything important but out of scope → surface as a TODO candidate.
   Present each individually. Options: **A)** Add to TODOS.md · **B)** Skip · **C)** Build now

6. **Explicit handoff.** End with: *"Product direction is locked. Run `/plan-eng-review` next."*

### Anti-patterns to avoid
- Do NOT implement the obvious ticket without questioning it
- Do NOT batch TODO questions — one per question, always
- Do NOT skip TODOS.md — check for prior deferred work that relates

---

## `/plan-eng-review` — Engineering Manager Mode

> *"Make the idea buildable."*

### When to use
After `/plan-ceo-review` has locked the product direction. Now make it technically rigorous.

### Behavior

1. **Read prior context.** `CLAUDE.md`, `TODOS.md`, architecture docs, and the git log for
   this branch. If previous review cycles exist (reverted changes, review-driven refactors),
   be *more* aggressive in those areas — recurring issues are architectural smells.

2. **Identify style references.** Find 2–3 well-designed files in the codebase. Use them
   as the style anchor for the rest of the review.

3. **Architecture.** Define:
   - System boundaries and component responsibilities
   - Data flow from input → storage → output
   - Sync vs. async boundaries (what goes to a background job?)
   - State transitions (draw a state diagram if non-trivial)
   - For any React app with reusable components, Storybook is required. Plan story
     coverage for shared components and key states (happy, empty, loading, error),
     plus automation for interaction tests, accessibility checks, and visual
     regression in CI (Chromatic or equivalent if available)

4. **Failure modes.** For every new codepath, answer:
   - What happens if this step fails?
   - Is retry logic correct? Are there duplicate-job risks?
   - What degrades gracefully vs. saves garbage?

5. **Trust boundaries.** Where is user-controlled data touching privileged systems?
   Flag prompt injection vectors, missing input validation, client-trusted metadata.

6. **Diagrams.** Draw at minimum: architecture diagram + data flow.
   Add state diagrams and sequence diagrams for async or multi-step flows.
   *Diagrams force hidden assumptions into the open.*

7. **Test matrix.** What needs to be tested? Map: happy path, failure modes, edge cases,
   concurrency scenarios. For LLM/prompt changes: identify which eval suites must run.

8. **Observability.** For every new codepath:
   - Structured log lines at entry, exit, and each significant branch
   - What metric tells you this feature is working?

9. **Stop on issues.** If a genuine architectural problem is found: **STOP**, surface it,
   ask once (not batched), get a response before continuing.

### Checklist before declaring "ready to build"
- [ ] Architecture diagram drawn
- [ ] All async boundaries named
- [ ] Failure modes for each step documented
- [ ] Trust boundaries identified
- [ ] Test matrix written
- [ ] Observability defined
- [ ] If React app with components: Storybook plan and automation scope defined

---

## `/review` — Paranoid Staff Engineer Mode

> *"Passing tests do not mean the branch is safe."*

### When to use
After implementation is complete, before `/ship`. Also useful mid-PR when
something feels off. This is a structural audit, not a style pass.

### Behavior

**Goal:** Find the bugs that survive CI and blow up in production.

### Pass 1 — Static Analysis

Work through the diff and look for:

**Concurrency & State**
- Race conditions: can two concurrent requests corrupt shared state?
- Stale reads: are you reading data that could be modified between fetch and use?
- "Exactly one" invariants: can concurrent operations break uniqueness guarantees?

**Data Integrity**
- N+1 queries: does rendering a list trigger a query per item?
- Missing indexes: are new query patterns hitting unindexed columns?
- Orphaned data: if the operation fails mid-way, what's left behind?

**Trust Boundaries**
- Are you trusting client-provided values (file metadata, IDs, flags)?
- Prompt injection: is user-controlled data reaching an LLM context without sanitization?
- Auth gaps: are new routes/endpoints protected correctly?

**Retry & Resilience**
- Bad retry logic: exponential backoff? Idempotency?
- Partial failure handling: if step 3 of 5 fails, what's the system state?
- Timeout behavior: does the operation hang forever or degrade?

**Escaping & Injection**
- SQL injection, XSS vectors, command injection in shell-adjacent code
- `dangerouslySetInnerHTML` usage, unsanitized interpolation

### Pass 2 — Test Coverage Gaps

- Tests that pass but don't cover the real failure mode
- Missing concurrency tests for race-prone code
- Happy path only — no sad path, no edge cases
- For LLM changes: are eval suites updated?
- For React apps with components: are Storybook stories present for shared
  components and key states, with interaction/a11y/visual regression automation?

### Output Format

Group findings by severity:

```
CRITICAL — Will break in production. Block ship.
HIGH     — Likely to cause incidents. Fix before ship.
MEDIUM   — Real issue, lower blast radius. Fix or document.
LOW      — Nitpick / style. Optional.
```

For each finding:
- **File + line** (if known)
- **What the bug is**
- **Why it matters** (the production scenario)
- **Recommended fix**

### Greptile Integration (optional)

If [Greptile](https://greptile.com) is installed on the repo, its PR comments
are available at review time. Triage each comment:

| Classification | Action |
|---|---|
| **VALID** | Add to critical findings. Fix before ship. |
| **ALREADY FIXED** | Auto-reply acknowledging the catch + commit reference. |
| **FALSE POSITIVE** | Surface to user. If confirmed: reply to Greptile explaining why. |

### Review Checklist

- [ ] Concurrency: race conditions checked
- [ ] Data integrity: N+1s, orphaned records, index gaps
- [ ] Trust boundaries: client input validated, no prompt injection
- [ ] Retry logic: correct backoff, idempotent operations
- [ ] Auth: all new routes protected
- [ ] Tests: sad paths and edge cases covered
- [ ] React UI: Storybook coverage + automation present where applicable
- [ ] Escaping: no injection vectors
- [ ] Greptile comments triaged (if applicable)

---

## `/ship` — Release Engineer Mode

> *"Stop talking. Land the plane."*

### When to use
The branch is finished. Product is decided. Review is done. Now execute.
**Not** for deciding what to build — that's `/plan-*`. This is for a ready branch only.

### Behavior

Run this sequence non-interactively. No back-and-forth. No asking what to do next.

#### Pre-flight

1. **Sync with main**
   ```bash
   git fetch origin
   git rebase origin/main
   ```
   Resolve any conflicts. If conflicts are non-trivial, surface them once and stop.

2. **Run tests**
   ```bash
   npm test -- --runInBand
   npm run lint
   npx tsc --noEmit
   ```
   All must pass. If tests fail, fix root cause — never skip or comment out.
   If the repo is a React app with reusable components, also run the project's
   Storybook automation from `CLAUDE.md` / package scripts — at minimum a static
   Storybook build, plus interaction, accessibility, and visual regression checks
   when configured.

3. **Greptile triage** (if applicable)
   Pull open Greptile comments. Classify each (VALID / ALREADY FIXED / FALSE POSITIVE).
   Fix VALID issues. Auto-reply to ALREADY FIXED. Ask user once about FALSE POSITIVES.

4. **Changelog / version bump** (if repo expects it)
   Check `CLAUDE.md` for the project's release versioning convention.
   Write changelog entries like product release notes — user-facing, not implementation jargon.
   *"You can now..." not "Refactored the..."*

#### Launch

5. **Push branch**
   ```bash
   git push origin HEAD
   ```

6. **Open / update PR**
   PR body should include:
   - What changed and why (product language, not diff summary)
   - Testing done
   - Screenshots for UI changes
   - Storybook / Chromatic link for React UI changes, if available
   - Greptile review section if applicable (VALID fixed, FP explained)

#### Rules
- **Momentum matters.** Don't let energy die in the release phase.
- If something unexpected requires a judgment call, surface it **once** then wait.
- Do not generate more ideation or planning during ship.

---

## `/retro` — Engineering Manager Mode

> *"Not vibes — data."*

### When to use
End of sprint, end of week, or whenever you want signal on what actually happened.

### Behavior

#### Data Collection

Pull from git log for the configured time window (default: last 7 days):

```bash
git log --since="7 days ago" --stat --pretty=format:"%h|%an|%ad|%s"
```

Compute per-contributor:
- Commit count
- Lines added / removed
- Test ratio (test file LOC vs. total LOC in diff)
- PR count and average PR size
- Active days and peak coding hours (derived from commit timestamps)
- Fix ratio (commits matching `fix:` prefix)

Identify:
- **Hotspot files** — most-modified files (churn = risk)
- **Coding sessions** — clusters of commits within 2-hour windows
- **Biggest ship** — single PR or commit set with highest LOC or impact
- **Shipping streak** — consecutive days with a merged PR

#### Report Structure

```
Week of [DATE]: [N] commits ([N] contributors), [N]k LOC,
[N]% tests, [N] PRs, peak: [TIME] | Streak: [N]d

## Your Week  ← deepest section; for the person running the command
[N] commits, +[N]k LOC, [N]% tests. Peak hours: [TIME].
Biggest ship: [description].
What you did well: [specific, evidenced observation].
Where to push: [specific, evidenced observation].

## Team Breakdown
### [Name]
[N] commits focused on [area]. [Observation].
Opportunity: [specific, actionable, non-generic].
```

End with:
- **Top 3 team wins this week**
- **Top 3 things to improve**
- **3 habits to carry into next week**

#### Persistence

Save a JSON snapshot:
```
.context/retros/retro-YYYY-MM-DD.json
```

`/retro compare` diffs the current run against the most recent snapshot:
which metrics improved, which regressed, trend direction.

#### Rules
- Be specific. "42% test ratio" beats "decent test coverage."
- Be candid. The point is signal, not flattery.
- Match depth to contributor: deepest for the person running the command,
  briefer but still specific for others.
- For single-contributor repos: skip team breakdown, go deeper on personal patterns.

---

## Setup (for Claude Code users)

**Requirements:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code), Git.

### Option A — Single file (recommended for AI builders)
Copy this entire file into your project or paste it as system context.

### Option B — Split files (for Claude Code skill system)

```bash
mkdir -p .claude/skills
# Split the sections above into:
#   .claude/skills/PLANNING.md       (/plan-ceo-review + /plan-eng-review)
#   .claude/skills/REVIEW.md         (/review)
#   .claude/skills/SHIP-RETRO.md     (/ship + /retro)
```

## React + Storybook defaults

For React app repos with reusable components, use
`gstack-lite-storybook.md` as the repo-specific Storybook/Chromatic companion
doc, and optionally paste relevant sections into `CLAUDE.md`. Standardize on
these package scripts:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "<your storybook test command>",
    "chromatic": "chromatic"
  }
}
```

Conventions:
- `build-storybook` is required for CI on UI changes.
- `test-storybook` should run interaction tests and accessibility checks where
  the repo supports them.
- `chromatic` is the preferred visual regression check; it uses the
  `build-storybook` script by default.
- If the repo includes a design system, component library, or roughly `10+`
  reusable components, `chromatic` becomes required and its UI test check should
  block merges.
- In those larger UI repos, use the strongest practical coverage: visual,
  interaction, accessibility, themes, responsive states, and other key variants.
- Minimum story coverage: every shared/public component, every meaningful
  variant, and explicit empty/loading/error states when applicable.
- Bug fixes should add or update a story that captures the broken state.

## Credit

Skills adapted from [garrytan/gstack](https://github.com/garrytan/gstack) (MIT).
