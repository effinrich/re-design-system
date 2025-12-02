# Quick Reference Card

A quick lookup guide for the most commonly used @react/ui components and their key props.

## Layout

### Box
```tsx
<Box bg="gray.100" p={4} borderRadius="md" shadow="sm">
  Content
</Box>
```

### Flex
```tsx
<Flex align="center" justify="space-between" gap={4}>
  <Box>Left</Box>
  <Box>Right</Box>
</Flex>
```

### Stack / HStack / VStack
```tsx
<VStack spacing={4} align="stretch">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</VStack>

<HStack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</HStack>
```

### SimpleGrid
```tsx
<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</SimpleGrid>
```

### Container
```tsx
<Container maxW="container.xl" py={8}>
  Centered content
</Container>
```

---

## Forms

### Button
| Prop | Values |
|------|--------|
| `colorScheme` | `primary`, `gray`, `red`, `green`, `blue`, `teal` |
| `variant` | `solid`, `outline`, `ghost`, `link`, `unstyled` |
| `size` | `xs`, `sm`, `md`, `lg` |
| `isLoading` | `true/false` |
| `isDisabled` | `true/false` |
| `leftIcon` | `<Icon />` |
| `rightIcon` | `<Icon />` |

```tsx
<Button 
  colorScheme="primary" 
  variant="solid" 
  size="md"
  leftIcon={<AddIcon />}
  isLoading={loading}
>
  Add Item
</Button>
```

### Input
```tsx
<InputGroup>
  <InputLeftElement><SearchIcon /></InputLeftElement>
  <Input placeholder="Search..." />
</InputGroup>
```

### Select
```tsx
<Select placeholder="Choose option">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

### Checkbox / Switch
```tsx
<Checkbox isChecked={checked} onChange={e => setChecked(e.target.checked)}>
  Remember me
</Checkbox>

<Switch colorScheme="primary" isChecked={enabled} onChange={toggle} />
```

### FormControl
```tsx
<FormControl isInvalid={!!error} isRequired>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormHelperText>We'll never share your email</FormHelperText>
  <FormErrorMessage>{error}</FormErrorMessage>
</FormControl>
```

---

## Data Display

### Card
```tsx
<Card>
  <CardHeader>
    <Heading size="md">Title</Heading>
  </CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Table
```tsx
<TableContainer>
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Item</Td>
        <Td isNumeric>$100</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
```

### Badge
```tsx
<Badge colorScheme="green">Active</Badge>
<Badge colorScheme="red" variant="outline">Urgent</Badge>
```

### StatCard
```tsx
<StatCard
  title="Total Users"
  stat={1250}
  helpText="12% increase"
  arrowType="increase"
  to="/users"
/>
```

---

## Feedback

### Alert
| Status | Usage |
|--------|-------|
| `success` | Positive confirmation |
| `error` | Error message |
| `warning` | Warning/caution |
| `info` | Informational |

```tsx
<Alert status="success">
  <AlertIcon />
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your data was saved.</AlertDescription>
</Alert>
```

### Loader
```tsx
<Loader size="lg" color="primary.600" />
```

### Skeleton
```tsx
<Skeleton height="20px" />
<SkeletonText noOfLines={4} />
```

### Tooltip
```tsx
<Tooltip label="More info" placement="top">
  <Button>Hover me</Button>
</Tooltip>
```

---

## Overlay

### Modal
```tsx
const { isOpen, onOpen, onClose } = useDisclosure()

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>Content</ModalBody>
    <ModalFooter>
      <Button onClick={onClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Drawer
```tsx
<Drawer isOpen={isOpen} onClose={onClose} placement="right">
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Title</DrawerHeader>
    <DrawerBody>Content</DrawerBody>
    <DrawerFooter>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Menu
```tsx
<Menu>
  <MenuButton as={Button}>Options</MenuButton>
  <MenuList>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </MenuList>
</Menu>
```

---

## Navigation

### Tabs
```tsx
<Tabs colorScheme="primary">
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

### Accordion
```tsx
<Accordion allowMultiple>
  <AccordionItem>
    <AccordionButton>
      <Box flex="1">Section 1</Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>Content</AccordionPanel>
  </AccordionItem>
</Accordion>
```

### Breadcrumb
```tsx
<Breadcrumb separator="/">
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Current</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

### Pagination
```tsx
<Pagination
  currentPage={page}
  totalPages={10}
  handlePageChange={setPage}
/>
```

---

## Typography

### Heading
| Size | Usage |
|------|-------|
| `2xl` | Page title |
| `xl` | Section title |
| `lg` | Subsection |
| `md` | Card title |
| `sm` | Small heading |

```tsx
<Heading as="h1" size="2xl">Page Title</Heading>
<Heading as="h2" size="lg">Section</Heading>
```

### Text
```tsx
<Text fontSize="lg" fontWeight="bold" color="gray.700">
  Important text
</Text>
<Text color="gray.500" fontSize="sm">
  Muted helper text
</Text>
```

---

## Hooks

### useDisclosure
```tsx
const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
```

### useBreakpointValue
```tsx
const isMobile = useBreakpointValue({ base: true, md: false })
```

### useColorModeValue
```tsx
const bg = useColorModeValue('white', 'gray.800')
```

---

## Responsive Props

```tsx
// Object syntax
<Box w={{ base: '100%', md: '50%', lg: '33%' }} />

// Array syntax (base, sm, md, lg, xl, 2xl)
<Box w={['100%', null, '50%', '33%']} />
```

### Breakpoints
| Name | Width |
|------|-------|
| `base` | 0px |
| `sm` | 480px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## Common Style Props

### Spacing
| Prop | CSS Property |
|------|--------------|
| `m`, `margin` | margin |
| `mt`, `marginTop` | margin-top |
| `mr`, `marginRight` | margin-right |
| `mb`, `marginBottom` | margin-bottom |
| `ml`, `marginLeft` | margin-left |
| `mx` | margin-left & margin-right |
| `my` | margin-top & margin-bottom |
| `p`, `padding` | padding |
| `pt`, `px`, `py`... | same pattern as margin |

### Sizing
| Prop | CSS Property |
|------|--------------|
| `w`, `width` | width |
| `h`, `height` | height |
| `minW`, `minWidth` | min-width |
| `maxW`, `maxWidth` | max-width |
| `minH`, `maxH` | min/max height |

### Colors
| Prop | CSS Property |
|------|--------------|
| `color` | color |
| `bg`, `background` | background |
| `borderColor` | border-color |

### Borders
| Prop | CSS Property |
|------|--------------|
| `borderWidth` | border-width |
| `borderRadius`, `rounded` | border-radius |
| `borderStyle` | border-style |

### Shadows
| Prop | Values |
|------|--------|
| `shadow`, `boxShadow` | `sm`, `md`, `lg`, `xl`, `2xl` |

---

## Color Scheme Reference

```
primary    - Purple (#9425C9)
gray       - Neutral gray
red        - Error/danger
green      - Success
blue       - Info
teal       - Alternative accent
orange     - Warning alternative
yellow     - Highlight
cyan       - Light accent
purple     - Same as primary
pink       - Decorative
```

Usage:
```tsx
<Button colorScheme="primary">Primary</Button>
<Badge colorScheme="green">Success</Badge>
<Alert status="error">Error</Alert>
```
