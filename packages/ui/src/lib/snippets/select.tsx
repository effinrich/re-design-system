"use client"

import type { CollectionItem } from "@chakra-ui/react"
import {
  SelectClearTrigger as ChakraSelectClearTrigger,
  SelectClearTriggerProps,
  SelectContent as ChakraSelectContent,
  SelectContentProps as BaseSelectContentProps,
  SelectContext,
  SelectControl,
  SelectControlProps,
  SelectHiddenSelect,
  SelectIndicator,
  SelectIndicatorGroup,
  SelectItem as ChakraSelectItem,
  SelectItemGroup as ChakraSelectItemGroup,
  SelectItemGroupLabel,
  SelectItemGroupProps as BaseSelectItemGroupProps,
  SelectItemIndicator,
  SelectItemProps,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectRoot as ChakraSelectRoot,
  SelectRootComponent,
  SelectRootProps,
  SelectTrigger as ChakraSelectTrigger,
  SelectValueText as ChakraSelectValueText,
  SelectValueTextProps as ChakraSelectValueTextProps,
} from "@chakra-ui/react/select"
import { Portal } from "@chakra-ui/react/portal"

import { CloseButton } from "./close-button"
import * as React from "react"

interface SelectTriggerProps extends SelectControlProps {
  clearable?: boolean
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(function SelectTrigger(props, ref) {
  const { children, clearable, ...rest } = props
  return (
    <SelectControl {...rest}>
      <ChakraSelectTrigger ref={ref}>{children}</ChakraSelectTrigger>
      <SelectIndicatorGroup>
        {clearable && <ChakraSelectClearTrigger />}
        <SelectIndicator />
      </SelectIndicatorGroup>
    </SelectControl>
  )
})

const SelectClearTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectClearTriggerProps
>(function SelectClearTrigger(props, ref) {
  return (
    <ChakraSelectClearTrigger asChild {...props} ref={ref}>
      <CloseButton
        size="xs"
        variant="plain"
        focusVisibleRing="inside"
        focusRingWidth="2px"
        pointerEvents="auto"
      />
    </ChakraSelectClearTrigger>
  )
})

interface SelectContentProps extends BaseSelectContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  SelectContentProps
>(function SelectContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <SelectPositioner>
        <ChakraSelectContent {...rest} ref={ref} />
      </SelectPositioner>
    </Portal>
  )
})

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectItemProps
>(function SelectItem(props, ref) {
  const { item, children, ...rest } = props
  return (
    <ChakraSelectItem key={item.value} item={item} {...rest} ref={ref}>
      {children}
      <SelectItemIndicator />
    </ChakraSelectItem>
  )
})

interface SelectValueTextProps
  extends Omit<ChakraSelectValueTextProps, "children"> {
  children?(items: CollectionItem[]): React.ReactNode
}

export const SelectValueText = React.forwardRef<
  HTMLSpanElement,
  SelectValueTextProps
>(function SelectValueText(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraSelectValueText {...rest} ref={ref}>
      <SelectContext>
        {(select) => {
          const items = select.selectedItems
          if (items.length === 0) return props.placeholder
          if (children) return children(items)
          if (items.length === 1)
            return select.collection.stringifyItem(items[0])
          return `${items.length} selected`
        }}
      </SelectContext>
    </ChakraSelectValueText>
  )
})

export const SelectRoot = React.forwardRef<
  HTMLDivElement,
  SelectRootProps
>(function SelectRoot(props, ref) {
  return (
    <ChakraSelectRoot
      {...props}
      ref={ref}
      positioning={{ sameWidth: true, ...props.positioning }}
    >
      {props.asChild ? (
        props.children
      ) : (
        <>
          <SelectHiddenSelect />
          {props.children}
        </>
      )}
    </ChakraSelectRoot>
  )
}) as SelectRootComponent

interface SelectItemGroupProps extends BaseSelectItemGroupProps {
  label: React.ReactNode
}

export const SelectItemGroup = React.forwardRef<
  HTMLDivElement,
  SelectItemGroupProps
>(function SelectItemGroup(props, ref) {
  const { children, label, ...rest } = props
  return (
    <ChakraSelectItemGroup {...rest} ref={ref}>
      <SelectItemGroupLabel>{label}</SelectItemGroupLabel>
      {children}
    </ChakraSelectItemGroup>
  )
})

export { SelectLabel, SelectItemText }
