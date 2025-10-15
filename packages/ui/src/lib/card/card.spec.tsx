import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'

import { Card, CardBody, CardFooter, CardHeader } from './card'

describe('Card', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(
      <Card>
        <CardHeader>Card Header</CardHeader>
        <CardBody>Card Body Content</CardBody>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )
  })

  test('renders successfully with all sections', () => {
    render(
      <Card>
        <CardHeader>Test Header</CardHeader>
        <CardBody>Test Body</CardBody>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText('Test Header')).toBeInTheDocument()
    expect(screen.getByText('Test Body')).toBeInTheDocument()
    expect(screen.getByText('Test Footer')).toBeInTheDocument()
  })

  test('renders with only body section', () => {
    render(
      <Card>
        <CardBody>Only Body Content</CardBody>
      </Card>
    )

    expect(screen.getByText('Only Body Content')).toBeInTheDocument()
  })

  test('applies custom className to Card', () => {
    const { container } = render(
      <Card className="custom-card">
        <CardBody>Content</CardBody>
      </Card>
    )

    expect(container.querySelector('.custom-card')).toBeInTheDocument()
  })
})
