# AGENTS.md

This repository is **agent-agnostic first** and **Claude-compatible second**.

Use it as a portable workflow pack for coding agents that can read Markdown
instructions. Claude Code can additionally package the split docs as native
slash-command skills, but that is an adapter layer — not the core of the repo.

## Primary docs

- `GSTACK_LITE.md` — main planning / review / ship / retro workflow
- `gstack-lite-storybook.md` — Storybook / Chromatic policy for React repos
- `PLANNING.md` — split planning docs
- `REVIEW.md` — split review docs
- `SHIP-RETRO.md` — split ship + retro docs

## How any coding agent should use this repo

1. Read `GSTACK_LITE.md` before non-trivial work.
2. If the project is a React app with reusable UI components, also read
   `gstack-lite-storybook.md`.
3. Treat the slash-command names in `GSTACK_LITE.md` as **mode labels**, not as
   a requirement for a specific tool.
4. If your agent does not support slash commands, invoke the modes with plain
   English prompts.

## Mode map

- `plan-ceo-review` → founder/product reframing mode
- `plan-eng-review` → engineering planning and architecture mode
- `review` → paranoid pre-ship review mode
- `ship` → release execution mode
- `retro` → retrospective / metrics mode

## Plain-language invocation examples

- "Use founder mode from `GSTACK_LITE.md` to reframe this feature request."
- "Use eng review mode from `GSTACK_LITE.md` and produce architecture, failure
  modes, and a test matrix."
- "Use review mode from `GSTACK_LITE.md` on this diff."

## Claude Code adapter

If you want native Claude-style slash-command packaging in a consuming repo:

- copy `PLANNING.md`, `REVIEW.md`, and `SHIP-RETRO.md` into `.claude/skills/`
- paste or adapt relevant sections from `GSTACK_LITE.md` into `CLAUDE.md`
- for React repos, also paste or reference `gstack-lite-storybook.md`

## Philosophy

The workflow rules are the product. Agent-specific packaging is just a delivery
mechanism.
