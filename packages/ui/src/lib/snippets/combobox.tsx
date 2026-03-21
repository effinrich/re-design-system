"use client"

import {
  ComboboxClearTrigger as ChakraComboboxClearTrigger,
  ComboboxClearTriggerProps,
  ComboboxContent as ChakraComboboxContent,
  ComboboxContentProps as BaseComboboxContentProps,
  ComboboxControl as ChakraComboboxControl,
  ComboboxControlProps as BaseComboboxControlProps,
  ComboboxEmpty,
  ComboboxIndicatorGroup,
  ComboboxInput,
  ComboboxItem as ChakraComboboxItem,
  ComboboxItemGroup as ChakraComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemGroupProps as BaseComboboxItemGroupProps,
  ComboboxItemIndicator,
  ComboboxItemProps,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxRoot as ChakraComboboxRoot,
  ComboboxRootComponent,
  ComboboxRootProps,
  ComboboxTrigger,
} from "@chakra-ui/react/combobox"
import { Portal } from "@chakra-ui/react/portal"
import { CloseButton } from "./close-button"
import * as React from "react"

interface ComboboxControlProps extends BaseComboboxControlProps {
  clearable?: boolean
}

export const ComboboxControl = React.forwardRef<
  HTMLDivElement,
  ComboboxControlProps
>(function ComboboxControl(props, ref) {
  const { children, clearable, ...rest } = props
  return (
    <ChakraComboboxControl {...rest} ref={ref}>
      {children}
      <ComboboxIndicatorGroup>
        {clearable && <ChakraComboboxClearTrigger />}
        <ComboboxTrigger />
      </ComboboxIndicatorGroup>
    </ChakraComboboxControl>
  )
})

const ComboboxClearTrigger = React.forwardRef<
  HTMLButtonElement,
  ComboboxClearTriggerProps
>(function ComboboxClearTrigger(props, ref) {
  return (
    <ChakraComboboxClearTrigger asChild {...props} ref={ref}>
      <CloseButton
        size="xs"
        variant="plain"
        focusVisibleRing="inside"
        focusRingWidth="2px"
        pointerEvents="auto"
      />
    </ChakraComboboxClearTrigger>
  )
})

interface ComboboxContentProps extends BaseComboboxContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const ComboboxContent = React.forwardRef<
  HTMLDivElement,
  ComboboxContentProps
>(function ComboboxContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ComboboxPositioner>
        <ChakraComboboxContent {...rest} ref={ref} />
      </ComboboxPositioner>
    </Portal>
  )
})

export const ComboboxItem = React.forwardRef<
  HTMLDivElement,
  ComboboxItemProps
>(function ComboboxItem(props, ref) {
  const { item, children, ...rest } = props
  return (
    <ChakraComboboxItem key={item.value} item={item} {...rest} ref={ref}>
      {children}
      <ComboboxItemIndicator />
    </ChakraComboboxItem>
  )
})

export const ComboboxRoot = React.forwardRef<
  HTMLDivElement,
  ComboboxRootProps
>(function ComboboxRoot(props, ref) {
  return (
    <ChakraComboboxRoot
      {...props}
      ref={ref}
      positioning={{ sameWidth: true, ...props.positioning }}
    />
  )
}) as ComboboxRootComponent

interface ComboboxItemGroupProps extends BaseComboboxItemGroupProps {
  label: React.ReactNode
}

export const ComboboxItemGroup = React.forwardRef<
  HTMLDivElement,
  ComboboxItemGroupProps
>(function ComboboxItemGroup(props, ref) {
  const { children, label, ...rest } = props
  return (
    <ChakraComboboxItemGroup {...rest} ref={ref}>
      <ComboboxItemGroupLabel>{label}</ComboboxItemGroupLabel>
      {children}
    </ChakraComboboxItemGroup>
  )
})

export { ComboboxLabel, ComboboxInput, ComboboxEmpty, ComboboxItemText }
