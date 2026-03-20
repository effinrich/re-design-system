# gstack-lite — React + Storybook defaults

If this repository is a React app with reusable UI components, Storybook is required.

## When Chromatic becomes required
- If the repo includes a design system, component library, or `10+` reusable
  components, Chromatic is required — not optional.
- Treat the threshold as a floor, not a ceiling: if the UI surface is large,
  highly reused, brand-sensitive, or customer-facing, default to Chromatic even
  below `10` components.

## Definition of done for UI work
- Add or update stories for every shared or user-visible component change.
- Cover meaningful states: default, variants, empty, loading, error, disabled,
  theme, and responsive states where applicable.
- For bug fixes, add or update a story that reproduces the bug state.
- Keep stories deterministic: mock network, time, randomness, and auth state.

## Required scripts / automation
- `storybook` — local Storybook development server.
- `build-storybook` — static Storybook build; must pass in CI.
- `test-storybook` — Storybook interaction tests in CI; include accessibility
  assertions where the project supports them.
- `chromatic` — Chromatic visual regression in CI; required when the threshold
  above is met.

## Chromatic "maxed out" expectations
- Turn on the strongest practical UI test surface the repo can support:
  visual regression, interaction coverage, and accessibility checks.
- Include important variants in stories: themes, breakpoints, locales, density,
  and states such as empty/loading/error/disabled where applicable.
- Require the Chromatic UI check before merge for repos that meet the threshold.
- Prefer broad baseline coverage over hand-picked demo stories.
- Use Storybook-first reproduction for UI bugs, then preserve the bug state as a
  regression story.

## Review / ship expectations
- PRs that change React UI should link the relevant Storybook or Chromatic build
  when available.
- If the repo meets the threshold above, require the Chromatic UI test check
  before merge.
- Prefer Storybook-first verification for component behavior before broader E2E.
