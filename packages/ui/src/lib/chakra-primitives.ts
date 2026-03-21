/**
 * Direct re-exports of Chakra UI v3 primitives that have no snippet equivalent.
 *
 * Uses import-then-export pattern to avoid TS2303 (circular import alias)
 * which occurs with `export { X } from '@chakra-ui/react'` in composite projects.
 *
 * Components with v3 snippets (Accordion, Alert, Avatar, Breadcrumb, Checkbox,
 * CloseButton, Dialog, Drawer, Field, Menu, NumberInput, Radio, Select, Skeleton,
 * Slider, Stat, Steps, Switch, Tag, Tooltip) are exported from their snippet files
 * instead — see ./snippets/*.tsx
 */

// Layout
import {
  type BoxProps,
  type FlexProps,
  Box,
  Center,
  AbsoluteCenter,
  Container,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  HStack,
  VStack,
  Stack,
  StackSeparator,
  Spacer,
  Wrap,
  AspectRatio,
  Circle,
  Square,
} from '@chakra-ui/react'

export {
  type BoxProps,
  type FlexProps,
  Box,
  Center,
  AbsoluteCenter,
  Container,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  HStack,
  VStack,
  Stack,
  StackSeparator,
  Spacer,
  Wrap,
  AspectRatio,
  Circle,
  Square,
}

// Typography
import { type TextProps, Heading, Text, Badge } from '@chakra-ui/react'
export { type TextProps, Heading, Text, Badge }

// Forms (primitives only — compound components come from snippets)
import {
  type InputProps,
  Input,
  InputAddon,
  Textarea,
} from '@chakra-ui/react'
export { type InputProps, Input, InputAddon, Textarea }

// Data Display
import {
  type CardRootProps,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  List,
  ListItem,
  ListRoot,
  type ListRootProps,
  Separator,
} from '@chakra-ui/react'
export { type CardRootProps, Card, CardBody, CardHeader, CardFooter, Table, List, ListItem, ListRoot, type ListRootProps, Separator }

// Feedback
import { Spinner } from '@chakra-ui/react'
export { Spinner }

// Navigation
import { Breadcrumb, BreadcrumbItem, Tabs, Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
export { Breadcrumb, BreadcrumbItem, Tabs, Link, LinkBox, LinkOverlay }

// Media
import { Image, Icon, createIcon, IconButton } from '@chakra-ui/react'
export { Image, Icon, createIcon, IconButton }

// Other
import { VisuallyHidden, Code } from '@chakra-ui/react'
export { VisuallyHidden, Code }
