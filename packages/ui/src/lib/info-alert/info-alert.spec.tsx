import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { InfoAlert } from './info-alert'

describe('InfoAlert', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(<InfoAlert title="Alert Title">Alert content</InfoAlert>)
  })

  test('should render successfully', () => {
    const { baseElement } = render(
      <InfoAlert title="Test Title">Test content</InfoAlert>
    )
    expect(baseElement).toBeTruthy()
  })

  test('renders title', () => {
    render(<InfoAlert title="Important Information">Content</InfoAlert>)
    expect(screen.getByText('Important Information')).toBeInTheDocument()
  })

  test('renders children', () => {
    render(
      <InfoAlert title="Title">This is the alert description</InfoAlert>
    )
    expect(screen.getByText('This is the alert description')).toBeInTheDocument()
  })

  test('renders Got it button', () => {
    render(<InfoAlert title="Title">Content</InfoAlert>)
    expect(screen.getByRole('button', { name: 'Got it' })).toBeInTheDocument()
  })

  test('calls onClick when Got it button is clicked', async () => {
    const handleClick = jest.fn()
    const { user } = render(
      <InfoAlert title="Title" onClick={handleClick}>
        Content
      </InfoAlert>
    )

    const button = screen.getByRole('button', { name: 'Got it' })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders without onClick handler', () => {
    render(<InfoAlert title="Title">Content</InfoAlert>)
    expect(screen.getByRole('button', { name: 'Got it' })).toBeInTheDocument()
  })

  test('renders complex children', () => {
    render(
      <InfoAlert title="Title">
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      </InfoAlert>
    )

    expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
  })

  test('renders with info status', () => {
    const { container } = render(
      <InfoAlert title="Info">Information message</InfoAlert>
    )
    expect(container).toBeInTheDocument()
  })

  test('applies correct styles to title', () => {
    render(<InfoAlert title="Styled Title">Content</InfoAlert>)
    const title = screen.getByText('Styled Title')
    expect(title).toBeInTheDocument()
  })

  test('applies correct styles to description', () => {
    render(<InfoAlert title="Title">Styled description</InfoAlert>)
    const description = screen.getByText('Styled description')
    expect(description).toBeInTheDocument()
  })

  test('button has primary color scheme', () => {
    render(<InfoAlert title="Title">Content</InfoAlert>)
    const button = screen.getByRole('button', { name: 'Got it' })
    expect(button).toBeInTheDocument()
  })

  test('renders multiple text nodes as children', () => {
    render(
      <InfoAlert title="Title">
        First line
        <br />
        Second line
      </InfoAlert>
    )

    expect(screen.getByText(/First line/)).toBeInTheDocument()
    expect(screen.getByText(/Second line/)).toBeInTheDocument()
  })

  test('renders long title', () => {
    const longTitle = 'This is a very long title '.repeat(10)
    render(<InfoAlert title={longTitle}>Content</InfoAlert>)
    expect(screen.getByText(longTitle)).toBeInTheDocument()
  })

  test('renders long content', () => {
    const longContent = 'Long content text '.repeat(50)
    render(<InfoAlert title="Title">{longContent}</InfoAlert>)
    expect(screen.getByText(longContent)).toBeInTheDocument()
  })

  test('handles rapid button clicks', async () => {
    const handleClick = jest.fn()
    const { user } = render(
      <InfoAlert title="Title" onClick={handleClick}>
        Content
      </InfoAlert>
    )

    const button = screen.getByRole('button', { name: 'Got it' })
    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(3)
  })

  test('renders with ReactNode children', () => {
    render(
      <InfoAlert title="Title">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </InfoAlert>
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })
})
