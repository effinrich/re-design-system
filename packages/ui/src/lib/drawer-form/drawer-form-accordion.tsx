import { Fragment } from 'react'
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  List,
  ListItem,
  Text,
} from '@react/ui'

export interface DrawerFormAccordionProps {
  title: string
  expandedTitle?: string
  listItems: Array<{
    header?: string
    items: Array<string>
  }>
}

export const DrawerFormAccordion = (props: DrawerFormAccordionProps) => {
  return (
    <AccordionRoot collapsible>
      <AccordionItem value="drawer-accordion" borderWidth="0px" borderColor="transparent">
        <AccordionItemTrigger
          w="fit-content"
          p="0px"
          _hover={{ bg: 'transparent' }}
          fontSize="14px"
          lineHeight="20px"
          fontWeight="medium"
          color="primary.700"
        >
          {props.title}
        </AccordionItemTrigger>

        <AccordionItemContent
          rounded="md"
          fontSize="14px"
          lineHeight="20px"
          fontWeight="normal"
          color="gray.500"
          mt="16px"
          bg="primary.50"
          p="16px"
        >
          {props.listItems &&
            props.listItems.map((list, index) => (
              <Fragment key={index}>
                {list?.header && (
                  <Text fontWeight="bold" _notFirst={{ mt: '16px' }}>
                    {list.header}
                  </Text>
                )}

                <List.Root mt={list.header ? '12px' : undefined}>
                  {list.items.map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                  ))}
                </List.Root>
              </Fragment>
            ))}
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )
}
