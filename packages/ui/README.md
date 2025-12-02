# @react/ui

A comprehensive React UI component library built on top of [Chakra UI](https://chakra-ui.com/), providing a complete design system with custom theming, 75+ components, hooks, and utilities.

## Features

- 🎨 **Custom Theme** - Pre-configured color palette, typography, and spacing
- 📦 **75+ Components** - Layout, forms, data display, feedback, navigation, and more
- 🌙 **Dark Mode** - Built-in light/dark color mode support
- 📱 **Responsive** - Mobile-first responsive design system
- 🔒 **TypeScript** - Full TypeScript support with exported types
- ♿ **Accessible** - WAI-ARIA compliant components
- 🎯 **Tree Shakable** - Import only what you need

## Installation

```bash
npm install @react/ui
```

## Quick Start

```tsx
import { RhProvider, theme, Button, Card, CardBody, Heading } from '@react/ui'

function App() {
  return (
    <RhProvider theme={theme}>
      <Card maxW="sm" mx="auto" mt={8}>
        <CardBody>
          <Heading size="md" mb={4}>Welcome!</Heading>
          <Button colorScheme="primary">Get Started</Button>
        </CardBody>
      </Card>
    </RhProvider>
  )
}
```

## Documentation

- 📖 [**API Reference**](./docs/API.md) - Complete component API documentation
- 🚀 [**Getting Started**](./docs/GETTING_STARTED.md) - Setup guide and first steps
- 💡 [**Examples**](./docs/EXAMPLES.md) - Common patterns and usage examples

## Component Categories

### Core
- `RhProvider` - Root provider with theme and color mode
- `rh` - Chakra factory for styled components
- `theme` - Pre-configured design tokens

### Layout
`Box` · `Flex` · `Stack` · `HStack` · `VStack` · `Grid` · `SimpleGrid` · `Container` · `Center` · `Wrap` · `Divider` · `AspectRatio` · `Square` · `Circle`

### Forms
`Button` · `ButtonGroup` · `Input` · `InputGroup` · `Select` · `Checkbox` · `Radio` · `Switch` · `Textarea` · `NumberInput` · `Slider` · `FormControl` · `FormField`

### Data Display
`Card` · `Table` · `DataTable` · `Badge` · `Tag` · `List` · `Code` · `Stat` · `StatCard`

### Feedback
`Alert` · `BannerAlert` · `InfoAlert` · `Loader` · `Spinner` · `Skeleton` · `Tooltip` · `ErrorFallback`

### Overlay
`Modal` · `Drawer` · `DrawerForm` · `AlertDialog` · `Menu`

### Disclosure
`Accordion` · `Tabs`

### Navigation
`Breadcrumb` · `Stepper` · `Pagination` · `Link` · `LinkOverlay` · `SideNav`

### Media
`Avatar` · `Image` · `Icon` · `IconButton`

### Typography
`Heading` · `Text`

### Custom Components
`AutoComplete` · `DatePicker` · `CtaCard` · `FilterBox` · `DetailsCard` · `ColorModeToggle` · `BackButton` · `Page` · `SectionHeader` · `ShadowBox`

### Hooks
`useDisclosure` · `useBreakpoint` · `useTheme`

### Icons
50+ pre-built icons including navigation arrows, action icons, status indicators, and more.

## Basic Usage Examples

### Button Variants

```tsx
import { Button, HStack } from '@react/ui'

<HStack spacing={4}>
  <Button colorScheme="primary">Primary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button isLoading>Loading</Button>
</HStack>
```

### Form with Validation

```tsx
import { FormControl, FormLabel, FormErrorMessage, Input, Button, VStack } from '@react/ui'

<VStack as="form" spacing={4}>
  <FormControl isInvalid={!!errors.email}>
    <FormLabel>Email</FormLabel>
    <Input type="email" {...register('email')} />
    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
  </FormControl>
  <Button type="submit" colorScheme="primary">Submit</Button>
</VStack>
```

### Modal Dialog

```tsx
import { 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalBody, ModalFooter, ModalCloseButton, 
  Button, useDisclosure 
} from '@react/ui'

function ModalExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Content here</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
```

### Responsive Layout

```tsx
import { SimpleGrid, Card, CardBody } from '@react/ui'

<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
  <Card><CardBody>Card 1</CardBody></Card>
  <Card><CardBody>Card 2</CardBody></Card>
  <Card><CardBody>Card 3</CardBody></Card>
</SimpleGrid>
```

## Theme Colors

The library includes a carefully crafted color palette:

| Color | Usage |
|-------|-------|
| `primary` | Primary actions, links, focus states |
| `gray` | Text, backgrounds, borders |
| `success` | Success states, confirmations |
| `warning` | Warning states, cautions |
| `error` | Error states, destructive actions |

```tsx
<Button colorScheme="primary">Primary</Button>
<Badge colorScheme="success">Active</Badge>
<Alert status="warning">Warning message</Alert>
```

## Development

### Running Storybook

```bash
npm run storybook
```

### Running Tests

```bash
nx test @react/ui
```

### Building

```bash
nx build @react/ui
```

## TypeScript

All components are fully typed. Import types alongside components:

```tsx
import type { ButtonProps, BoxProps, CardProps } from '@react/ui'
```

## License

MIT

---

Built with ❤️ using [Nx](https://nx.dev) and [Chakra UI](https://chakra-ui.com)
