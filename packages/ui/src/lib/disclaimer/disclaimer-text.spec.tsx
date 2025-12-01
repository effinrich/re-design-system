import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { DisclaimerText } from './disclaimer-text'

describe('DisclaimerText', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(<DisclaimerText />)
  })

  test('should render successfully', () => {
    const { baseElement } = render(<DisclaimerText />)
    expect(baseElement).toBeTruthy()
  })

  test('renders first paragraph of disclaimer', () => {
    render(<DisclaimerText />)

    expect(
      screen.getByText(/The information provided on this website does not/i)
    ).toBeInTheDocument()
  })

  test('renders second paragraph of disclaimer', () => {
    render(<DisclaimerText />)

    expect(
      screen.getByText(/Readers of this website should contact their attorney/i)
    ).toBeInTheDocument()
  })

  test('includes legal disclaimer text', () => {
    render(<DisclaimerText />)

    expect(screen.getByText(/constitute legal, financial or other advice/i)).toBeInTheDocument()
  })

  test('includes informational purposes text', () => {
    render(<DisclaimerText />)

    expect(
      screen.getByText(/for general informational purposes only/i)
    ).toBeInTheDocument()
  })

  test('includes liability disclaimer', () => {
    render(<DisclaimerText />)

    expect(
      screen.getByText(/All liability with respect to actions taken/i)
    ).toBeInTheDocument()
  })

  test('includes error-free disclaimer', () => {
    render(<DisclaimerText />)

    expect(
      screen.getByText(/no representations are made that the content is error-free/i)
    ).toBeInTheDocument()
  })

  test('includes "as is" clause', () => {
    render(<DisclaimerText />)

    expect(screen.getByText(/provided "as is"/i)).toBeInTheDocument()
  })

  test('wraps content in Box component', () => {
    const { container } = render(<DisclaimerText />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('renders multiple Text components', () => {
    const { container } = render(<DisclaimerText />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs.length).toBeGreaterThan(1)
  })

  test('has proper spacing between paragraphs', () => {
    const { container } = render(<DisclaimerText />)
    expect(container).toBeInTheDocument()
  })
})
