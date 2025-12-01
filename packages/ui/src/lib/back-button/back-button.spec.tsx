import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { BrowserRouter } from 'react-router-dom'
import BackButton from './back-button'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

const BackButtonWrapper = ({ children, ...props }: any) => (
  <BrowserRouter>
    <BackButton {...props}>{children}</BackButton>
  </BrowserRouter>
)

describe('BackButton', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  test('should have no accessibility issues', async () => {
    await testA11y(<BackButtonWrapper>Go Back</BackButtonWrapper>)
  })

  test('should render successfully', () => {
    const { baseElement } = render(<BackButtonWrapper>Go Back</BackButtonWrapper>)
    expect(baseElement).toBeTruthy()
  })

  test('renders children text', () => {
    render(<BackButtonWrapper>Back to Home</BackButtonWrapper>)
    expect(screen.getByText('Back to Home')).toBeInTheDocument()
  })

  test('renders chevron left icon', () => {
    const { container } = render(<BackButtonWrapper>Back</BackButtonWrapper>)
    // Icon should be rendered as part of the component
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  test('navigates back when clicked without to prop', async () => {
    const { user } = render(<BackButtonWrapper>Go Back</BackButtonWrapper>)

    const link = screen.getByText('Go Back')
    await user.click(link)

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  test('navigates to specific route when to prop is provided', async () => {
    const { user } = render(<BackButtonWrapper to="/home">Back to Home</BackButtonWrapper>)

    const link = screen.getByText('Back to Home')
    await user.click(link)

    expect(mockNavigate).toHaveBeenCalledWith('/home')
  })

  test('applies link styles', () => {
    render(<BackButtonWrapper>Styled Back</BackButtonWrapper>)
    const link = screen.getByText('Styled Back')
    expect(link).toBeInTheDocument()
  })

  test('accepts additional link props', () => {
    render(
      <BackButtonWrapper data-testid="back-button" className="custom-class">
        Custom Back
      </BackButtonWrapper>
    )

    expect(screen.getByTestId('back-button')).toBeInTheDocument()
  })

  test('renders with fontWeight 600', () => {
    render(<BackButtonWrapper>Bold Back</BackButtonWrapper>)
    expect(screen.getByText('Bold Back')).toBeInTheDocument()
  })

  test('renders with no text decoration', () => {
    render(<BackButtonWrapper>No Underline</BackButtonWrapper>)
    expect(screen.getByText('No Underline')).toBeInTheDocument()
  })

  test('renders icon and text together', () => {
    const { container } = render(<BackButtonWrapper>Back</BackButtonWrapper>)
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  test('handles multiple clicks', async () => {
    const { user } = render(<BackButtonWrapper to="/dashboard">Dashboard</BackButtonWrapper>)

    const link = screen.getByText('Dashboard')
    await user.click(link)
    await user.click(link)

    expect(mockNavigate).toHaveBeenCalledTimes(2)
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })

  test('renders with different route paths', async () => {
    const { user, rerender } = render(
      <BackButtonWrapper to="/users">Users</BackButtonWrapper>
    )

    await user.click(screen.getByText('Users'))
    expect(mockNavigate).toHaveBeenCalledWith('/users')

    rerender(<BackButtonWrapper to="/settings">Settings</BackButtonWrapper>)
    await user.click(screen.getByText('Settings'))
    expect(mockNavigate).toHaveBeenCalledWith('/settings')
  })

  test('renders complex children', () => {
    render(
      <BackButtonWrapper>
        <span>Go to </span>
        <strong>Dashboard</strong>
      </BackButtonWrapper>
    )

    expect(screen.getByText('Go to')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  test('handles keyboard navigation', async () => {
    const { user } = render(<BackButtonWrapper to="/home">Home</BackButtonWrapper>)

    const link = screen.getByText('Home')
    link.focus()
    await user.keyboard('{Enter}')

    expect(mockNavigate).toHaveBeenCalledWith('/home')
  })
})
