import {
  ActionBarCloseTrigger as ChakraActionBarCloseTrigger,
  ActionBarCloseTriggerProps,
  ActionBarContent as ChakraActionBarContent,
  ActionBarContentProps as BaseActionBarContentProps,
  ActionBarPositioner,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "@chakra-ui/react/action-bar"
import { Portal } from "@chakra-ui/react/portal"
import { CloseButton } from "./close-button"
import * as React from "react"

interface ActionBarContentProps extends BaseActionBarContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const ActionBarContent = React.forwardRef<
  HTMLDivElement,
  ActionBarContentProps
>(function ActionBarContent(props, ref) {
  const { children, portalled = true, portalRef, ...rest } = props

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ActionBarPositioner>
        <ChakraActionBarContent ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraActionBarContent>
      </ActionBarPositioner>
    </Portal>
  )
})

export const ActionBarCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ActionBarCloseTriggerProps
>(function ActionBarCloseTrigger(props, ref) {
  return (
    <ChakraActionBarCloseTrigger {...props} asChild ref={ref}>
      <CloseButton size="sm" />
    </ChakraActionBarCloseTrigger>
  )
})

export { ActionBarRoot, ActionBarSelectionTrigger, ActionBarSeparator }
