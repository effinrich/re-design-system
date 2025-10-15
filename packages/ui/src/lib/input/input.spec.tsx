import {
  mocks,
  render,
  screen,
  testA11y
} from '@redesignhealth/shared-utils-jest'

import { Input, InputGroup, InputLeftElement, InputRightElement, InputLeftAddon, InputRightAddon } from './input'

describe('Input', () => {
  mocks.matchMedia('any', false)

  test('passes a11y test', async () => {
    await testA11y(<Input />, {
      axeOptions: {
        rules: {
          label: { enabled: false }
        }
      }
    })
  })

  test('Elements inside input render correctly', () => {
    render(
      <InputGroup>
        <InputLeftElement>
          <span>Hello</span>
        </InputLeftElement>
        <Input />
        <InputRightElement>
          <span>World</span>
        </InputRightElement>
      </InputGroup>
    )
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('World')).toBeInTheDocument()
  })

  test('Invalid input renders correctly', () => {
    render(<Input isInvalid />)

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  test('Disabled input renders correctly', () => {
    render(<Input isDisabled />)

    expect(screen.getByRole('textbox')).toHaveAttribute('disabled')
  })

  test('Readonly input renders correctly', () => {
    render(<Input isReadOnly />)

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-readonly', 'true')
  })

  test('Input with native size renders correctly', () => {
    render(<Input htmlSize={4} />)

    expect(screen.getByRole('textbox')).toHaveAttribute('size', '4')
  })

  test('handles user typing', async () => {
    const { user } = render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')

    await user.type(input, 'Hello World')

    expect(input).toHaveValue('Hello World')
  })

  test('calls onChange handler when value changes', async () => {
    const handleChange = jest.fn()
    const { user } = render(<Input onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'test')

    expect(handleChange).toHaveBeenCalled()
  })

  test('calls onFocus handler when input is focused', async () => {
    const handleFocus = jest.fn()
    const { user } = render(<Input onFocus={handleFocus} />)

    const input = screen.getByRole('textbox')
    await user.click(input)

    expect(handleFocus).toHaveBeenCalledTimes(1)
  })

  test('calls onBlur handler when input loses focus', async () => {
    const handleBlur = jest.fn()
    const { user } = render(
      <>
        <Input onBlur={handleBlur} />
        <button>Other element</button>
      </>
    )

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.click(screen.getByRole('button'))

    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  test('renders with placeholder', () => {
    render(<Input placeholder="Enter your name" />)

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  test('renders with default value', () => {
    render(<Input defaultValue="Default text" />)

    expect(screen.getByRole('textbox')).toHaveValue('Default text')
  })

  test('renders with different types', () => {
    const { rerender } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" />)
    expect(screen.getByLabelText('password')).toHaveAttribute('type', 'password')

    rerender(<Input type="number" />)
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number')
  })

  test('renders with input addons', () => {
    render(
      <InputGroup>
        <InputLeftAddon>https://</InputLeftAddon>
        <Input />
        <InputRightAddon>.com</InputRightAddon>
      </InputGroup>
    )

    expect(screen.getByText('https://')).toBeInTheDocument()
    expect(screen.getByText('.com')).toBeInTheDocument()
  })

  test('can be cleared', async () => {
    const { user } = render(<Input defaultValue="Clear me" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.clear(input)

    expect(input).toHaveValue('')
  })

  test('respects maxLength attribute', async () => {
    const { user } = render(<Input maxLength={5} />)
    const input = screen.getByRole('textbox')

    await user.type(input, '1234567890')

    expect(input).toHaveValue('12345')
  })

  test('applies custom className', () => {
    render(<Input className="custom-input" />)

    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })
})
