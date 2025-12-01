import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { BannerAlert } from './banner-alert'
import { MdWarning } from 'react-icons/md'

describe('BannerAlert', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(<BannerAlert>Alert message</BannerAlert>)
  })

  test('should render successfully', () => {
    const { baseElement } = render(<BannerAlert>Alert message</BannerAlert>)
    expect(baseElement).toBeTruthy()
  })

  test('renders children', () => {
    render(<BannerAlert>This is an alert message</BannerAlert>)
    expect(screen.getByText('This is an alert message')).toBeInTheDocument()
  })

  test('renders with warning status by default', () => {
    const { container } = render(<BannerAlert>Warning</BannerAlert>)
    expect(container).toBeInTheDocument()
  })

  test('renders default alert icon', () => {
    render(<BannerAlert>Alert with icon</BannerAlert>)
    expect(screen.getByText('Alert with icon')).toBeInTheDocument()
  })

  test('renders custom icon when provided', () => {
    render(<BannerAlert icon={MdWarning}>Alert with custom icon</BannerAlert>)
    expect(screen.getByText('Alert with custom icon')).toBeInTheDocument()
  })

  test('renders rightElement when provided', () => {
    render(
      <BannerAlert rightElement={<button>Action</button>}>
        Alert with action
      </BannerAlert>
    )

    expect(screen.getByText('Alert with action')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  test('renders both children and rightElement', () => {
    render(
      <BannerAlert rightElement={<span>Right content</span>}>
        Left content
      </BannerAlert>
    )

    expect(screen.getByText('Left content')).toBeInTheDocument()
    expect(screen.getByText('Right content')).toBeInTheDocument()
  })

  test('accepts and applies additional Alert props', () => {
    render(
      <BannerAlert status="error" data-testid="custom-alert">
        Error alert
      </BannerAlert>
    )

    const alert = screen.getByTestId('custom-alert')
    expect(alert).toBeInTheDocument()
  })

  test('renders with different statuses', () => {
    const { rerender } = render(<BannerAlert status="info">Info</BannerAlert>)
    expect(screen.getByText('Info')).toBeInTheDocument()

    rerender(<BannerAlert status="error">Error</BannerAlert>)
    expect(screen.getByText('Error')).toBeInTheDocument()

    rerender(<BannerAlert status="success">Success</BannerAlert>)
    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  test('renders complex children', () => {
    render(
      <BannerAlert>
        <div>
          <strong>Important:</strong> <span>This is a message</span>
        </div>
      </BannerAlert>
    )

    expect(screen.getByText('Important:')).toBeInTheDocument()
    expect(screen.getByText('This is a message')).toBeInTheDocument()
  })

  test('renders multiple children', () => {
    render(
      <BannerAlert>
        <span>Part 1</span>
        <span>Part 2</span>
        <span>Part 3</span>
      </BannerAlert>
    )

    expect(screen.getByText('Part 1')).toBeInTheDocument()
    expect(screen.getByText('Part 2')).toBeInTheDocument()
    expect(screen.getByText('Part 3')).toBeInTheDocument()
  })

  test('accepts custom className', () => {
    render(<BannerAlert className="custom-class">Alert</BannerAlert>)
    expect(screen.getByText('Alert')).toBeInTheDocument()
  })
})
