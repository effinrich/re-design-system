import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'

import { CustomDrawer } from './custom-drawer'

describe('CustomDrawer', () => {
  const defaultProps = {
    title: 'Test Drawer',
    children: <div>Drawer Content</div>,
    errors: {},
    isLoading: false,
    isError: false,
    handleOnSubmit: jest.fn()
  }

  test('should have no accessibility issues', async () => {
    await testA11y(<CustomDrawer {...defaultProps} />)
  })

  test('renders with title and children', () => {
    render(<CustomDrawer {...defaultProps} />)

    expect(screen.getByText('Test Drawer')).toBeInTheDocument()
    expect(screen.getByText('Drawer Content')).toBeInTheDocument()
  })

  test('renders with description when provided', () => {
    render(
      <CustomDrawer {...defaultProps} description="This is a test description" />
    )

    expect(screen.getByText('This is a test description')).toBeInTheDocument()
  })

  test('displays custom CTA text', () => {
    render(<CustomDrawer {...defaultProps} ctaText="Save Changes" />)

    expect(screen.getByText('Save Changes')).toBeInTheDocument()
  })

  test('displays default CTA text when not provided', () => {
    render(<CustomDrawer {...defaultProps} />)

    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  test('calls handleOnSubmit when submit button is clicked', async () => {
    const handleOnSubmit = jest.fn()
    const { user } = render(
      <CustomDrawer {...defaultProps} handleOnSubmit={handleOnSubmit} isValid />
    )

    const submitButton = screen.getByText('Submit')
    await user.click(submitButton)

    expect(handleOnSubmit).toHaveBeenCalledTimes(1)
  })

  test('disables submit button when isLoading is true', () => {
    render(<CustomDrawer {...defaultProps} isLoading isValid />)

    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeDisabled()
  })

  test('disables submit button when isValid is false', () => {
    render(<CustomDrawer {...defaultProps} isValid={false} />)

    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeDisabled()
  })

  test('shows loading state on submit button', () => {
    render(<CustomDrawer {...defaultProps} isLoading />)

    const submitButton = screen.getByText('Submit')
    expect(submitButton).toHaveAttribute('data-loading')
  })

  test('displays error alert when isError is true', () => {
    const errors = {
      root: {
        serverError: {
          message: 'Server error occurred'
        }
      }
    }

    render(<CustomDrawer {...defaultProps} isError errors={errors} />)

    expect(screen.getByText('Server error occurred')).toBeInTheDocument()
  })

  test('renders Cancel button', () => {
    render(<CustomDrawer {...defaultProps} />)

    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  test('disables Cancel button when loading', () => {
    render(<CustomDrawer {...defaultProps} isLoading />)

    const cancelButton = screen.getByText('Cancel')
    expect(cancelButton).toBeDisabled()
  })
})
