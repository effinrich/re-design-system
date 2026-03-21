# TODOS

Tracked follow-up work deferred from the Chakra v2→v3 migration (`chore/nx-and-sb-upgrades`).

---

## 1. Fix pages/ typecheck errors (~726 errors)

**What:** Install missing type dependencies (`@redesignhealth/portal/data-assets`, `@redesignhealth/portal/utils`, `react-hook-form`, `yup`, `@hookform/resolvers`, `chakra-react-select`, `@emotion/styled`, `@redesignhealth/analytics`) and add explicit types to fix ~550 implicit-any violations across 12 page component directories.

**Why:** Pre-existing tech debt that blocks strict typecheck across the full UI package. These errors exist on `main` — they are not caused by the Chakra migration.

**Pros:** Full strict typecheck, catches real bugs in page components.
**Cons:** ~550 errors to fix, large diff, unrelated to Chakra migration — mixing it in would make the migration PR unreviewable.

**Context:** The `pages/` directory contains 12 page-level components (ceo-directory-page, company-details-page, etc.) that import from monorepo packages (`@redesignhealth/portal/*`, `@redesignhealth/analytics`) which aren't declared in `packages/ui/package.json`. The majority of errors are TS7031 (binding element implicitly has any) and TS7006 (parameter implicitly has any) — the components were written without strict types.

**Depends on:** Nothing — independent of Chakra migration. Can be done in parallel.

---

## 2. Extract pages/ into a separate package

**What:** Move page-level components out of `packages/ui` into their own package (e.g., `@redesignhealth/pages`) since they have fundamentally different dependency requirements than a design-system library.

**Why:** `pages/` depends on `@redesignhealth/portal/data-assets`, `react-hook-form`, `yup`, `@redesignhealth/analytics` — application-level concerns that don't belong in a UI component library. This creates a confused dependency boundary.

**Pros:** Clean dependency graph, UI lib stays generic and reusable, page components can declare their own deps properly.
**Cons:** Large refactor, requires updating all consumer import paths, Nx project configuration changes.

**Context:** 12 page directories with heavy external deps. The UI package should export primitives (Button, Card, Input) — not full application pages with form logic and API calls.

**Depends on:** TODO #1 (fix page errors first so the extraction starts from a clean state).

---

## 3. Verify bundle size post-migration

**What:** After Chakra v3 migration lands, measure the bundle size of `@react/ui` with v3 snippets (source code copied into project) vs. v2 re-exports (thin wrappers around `@chakra-ui/react`).

**Why:** v3 snippets are source code you own — they're copied into `packages/ui/src/` rather than re-exported from the library. If tree-shaking isn't working correctly, unused snippet code could bloat the bundle.

**Pros:** Catches bloat early before it affects consumer apps.
**Cons:** Minor effort — just needs a build + size comparison.

**Context:** Current tsconfig has `module: "esnext"` and `moduleResolution: "bundler"` which should enable proper tree-shaking. Likely fine, but worth a 10-minute verification.

**Depends on:** Chakra v3 migration completion.
