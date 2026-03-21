"use client"

import {
  MenuArrow as ChakraMenuArrow,
  MenuArrowProps,
  MenuArrowTip,
  MenuCheckboxItem as ChakraMenuCheckboxItem,
  MenuCheckboxItemProps,
  MenuContent as ChakraMenuContent,
  MenuContentProps as BaseMenuContentProps,
  MenuContextTrigger,
  MenuItem,
  MenuItemCommand,
  MenuItemGroup as ChakraMenuItemGroup,
  MenuItemGroupLabel,
  MenuItemGroupProps,
  MenuItemIndicator,
  MenuItemProps,
  MenuItemText,
  MenuPositioner,
  MenuRadioItem as ChakraMenuRadioItem,
  MenuRadioItemGroup,
  MenuRadioItemProps,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem as ChakraMenuTriggerItem,
} from "@chakra-ui/react/menu"
import { AbsoluteCenter } from "@chakra-ui/react/absolute-center"
import { Portal } from "@chakra-ui/react/portal"
import * as React from "react"
import { LuCheck, LuChevronRight } from "react-icons/lu"

interface MenuContentProps extends BaseMenuContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <MenuPositioner>
          <ChakraMenuContent ref={ref} {...rest} />
        </MenuPositioner>
      </Portal>
    )
  },
)

export const MenuArrow = React.forwardRef<
  HTMLDivElement,
  MenuArrowProps
>(function MenuArrow(props, ref) {
  return (
    <ChakraMenuArrow ref={ref} {...props}>
      <MenuArrowTip />
    </ChakraMenuArrow>
  )
})

export const MenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  MenuCheckboxItemProps
>(function MenuCheckboxItem(props, ref) {
  return (
    <ChakraMenuCheckboxItem ps="8" ref={ref} {...props}>
      <AbsoluteCenter axis="horizontal" insetStart="4" asChild>
        <MenuItemIndicator>
          <LuCheck />
        </MenuItemIndicator>
      </AbsoluteCenter>
      {props.children}
    </ChakraMenuCheckboxItem>
  )
})

export const MenuRadioItem = React.forwardRef<
  HTMLDivElement,
  MenuRadioItemProps
>(function MenuRadioItem(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraMenuRadioItem ps="8" ref={ref} {...rest}>
      <AbsoluteCenter axis="horizontal" insetStart="4" asChild>
        <MenuItemIndicator>
          <LuCheck />
        </MenuItemIndicator>
      </AbsoluteCenter>
      <MenuItemText>{children}</MenuItemText>
    </ChakraMenuRadioItem>
  )
})

export const MenuItemGroup = React.forwardRef<
  HTMLDivElement,
  MenuItemGroupProps
>(function MenuItemGroup(props, ref) {
  const { title, children, ...rest } = props
  return (
    <ChakraMenuItemGroup ref={ref} {...rest}>
      {title && (
        <MenuItemGroupLabel userSelect="none">
          {title}
        </MenuItemGroupLabel>
      )}
      {children}
    </ChakraMenuItemGroup>
  )
})

export interface MenuTriggerItemProps extends MenuItemProps {
  startIcon?: React.ReactNode
}

export const MenuTriggerItem = React.forwardRef<
  HTMLDivElement,
  MenuTriggerItemProps
>(function MenuTriggerItem(props, ref) {
  const { startIcon, children, ...rest } = props
  return (
    <ChakraMenuTriggerItem ref={ref} {...rest}>
      {startIcon}
      {children}
      <LuChevronRight />
    </ChakraMenuTriggerItem>
  )
})

export { MenuRadioItemGroup, MenuContextTrigger, MenuRoot, MenuSeparator, MenuItem, MenuItemText, MenuItemCommand, MenuTrigger }
