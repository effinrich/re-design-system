# Getting Started with @react/ui

This guide will help you set up and start using the @react/ui design system in your React application.

## Prerequisites

- Node.js 18+ 
- React 19.0.0
- npm or yarn

## Installation

```bash
npm install @react/ui
```

Or with yarn:

```bash
yarn add @react/ui
```

## Peer Dependencies

The library requires the following peer dependencies:

```bash
npm install @chakra-ui/react @emotion/react react react-dom
```

## Basic Setup

### 1. Wrap Your Application

The first step is to wrap your application with the `RhProvider` component:

```tsx
// App.tsx or main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RhProvider, theme } from '@react/ui'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RhProvider theme={theme}>
      <App />
    </RhProvider>
  </React.StrictMode>
)
```

### 2. Start Using Components

Now you can import and use any component from the library:

```tsx
import { 
  Box, 
  Button, 
  Heading, 
  Text, 
  VStack,
  Card,
  CardBody 
} from '@react/ui'

function MyComponent() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading>Welcome!</Heading>
        <Text color="gray.600">
          Start building your application with @react/ui
        </Text>
        <Card w="full">
          <CardBody>
            <Button colorScheme="primary">
              Get Started
            </Button>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}
```

## Next.js Setup

For Next.js applications with server-side rendering:

### App Router (Next.js 13+)

```tsx
// app/providers.tsx
'use client'

import { RhProvider, theme } from '@react/ui'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RhProvider theme={theme}>
      {children}
    </RhProvider>
  )
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### Pages Router

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import { RhProvider, theme } from '@react/ui'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RhProvider theme={theme} cookies={pageProps.cookies}>
      <Component {...pageProps} />
    </RhProvider>
  )
}
```

## Color Mode (Dark/Light Theme)

The library supports both light and dark color modes out of the box.

### Toggle Color Mode

```tsx
import { ColorModeToggle } from '@react/ui'

function Header() {
  return (
    <header>
      <ColorModeToggle />
    </header>
  )
}
```

### Programmatic Control

```tsx
import { useColorMode } from '@chakra-ui/react'

function ThemeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button onClick={toggleColorMode}>
      Current: {colorMode}
    </Button>
  )
}
```

## Custom Theme

You can extend the default theme with your own colors and styles:

```tsx
import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme, RhProvider } from '@react/ui'

const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#e6f2ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0073e6',  // Main primary color
      600: '#005cb3',
      700: '#004680',
      800: '#002f4d',
      900: '#00191a',
    },
    brand: {
      500: '#your-brand-color',
    },
  },
  fonts: {
    heading: 'Your Heading Font, sans-serif',
    body: 'Your Body Font, sans-serif',
  },
}, baseTheme)

function App() {
  return (
    <RhProvider theme={customTheme}>
      <YourApp />
    </RhProvider>
  )
}
```

## Common Patterns

### Building a Form

```tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  VStack,
} from '@react/ui'
import { useForm } from 'react-hook-form'

interface FormData {
  name: string
  email: string
  role: string
}

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    console.log(data)
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            {...register('name', { required: 'Name is required' })}
            placeholder="John Doe"
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="john@example.com"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Role</FormLabel>
          <Select {...register('role')}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
        </FormControl>

        <Button
          type="submit"
          colorScheme="primary"
          isLoading={isSubmitting}
          w="full"
        >
          Submit
        </Button>
      </VStack>
    </Box>
  )
}
```

### Building a Card Grid

```tsx
import { SimpleGrid, Card, CardHeader, CardBody, Heading, Text } from '@react/ui'

const items = [
  { title: 'Feature 1', description: 'Description for feature 1' },
  { title: 'Feature 2', description: 'Description for feature 2' },
  { title: 'Feature 3', description: 'Description for feature 3' },
]

function FeatureGrid() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <Heading size="md">{item.title}</Heading>
          </CardHeader>
          <CardBody>
            <Text color="gray.600">{item.description}</Text>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  )
}
```

### Building a Modal Dialog

```tsx
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Text,
} from '@react/ui'

function ConfirmDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleConfirm = () => {
    // Perform action
    onClose()
  }

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Item
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this item?</Text>
            <Text color="gray.500" mt={2}>
              This action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleConfirm}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
```

### Building a Data Table

```tsx
import { DataTable } from '@react/ui'
import { createColumnHelper } from '@tanstack/react-table'

type User = {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
]

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <Badge colorScheme={info.getValue() === 'active' ? 'green' : 'gray'}>
        {info.getValue()}
      </Badge>
    ),
  }),
]

function UsersTable() {
  return (
    <DataTable
      data={users}
      columns={columns}
      variant="striped"
      colorScheme="gray"
    />
  )
}
```

## Responsive Design

The library uses a mobile-first responsive design approach:

```tsx
<Box
  // Stack on mobile, side-by-side on larger screens
  display={{ base: 'block', md: 'flex' }}
  // Full width on mobile, half on larger screens
  w={{ base: '100%', md: '50%' }}
  // Different padding at breakpoints
  p={{ base: 4, md: 6, lg: 8 }}
  // Hide on mobile, show on larger screens
  display={{ base: 'none', lg: 'block' }}
>
  Responsive content
</Box>
```

### Breakpoints

| Breakpoint | Value | Pixels |
|------------|-------|--------|
| `base` | 0em | 0px |
| `sm` | 30em | 480px |
| `md` | 48em | 768px |
| `lg` | 62em | 992px |
| `xl` | 80em | 1280px |
| `2xl` | 96em | 1536px |

## Style Props

All components accept Chakra UI style props:

```tsx
<Box
  // Layout
  w="100%"
  h="200px"
  minW="300px"
  maxH="500px"
  
  // Spacing
  m={4}           // margin
  p={4}           // padding
  mx="auto"       // margin-left & margin-right
  py={6}          // padding-top & padding-bottom
  
  // Colors
  bg="gray.100"
  color="gray.800"
  borderColor="gray.200"
  
  // Borders
  borderWidth="1px"
  borderRadius="md"
  rounded="lg"    // shorthand for borderRadius
  
  // Typography
  fontSize="lg"
  fontWeight="bold"
  textAlign="center"
  
  // Flexbox
  display="flex"
  alignItems="center"
  justifyContent="space-between"
  gap={4}
  
  // Position
  position="relative"
  top={0}
  zIndex={10}
  
  // Shadows
  shadow="md"
  boxShadow="lg"
  
  // Transitions
  transition="all 0.2s"
  
  // Pseudo-states
  _hover={{ bg: 'gray.200' }}
  _active={{ transform: 'scale(0.98)' }}
  _focus={{ outline: 'none', boxShadow: 'outline' }}
/>
```

## TypeScript

The library is fully typed. You can import types:

```tsx
import type {
  ButtonProps,
  BoxProps,
  CardProps,
  InputProps,
  ModalProps,
} from '@react/ui'

// Extend component props
interface MyButtonProps extends ButtonProps {
  customProp?: string
}

// Use with generic components
function CustomCard<T extends object>(props: CardProps & { data: T }) {
  // ...
}
```

## Next Steps

- Explore the [API Documentation](./API.md) for complete component reference
- Check out the [Component Examples](./EXAMPLES.md) for more usage patterns
- View the Storybook for interactive component demos: `npm run storybook`

## Getting Help

- Check the [API Documentation](./API.md)
- Review component stories in Storybook
- File issues on GitHub
