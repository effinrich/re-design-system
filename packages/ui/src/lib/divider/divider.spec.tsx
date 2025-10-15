import { render, testA11y } from '@redesignhealth/shared-utils-jest'

import { Divider } from './divider'

describe('Divider', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(<Divider />)
  })

  test('should render successfully', () => {
    const { baseElement } = render(<Divider />)
    expect(baseElement).toBeTruthy()
  })

  test('renders with default horizontal orientation', () => {
    const { container } = render(<Divider />)
    const divider = container.querySelector('hr')

    expect(divider).toBeInTheDocument()
  })

  test('renders with vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" />)
    const divider = container.querySelector('hr')

    expect(divider).toBeInTheDocument()
    expect(divider).toHaveAttribute('aria-orientation', 'vertical')
  })

  test('applies custom className', () => {
    const { container } = render(<Divider className="custom-divider" />)
    const divider = container.querySelector('.custom-divider')

    expect(divider).toBeInTheDocument()
  })

  test('renders with different variant styles', () => {
    const { container } = render(<Divider variant="dashed" />)
    const divider = container.querySelector('hr')

    expect(divider).toBeInTheDocument()
  })

  test('applies custom color', () => {
    const { container } = render(<Divider borderColor="red.500" />)
    const divider = container.querySelector('hr')

    expect(divider).toBeInTheDocument()
  })
})
