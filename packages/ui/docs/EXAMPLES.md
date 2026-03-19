# Component Examples

This document provides real-world examples and common usage patterns for @react/ui components.

## Table of Contents

- [Layout Patterns](#layout-patterns)
- [Form Patterns](#form-patterns)
- [Navigation Patterns](#navigation-patterns)
- [Data Display Patterns](#data-display-patterns)
- [Feedback Patterns](#feedback-patterns)
- [Page Templates](#page-templates)

---

## Layout Patterns

### Responsive Sidebar Layout

```tsx
import { Box, Flex, useBreakpointValue } from '@react/ui'

function SidebarLayout({ children, sidebar }) {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      {!isMobile && (
        <Box
          w="280px"
          bg="gray.50"
          borderRightWidth="1px"
          position="fixed"
          h="100vh"
          overflowY="auto"
        >
          {sidebar}
        </Box>
      )}

      {/* Main Content */}
      <Box
        ml={{ base: 0, lg: '280px' }}
        flex="1"
        p={{ base: 4, md: 8 }}
      >
        {children}
      </Box>
    </Flex>
  )
}
```

### Dashboard Grid

```tsx
import { SimpleGrid, Card, CardBody, Heading, Text, StatCard } from '@react/ui'

function DashboardStats() {
  return (
    <>
      {/* Stats Row */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard title="Total Users" stat={1250} to="/users" />
        <StatCard title="Active Sessions" stat={342} arrowType="increase" helpText="12%" />
        <StatCard title="Revenue" stat={45600} to="/revenue" />
        <StatCard title="Pending Tasks" stat={28} />
      </SimpleGrid>

      {/* Content Grid */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Recent Activity</Heading>
            {/* Activity list */}
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Quick Actions</Heading>
            {/* Actions */}
          </CardBody>
        </Card>
      </SimpleGrid>
    </>
  )
}
```

### Centered Content Container

```tsx
import { Container, VStack, Heading, Text } from '@react/ui'

function CenteredPage() {
  return (
    <Container maxW="container.md" py={16}>
      <VStack spacing={6} textAlign="center">
        <Heading size="2xl">Welcome Back</Heading>
        <Text fontSize="lg" color="gray.600">
          Pick up where you left off
        </Text>
        {/* Content */}
      </VStack>
    </Container>
  )
}
```

### Split Screen Layout

```tsx
import { Flex, Box, Image, VStack, Heading, Text, Button } from '@react/ui'

function SplitScreen() {
  return (
    <Flex minH="100vh">
      {/* Left Side - Image */}
      <Box
        display={{ base: 'none', lg: 'block' }}
        w="50%"
        bgGradient="linear(to-br, primary.500, primary.700)"
      >
        <VStack h="full" justify="center" p={12} color="white">
          <Heading size="2xl">Build Amazing Apps</Heading>
          <Text fontSize="xl">With our component library</Text>
        </VStack>
      </Box>

      {/* Right Side - Content */}
      <Box w={{ base: '100%', lg: '50%' }} p={{ base: 6, md: 12 }}>
        <VStack h="full" justify="center" maxW="400px" mx="auto" spacing={6}>
          <Heading>Sign In</Heading>
          {/* Form */}
        </VStack>
      </Box>
    </Flex>
  )
}
```

---

## Form Patterns

### Multi-Step Form

```tsx
import {
  Box,
  Button,
  HStack,
  VStack,
  Heading,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepSeparator,
  useSteps,
  FormControl,
  FormLabel,
  Input,
} from '@react/ui'

const steps = [
  { title: 'Account', fields: ['email', 'password'] },
  { title: 'Profile', fields: ['name', 'bio'] },
  { title: 'Confirm', fields: [] },
]

function MultiStepForm() {
  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <Box maxW="600px" mx="auto" py={8}>
      <Stepper index={activeStep} mb={8}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <StepTitle>{step.title}</StepTitle>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box p={6} borderWidth="1px" borderRadius="lg">
        {activeStep === 0 && (
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
          </VStack>
        )}

        {activeStep === 1 && (
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea />
            </FormControl>
          </VStack>
        )}

        {activeStep === 2 && (
          <VStack spacing={4}>
            <Heading size="md">Review your information</Heading>
            {/* Summary */}
          </VStack>
        )}

        <HStack justify="space-between" mt={8}>
          <Button
            onClick={goToPrevious}
            isDisabled={activeStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={activeStep === steps.length - 1 ? undefined : goToNext}
            colorScheme="primary"
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}
```

### Searchable Form with Filters

```tsx
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  HStack,
  FilterBox,
  SearchIcon,
} from '@react/ui'

function SearchWithFilters({ onSearch }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')

  return (
    <FilterBox title="Search & Filters" mb={6}>
      <Flex gap={4} flexWrap="wrap">
        <InputGroup flex="1" minW="250px">
          <InputLeftElement>
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>

        <Select
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          w="200px"
        >
          <option value="all">All Categories</option>
          <option value="products">Products</option>
          <option value="services">Services</option>
        </Select>

        <Select
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          w="150px"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>

        <HStack>
          <Button colorScheme="primary" onClick={onSearch}>
            Search
          </Button>
          <Button variant="outline" onClick={() => {
            setQuery('')
            setCategory('')
            setStatus('')
          }}>
            Clear
          </Button>
        </HStack>
      </Flex>
    </FilterBox>
  )
}
```

### Dynamic Form with Add/Remove Fields

```tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  VStack,
  AddIcon,
  CloseIcon,
} from '@react/ui'

function DynamicForm() {
  const [items, setItems] = useState([{ id: 1, value: '' }])

  const addItem = () => {
    setItems([...items, { id: Date.now(), value: '' }])
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: number, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, value } : item
    ))
  }

  return (
    <VStack spacing={4} align="stretch">
      {items.map((item, index) => (
        <HStack key={item.id}>
          <FormControl>
            <FormLabel>Item {index + 1}</FormLabel>
            <Input
              value={item.value}
              onChange={(e) => updateItem(item.id, e.target.value)}
              placeholder={`Enter item ${index + 1}`}
            />
          </FormControl>
          {items.length > 1 && (
            <IconButton
              aria-label="Remove item"
              icon={<CloseIcon />}
              onClick={() => removeItem(item.id)}
              colorScheme="red"
              variant="ghost"
              mt={8}
            />
          )}
        </HStack>
      ))}

      <Button
        leftIcon={<AddIcon />}
        onClick={addItem}
        variant="outline"
        alignSelf="start"
      >
        Add Item
      </Button>
    </VStack>
  )
}
```

---

## Navigation Patterns

### Header Navigation

```tsx
import {
  Box,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  HamburgerIcon,
  Logo,
} from '@react/ui'

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/projects' },
    { label: 'Team', href: '/team' },
    { label: 'Settings', href: '/settings' },
  ]

  return (
    <Box
      as="header"
      bg="white"
      borderBottomWidth="1px"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex maxW="container.xl" mx="auto" px={4} h={16} align="center">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }} ml={10}>
          {navItems.map((item) => (
            <Button key={item.href} as="a" href={item.href} variant="ghost">
              {item.label}
            </Button>
          ))}
        </HStack>

        <Flex align="center" ml="auto" gap={4}>
          {/* User Menu */}
          <Menu>
            <MenuButton>
              <Avatar size="sm" name="John Doe" />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
          />
        </Flex>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={12}>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  as="a"
                  href={item.href}
                  variant="ghost"
                  justifyContent="start"
                >
                  {item.label}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
```

### Breadcrumb Navigation

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, ChevronRightIcon } from '@react/ui'

function PageBreadcrumb({ items }) {
  return (
    <Breadcrumb separator={<ChevronRightIcon color="gray.400" />} mb={6}>
      {items.map((item, index) => (
        <BreadcrumbItem
          key={item.href}
          isCurrentPage={index === items.length - 1}
        >
          <BreadcrumbLink
            href={item.href}
            color={index === items.length - 1 ? 'gray.500' : 'primary.600'}
          >
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

// Usage
<PageBreadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Product Details', href: '/products/123' },
  ]}
/>
```

### Tab Navigation

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel, Badge, HStack } from '@react/ui'

function TabbedContent() {
  return (
    <Tabs colorScheme="primary">
      <TabList>
        <Tab>Overview</Tab>
        <Tab>
          <HStack>
            <span>Activity</span>
            <Badge colorScheme="red" borderRadius="full">5</Badge>
          </HStack>
        </Tab>
        <Tab>Settings</Tab>
        <Tab isDisabled>Archived</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>Overview content</p>
        </TabPanel>
        <TabPanel>
          <p>Activity content</p>
        </TabPanel>
        <TabPanel>
          <p>Settings content</p>
        </TabPanel>
        <TabPanel>
          <p>Archived content</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
```

---

## Data Display Patterns

### List with Actions

```tsx
import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  VStack,
  Avatar,
  Text,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from '@react/ui'
import { BsThreeDotsVertical } from 'react-icons/bs'

function UserList({ users }) {
  return (
    <Card>
      <CardBody p={0}>
        {users.map((user, index) => (
          <Box key={user.id}>
            {index > 0 && <Divider />}
            <Flex p={4} align="center" _hover={{ bg: 'gray.50' }}>
              <Avatar name={user.name} src={user.avatar} size="md" />
              
              <VStack align="start" ml={4} flex="1" spacing={0}>
                <Text fontWeight="medium">{user.name}</Text>
                <Text fontSize="sm" color="gray.500">{user.email}</Text>
              </VStack>

              <HStack spacing={4}>
                <Badge colorScheme={user.status === 'active' ? 'green' : 'gray'}>
                  {user.status}
                </Badge>
                
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<BsThreeDotsVertical />}
                    variant="ghost"
                    size="sm"
                    aria-label="Options"
                  />
                  <MenuList>
                    <MenuItem>View Profile</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem color="red.500">Remove</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Flex>
          </Box>
        ))}
      </CardBody>
    </Card>
  )
}
```

### Stats Overview

```tsx
import { SimpleGrid, Box, Text, Flex, Icon, HStack } from '@react/ui'
import { FiUsers, FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi'

const stats = [
  { label: 'Total Users', value: '12,345', icon: FiUsers, change: '+12%', color: 'blue' },
  { label: 'Revenue', value: '$45,600', icon: FiDollarSign, change: '+8%', color: 'green' },
  { label: 'Growth', value: '23.5%', icon: FiTrendingUp, change: '+2.5%', color: 'purple' },
  { label: 'Active Now', value: '573', icon: FiActivity, change: '-3%', color: 'orange' },
]

function StatsOverview() {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
      {stats.map((stat) => (
        <Box
          key={stat.label}
          bg="white"
          p={6}
          borderRadius="lg"
          borderWidth="1px"
        >
          <Flex justify="space-between" align="start">
            <Box>
              <Text color="gray.500" fontSize="sm" fontWeight="medium">
                {stat.label}
              </Text>
              <Text fontSize="2xl" fontWeight="bold" mt={2}>
                {stat.value}
              </Text>
              <HStack mt={2}>
                <Text
                  fontSize="sm"
                  color={stat.change.startsWith('+') ? 'green.500' : 'red.500'}
                >
                  {stat.change}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  vs last month
                </Text>
              </HStack>
            </Box>
            <Box
              p={3}
              bg={`${stat.color}.50`}
              borderRadius="lg"
            >
              <Icon as={stat.icon} boxSize={6} color={`${stat.color}.500`} />
            </Box>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  )
}
```

### Empty State

```tsx
import { VStack, Icon, Heading, Text, Button } from '@react/ui'
import { FiInbox } from 'react-icons/fi'

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <VStack
      py={16}
      px={8}
      spacing={6}
      textAlign="center"
      bg="gray.50"
      borderRadius="lg"
    >
      <Box
        p={4}
        bg="gray.100"
        borderRadius="full"
      >
        <Icon as={FiInbox} boxSize={10} color="gray.400" />
      </Box>
      
      <VStack spacing={2}>
        <Heading size="md">{title}</Heading>
        <Text color="gray.500" maxW="sm">
          {description}
        </Text>
      </VStack>

      {actionLabel && (
        <Button colorScheme="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </VStack>
  )
}

// Usage
<EmptyState
  title="No projects yet"
  description="Get started by creating your first project."
  actionLabel="Create Project"
  onAction={() => {}}
/>
```

### Skeleton Loading

```tsx
import { Box, Card, CardBody, Skeleton, SkeletonText, VStack, HStack } from '@react/ui'

function LoadingCard() {
  return (
    <Card>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack>
            <Skeleton borderRadius="full" boxSize="40px" />
            <VStack align="start" flex="1" spacing={2}>
              <Skeleton height="20px" width="150px" />
              <Skeleton height="16px" width="100px" />
            </VStack>
          </HStack>
          <SkeletonText noOfLines={3} spacing={2} />
          <HStack justify="end">
            <Skeleton height="32px" width="80px" />
            <Skeleton height="32px" width="80px" />
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}
```

---

## Feedback Patterns

### Toast Notifications

```tsx
import { Button, useToast } from '@react/ui'

function ToastExample() {
  const toast = useToast()

  const showSuccess = () => {
    toast({
      title: 'Success!',
      description: 'Your changes have been saved.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    })
  }

  const showError = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <HStack>
      <Button colorScheme="green" onClick={showSuccess}>
        Show Success
      </Button>
      <Button colorScheme="red" onClick={showError}>
        Show Error
      </Button>
    </HStack>
  )
}
```

### Loading Overlay

```tsx
import { Box, Flex, Spinner, Text, VStack } from '@react/ui'

function LoadingOverlay({ isLoading, children }) {
  return (
    <Box position="relative">
      {children}
      
      {isLoading && (
        <Flex
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="whiteAlpha.800"
          align="center"
          justify="center"
          zIndex={10}
        >
          <VStack>
            <Spinner size="xl" color="primary.500" thickness="4px" />
            <Text color="gray.600">Loading...</Text>
          </VStack>
        </Flex>
      )}
    </Box>
  )
}
```

### Confirmation Dialog

```tsx
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from '@react/ui'
import { useRef } from 'react'

function DeleteConfirmation({ itemName, onConfirm }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {itemName}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
```

---

## Page Templates

### Settings Page

```tsx
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Button,
  Divider,
  HStack,
} from '@react/ui'

function SettingsPage() {
  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg">Settings</Heading>
          <Text color="gray.500">Manage your account preferences</Text>
        </Box>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <Heading size="md">Profile</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input defaultValue="John Doe" />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" defaultValue="john@example.com" />
              </FormControl>
              <FormControl>
                <FormLabel>Timezone</FormLabel>
                <Select defaultValue="utc-5">
                  <option value="utc-8">Pacific Time (UTC-8)</option>
                  <option value="utc-5">Eastern Time (UTC-5)</option>
                  <option value="utc+0">UTC</option>
                </Select>
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader>
            <Heading size="md">Notifications</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="medium">Email Notifications</Text>
                  <Text fontSize="sm" color="gray.500">
                    Receive email updates about your account
                  </Text>
                </Box>
                <Switch colorScheme="primary" defaultChecked />
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="medium">Push Notifications</Text>
                  <Text fontSize="sm" color="gray.500">
                    Receive push notifications on your devices
                  </Text>
                </Box>
                <Switch colorScheme="primary" />
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Save Button */}
        <HStack justify="end">
          <Button variant="outline">Cancel</Button>
          <Button colorScheme="primary">Save Changes</Button>
        </HStack>
      </VStack>
    </Container>
  )
}
```

### List Page with Search

```tsx
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Pagination,
  SearchIcon,
  AddIcon,
} from '@react/ui'

function ListPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <Box>
            <Heading size="lg">Users</Heading>
            <Text color="gray.500">Manage your team members</Text>
          </Box>
          <Button colorScheme="primary" leftIcon={<AddIcon />}>
            Add User
          </Button>
        </HStack>

        {/* Filters */}
        <Card>
          <CardBody>
            <HStack spacing={4}>
              <InputGroup maxW="300px">
                <InputLeftElement>
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input placeholder="Search users..." />
              </InputGroup>
              <Select placeholder="Role" maxW="150px">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
              <Select placeholder="Status" maxW="150px">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </HStack>
          </CardBody>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td fontWeight="medium">{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Badge>{user.role}</Badge>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={user.status === 'active' ? 'green' : 'gray'}
                    >
                      {user.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton as={IconButton} variant="ghost" size="sm">
                        •••
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>View</MenuItem>
                        <MenuItem color="red.500">Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>

        {/* Pagination */}
        <Pagination
          currentPage={0}
          totalPages={10}
          handlePageChange={(page) => console.log(page)}
        />
      </VStack>
    </Container>
  )
}
```

---

## Utility Examples

### Responsive Visibility

```tsx
import { Box, Text } from '@react/ui'

function ResponsiveExample() {
  return (
    <>
      {/* Only visible on mobile */}
      <Box display={{ base: 'block', md: 'none' }}>
        <Text>Mobile only</Text>
      </Box>

      {/* Only visible on tablet and up */}
      <Box display={{ base: 'none', md: 'block', lg: 'none' }}>
        <Text>Tablet only</Text>
      </Box>

      {/* Only visible on desktop */}
      <Box display={{ base: 'none', lg: 'block' }}>
        <Text>Desktop only</Text>
      </Box>
    </>
  )
}
```

### Color Mode Aware Styling

```tsx
import { Box, useColorModeValue } from '@react/ui'

function ThemedComponent() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      color={textColor}
      p={4}
      borderRadius="md"
    >
      This adapts to color mode
    </Box>
  )
}
```

### Custom Component with Style Props

```tsx
import { Box, BoxProps } from '@react/ui'
import { forwardRef } from 'react'

interface CustomCardProps extends BoxProps {
  variant?: 'elevated' | 'outline'
}

const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>(
  ({ variant = 'elevated', children, ...props }, ref) => {
    const styles = {
      elevated: {
        bg: 'white',
        shadow: 'md',
        borderRadius: 'lg',
      },
      outline: {
        bg: 'transparent',
        borderWidth: '1px',
        borderColor: 'gray.200',
        borderRadius: 'lg',
      },
    }

    return (
      <Box ref={ref} p={6} {...styles[variant]} {...props}>
        {children}
      </Box>
    )
  }
)

// Usage
<CustomCard variant="elevated" mb={4}>
  Elevated card content
</CustomCard>

<CustomCard variant="outline" _hover={{ borderColor: 'primary.500' }}>
  Outline card with hover
</CustomCard>
```
