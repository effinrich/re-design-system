import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger as ChakraDialogCloseTrigger,
  DialogCloseTriggerProps,
  DialogContent as ChakraDialogContent,
  DialogContentProps as BaseDialogContentProps,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@chakra-ui/react/dialog"
import { Portal } from "@chakra-ui/react/portal"
import { CloseButton } from "./close-button"
import * as React from "react"

interface DialogContentProps extends BaseDialogContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  backdrop?: boolean
}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent(props, ref) {
  const {
    children,
    portalled = true,
    portalRef,
    backdrop = true,
    ...rest
  } = props

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <DialogBackdrop />}
      <DialogPositioner>
        <ChakraDialogContent ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDialogContent>
      </DialogPositioner>
    </Portal>
  )
})

export const DialogCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogCloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  return (
    <ChakraDialogCloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref}>
        {props.children}
      </CloseButton>
    </ChakraDialogCloseTrigger>
  )
})

export { DialogRoot, DialogFooter, DialogHeader, DialogBody, DialogBackdrop, DialogTitle, DialogDescription, DialogTrigger, DialogActionTrigger }
