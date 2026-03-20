# Code Review Skill

> *"Passing tests do not mean the branch is safe."*

## `/review` — Paranoid Staff Engineer Mode

### When to use
After implementation is complete, before `/ship`. Also useful mid-PR when
something feels off. This is a structural audit, not a style pass.

### Behavior

**Goal:** Find the bugs that survive CI and blow up in production.

#### Pass 1 — Static Analysis

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

#### Pass 2 — Test Coverage Gaps

- Tests that pass but don't cover the real failure mode
- Missing concurrency tests for race-prone code
- Happy path only — no sad path, no edge cases
- For LLM changes: are eval suites updated?
- For React apps with components: are Storybook stories present for shared
  components and key states, with interaction/a11y/visual regression automation?

#### Output Format

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

---

## Greptile Integration (optional)

If [Greptile](https://greptile.com) is installed on the repo, its PR comments
are available at review time. Triage each comment:

| Classification | Action |
|---|---|
| **VALID** | Add to critical findings. Fix before ship. |
| **ALREADY FIXED** | Auto-reply acknowledging the catch + commit reference. |
| **FALSE POSITIVE** | Surface to user. If confirmed: reply to Greptile explaining why. |

False positives can be saved to `~/.gstack/greptile-history.md` to auto-skip
known FP patterns in future runs.

---

## Review Checklist

```
[ ] Concurrency: race conditions checked
[ ] Data integrity: N+1s, orphaned records, index gaps
[ ] Trust boundaries: client input validated, no prompt injection
[ ] Retry logic: correct backoff, idempotent operations
[ ] Auth: all new routes protected
[ ] Tests: sad paths and edge cases covered
[ ] React UI: Storybook coverage + automation present where applicable
[ ] Escaping: no injection vectors
[ ] Greptile comments triaged (if applicable)
```
