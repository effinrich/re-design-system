import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

import { colors } from './foundations/colors'
import { semanticTokens } from './foundations/semantic-tokens'
import { typography } from './foundations/typography'
import { shadows } from './foundations/shadows'
import radii from './foundations/radius'
import spacing from './foundations/spacing'
import sizes from './foundations/sizes'
import breakpoints from './foundations/breakpoints'
import blur from './foundations/blur'
import borders from './foundations/borders'
import transition from './foundations/transition'

// ---------------------------------------------------------------------------
// Helpers — convert flat value maps to Chakra v3 token format { value: ... }
// ---------------------------------------------------------------------------

type FlatObj = Record<string, unknown>

/** Recursively wraps leaf values in { value: ... } for createSystem tokens */
function tokenize<T extends FlatObj>(obj: T): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(obj)) {
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      result[key] = tokenize(val as FlatObj)
    } else {
      result[key] = { value: val }
    }
  }
  return result
}

/** Converts semantic tokens from v2 { default, _dark } to v3 { value: { base, _dark } } */
function tokenizeSemantic(obj: FlatObj): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string') {
      // Simple string value — wrap as-is, reference via token syntax
      result[key] = { value: `{colors.${val.replace('.', '.')}}` }
    } else if (val !== null && typeof val === 'object') {
      const rec = val as Record<string, unknown>
      if ('default' in rec || '_dark' in rec) {
        // Leaf semantic token
        const base = rec.default
          ? `{colors.${String(rec.default)}}`
          : undefined
        const dark = rec._dark
          ? `{colors.${String(rec._dark)}}`
          : undefined
        result[key] = { value: { base, _dark: dark } }
      } else {
        // Nested group
        result[key] = tokenizeSemantic(rec)
      }
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// System config
// ---------------------------------------------------------------------------

const config = defineConfig({
  theme: {
    tokens: {
      colors: tokenize(colors),
      fonts: tokenize(typography.fonts),
      fontSizes: tokenize(typography.fontSizes),
      fontWeights: tokenize(typography.fontWeights),
      lineHeights: tokenize(typography.lineHeights),
      letterSpacings: tokenize(typography.letterSpacings),
      radii: tokenize(radii),
      spacing: tokenize(spacing),
      sizes: tokenize(sizes),
      shadows: tokenize(shadows),
      blurs: tokenize(blur),
      borders: tokenize(borders),
      durations: tokenize(transition.duration),
      easings: tokenize(transition.easing),
    },
    breakpoints: breakpoints,
    semanticTokens: {
      colors: tokenizeSemantic(semanticTokens.colors),
    },
  },
  globalCss: {
    body: {
      color: 'default',
      bg: 'bg-canvas',
    },
    '*::placeholder': {
      opacity: 1,
      color: 'muted',
    },
    'html, body': {
      height: '100%',
    },
    '#__next, #root': {
      display: 'flex',
      flexDirection: 'column',
      minH: '100%',
    },
  },
})

export const system = createSystem(defaultConfig, config)
