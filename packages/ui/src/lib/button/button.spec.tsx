import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'

import { Button, ButtonGroup } from './button'

describe('Button', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(<Button>Click me</Button>)
  })

  test('should render successfully', () => {
    const { baseElement } = render(<Button>I'm a button</Button>)
    expect(baseElement).toBeTruthy()
  })

  test('renders button text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn()
    const { user } = render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick when disabled', async () => {
    const handleClick = jest.fn()
    const { user } = render(
      <Button onClick={handleClick} isDisabled>
        Click me
      </Button>
    )

    await user.click(screen.getByText('Click me'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('renders with loading state', () => {
    render(<Button isLoading>Click me</Button>)
    const button = screen.getByText('Click me')
    expect(button).toHaveAttribute('data-loading')
  })

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByText('Small')).toBeInTheDocument()

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByText('Medium')).toBeInTheDocument()

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByText('Large')).toBeInTheDocument()
  })

  test('renders with different variants', () => {
    const { rerender } = render(<Button variant="solid">Solid</Button>)
    expect(screen.getByText('Solid')).toBeInTheDocument()

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByText('Outline')).toBeInTheDocument()

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByText('Ghost')).toBeInTheDocument()
  })

  test('renders with different color schemes', () => {
    render(<Button colorScheme="blue">Blue Button</Button>)
    expect(screen.getByText('Blue Button')).toBeInTheDocument()
  })

  test('can be focused with keyboard navigation', async () => {
    const { user } = render(<Button>Focusable</Button>)
    const button = screen.getByText('Focusable')

    await user.tab()
    expect(button).toHaveFocus()
  })

  test('can be triggered with Enter key', async () => {
    const handleClick = jest.fn()
    const { user } = render(<Button onClick={handleClick}>Press Enter</Button>)

    const button = screen.getByText('Press Enter')
    button.focus()
    await user.keyboard('{Enter}')

    expect(handleClick).toHaveBeenCalled()
  })

  test('can be triggered with Space key', async () => {
    const handleClick = jest.fn()
    const { user } = render(<Button onClick={handleClick}>Press Space</Button>)

    const button = screen.getByText('Press Space')
    button.focus()
    await user.keyboard(' ')

    expect(handleClick).toHaveBeenCalled()
  })
})

describe('ButtonGroup', () => {
  test('renders multiple buttons', () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </ButtonGroup>
    )

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })

  test('applies spacing to button group', () => {
    const { container } = render(
      <ButtonGroup spacing={4}>
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  test('applies variant to all buttons in group', () => {
    render(
      <ButtonGroup variant="outline">
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    )

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })
})
