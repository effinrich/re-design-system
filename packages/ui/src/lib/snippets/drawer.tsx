import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger as ChakraDrawerCloseTrigger,
  DrawerCloseTriggerProps,
  DrawerContent as ChakraDrawerContent,
  DrawerContentProps as BaseDrawerContentProps,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@chakra-ui/react/drawer"
import { Portal } from "@chakra-ui/react/portal"
import { CloseButton } from "./close-button"
import * as React from "react"

interface DrawerContentProps extends BaseDrawerContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  offset?: BaseDrawerContentProps["padding"]
  backdrop?: boolean
}

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(function DrawerContent(props, ref) {
  const {
    children,
    portalled = true,
    portalRef,
    offset,
    backdrop = true,
    ...rest
  } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <DrawerBackdrop />}
      <DrawerPositioner padding={offset}>
        <ChakraDrawerContent ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDrawerContent>
      </DrawerPositioner>
    </Portal>
  )
})

export const DrawerCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  DrawerCloseTriggerProps
>(function DrawerCloseTrigger(props, ref) {
  return (
    <ChakraDrawerCloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref} />
    </ChakraDrawerCloseTrigger>
  )
})

export { DrawerTrigger, DrawerRoot, DrawerFooter, DrawerHeader, DrawerBody, DrawerBackdrop, DrawerDescription, DrawerTitle, DrawerActionTrigger }
