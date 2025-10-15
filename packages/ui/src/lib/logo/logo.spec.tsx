import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'

import { Logo } from './logo'

describe('Logo', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(<Logo aria-label="Company Logo" />)
  })

  test('renders successfully', () => {
    const { container } = render(<Logo />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
  })

  test('applies custom height', () => {
    const { container } = render(<Logo height="12" />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveStyle({ height: 'var(--chakra-sizes-12)' })
  })

  test('applies custom width', () => {
    const { container } = render(<Logo width="200px" />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveStyle({ width: '200px' })
  })

  test('applies custom color', () => {
    const { container } = render(<Logo color="blue.500" />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveStyle({ color: 'var(--chakra-colors-blue-500)' })
  })

  test('renders with default viewBox', () => {
    const { container } = render(<Logo />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('viewBox', '0 0 482 89')
  })

  test('applies custom className', () => {
    const { container } = render(<Logo className="custom-logo" />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveClass('custom-logo')
  })

  test('accepts aria-label for accessibility', () => {
    const { container } = render(<Logo aria-label="Redesign Health Logo" />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-label', 'Redesign Health Logo')
  })

  test('accepts additional props', () => {
    const { container } = render(<Logo data-testid="logo-svg" />)
    const svg = screen.getByTestId('logo-svg')

    expect(svg).toBeInTheDocument()
  })
})
