# Ship & Retro Skills

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
   git rebase origin/main    # or merge, per project convention
   ```
   Resolve any conflicts. If conflicts are non-trivial, surface them once and stop.

2. **Run tests**
   ```bash
   npm test -- --runInBand    # or project-specific test command from CLAUDE.md
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
