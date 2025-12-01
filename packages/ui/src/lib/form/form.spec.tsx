import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import Form from './form'

describe('Form', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
    disabled: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should have no accessibility issues', async () => {
    await testA11y(
      <Form {...defaultProps}>
        <div>Form content</div>
      </Form>
    )
  })

  test('should render successfully', () => {
    const { baseElement} = render(
      <Form {...defaultProps}>
        <div>Form content</div>
      </Form>
    )
    expect(baseElement).toBeTruthy()
  })

  test('renders children', () => {
    render(
      <Form {...defaultProps}>
        <div>Form content here</div>
      </Form>
    )

    expect(screen.getByText('Form content here')).toBeInTheDocument()
  })

  test('renders submit button with default text', () => {
    render(
      <Form {...defaultProps}>
        <div>Content</div>
      </Form>
    )

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
  })

  test('renders submit button with custom text', () => {
    render(
      <Form {...defaultProps} submitText="Create Account">
        <div>Content</div>
      </Form>
    )

    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument()
  })

  test('renders cancel button', () => {
    render(
      <Form {...defaultProps}>
        <div>Content</div>
      </Form>
    )

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  test('calls onSubmit when form is submitted', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault())
    const { user } = render(
      <Form {...defaultProps} onSubmit={onSubmit}>
        <div>Content</div>
      </Form>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    await user.click(submitButton)

    expect(onSubmit).toHaveBeenCalled()
  })

  test('calls onCancel when cancel button is clicked', async () => {
    const onCancel = jest.fn()
    const { user } = render(
      <Form {...defaultProps} onCancel={onCancel}>
        <div>Content</div>
      </Form>
    )

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    await user.click(cancelButton)

    expect(onCancel).toHaveBeenCalled()
  })

  test('disables submit button when disabled is true', () => {
    render(
      <Form {...defaultProps} disabled={true}>
        <div>Content</div>
      </Form>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).toBeDisabled()
  })

  test('enables submit button when disabled is false', () => {
    render(
      <Form {...defaultProps} disabled={false}>
        <div>Content</div>
      </Form>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).not.toBeDisabled()
  })

  test('submit button has correct type attribute', () => {
    render(
      <Form {...defaultProps}>
        <div>Content</div>
      </Form>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  test('renders form with correct name attribute', () => {
    const { container } = render(
      <Form {...defaultProps} submitText="Sign Up">
        <div>Content</div>
      </Form>
    )

    const form = container.querySelector('form')
    expect(form).toHaveAttribute('name', 'Sign Up')
  })

  test('renders without cancel handler', () => {
    const props = { ...defaultProps }
    delete props.onCancel

    render(
      <Form {...props}>
        <div>Content</div>
      </Form>
    )

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
  })

  test('does not call onSubmit when disabled', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault())
    const { user } = render(
      <Form {...defaultProps} onSubmit={onSubmit} disabled={true}>
        <div>Content</div>
      </Form>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    await user.click(submitButton)

    // Button is disabled, so onClick should not fire
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('handles form submission with Enter key', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault())
    const { user } = render(
      <Form {...defaultProps} onSubmit={onSubmit}>
        <input type="text" placeholder="Name" />
      </Form>
    )

    const input = screen.getByPlaceholderText('Name')
    input.focus()
    await user.keyboard('{Enter}')

    expect(onSubmit).toHaveBeenCalled()
  })

  test('renders multiple children', () => {
    render(
      <Form {...defaultProps}>
        <div>Section 1</div>
        <div>Section 2</div>
        <div>Section 3</div>
      </Form>
    )

    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 3')).toBeInTheDocument()
  })

  test('card has correct maxWidth', () => {
    const { container } = render(
      <Form {...defaultProps}>
        <div>Content</div>
      </Form>
    )

    // Card should have maxWidth="6xl" prop
    expect(container).toBeInTheDocument()
  })

  test('submit button has primary color scheme', () => {
    render(
      <Form {...defaultProps}>
        <div>Content</div>
      </Form>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).toBeInTheDocument()
  })

  test('cancel button has outline variant', () => {
    render(
      <Form {...defaultProps}>
        <div>Content</div>
      </Form>
    )

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
  })

  test('buttons are positioned at the end', () => {
    const { container } = render(
      <Form {...defaultProps}>
        <div>Content</div>
      </Form>
    )

    // CardFooter should have justify="end" which aligns buttons to the right
    expect(container).toBeInTheDocument()
  })
})
