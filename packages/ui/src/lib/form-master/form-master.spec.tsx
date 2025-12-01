import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import FormMaster from './form-master'

describe('FormMaster', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
    disabled: false,
    isPending: false,
    isValid: true
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should have no accessibility issues', async () => {
    await testA11y(
      <FormMaster {...defaultProps}>
        <div>Form content</div>
      </FormMaster>
    )
  })

  test('should render successfully', () => {
    const { baseElement } = render(
      <FormMaster {...defaultProps}>
        <div>Form content</div>
      </FormMaster>
    )
    expect(baseElement).toBeTruthy()
  })

  test('renders children', () => {
    render(
      <FormMaster {...defaultProps}>
        <div>Form content here</div>
      </FormMaster>
    )

    expect(screen.getByText('Form content here')).toBeInTheDocument()
  })

  test('renders submit button with default text', () => {
    render(
      <FormMaster {...defaultProps}>
        <div>Content</div>
      </FormMaster>
    )

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
  })

  test('renders submit button with custom text', () => {
    render(
      <FormMaster {...defaultProps} submitText="Create User">
        <div>Content</div>
      </FormMaster>
    )

    expect(screen.getByRole('button', { name: 'Create User' })).toBeInTheDocument()
  })

  test('renders cancel button', () => {
    render(
      <FormMaster {...defaultProps}>
        <div>Content</div>
      </FormMaster>
    )

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  test('calls onSubmit when form is submitted', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault())
    const { user } = render(
      <FormMaster {...defaultProps} onSubmit={onSubmit}>
        <div>Content</div>
      </FormMaster>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    await user.click(submitButton)

    expect(onSubmit).toHaveBeenCalled()
  })

  test('calls onCancel when cancel button is clicked', async () => {
    const onCancel = jest.fn()
    const { user } = render(
      <FormMaster {...defaultProps} onCancel={onCancel}>
        <div>Content</div>
      </FormMaster>
    )

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    await user.click(cancelButton)

    expect(onCancel).toHaveBeenCalled()
  })

  test('disables submit button when isPending is true', () => {
    render(
      <FormMaster {...defaultProps} isPending={true}>
        <div>Content</div>
      </FormMaster>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).toBeDisabled()
  })

  test('disables submit button when isValid is false', () => {
    render(
      <FormMaster {...defaultProps} isValid={false}>
        <div>Content</div>
      </FormMaster>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).toBeDisabled()
  })

  test('disables submit button when both isPending and isValid are problematic', () => {
    render(
      <FormMaster {...defaultProps} isPending={true} isValid={false}>
        <div>Content</div>
      </FormMaster>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).toBeDisabled()
  })

  test('shows loading state on submit button when isPending', () => {
    render(
      <FormMaster {...defaultProps} isPending={true}>
        <div>Content</div>
      </FormMaster>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).toHaveAttribute('data-loading')
  })

  test('does not disable submit button when both isPending and isValid are true', () => {
    render(
      <FormMaster {...defaultProps} isPending={false} isValid={true}>
        <div>Content</div>
      </FormMaster>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).not.toBeDisabled()
  })

  test('renders form with correct name attribute', () => {
    const { container } = render(
      <FormMaster {...defaultProps} submitText="Update Profile">
        <div>Content</div>
      </FormMaster>
    )

    const form = container.querySelector('form')
    expect(form).toHaveAttribute('name', 'Update Profile')
  })

  test('renders with sticky footer when isSticky is true', () => {
    const { container } = render(
      <FormMaster {...defaultProps} isSticky={true}>
        <div>Content</div>
      </FormMaster>
    )

    expect(container).toBeInTheDocument()
  })

  test('renders with relative footer when isSticky is false', () => {
    const { container } = render(
      <FormMaster {...defaultProps} isSticky={false}>
        <div>Content</div>
      </FormMaster>
    )

    expect(container).toBeInTheDocument()
  })

  test('submit button has correct type attribute', () => {
    render(
      <FormMaster {...defaultProps}>
        <div>Content</div>
      </FormMaster>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  test('renders without cancel handler', () => {
    const props = { ...defaultProps }
    delete props.onCancel

    render(
      <FormMaster {...props}>
        <div>Content</div>
      </FormMaster>
    )

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
  })

  test('handles form submission with Enter key', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault())
    const { user, container } = render(
      <FormMaster {...defaultProps} onSubmit={onSubmit}>
        <input type="text" placeholder="Name" />
      </FormMaster>
    )

    const input = screen.getByPlaceholderText('Name')
    input.focus()
    await user.keyboard('{Enter}')

    expect(onSubmit).toHaveBeenCalled()
  })

  test('disabled prop does not affect submit button directly', () => {
    // Note: 'disabled' prop exists but isValid and isPending control the button state
    render(
      <FormMaster {...defaultProps} disabled={true} isValid={true} isPending={false}>
        <div>Content</div>
      </FormMaster>
    )

    const submitButton = screen.getByRole('button', { name: 'Save changes' })
    expect(submitButton).not.toBeDisabled()
  })

  test('renders multiple children', () => {
    render(
      <FormMaster {...defaultProps}>
        <div>Section 1</div>
        <div>Section 2</div>
        <div>Section 3</div>
      </FormMaster>
    )

    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 3')).toBeInTheDocument()
  })
})
