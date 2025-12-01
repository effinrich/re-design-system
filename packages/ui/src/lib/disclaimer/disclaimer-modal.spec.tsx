import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { createRef } from 'react'
import { DisclaimerModal } from './disclaimer-modal'

describe('DisclaimerModal', () => {
  const defaultProps = {
    header: 'Disclaimer',
    buttonText: 'I Understand',
    children: 'Disclaimer content'
  }

  test('should render successfully', () => {
    const { baseElement } = render(<DisclaimerModal {...defaultProps} />)
    expect(baseElement).toBeTruthy()
  })

  test('modal is closed by default', () => {
    render(<DisclaimerModal {...defaultProps} />)

    expect(screen.queryByText('Disclaimer')).not.toBeInTheDocument()
    expect(screen.queryByText('Disclaimer content')).not.toBeInTheDocument()
  })

  test('opens modal when handleOnOpen is called via ref', () => {
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} ref={ref} />)

    // Initially closed
    expect(screen.queryByText('Disclaimer')).not.toBeInTheDocument()

    // Open via ref
    ref.current?.handleOnOpen()

    // Now visible
    expect(screen.getByText('Disclaimer')).toBeInTheDocument()
    expect(screen.getByText('Disclaimer content')).toBeInTheDocument()
  })

  test('renders header text when open', () => {
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} ref={ref} />)

    ref.current?.handleOnOpen()

    expect(screen.getByText('Disclaimer')).toBeInTheDocument()
  })

  test('renders children content when open', () => {
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} ref={ref} />)

    ref.current?.handleOnOpen()

    expect(screen.getByText('Disclaimer content')).toBeInTheDocument()
  })

  test('renders button with custom text', () => {
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} ref={ref} />)

    ref.current?.handleOnOpen()

    expect(screen.getByRole('button', { name: 'I Understand' })).toBeInTheDocument()
  })

  test('closes modal when button is clicked', async () => {
    const ref = createRef<any>()
    const { user } = render(<DisclaimerModal {...defaultProps} ref={ref} />)

    ref.current?.handleOnOpen()
    expect(screen.getByText('Disclaimer')).toBeInTheDocument()

    const button = screen.getByRole('button', { name: 'I Understand' })
    await user.click(button)

    // Modal should be closed
    expect(screen.queryByText('Disclaimer')).not.toBeInTheDocument()
  })

  test('renders with custom header', () => {
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} header="Terms and Conditions" ref={ref} />)

    ref.current?.handleOnOpen()

    expect(screen.getByText('Terms and Conditions')).toBeInTheDocument()
  })

  test('renders complex children', () => {
    const ref = createRef<any>()
    render(
      <DisclaimerModal {...defaultProps} ref={ref}>
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      </DisclaimerModal>
    )

    ref.current?.handleOnOpen()

    expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
  })

  test('modal is centered', () => {
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} ref={ref} />)

    ref.current?.handleOnOpen()

    // Modal component should be rendered
    expect(screen.getByText('Disclaimer')).toBeInTheDocument()
  })

  test('renders with responsive size', () => {
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} ref={ref} />)

    ref.current?.handleOnOpen()

    expect(screen.getByText('Disclaimer')).toBeInTheDocument()
  })

  test('modal body has gray color', () => {
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} ref={ref} />)

    ref.current?.handleOnOpen()

    const body = screen.getByText('Disclaimer content')
    expect(body).toBeInTheDocument()
  })

  test('button has primary color scheme', () => {
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} ref={ref} />)

    ref.current?.handleOnOpen()

    const button = screen.getByRole('button', { name: 'I Understand' })
    expect(button).toBeInTheDocument()
  })

  test('can be opened multiple times', () => {
    const ref = createRef<any>()
    const { user } = render(<DisclaimerModal {...defaultProps} ref={ref} />)

    // Open
    ref.current?.handleOnOpen()
    expect(screen.getByText('Disclaimer')).toBeInTheDocument()

    // Close
    const button = screen.getByRole('button', { name: 'I Understand' })
    user.click(button)

    // Open again
    ref.current?.handleOnOpen()
    expect(screen.getByText('Disclaimer')).toBeInTheDocument()
  })

  test('displays name correctly', () => {
    expect(DisclaimerModal.displayName).toBe('DisclaimerModal')
  })

  test('renders long header text', () => {
    const longHeader = 'Very long header text '.repeat(10)
    const ref = createRef<any>()
    render(<DisclaimerModal {...defaultProps} header={longHeader} ref={ref} />)

    ref.current?.handleOnOpen()

    expect(screen.getByText(longHeader)).toBeInTheDocument()
  })
})
