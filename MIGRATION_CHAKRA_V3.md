# Chakra UI v2 → v3 Migration Plan

Branch: `chore/nx-and-sb-upgrades`
Date: 2026-03-20

---

## Starting state

Two commits already landed:
1. `24c335f` — Nx 22, Storybook 10, Vitest 4 upgrade + story migration
2. `6c3259b` — 52 Chakra UI v3 codemod transforms across 81 files

**Error landscape:** ~1,124 TS errors across 218 files in `packages/ui`.

```
Error taxonomy:
┌──────────────┬───────┬──────────────────────────────────────────────┐
│ Category     │ Count │ Description                                  │
├──────────────┼───────┼──────────────────────────────────────────────┤
│ A. Pre-exist │  ~550 │ pages/ — missing deps, implicit any          │
│ B. Codemod   │  ~203 │ Circular re-export aliases (TS2303)          │
│ C. V2 removed│   ~80 │ @chakra-ui/shared-utils, descendant, etc.   │
│ D. V2→V3 API │  ~150 │ colorScheme→colorPalette, type mismatches   │
│ E. Theme     │   ~23 │ createSystem config, @chakra-ui/theme-tools  │
└──────────────┴───────┴──────────────────────────────────────────────┘

Category A is pre-existing on main — excluded from this migration.
Categories B–E (~574 errors) are the migration scope.
```

---

## Decisions made (eng review)

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Delete ~40 pure re-export wrappers, export directly from barrel | Dead abstraction — wrappers add no value, just proxy @chakra-ui/react |
| 2 | Full theme rewrite to v3 recipe system | Blocking — no incremental path from v2 theme-tools to v3 |
| 3 | Replace custom accordion with v3 Accordion snippet | Custom code uses 5 removed v2 internal packages |
| 4 | Use v3 CloseButton snippet (+ icon override) | Custom implementation reimplements built-in |
| 5 | Rename colorScheme → colorPalette in Button resolver | Codemod missed the function body |
| 6 | Exclude pages/ errors — separate PR | Pre-existing, not caused by migration |
| 7 | Use `npx @chakra-ui/cli snippet add` for 21+ components | Official v3 compound components replace manual rewrites |
| 8 | Fix @chakra-ui/react dep version (file: → ^3.27.1) | Broken Nx migration artifact |
| 9 | Use v3 _dark/_light conditions (no shared utility) | Framework handles it — idiomatic v3 |
| 10 | Use v3 prose snippet (replace @nikolovlazar/chakra-ui-prose) | withProse is v2-only |
| 11 | Update stories per-component during migration | Catch regressions immediately |
| 12 | Update button tests (colorPalette, v3 props, vi.fn()) | Tests are the contract |

---

## Execution plan

```
Phase 1: Foundation
├─ Fix @chakra-ui/react version in packages/ui/package.json  ✅
├─ npm install
├─ npx @chakra-ui/cli snippet add [22 snippets]
│    accordion, alert, avatar, breadcrumb, checkbox,
│    close-button, dialog, drawer, field, input-group,
│    menu, number-input, prose, radio, select, skeleton,
│    slider, stat, steps, switch, tag, tooltip
└─ Wire snippet output into packages/ui/src/

Phase 2: Theme (blocks everything)
├─ Rewrite theme/index.ts → correct createSystem config
├─ Rewrite 24 component style files → defineRecipe / defineSlotRecipe
│    Use { base: X, _dark: Y } conditions (no runtime mode())
├─ Rewrite foundations → v3 token format
└─ Remove @chakra-ui/theme-tools + @nikolovlazar/chakra-ui-prose deps

Phase 3: Components
├─ Delete ~40 pure re-export wrapper files
├─ Update barrel (src/index.ts) → export from snippets + @chakra-ui/react
├─ Fix Button: colorScheme → colorPalette in resolveButtonRecipe
├─ Delete custom accordion/ → export from v3 snippet
├─ Update drawer-form-accordion → v3 Accordion.* API
└─ Delete custom close-button → use v3 snippet + icon override

Phase 4: Tests & Stories
├─ Update button.spec.tsx (colorPalette, disabled, loading, vi.fn())
├─ Update stories for renamed components (Modal→Dialog, etc.)
└─ Verify stories render in Storybook dev

Phase 5: Verification
├─ npx tsc --noEmit (target: 0 errors excluding pages/)
├─ Storybook build
└─ Chromatic visual regression
```

---

## Key v3 API changes

| v2 | v3 |
|----|----|
| `colorScheme` prop | `colorPalette` prop |
| `isDisabled`, `isLoading`, `isChecked` | `disabled`, `loading`, `checked` |
| `Modal` | `Dialog` (Dialog.Root, Dialog.Content, etc.) |
| `AlertDialog` | `Dialog` with `role="alertdialog"` |
| `FormControl` / `FormLabel` | `Field.Root` / `Field.Label` |
| `Stepper` | `Steps` (Steps.Root, Steps.Item, etc.) |
| `extendTheme()` | `createSystem(defaultConfig, { ... })` |
| `@chakra-ui/theme-tools` (`mode()`) | `{ base: X, _dark: Y }` conditions |
| `StyleFunctionProps` | `defineRecipe` / `defineSlotRecipe` |
| `chakra.button` factory | `chakra("button")` or use built-in |
| `useMultiStyleConfig` | `useSlotRecipe` |
| `omitThemingProps` | Not needed — recipes handle it |
| `ThemingProps` | `RecipeVariantProps` |

---

## Failure modes to watch

| Codepath | Risk | Mitigation |
|----------|------|------------|
| Theme color tokens | Silent visual regression | Chromatic required before merge |
| Snippet output directory | CLI may scaffold to wrong path | Verify output, move if needed |
| Barrel export removals | External consumers break | Build verification |
| Modal→Dialog rename | Import path changes | Grep for all Modal references |

---

## Out of scope (see TODOS.md)

1. Fix pages/ typecheck errors (~726 pre-existing)
2. Extract pages/ into separate package
3. Bundle size verification post-migration
