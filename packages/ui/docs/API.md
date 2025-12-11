# @react/ui - API Documentation

A comprehensive React UI component library built on top of Chakra UI, providing a complete design system with custom theming, components, hooks, and utilities.

## Table of Contents

- [Installation & Setup](#installation--setup)
- [Core](#core)
  - [RhProvider](#rhprovider)
  - [rh (Chakra Factory)](#rh-chakra-factory)
  - [Theme](#theme)
- [Layout Components](#layout-components)
- [Form Components](#form-components)
- [Data Display Components](#data-display-components)
- [Feedback Components](#feedback-components)
- [Overlay Components](#overlay-components)
- [Disclosure Components](#disclosure-components)
- [Navigation Components](#navigation-components)
- [Media Components](#media-components)
- [Typography Components](#typography-components)
- [Custom Components](#custom-components)
- [Hooks](#hooks)
- [Icons](#icons)
- [Theme Customization](#theme-customization)

---

## Installation & Setup

```bash
npm install @react/ui
```

### Basic Setup

Wrap your application with the `RhProvider` component:

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

### SSR Setup (Next.js)

For server-side rendering support:

```tsx
import { RhProvider, theme } from '@react/ui'

function App({ cookies }) {
  return (
    <RhProvider theme={theme} cookies={cookies}>
      <YourApp />
    </RhProvider>
  )
}
```

---

## Core

### RhProvider

The root provider component that wraps your application with theme and color mode support.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | The application content |
| `theme` | `Record<string, any>` | The theme configuration object |
| `cookies` | `string` | Optional. Cookie string for SSR color mode persistence |
| `environment` | `EnvironmentProviderProps['environment']` | Optional. Custom environment for portal containers |

#### Example

```tsx
import { RhProvider, theme } from '@react/ui'

function App() {
  return (
    <RhProvider theme={theme}>
      <MainLayout />
    </RhProvider>
  )
}
```

---

### rh (Chakra Factory)

The `rh` factory function allows you to create styled components with Chakra UI's style props.

#### Usage

```tsx
import { rh } from '@react/ui'

// Create styled HTML elements
const StyledDiv = () => (
  <rh.div bg="primary.500" p={4} borderRadius="md">
    Styled content
  </rh.div>
)

// With span
const StyledSpan = () => (
  <rh.span color="gray.600" fontSize="sm">
    Inline text
  </rh.span>
)
```

#### Available Exports

| Export | Description |
|--------|-------------|
| `rh` | Chakra factory for creating styled components |
| `As` | Type for polymorphic component prop |
| `HTMLRhProps` | HTML props with Chakra style props |
| `DarkMode` | Force dark mode wrapper |
| `ThemeProvider` | Theme context provider |
| `useStyleConfig` | Hook to access component style configs |

---

### Theme

The design system provides a complete theme with colors, typography, spacing, and component styles.

#### Importing the Theme

```tsx
import { theme } from '@react/ui'
```

#### Color Palette

```tsx
// Primary colors (purple)
primary: {
  25: '#FCFAFF',
  50: '#F9F5FF',
  100: '#F4EBFF',
  200: '#E9D7FE',
  300: '#D7AFEA',
  400: '#B562DB',
  500: '#B540EC',
  600: '#9425C9',
  700: '#631487',
  800: '#50106E',
  900: '#340B47'
}

// Semantic colors
success: { 25-900 }  // Green shades
warning: { 25-900 }  // Orange/yellow shades
error: { 50-900 }    // Red shades

// UI colors
gray: { 25-900 }
```

#### Breakpoints

```tsx
breakpoints: {
  base: '0em',      // 0px
  sm: '30em',       // 480px
  md: '48em',       // 768px
  lg: '62em',       // 992px
  xl: '80em',       // 1280px
  '2xl': '96em'     // 1536px
}
```

---

## Layout Components

### Box

The most fundamental layout component. Renders a `div` by default.

```tsx
import { Box } from '@react/ui'

<Box bg="gray.100" p={4} borderRadius="md">
  Content
</Box>
```

### Flex

A Box with `display: flex`.

```tsx
import { Flex } from '@react/ui'

<Flex align="center" justify="space-between" gap={4}>
  <Box>Left</Box>
  <Box>Right</Box>
</Flex>
```

### Stack / HStack / VStack

Stack components for arranging children with consistent spacing.

```tsx
import { Stack, HStack, VStack } from '@react/ui'

// Vertical stack (default)
<Stack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>

// Horizontal stack
<HStack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</HStack>

// Explicit vertical stack
<VStack spacing={4} align="start">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</VStack>
```

### Grid / SimpleGrid

CSS Grid layout components.

```tsx
import { Grid, SimpleGrid } from '@react/ui'

// Basic Grid
<Grid templateColumns="repeat(3, 1fr)" gap={6}>
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</Grid>

// SimpleGrid with responsive columns
<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</SimpleGrid>
```

### Center

Centers its child both horizontally and vertically.

```tsx
import { Center } from '@react/ui'

<Center h="100px" bg="gray.100">
  Centered content
</Center>
```

### Container

Constrained-width container with responsive padding.

```tsx
import { Container } from '@react/ui'

<Container maxW="container.xl">
  Page content
</Container>
```

### Wrap

Wraps children and applies spacing between them.

```tsx
import { Wrap } from '@react/ui'

<Wrap spacing={4}>
  <Box>Tag 1</Box>
  <Box>Tag 2</Box>
  <Box>Tag 3</Box>
</Wrap>
```

### Divider

A visual separator.

```tsx
import { Divider } from '@react/ui'

<Divider my={4} />
<Divider orientation="vertical" h="40px" />
```

### AspectRatio

Maintains a specific aspect ratio.

```tsx
import { AspectRatio } from '@react/ui'

<AspectRatio ratio={16 / 9}>
  <Image src="video-thumbnail.jpg" alt="Video" />
</AspectRatio>
```

### Square / Circle

Fixed-dimension containers.

```tsx
import { Square, Circle } from '@react/ui'

<Square size="40px" bg="primary.500">
  A
</Square>

<Circle size="40px" bg="green.500">
  ✓
</Circle>
```

---

## Form Components

### Button

Interactive button component with multiple variants and states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'link' \| 'unstyled' \| 'primary' \| 'secondary'` | `'solid'` | Button style variant |
| `colorScheme` | `string` | `'gray'` | Color scheme |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `isLoading` | `boolean` | `false` | Shows loading spinner |
| `loadingText` | `string` | - | Text shown during loading |
| `isDisabled` | `boolean` | `false` | Disables the button |
| `leftIcon` | `ReactElement` | - | Icon before text |
| `rightIcon` | `ReactElement` | - | Icon after text |

#### Examples

```tsx
import { Button, ButtonGroup } from '@react/ui'

// Basic
<Button colorScheme="primary">Click me</Button>

// Variants
<Button variant="solid" colorScheme="primary">Solid</Button>
<Button variant="outline" colorScheme="primary">Outline</Button>
<Button variant="ghost" colorScheme="primary">Ghost</Button>
<Button variant="link" colorScheme="primary">Link</Button>

// With icons
<Button leftIcon={<EmailIcon />} colorScheme="teal">
  Send Email
</Button>

// Loading state
<Button isLoading loadingText="Submitting...">
  Submit
</Button>

// Button group
<ButtonGroup variant="outline" spacing={4}>
  <Button>Save</Button>
  <Button>Cancel</Button>
</ButtonGroup>
```

### Input

Text input component.

```tsx
import { 
  Input, 
  InputGroup, 
  InputLeftElement, 
  InputRightElement,
  InputLeftAddon,
  InputRightAddon 
} from '@react/ui'

// Basic
<Input placeholder="Enter text" />

// With addons
<InputGroup>
  <InputLeftAddon>https://</InputLeftAddon>
  <Input placeholder="website.com" />
</InputGroup>

// With elements
<InputGroup>
  <InputLeftElement>
    <SearchIcon />
  </InputLeftElement>
  <Input placeholder="Search..." />
</InputGroup>
```

### Select

Dropdown select component.

```tsx
import { Select } from '@react/ui'

<Select placeholder="Select option">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Select>
```

### Checkbox

Checkbox input component.

```tsx
import { Checkbox } from '@react/ui'

<Checkbox defaultChecked>Remember me</Checkbox>
<Checkbox isDisabled>Disabled option</Checkbox>
```

### Radio

Radio button group.

```tsx
import { Radio } from '@react/ui'

<Radio value="1">Option 1</Radio>
<Radio value="2">Option 2</Radio>
```

### Switch

Toggle switch component.

```tsx
import { Switch } from '@react/ui'

<Switch colorScheme="primary" />
<Switch isChecked onChange={handleChange} />
```

### Textarea

Multi-line text input.

```tsx
import { Textarea } from '@react/ui'

<Textarea placeholder="Enter description..." rows={4} />
```

### NumberInput

Numeric input with increment/decrement controls.

```tsx
import { NumberInput } from '@react/ui'

<NumberInput defaultValue={15} min={0} max={100} />
```

### Slider

Range slider component.

```tsx
import { Slider } from '@react/ui'

<Slider defaultValue={30} min={0} max={100} />
```

### FormControl

Form field wrapper with label, helper text, and error handling.

```tsx
import { 
  FormControl, 
  FormLabel, 
  FormHelperText, 
  FormErrorMessage,
  Input 
} from '@react/ui'

<FormControl isInvalid={hasError}>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormHelperText>We'll never share your email.</FormHelperText>
  <FormErrorMessage>Email is required.</FormErrorMessage>
</FormControl>
```

### FormField

A pre-built form field component with react-hook-form integration.

```tsx
import { FormField, Input } from '@react/ui'

// Used within a react-hook-form FormProvider
<FormField name="email" label="Email Address" helper="Enter your work email">
  <Input type="email" {...register('email')} />
</FormField>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Field name (matches form state) |
| `label` | `string` | Field label |
| `helper` | `string` | Helper text shown below input |
| `children` | `ReactNode` | The input element |
| `disabledHelpText` | `string` | Tooltip shown when disabled |
| `optional` | `boolean` | Shows "(optional)" in label |

---

## Data Display Components

### Card

Container component for grouping related content.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@react/ui'

<Card>
  <CardHeader>
    <Heading size="md">Card Title</Heading>
  </CardHeader>
  <CardBody>
    <Text>Card content goes here</Text>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Table

Data table components.

```tsx
import { 
  Table, 
  TableContainer,
  Thead, 
  Tbody, 
  Tfoot,
  Tr, 
  Th, 
  Td, 
  TableCaption 
} from '@react/ui'

<TableContainer>
  <Table variant="simple">
    <TableCaption>Monthly Sales</TableCaption>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Product A</Td>
        <Td isNumeric>$100</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
```

### DataTable

Advanced data table with sorting support using TanStack Table.

```tsx
import { DataTable } from '@react/ui'
import { createColumnHelper } from '@tanstack/react-table'

type User = {
  name: string
  email: string
  age: number
}

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('email', {
    header: 'Email'
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    meta: { isNumeric: true }
  })
]

<DataTable
  data={users}
  columns={columns}
  variant="striped"
  colorScheme="gray"
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | Array of data objects |
| `columns` | `ColumnDef<T>[]` | TanStack Table column definitions |
| `variant` | `string` | Table variant style |
| `colorScheme` | `string` | Color scheme for the table |

### Badge

Small status indicator.

```tsx
import { Badge } from '@react/ui'

<Badge colorScheme="green">Active</Badge>
<Badge colorScheme="red">Inactive</Badge>
<Badge variant="outline" colorScheme="purple">New</Badge>
```

### Tag

Label component with optional close button.

```tsx
import { Tag } from '@react/ui'

<Tag colorScheme="blue">React</Tag>
<Tag colorScheme="green" size="lg">TypeScript</Tag>
```

### List

Ordered and unordered lists.

```tsx
import { List } from '@react/ui'

<List>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>
```

### Code

Inline code display.

```tsx
import { Code } from '@react/ui'

<Code>npm install @react/ui</Code>
```

### Stat / StatCard

Statistics display components.

```tsx
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@react/ui'

<Stat>
  <StatLabel>Revenue</StatLabel>
  <StatNumber>$350,000</StatNumber>
  <StatHelpText>
    <StatArrow type="increase" />
    23.5%
  </StatHelpText>
</Stat>
```

#### StatCard

Pre-built statistics card with "View All" action.

```tsx
import { StatCard } from '@react/ui'

<StatCard
  title="Total Users"
  stat={1250}
  helpText="12% increase"
  arrowType="increase"
  to="/users"
/>
```

##### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Stat label |
| `stat` | `number` | The numeric value |
| `helpText` | `string` | Additional context |
| `arrowType` | `'increase' \| 'decrease'` | Trend indicator |
| `to` | `string` | Link URL for "View All" |
| `onClick` | `() => void` | Click handler alternative |
| `noFooter` | `boolean` | Hide the footer section |

---

## Feedback Components

### Alert

Contextual feedback messages.

```tsx
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@react/ui'

<Alert status="success">
  <AlertIcon />
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your data has been saved.</AlertDescription>
</Alert>

// Status variants: success, error, warning, info
```

### BannerAlert

Full-width alert banner with optional icon and action.

```tsx
import { BannerAlert } from '@react/ui'
import { MdWarning } from 'react-icons/md'

<BannerAlert icon={MdWarning} rightElement={<Button size="sm">Fix</Button>}>
  Your subscription expires in 3 days.
</BannerAlert>
```

### InfoAlert

Informational alert with dismissible action.

```tsx
import { InfoAlert } from '@react/ui'

<InfoAlert title="Welcome!" onClick={handleDismiss}>
  Here's some helpful information about using the platform.
</InfoAlert>
```

### Loader

Centered loading spinner.

```tsx
import { Loader } from '@react/ui'

<Loader size="lg" color="primary.600" />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Spinner size |
| `color` | `string` | `'primary.600'` | Spinner color |
| `thickness` | `string` | `'4px'` | Spinner thickness |
| `speed` | `string` | `'0.65s'` | Animation speed |
| `minH` | `string` | `'25vh'` | Minimum container height |

### Spinner

Basic spinner component.

```tsx
import { Spinner } from '@react/ui'

<Spinner size="xl" color="primary.500" />
```

### Skeleton

Loading placeholder.

```tsx
import { Skeleton } from '@react/ui'

<Skeleton height="20px" />
<Skeleton height="40px" width="200px" />
```

### Tooltip

Hover information popup.

```tsx
import { Tooltip } from '@react/ui'

<Tooltip label="Click to save">
  <Button>Save</Button>
</Tooltip>
```

### ErrorFallback

Error boundary fallback component.

```tsx
import { ErrorFallback } from '@react/ui'

<ErrorFallback 
  error={{ message: 'Something went wrong' }}
  resetErrorBoundary={handleReset}
/>
```

---

## Overlay Components

### Modal

Dialog overlay component.

```tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure
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
          <ModalBody>
            Modal content goes here
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
```

### Drawer

Slide-out panel component.

```tsx
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton
} from '@react/ui'

<Drawer isOpen={isOpen} onClose={onClose} placement="right">
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Drawer Title</DrawerHeader>
    <DrawerBody>
      Drawer content
    </DrawerBody>
    <DrawerFooter>
      <Button onClick={onClose}>Close</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### DrawerForm

Pre-built drawer with form layout.

```tsx
import { DrawerForm } from '@react/ui'

<DrawerForm
  header="Add New Item"
  description="Fill in the details below"
  onClose={handleClose}
  footer={
    <Button type="submit" colorScheme="primary">
      Save
    </Button>
  }
>
  <FormControl>
    <FormLabel>Name</FormLabel>
    <Input name="name" />
  </FormControl>
</DrawerForm>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `header` | `string` | Drawer title |
| `description` | `string` | Subtitle/description |
| `children` | `ReactNode` | Form content |
| `footer` | `ReactNode` | Footer actions |
| `loading` | `boolean` | Shows loading state |
| `onClose` | `() => void` | Close handler |
| `onCloseComplete` | `() => void` | Called after close animation |
| `fetcherForm` | `typeof Form` | Custom form component |
| `action` | `string` | Form action URL |
| `success` | `ReactNode` | Success state content |

### AlertDialog

Confirmation dialog.

```tsx
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton
} from '@react/ui'

<AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
  <AlertDialogOverlay />
  <AlertDialogContent>
    <AlertDialogHeader>Delete Item?</AlertDialogHeader>
    <AlertDialogBody>
      This action cannot be undone.
    </AlertDialogBody>
    <AlertDialogFooter>
      <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
      <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Menu

Dropdown menu component.

```tsx
import { Menu } from '@react/ui'

<Menu>
  <MenuButton as={Button}>Actions</MenuButton>
  <MenuList>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </MenuList>
</Menu>
```

---

## Disclosure Components

### Accordion

Collapsible content sections.

```tsx
import { Accordion } from '@react/ui'

<Accordion allowMultiple>
  <AccordionItem>
    <AccordionButton>
      <Box flex="1">Section 1</Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      Content for section 1
    </AccordionPanel>
  </AccordionItem>
</Accordion>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `allowMultiple` | `boolean` | Allow multiple panels open |
| `allowToggle` | `boolean` | Allow closing all panels |
| `defaultIndex` | `number \| number[]` | Initially open panels |
| `reduceMotion` | `boolean` | Disable animations |

### Tabs

Tabbed interface component.

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator } from '@react/ui'

<Tabs>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>
  <TabIndicator />
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
    <TabPanel>Content 3</TabPanel>
  </TabPanels>
</Tabs>
```

---

## Navigation Components

### Breadcrumb

Navigation breadcrumbs.

```tsx
import { Breadcrumb } from '@react/ui'

<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Details</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

### Stepper

Multi-step progress indicator.

```tsx
import { 
  Stepper, 
  Step, 
  StepIndicator, 
  StepStatus, 
  StepIcon,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps 
} from '@react/ui'

const steps = [
  { title: 'First', description: 'Contact Info' },
  { title: 'Second', description: 'Date & Time' },
  { title: 'Third', description: 'Select Rooms' }
]

function StepperExample() {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length
  })

  return (
    <Stepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}
```

### Pagination

Page navigation component.

```tsx
import { Pagination } from '@react/ui'

<Pagination
  currentPage={currentPage}
  totalPages={10}
  handlePageChange={(newPage) => setCurrentPage(newPage)}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | `number` | Current page index (0-based) |
| `totalPages` | `number` | Total number of pages |
| `handlePageChange` | `(page: number) => void` | Page change handler |
| `scrollContainerId` | `string` | Container to scroll on page change |

### Link

Styled anchor component.

```tsx
import { Link } from '@react/ui'

<Link href="https://example.com" isExternal>
  External Link
</Link>

// With React Router
import { Link as RouterLink } from 'react-router-dom'

<Link as={RouterLink} to="/about">
  About Page
</Link>
```

### LinkOverlay

Makes an entire card/container clickable.

```tsx
import { LinkOverlay, LinkBox } from '@react/ui'

<LinkBox as="article" p={4} borderWidth="1px" rounded="md">
  <Heading>
    <LinkOverlay href="/article">
      Article Title
    </LinkOverlay>
  </Heading>
  <Text>Article preview...</Text>
</LinkBox>
```

### SideNav

Responsive sidebar navigation.

```tsx
import { SideNav } from '@react/ui'

<SideNav
  userProfile={user}
  numOpcos={5}
  numPersons={10}
  router={router}
  logOut={handleLogout}
/>
```

---

## Media Components

### Avatar

User avatar component.

```tsx
import { Avatar } from '@react/ui'

<Avatar name="John Doe" src="avatar.jpg" size="lg" />
<Avatar name="Jane Smith" />
```

### Image

Optimized image component.

```tsx
import { Image } from '@react/ui'

<Image
  src="photo.jpg"
  alt="Description"
  borderRadius="md"
  fallbackSrc="placeholder.jpg"
/>
```

### Icon

SVG icon component.

```tsx
import { Icon } from '@react/ui'
import { MdSettings } from 'react-icons/md'

<Icon as={MdSettings} boxSize={6} color="gray.500" />
```

### IconButton

Button with just an icon.

```tsx
import { IconButton } from '@react/ui'
import { SearchIcon } from '@react/ui'

<IconButton
  aria-label="Search"
  icon={<SearchIcon />}
  colorScheme="primary"
/>
```

---

## Typography Components

### Heading

Semantic heading component.

```tsx
import { Heading } from '@react/ui'

<Heading as="h1" size="2xl">Page Title</Heading>
<Heading as="h2" size="xl">Section Title</Heading>
<Heading as="h3" size="lg">Subsection</Heading>
```

### Text

Paragraph and inline text.

```tsx
import { Text } from '@react/ui'

<Text fontSize="lg" fontWeight="bold">Bold text</Text>
<Text color="gray.500">Muted text</Text>
<Text as="span">Inline text</Text>
```

---

## Custom Components

### AutoComplete

Searchable dropdown with async support.

```tsx
import { AutoComplete } from '@react/ui'

<AutoComplete
  options={['Option 1', 'Option 2', 'Option 3']}
  isAsync={false}
  placeholder="Search..."
  onChange={(value) => console.log(value)}
/>
```

### DatePicker

Date selection component.

```tsx
import { DatePicker } from '@react/ui'

<DatePicker
  selected={date}
  onChange={(date) => setDate(date)}
  placeholder="Select date"
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `selected` | `Date \| null` | Selected date |
| `onChange` | `(date: Date \| null) => void` | Change handler |
| `selectsRange` | `boolean` | Enable range selection |
| `selectsStart` | `boolean` | Mark as start date picker |
| `selectsEnd` | `boolean` | Mark as end date picker |
| `startDate` | `Date` | Range start date |
| `endDate` | `Date` | Range end date |
| `minDate` | `Date` | Minimum selectable date |
| `placeholder` | `string` | Input placeholder |

### CtaCard

Call-to-action card component.

```tsx
import { CtaCard } from '@react/ui'
import { MdAdd } from 'react-icons/md'

<CtaCard
  title="Start your journey"
  ctaText="Get Started"
  icon={MdAdd}
  to="/onboarding"
  bgColor="primary.50"
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Card title |
| `ctaText` | `string` | Button text |
| `icon` | `As` | Icon component |
| `helpText` | `string` | Additional help text |
| `to` | `string` | Router link destination |
| `href` | `string` | External link URL |
| `onClick` | `() => void` | Click handler |
| `ctaVariant` | `string` | Button variant |
| `ctaColorScheme` | `string` | Button color scheme |
| `bgColor` | `string` | Card background color |

### FilterBox

Container for filter controls.

```tsx
import { FilterBox } from '@react/ui'

<FilterBox title="Filters" description="Narrow down your results">
  <Select placeholder="Category">
    <option>All</option>
  </Select>
</FilterBox>
```

### DetailsCard

Card for displaying detailed information.

```tsx
import { DetailsCard } from '@react/ui'

<DetailsCard>
  <DetailsCardHeader>
    <Heading size="md">User Details</Heading>
  </DetailsCardHeader>
  <DetailsCardBody>
    <DetailsCardRow label="Name" value="John Doe" />
    <DetailsCardRow label="Email" value="john@example.com" />
  </DetailsCardBody>
</DetailsCard>
```

### ColorModeToggle

Light/dark mode toggle button.

```tsx
import { ColorModeToggle } from '@react/ui'

<ColorModeToggle />
```

### BackButton

Navigation back button.

```tsx
import { BackButton } from '@react/ui'

<BackButton to="/list" label="Back to List" />
```

### HelperText

Contextual help text.

```tsx
import { HelperText } from '@react/ui'

<HelperText>This field is optional</HelperText>
```

### Page

Page layout container.

```tsx
import { Page } from '@react/ui'

<Page>
  <Heading>Page Title</Heading>
  <Text>Page content...</Text>
</Page>
```

### SectionHeader

Section title with optional actions.

```tsx
import { SectionHeader } from '@react/ui'

<SectionHeader
  title="Recent Activity"
  action={<Button size="sm">View All</Button>}
/>
```

### ShadowBox

Elevated container with shadow.

```tsx
import { ShadowBox } from '@react/ui'

<ShadowBox>
  Elevated content
</ShadowBox>
```

---

## Hooks

### useDisclosure

Hook for managing open/close state of modals, drawers, etc.

```tsx
import { useDisclosure } from '@react/ui'

function Example() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* Modal content */}
      </Modal>
    </>
  )
}
```

#### Options

| Option | Type | Description |
|--------|------|-------------|
| `isOpen` | `boolean` | Controlled open state |
| `defaultIsOpen` | `boolean` | Initial open state |
| `onOpen` | `() => void` | Called when opened |
| `onClose` | `() => void` | Called when closed |
| `id` | `string` | Custom ID for accessibility |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `isOpen` | `boolean` | Current open state |
| `onOpen` | `() => void` | Open handler |
| `onClose` | `() => void` | Close handler |
| `onToggle` | `() => void` | Toggle handler |
| `isControlled` | `boolean` | Whether state is controlled |
| `getButtonProps` | `(props?) => HTMLProps` | Props for trigger button |
| `getDisclosureProps` | `(props?) => HTMLProps` | Props for disclosure content |

### useBreakpoint

Hook for responsive breakpoint detection.

```tsx
import { useBreakpoint } from '@react/ui'

function ResponsiveComponent() {
  const breakpoint = useBreakpoint()

  return (
    <Text>Current breakpoint: {breakpoint}</Text>
  )
}
```

### useTheme

Hook for accessing the theme object.

```tsx
import { useTheme } from '@react/ui'

function ThemedComponent() {
  const theme = useTheme()

  return (
    <Box bg={theme.colors.primary[500]}>
      Themed content
    </Box>
  )
}
```

---

## Icons

The library includes a comprehensive set of icons:

```tsx
import {
  // Navigation
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  
  // Actions
  AddIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  CopyIcon,
  DownloadIcon,
  SearchIcon,
  SettingsIcon,
  
  // Status
  CheckIcon,
  CheckCircleIcon,
  WarningIcon,
  InfoIcon,
  QuestionIcon,
  
  // Media
  ViewIcon,
  ViewOffIcon,
  AttachmentIcon,
  LinkIcon,
  ExternalLinkIcon,
  
  // Communication
  EmailIcon,
  PhoneIcon,
  ChatIcon,
  BellIcon,
  
  // UI
  HamburgerIcon,
  DragHandleIcon,
  LockIcon,
  UnlockIcon,
  StarIcon,
  TimeIcon,
  CalendarIcon,
  
  // Misc
  MoonIcon,
  SunIcon,
  SpinnerIcon,
  RepeatIcon,
  TriangleDownIcon,
  TriangleUpIcon
} from '@react/ui'
```

### Usage

```tsx
import { Icon, SearchIcon, AddIcon } from '@react/ui'

<SearchIcon boxSize={6} color="gray.500" />
<AddIcon w={4} h={4} />
```

---

## Theme Customization

### Extending the Theme

```tsx
import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@react/ui'

const customTheme = extendTheme({
  colors: {
    primary: {
      500: '#your-color',
      600: '#your-hover-color'
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold'
      }
    }
  }
}, baseTheme)

<RhProvider theme={customTheme}>
  <App />
</RhProvider>
```

### Semantic Tokens

The theme includes semantic tokens for consistent styling:

```tsx
// Colors
semanticTokens: {
  colors: {
    'bg-canvas': { default: 'gray.50', _dark: 'gray.900' },
    'bg-surface': { default: 'white', _dark: 'gray.800' },
    'bg-subtle': { default: 'gray.100', _dark: 'gray.700' },
    'text-default': { default: 'gray.900', _dark: 'white' },
    'text-muted': { default: 'gray.500', _dark: 'gray.400' }
  }
}
```

### Component Variants

Available button variants:
- `solid` - Filled background
- `outline` - Border only
- `ghost` - Transparent with hover
- `link` - Text link style
- `unstyled` - No styling
- `primary` - Primary color solid
- `secondary` - Gray outline
- `primary-on-accent` - For use on colored backgrounds
- `secondary-on-accent` - For use on colored backgrounds
- `ghost-on-accent` - Ghost style on colored backgrounds

---

## Best Practices

### 1. Always wrap your app with RhProvider

```tsx
import { RhProvider, theme } from '@react/ui'

function App() {
  return (
    <RhProvider theme={theme}>
      {/* Your app */}
    </RhProvider>
  )
}
```

### 2. Use responsive props

```tsx
<Box
  w={{ base: '100%', md: '50%', lg: '33%' }}
  p={{ base: 4, md: 6, lg: 8 }}
>
  Responsive content
</Box>
```

### 3. Leverage color schemes

```tsx
<Button colorScheme="primary">Primary action</Button>
<Button colorScheme="gray" variant="outline">Secondary</Button>
<Button colorScheme="red">Destructive</Button>
```

### 4. Use Stack components for consistent spacing

```tsx
<VStack spacing={4} align="stretch">
  <Input placeholder="Name" />
  <Input placeholder="Email" />
  <Button>Submit</Button>
</VStack>
```

### 5. Implement proper form handling

```tsx
import { FormControl, FormLabel, FormErrorMessage, Input } from '@react/ui'

<FormControl isInvalid={!!errors.email}>
  <FormLabel>Email</FormLabel>
  <Input {...register('email')} />
  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
</FormControl>
```

---

## TypeScript Support

All components are fully typed. Import types alongside components:

```tsx
import { 
  type ButtonProps, 
  type CardProps, 
  type InputProps,
  type BoxProps,
  Button, 
  Card 
} from '@react/ui'

interface MyButtonProps extends ButtonProps {
  customProp?: string
}
```

---

## License

MIT
