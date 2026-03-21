import {
  ChangeEvent,
  useEffect,
  useRef,
  useState
} from 'react'

import { Container, rh } from '../../index'

import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent
} from '../snippets/accordion'

export default {
  title: 'Components / Disclosure / Accordion',
  decorators: [
    (story: () => React.ReactNode) => <Container>{story()}</Container>
  ]
}

export const Basic = () => (
  <AccordionRoot collapsible>
    <AccordionItem value="section-1">
      <AccordionItemTrigger>Section 1 title</AccordionItemTrigger>
      <AccordionItemContent>Panel 1</AccordionItemContent>
    </AccordionItem>

    <AccordionItem value="section-2">
      <AccordionItemTrigger>Section 2 title</AccordionItemTrigger>
      <AccordionItemContent>Panel 2</AccordionItemContent>
    </AccordionItem>
  </AccordionRoot>
)

export const AllowToggle = () => (
  <AccordionRoot collapsible>
    <AccordionItem value="section-1">
      <AccordionItemTrigger>Section 1 title</AccordionItemTrigger>
      <AccordionItemContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionItemContent>
    </AccordionItem>

    <AccordionItem value="section-2">
      <AccordionItemTrigger>Section 2 title</AccordionItemTrigger>
      <AccordionItemContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionItemContent>
    </AccordionItem>
  </AccordionRoot>
)

export const AllowMultiple = () => (
  <AccordionRoot multiple>
    <AccordionItem value="section-1">
      <AccordionItemTrigger>Section 1 title</AccordionItemTrigger>
      <AccordionItemContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionItemContent>
    </AccordionItem>

    <AccordionItem value="section-2">
      <AccordionItemTrigger>Section 2 title</AccordionItemTrigger>
      <AccordionItemContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionItemContent>
    </AccordionItem>
  </AccordionRoot>
)

export const StylingExpanded = () => (
  <AccordionRoot collapsible>
    <AccordionItem value="section-1">
      <AccordionItemTrigger>
        Click me to see a different style
      </AccordionItemTrigger>
      <AccordionItemContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionItemContent>
    </AccordionItem>
  </AccordionRoot>
)

const data = [
  { title: 'First Item', text: 'Some value 1...' },
  { title: 'Second Item', text: 'Some value 2...' },
  { title: 'Third Item', text: 'Some value 3...' },
  { title: 'Fourth Item', text: 'Some value 4...' },
  { title: 'Fifth Item', text: 'Some value 5...' },
  { title: 'Some other text', text: 'Some value 6...' },
  { title: 'Another one', text: 'Some value 7...' }
]

export function Bug_2160() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [displayData, setDisplayData] = useState(data)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (!filter || filter === '') {
      setDisplayData(data)
    }

    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    )
    setDisplayData(filteredData)
  }, [filter])

  useEffect(() => {
    inputRef.current?.focus()
  }, [displayData])

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
  }

  return (
    <rh.div padding={4}>
      <rh.div mt={3} mb={12}>
        <rh.input
          ref={inputRef}
          value={filter}
          onChange={onInputChange}
          placeholder="Write filter for data title"
        />
      </rh.div>
      {displayData.length > 0 && (
        <AccordionRoot collapsible>
          {displayData.map((item, i) => (
            <AccordionItem key={`accordion-item-${i}`} value={`item-${i}`}>
              <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
              <AccordionItemContent>{item.text}</AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      )}
    </rh.div>
  )
}

export const WithDisabledAccordionItem = () => {
  return (
    <AccordionRoot defaultValue={['section-2']}>
      <AccordionItem value="section-1" disabled>
        <AccordionItemTrigger>Button 1</AccordionItemTrigger>
        <AccordionItemContent>One Content</AccordionItemContent>
      </AccordionItem>
      <AccordionItem value="section-2" disabled>
        <AccordionItemTrigger>Button 2</AccordionItemTrigger>
        <AccordionItemContent>Two Content</AccordionItemContent>
      </AccordionItem>
      <AccordionItem value="section-3">
        <AccordionItemTrigger>Button 3</AccordionItemTrigger>
        <AccordionItemContent>Three Content</AccordionItemContent>
      </AccordionItem>
      <AccordionItem value="section-4" disabled>
        <AccordionItemTrigger>Button 4</AccordionItemTrigger>
        <AccordionItemContent>Four Content</AccordionItemContent>
      </AccordionItem>
      <AccordionItem value="section-5">
        <AccordionItemTrigger>Button 5</AccordionItemTrigger>
        <AccordionItemContent>Five Content</AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )
}
