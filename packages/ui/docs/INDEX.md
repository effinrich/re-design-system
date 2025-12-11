# @react/ui Documentation

Welcome to the @react/ui component library documentation. This comprehensive documentation covers all aspects of the design system.

## Documentation Overview

| Document | Description |
|----------|-------------|
| [**API Reference**](./API.md) | Complete API documentation for all 75+ components, hooks, and utilities |
| [**Getting Started**](./GETTING_STARTED.md) | Installation guide, setup instructions, and first steps |
| [**Examples**](./EXAMPLES.md) | Real-world patterns and common usage examples |
| [**Quick Reference**](./QUICK_REFERENCE.md) | Cheat sheet for commonly used components and props |
| [**Theme**](./THEME.md) | Theme system documentation including colors, typography, and customization |

## Quick Links

### By Category

**Getting Started**
- [Installation](./GETTING_STARTED.md#installation)
- [Basic Setup](./GETTING_STARTED.md#basic-setup)
- [Next.js Setup](./GETTING_STARTED.md#nextjs-setup)

**Components**
- [Layout Components](./API.md#layout-components) - Box, Flex, Stack, Grid, Container
- [Form Components](./API.md#form-components) - Button, Input, Select, Checkbox
- [Data Display](./API.md#data-display-components) - Card, Table, Badge, Stat
- [Feedback](./API.md#feedback-components) - Alert, Loader, Skeleton, Tooltip
- [Overlay](./API.md#overlay-components) - Modal, Drawer, Menu, AlertDialog
- [Navigation](./API.md#navigation-components) - Breadcrumb, Tabs, Pagination

**Customization**
- [Theme Colors](./THEME.md#colors)
- [Typography](./THEME.md#typography)
- [Spacing](./THEME.md#spacing)
- [Extending the Theme](./THEME.md#customizing-the-theme)
- [Dark Mode](./THEME.md#dark-mode)

**Patterns**
- [Layout Patterns](./EXAMPLES.md#layout-patterns)
- [Form Patterns](./EXAMPLES.md#form-patterns)
- [Navigation Patterns](./EXAMPLES.md#navigation-patterns)
- [Data Display Patterns](./EXAMPLES.md#data-display-patterns)
- [Page Templates](./EXAMPLES.md#page-templates)

## Component Count by Category

| Category | Components |
|----------|------------|
| Layout | 14 |
| Forms | 15 |
| Data Display | 9 |
| Feedback | 8 |
| Overlay | 5 |
| Disclosure | 2 |
| Navigation | 7 |
| Media | 4 |
| Typography | 2 |
| Custom | 16 |
| **Total** | **75+** |

## Storybook

For interactive component demos, run Storybook:

```bash
npm run storybook
```

## Contributing

When adding new components to the library:

1. Create the component in `src/lib/[component-name]/`
2. Export from `src/index.ts`
3. Add Storybook stories
4. Update this documentation

## Support

- Review documentation in this folder
- Check Storybook for interactive examples
- File issues on GitHub for bugs or feature requests
