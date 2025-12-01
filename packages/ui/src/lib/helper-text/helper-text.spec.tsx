import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { HelperText } from './helper-text'

describe('HelperText', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(<HelperText helpText="Helper text content" />)
  })

  test('should render successfully', () => {
    const { baseElement } = render(<HelperText helpText="Helper text" />)
    expect(baseElement).toBeTruthy()
  })

  test('renders helpText', () => {
    render(<HelperText helpText="This is helper text" />)
    expect(screen.getByText('This is helper text')).toBeInTheDocument()
  })

  test('renders with default styles', () => {
    const { container } = render(<HelperText helpText="Default styled text" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('renders link when provided', () => {
    render(
      <HelperText
        helpText="Text with link"
        link={<a href="/learn-more">Learn more</a>}
      />
    )

    expect(screen.getByText('Text with link')).toBeInTheDocument()
    expect(screen.getByText('Learn more')).toBeInTheDocument()
  })

  test('renders helpText and link together', () => {
    render(
      <HelperText
        helpText="Need help?"
        link={<a href="/support">Contact support</a>}
      />
    )

    expect(screen.getByText('Need help?')).toBeInTheDocument()
    expect(screen.getByText('Contact support')).toBeInTheDocument()
  })

  test('accepts ReactNode as helpText', () => {
    render(
      <HelperText
        helpText={
          <span>
            <strong>Bold</strong> and <em>italic</em>
          </span>
        }
      />
    )

    expect(screen.getByText('Bold')).toBeInTheDocument()
    expect(screen.getByText('italic')).toBeInTheDocument()
  })

  test('accepts ReactNode as link', () => {
    render(
      <HelperText
        helpText="Text"
        link={
          <button onClick={() => {}}>
            Click me
          </button>
        }
      />
    )

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  test('renders as span by default', () => {
    const { container } = render(<HelperText helpText="Span text" />)
    const span = container.querySelector('span')
    expect(span).toBeInTheDocument()
  })

  test('applies custom lineHeight', () => {
    const { container } = render(
      <HelperText helpText="Custom line height" lineHeight="32px" />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  test('applies custom fontSize', () => {
    const { container } = render(
      <HelperText helpText="Custom font size" fontSize="14px" />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  test('applies custom fontWeight', () => {
    const { container } = render(
      <HelperText helpText="Bold text" fontWeight="bold" />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  test('applies custom color', () => {
    const { container } = render(
      <HelperText helpText="Colored text" color="blue.500" />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  test('applies custom margin top', () => {
    const { container } = render(
      <HelperText helpText="Text with margin" mt="8px" />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  test('accepts additional Text props', () => {
    render(
      <HelperText
        helpText="Custom props"
        data-testid="helper-text"
        className="custom-class"
      />
    )

    expect(screen.getByTestId('helper-text')).toBeInTheDocument()
  })

  test('renders empty helpText', () => {
    render(<HelperText helpText="" />)
    expect(screen.queryByText('a')).not.toBeInTheDocument()
  })

  test('renders without link', () => {
    render(<HelperText helpText="Just text" />)
    expect(screen.getByText('Just text')).toBeInTheDocument()
  })

  test('handles long helpText', () => {
    const longText = 'A'.repeat(500)
    render(<HelperText helpText={longText} />)
    expect(screen.getByText(longText)).toBeInTheDocument()
  })

  test('renders helpText with special characters', () => {
    render(<HelperText helpText="Special chars: @#$%^&*()" />)
    expect(screen.getByText('Special chars: @#$%^&*()')).toBeInTheDocument()
  })
})
