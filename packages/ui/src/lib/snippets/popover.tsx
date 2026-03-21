import {
  PopoverArrow as ChakraPopoverArrow,
  PopoverArrowProps,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseTrigger as ChakraPopoverCloseTrigger,
  PopoverCloseTriggerProps,
  PopoverContent as ChakraPopoverContent,
  PopoverContentProps as BasePopoverContentProps,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@chakra-ui/react/popover"
import { Portal } from "@chakra-ui/react/portal"
import { CloseButton } from "./close-button"
import * as React from "react"

interface PopoverContentProps extends BasePopoverContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(function PopoverContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <PopoverPositioner>
        <ChakraPopoverContent ref={ref} {...rest} />
      </PopoverPositioner>
    </Portal>
  )
})

export const PopoverArrow = React.forwardRef<
  HTMLDivElement,
  PopoverArrowProps
>(function PopoverArrow(props, ref) {
  return (
    <ChakraPopoverArrow {...props} ref={ref}>
      <PopoverArrowTip />
    </ChakraPopoverArrow>
  )
})

export const PopoverCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverCloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  return (
    <ChakraPopoverCloseTrigger
      position="absolute"
      top="1"
      insetEnd="1"
      {...props}
      asChild
      ref={ref}
    >
      <CloseButton size="sm" />
    </ChakraPopoverCloseTrigger>
  )
})

export { PopoverTitle, PopoverDescription, PopoverFooter, PopoverHeader, PopoverRoot, PopoverBody, PopoverTrigger }
