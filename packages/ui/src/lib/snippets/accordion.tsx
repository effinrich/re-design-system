import {
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent as ChakraAccordionItemContent,
  AccordionItemContentProps as BaseAccordionItemContentProps,
  AccordionItemIndicator,
  AccordionItemTrigger as ChakraAccordionItemTrigger,
  AccordionItemTriggerProps as BaseAccordionItemTriggerProps,
  AccordionRoot,
} from "@chakra-ui/react/accordion"
import { HStack } from "@chakra-ui/react"
import * as React from "react"
import { LuChevronDown } from "react-icons/lu"

interface AccordionItemTriggerProps extends BaseAccordionItemTriggerProps {
  indicatorPlacement?: "start" | "end"
}

export const AccordionItemTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionItemTriggerProps
>(function AccordionItemTrigger(props, ref) {
  const { children, indicatorPlacement = "end", ...rest } = props
  return (
    <ChakraAccordionItemTrigger {...rest} ref={ref}>
      {indicatorPlacement === "start" && (
        <AccordionItemIndicator rotate={{ base: "-90deg", _open: "0deg" }}>
          <LuChevronDown />
        </AccordionItemIndicator>
      )}
      <HStack gap="4" flex="1" textAlign="start" width="full">
        {children}
      </HStack>
      {indicatorPlacement === "end" && (
        <AccordionItemIndicator>
          <LuChevronDown />
        </AccordionItemIndicator>
      )}
    </ChakraAccordionItemTrigger>
  )
})

interface AccordionItemContentProps extends BaseAccordionItemContentProps {}

export const AccordionItemContent = React.forwardRef<
  HTMLDivElement,
  AccordionItemContentProps
>(function AccordionItemContent(props, ref) {
  return (
    <ChakraAccordionItemContent>
      <AccordionItemBody {...props} ref={ref} />
    </ChakraAccordionItemContent>
  )
})

export { AccordionRoot, AccordionItem }
