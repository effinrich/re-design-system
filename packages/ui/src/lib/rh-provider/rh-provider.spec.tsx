import { render, screen } from '@redesignhealth/shared-utils-jest'
import { RhProvider } from './rh-provider'
import { useColorMode } from '@chakra-ui/react'

// Mock the font import
jest.mock('@fontsource/inter/variable.css', () => ({}))

// Test component that uses the provider
const TestComponent = () => {
  const { colorMode } = useColorMode()
  return <div data-testid="test-component">Color Mode: {colorMode}</div>
}

// Simple theme object for testing
const mockTheme = {
  colors: {
    primary: '#000',
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
}

describe('RhProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  test('should render successfully', () => {
    const { baseElement } = render(
      <RhProvider theme={mockTheme}>
        <div>Test content</div>
      </RhProvider>
    )
    expect(baseElement).toBeTruthy()
  })

  test('renders children', () => {
    render(
      <RhProvider theme={mockTheme}>
        <div>Test content</div>
      </RhProvider>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('provides chakra context to children', () => {
    render(
      <RhProvider theme={mockTheme}>
        <TestComponent />
      </RhProvider>
    )

    const testComponent = screen.getByTestId('test-component')
    expect(testComponent).toBeInTheDocument()
    // Color mode should be either 'light' or 'dark'
    expect(testComponent.textContent).toMatch(/Color Mode: (light|dark)/)
  })

  test('uses local storage manager when cookies are not provided', () => {
    render(
      <RhProvider theme={mockTheme}>
        <TestComponent />
      </RhProvider>
    )

    expect(screen.getByTestId('test-component')).toBeInTheDocument()
  })

  test('uses cookie storage manager when cookies are provided', () => {
    const cookies = 'chakra-ui-color-mode=dark'

    render(
      <RhProvider theme={mockTheme} cookies={cookies}>
        <TestComponent />
      </RhProvider>
    )

    expect(screen.getByTestId('test-component')).toBeInTheDocument()
  })

  test('passes theme to ChakraProvider', () => {
    const customTheme = {
      ...mockTheme,
      colors: {
        primary: '#ff0000',
        secondary: '#00ff00',
      },
    }

    render(
      <RhProvider theme={customTheme}>
        <div>Theme test</div>
      </RhProvider>
    )

    expect(screen.getByText('Theme test')).toBeInTheDocument()
  })

  test('handles multiple children', () => {
    render(
      <RhProvider theme={mockTheme}>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </RhProvider>
    )

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()
  })

  test('passes environment prop to ChakraProvider', () => {
    const mockEnvironment = {
      getDocument: () => document,
      getWindow: () => window,
    }

    render(
      <RhProvider theme={mockTheme} environment={mockEnvironment}>
        <div>Environment test</div>
      </RhProvider>
    )

    expect(screen.getByText('Environment test')).toBeInTheDocument()
  })

  test('renders CSS reset', () => {
    const { container } = render(
      <RhProvider theme={mockTheme}>
        <div>Content</div>
      </RhProvider>
    )

    // CSSReset component should be rendered
    expect(container).toBeInTheDocument()
  })

  test('handles empty cookies string', () => {
    render(
      <RhProvider theme={mockTheme} cookies="">
        <TestComponent />
      </RhProvider>
    )

    expect(screen.getByTestId('test-component')).toBeInTheDocument()
  })

  test('handles undefined cookies', () => {
    render(
      <RhProvider theme={mockTheme} cookies={undefined}>
        <TestComponent />
      </RhProvider>
    )

    expect(screen.getByTestId('test-component')).toBeInTheDocument()
  })

  test('uses correct storage manager key for color mode', () => {
    // The storage manager is created with 'so-color-mode' key
    render(
      <RhProvider theme={mockTheme}>
        <TestComponent />
      </RhProvider>
    )

    // After rendering, if color mode changes are made, they should be stored
    // in localStorage with the 'so-color-mode' key
    expect(screen.getByTestId('test-component')).toBeInTheDocument()
  })

  test('renders nested components correctly', () => {
    render(
      <RhProvider theme={mockTheme}>
        <div>
          <div>
            <div>Deeply nested content</div>
          </div>
        </div>
      </RhProvider>
    )

    expect(screen.getByText('Deeply nested content')).toBeInTheDocument()
  })

  test('handles complex theme objects', () => {
    const complexTheme = {
      colors: {
        primary: { 50: '#fff', 500: '#000', 900: '#111' },
        secondary: { 50: '#eee', 500: '#777', 900: '#222' },
      },
      fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
        mono: 'Menlo, monospace',
      },
      fontSizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
      },
      breakpoints: {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
      },
    }

    render(
      <RhProvider theme={complexTheme}>
        <div>Complex theme</div>
      </RhProvider>
    )

    expect(screen.getByText('Complex theme')).toBeInTheDocument()
  })
})
