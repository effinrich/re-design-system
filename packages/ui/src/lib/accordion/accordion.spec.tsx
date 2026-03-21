import {
  focus,
  render,
  screen,
  testA11y
} from '@redesignhealth/shared-utils-jest'

import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent
} from '../snippets/accordion'

test('passes a11y test', async () => {
  await testA11y(
    <AccordionRoot>
      <AccordionItem value="section-1">
        <AccordionItemTrigger>Section 1 title</AccordionItemTrigger>
        <AccordionItemContent>Panel 1</AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )
})

test('uncontrolled: It opens the accordion panel', async () => {
  render(
    <AccordionRoot defaultValue={['section-1']}>
      <AccordionItem value="section-1">
        <AccordionItemTrigger data-testid="button">
          Section 1 title
        </AccordionItemTrigger>
        <AccordionItemContent data-testid="panel">Panel 1</AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )

  expect(screen.getByTestId('button')).toHaveAttribute('aria-expanded', 'true')
})

test('uncontrolled: toggles the accordion on click', async () => {
  const { user } = render(
    <AccordionRoot collapsible>
      <AccordionItem value="section-1">
        <AccordionItemTrigger>Trigger</AccordionItemTrigger>
        <AccordionItemContent>Panel</AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )

  const trigger = screen.getByText('Trigger')

  await user.click(trigger)
  expect(trigger).toHaveAttribute('aria-expanded', 'true')

  await user.click(trigger)
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
})

test('only one accordion can be visible + is toggleable', async () => {
  const { user } = render(
    <AccordionRoot collapsible>
      <AccordionItem value="section-1">
        <AccordionItemTrigger>First section</AccordionItemTrigger>
        <AccordionItemContent>Panel 1</AccordionItemContent>
      </AccordionItem>

      <AccordionItem value="section-2">
        <AccordionItemTrigger>Second section</AccordionItemTrigger>
        <AccordionItemContent>Panel 2</AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )

  const firstAccordion = screen.getByText('First section')

  await user.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute('aria-expanded', 'true')

  await user.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute('aria-expanded', 'false')
})

test('multiple accordions can be opened + is toggleable', async () => {
  const { user } = render(
    <AccordionRoot multiple>
      <AccordionItem value="section-1">
        <AccordionItemTrigger>First section</AccordionItemTrigger>
        <AccordionItemContent>Panel 1</AccordionItemContent>
      </AccordionItem>

      <AccordionItem value="section-2">
        <AccordionItemTrigger>Second section</AccordionItemTrigger>
        <AccordionItemContent>Panel 2</AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )

  const first = screen.getByText('First section')
  const second = screen.getByText('Second section')

  await user.click(first)
  expect(first).toHaveAttribute('aria-expanded', 'true')

  await user.click(second)
  expect(first).toHaveAttribute('aria-expanded', 'true')
})
