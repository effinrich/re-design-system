import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { DisclaimerBox } from './disclaimer-box'

describe('DisclaimerBox', () => {
  const defaultProps = {
    title: 'Important Notice',
    isFirstVisit: true,
    onClickAlert: jest.fn(),
    children: 'This is the disclaimer content'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should have no accessibility issues when isFirstVisit is true', async () => {
    await testA11y(<DisclaimerBox {...defaultProps} />)
  })

  test('should render successfully', () => {
    const { baseElement } = render(<DisclaimerBox {...defaultProps} />)
    expect(baseElement).toBeTruthy()
  })

  test('renders InfoAlert when isFirstVisit is true', () => {
    render(<DisclaimerBox {...defaultProps} />)

    expect(screen.getByText('Important Notice')).toBeInTheDocument()
    expect(screen.getByText('This is the disclaimer content')).toBeInTheDocument()
  })

  test('does not render InfoAlert when isFirstVisit is false', () => {
    render(<DisclaimerBox {...defaultProps} isFirstVisit={false} />)

    expect(screen.queryByText('Important Notice')).not.toBeInTheDocument()
    expect(screen.queryByText('This is the disclaimer content')).not.toBeInTheDocument()
  })

  test('does not render InfoAlert when isFirstVisit is undefined', () => {
    render(<DisclaimerBox {...defaultProps} isFirstVisit={undefined} />)

    expect(screen.queryByText('Important Notice')).not.toBeInTheDocument()
  })

  test('renders with custom title', () => {
    render(<DisclaimerBox {...defaultProps} title="Custom Title" />)

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  test('renders children content', () => {
    render(
      <DisclaimerBox {...defaultProps}>
        <div>Custom disclaimer text</div>
      </DisclaimerBox>
    )

    expect(screen.getByText('Custom disclaimer text')).toBeInTheDocument()
  })

  test('calls onClickAlert when InfoAlert button is clicked', async () => {
    const handleClick = jest.fn()
    const { user } = render(
      <DisclaimerBox {...defaultProps} onClickAlert={handleClick} />
    )

    const button = screen.getByRole('button', { name: 'Got it' })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders Box with full width', () => {
    const { container } = render(<DisclaimerBox {...defaultProps} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('handles complex children', () => {
    render(
      <DisclaimerBox {...defaultProps}>
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </DisclaimerBox>
    )

    expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  test('toggles visibility based on isFirstVisit change', () => {
    const { rerender } = render(<DisclaimerBox {...defaultProps} isFirstVisit={true} />)

    expect(screen.getByText('Important Notice')).toBeInTheDocument()

    rerender(<DisclaimerBox {...defaultProps} isFirstVisit={false} />)

    expect(screen.queryByText('Important Notice')).not.toBeInTheDocument()
  })

  test('renders long title', () => {
    const longTitle = 'This is a very long title that contains lots of information '.repeat(5)
    render(<DisclaimerBox {...defaultProps} title={longTitle} />)

    expect(screen.getByText(longTitle)).toBeInTheDocument()
  })

  test('renders long content', () => {
    const longContent = 'Long disclaimer content '.repeat(100)
    render(<DisclaimerBox {...defaultProps}>{longContent}</DisclaimerBox>)

    expect(screen.getByText(longContent)).toBeInTheDocument()
  })
})
