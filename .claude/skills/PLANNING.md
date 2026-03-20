# Planning Skills

Two sequential planning modes. Always run **CEO review first**, then **Eng review**.
Never skip phase 1 and jump straight to architecture.

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
- Do NOT batch TODO questions — one per AskUserQuestion, always
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
