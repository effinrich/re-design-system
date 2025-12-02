# Theme Documentation

This document provides detailed documentation about the @react/ui theme system, including colors, typography, spacing, and component customization.

## Table of Contents

- [Using the Theme](#using-the-theme)
- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Breakpoints](#breakpoints)
- [Shadows](#shadows)
- [Border Radius](#border-radius)
- [Transitions](#transitions)
- [Component Styles](#component-styles)
- [Customizing the Theme](#customizing-the-theme)
- [Dark Mode](#dark-mode)

---

## Using the Theme

### Basic Setup

```tsx
import { RhProvider, theme } from '@react/ui'

function App() {
  return (
    <RhProvider theme={theme}>
      <YourApp />
    </RhProvider>
  )
}
```

### Accessing Theme Values

```tsx
import { useTheme, useToken } from '@chakra-ui/react'

function ThemedComponent() {
  const theme = useTheme()
  const [primary500] = useToken('colors', ['primary.500'])
  
  return (
    <Box color={theme.colors.primary[500]}>
      Theme-aware content
    </Box>
  )
}
```

---

## Colors

### Primary Palette

The primary color is a purple gradient used for main actions and branding.

```tsx
primary: {
  25:  '#FCFAFF',  // Lightest - backgrounds
  50:  '#F9F5FF',  // Very light - hover backgrounds
  100: '#F4EBFF',  // Light - disabled states
  200: '#E9D7FE',  // Light accent
  300: '#D7AFEA',  // Medium light
  400: '#B562DB',  // Medium
  500: '#B540EC',  // Base color
  600: '#9425C9',  // Primary actions (default)
  700: '#631487',  // Hover state
  800: '#50106E',  // Active/pressed
  900: '#340B47',  // Darkest
}
```

### Semantic Colors

#### Success (Green)
```tsx
success: {
  25:  '#F6FEF9',
  50:  '#ECFDF3',
  100: '#D1FADF',
  200: '#A6F4C5',
  300: '#6CE9A6',
  400: '#32D583',
  500: '#12B76A',
  600: '#039855',  // Default
  700: '#027A48',
  800: '#05603A',
  900: '#054F31',
}
```

#### Warning (Orange/Yellow)
```tsx
warning: {
  25:  '#FFFAEB',
  50:  '#FFFAEB',
  100: '#FEF0C7',
  200: '#FEDF89',
  300: '#FEC84B',
  400: '#FDB022',
  500: '#F79009',
  600: '#DC6803',  // Default
  700: '#B54708',
  800: '#93370D',
  900: '#7A2E0E',
}
```

#### Error (Red)
```tsx
error: {
  50:  '#ffecec',
  100: '#ffc6c6',
  200: '#ffa0a0',
  300: '#ff7b7b',
  400: '#ff5555',
  500: '#fd3131',
  600: '#fb0e0e',  // Default
  700: '#dd0606',
  800: '#b70707',
  900: '#910707',
}
```

### Neutral Colors

#### Gray Scale
```tsx
gray: {
  25:  '#FCFCFD',
  50:  '#F7FAFC',
  100: '#EDF2F7',
  200: '#E2E8F0',
  300: '#CBD5E0',
  400: '#A0AEC0',
  500: '#718096',  // Default muted text
  600: '#4A5568',  // Body text
  700: '#2D3748',
  800: '#1A202C',
  900: '#171923',  // Darkest
}
```

### Brand Colors

Additional color schemes for specific use cases:

```tsx
// Social Media
linkedin: { 500: '#00A0DC', 700: '#0077B5' }
facebook: { 400: '#4267B2', 500: '#385898' }
twitter:  { 500: '#1DA1F2' }
whatsapp: { 500: '#22c35e' }
telegram: { 500: '#0088CC' }

// Special
zap:    { 500: '#B9F94E' }  // Bright green-yellow
galaxy: { 500: '#3F1046' }  // Deep purple
flame:  { 500: '#FF7A41' }  // Orange
```

### Using Colors

```tsx
// Direct usage
<Box bg="primary.500" color="white">
  Primary background
</Box>

// Hover states
<Button
  bg="primary.600"
  _hover={{ bg: 'primary.700' }}
  _active={{ bg: 'primary.800' }}
>
  Button
</Button>

// Color scheme (for components)
<Button colorScheme="primary">Primary</Button>
<Badge colorScheme="success">Success</Badge>
<Alert status="warning">Warning</Alert>
```

---

## Typography

### Font Family

The default font stack uses Inter:

```tsx
fonts: {
  heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: 'Monaco, Consolas, "Liberation Mono", monospace',
}
```

### Font Sizes

```tsx
fontSizes: {
  xs:   '0.75rem',   // 12px
  sm:   '0.875rem',  // 14px
  md:   '1rem',      // 16px
  lg:   '1.125rem',  // 18px
  xl:   '1.25rem',   // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
  '7xl': '4.5rem',   // 72px
  '8xl': '6rem',     // 96px
  '9xl': '8rem',     // 128px
}
```

### Font Weights

```tsx
fontWeights: {
  hairline:   100,
  thin:       200,
  light:      300,
  normal:     400,
  medium:     500,
  semibold:   600,
  bold:       700,
  extrabold:  800,
  black:      900,
}
```

### Line Heights

```tsx
lineHeights: {
  normal: 'normal',
  none:   1,
  shorter: 1.25,
  short:   1.375,
  base:    1.5,
  tall:    1.625,
  taller:  2,
}
```

### Usage Examples

```tsx
<Text fontSize="lg" fontWeight="bold" lineHeight="tall">
  Large bold text
</Text>

<Heading size="xl" fontWeight="semibold">
  Heading
</Heading>

<Text fontFamily="mono" fontSize="sm">
  Code text
</Text>
```

---

## Spacing

Spacing values follow a 4px base unit:

```tsx
space: {
  px:  '1px',
  0:   '0',
  0.5: '0.125rem',  // 2px
  1:   '0.25rem',   // 4px
  1.5: '0.375rem',  // 6px
  2:   '0.5rem',    // 8px
  2.5: '0.625rem',  // 10px
  3:   '0.75rem',   // 12px
  3.5: '0.875rem',  // 14px
  4:   '1rem',      // 16px
  5:   '1.25rem',   // 20px
  6:   '1.5rem',    // 24px
  7:   '1.75rem',   // 28px
  8:   '2rem',      // 32px
  9:   '2.25rem',   // 36px
  10:  '2.5rem',    // 40px
  12:  '3rem',      // 48px
  14:  '3.5rem',    // 56px
  16:  '4rem',      // 64px
  20:  '5rem',      // 80px
  24:  '6rem',      // 96px
  28:  '7rem',      // 112px
  32:  '8rem',      // 128px
  36:  '9rem',      // 144px
  40:  '10rem',     // 160px
  44:  '11rem',     // 176px
  48:  '12rem',     // 192px
  52:  '13rem',     // 208px
  56:  '14rem',     // 224px
  60:  '15rem',     // 240px
  64:  '16rem',     // 256px
  72:  '18rem',     // 288px
  80:  '20rem',     // 320px
  96:  '24rem',     // 384px
}
```

### Usage

```tsx
// Padding and margin
<Box p={4} m={2}>         // 16px padding, 8px margin
  Content
</Box>

// Specific directions
<Box pt={8} px={4} mb={6}>
  Content
</Box>

// Gap in flex/grid
<HStack spacing={4}>      // 16px gap
  <Box>1</Box>
  <Box>2</Box>
</HStack>
```

---

## Breakpoints

Responsive breakpoints for mobile-first design:

```tsx
breakpoints: {
  base: '0em',     // 0px - Mobile
  sm:   '30em',    // 480px - Large phones
  md:   '48em',    // 768px - Tablets
  lg:   '62em',    // 992px - Laptops
  xl:   '80em',    // 1280px - Desktops
  '2xl': '96em',   // 1536px - Large screens
}
```

### Usage

```tsx
// Object syntax
<Box
  w={{ base: '100%', md: '50%', lg: '33%' }}
  display={{ base: 'block', md: 'flex' }}
/>

// Array syntax [base, sm, md, lg, xl, 2xl]
<Box w={['100%', '100%', '50%', '33%']} />

// useBreakpointValue hook
const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 })

// Show/hide at breakpoints
<Box display={{ base: 'none', md: 'block' }}>
  Desktop only
</Box>
```

---

## Shadows

Box shadow presets:

```tsx
shadows: {
  xs:    '0 0 0 1px rgba(0, 0, 0, 0.05)',
  sm:    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base:  '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md:    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg:    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl:    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none:  'none',
}
```

### Usage

```tsx
<Box shadow="md">Medium shadow</Box>
<Card shadow="lg">Large shadow card</Card>
<Input _focus={{ shadow: 'outline' }}>
```

---

## Border Radius

```tsx
radii: {
  none:   '0',
  sm:     '0.125rem',  // 2px
  base:   '0.25rem',   // 4px
  md:     '0.375rem',  // 6px
  lg:     '0.5rem',    // 8px
  xl:     '0.75rem',   // 12px
  '2xl':  '1rem',      // 16px
  '3xl':  '1.5rem',    // 24px
  full:   '9999px',    // Circular
}
```

### Usage

```tsx
<Box borderRadius="md">Rounded corners</Box>
<Avatar borderRadius="full">Circular</Avatar>
<Button rounded="lg">Large radius</Button>
```

---

## Transitions

```tsx
transition: {
  property: {
    common: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    colors: 'background-color, border-color, color, fill, stroke',
    dimensions: 'width, height',
    position: 'left, right, top, bottom',
    background: 'background-color, background-image, background-position',
  },
  easing: {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  duration: {
    'ultra-fast': '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    'ultra-slow': '500ms',
  },
}
```

### Usage

```tsx
<Box
  transition="all 0.2s"
  _hover={{ transform: 'scale(1.05)' }}
>
  Animated
</Box>
```

---

## Component Styles

The theme includes customized styles for these components:

- Badge
- Button
- Card
- Checkbox
- CloseButton
- Container
- Divider
- FormLabel
- Heading
- Input
- Link
- List
- Modal
- Popover
- Progress
- Radio
- RadioCard
- Select
- Switch
- Table
- Tabs
- Textarea

### Button Variants

```tsx
// Solid variants
<Button colorScheme="primary">Primary Solid</Button>
<Button colorScheme="gray">Gray Solid</Button>
<Button colorScheme="secondary">Secondary Solid</Button>

// Custom variants
<Button variant="primary">Primary (shorthand)</Button>
<Button variant="secondary">Secondary (outline)</Button>
<Button variant="primary-on-accent">On colored background</Button>
<Button variant="ghost-on-accent">Ghost on accent</Button>
<Button variant="zap-on-accent">Zap style</Button>

// Standard variants
<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

---

## Customizing the Theme

### Extending the Theme

```tsx
import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@react/ui'

const customTheme = extendTheme({
  colors: {
    // Override primary
    primary: {
      500: '#0066cc',
      600: '#0055aa',
      700: '#004488',
    },
    // Add new color
    brand: {
      500: '#ff6600',
    },
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      variants: {
        custom: {
          bg: 'brand.500',
          color: 'white',
          _hover: { bg: 'brand.600' },
        },
      },
    },
  },
}, baseTheme)

<RhProvider theme={customTheme}>
  <App />
</RhProvider>
```

### Component Style Overrides

```tsx
const customTheme = extendTheme({
  components: {
    Card: {
      baseStyle: {
        container: {
          borderRadius: '2xl',
          boxShadow: 'lg',
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
      variants: {
        filled: {
          field: {
            bg: 'gray.50',
            _hover: { bg: 'gray.100' },
          },
        },
      },
    },
  },
}, baseTheme)
```

---

## Dark Mode

### Enabling Dark Mode

Color mode is automatically supported. Use the `ColorModeToggle` component:

```tsx
import { ColorModeToggle } from '@react/ui'

<ColorModeToggle />
```

### Programmatic Control

```tsx
import { useColorMode, useColorModeValue } from '@chakra-ui/react'

function Component() {
  const { colorMode, toggleColorMode } = useColorMode()
  
  // Get different values for light/dark
  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('gray.800', 'white')
  
  return (
    <Box bg={bg} color={color}>
      Current mode: {colorMode}
      <Button onClick={toggleColorMode}>Toggle</Button>
    </Box>
  )
}
```

### Color Mode Aware Styling

```tsx
<Box
  bg={{ light: 'white', dark: 'gray.800' }}
  color={{ light: 'gray.800', dark: 'white' }}
>
  Adapts to color mode
</Box>

// Or using _light and _dark pseudo props
<Box
  _light={{ bg: 'white', color: 'gray.800' }}
  _dark={{ bg: 'gray.800', color: 'white' }}
>
  Adapts to color mode
</Box>
```

### SSR Color Mode

For server-side rendering:

```tsx
// Get cookies from request
const cookies = req.headers.cookie

<RhProvider theme={theme} cookies={cookies}>
  <App />
</RhProvider>
```
