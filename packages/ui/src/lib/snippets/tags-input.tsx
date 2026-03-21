"use client"

import {
  TagsInputClearTrigger as ChakraTagsInputClearTrigger,
  TagsInputClearTriggerProps,
  TagsInputContext,
  TagsInputControl as ChakraTagsInputControl,
  TagsInputControlProps as BaseTagsInputControlProps,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem as ChakraTagsInputItem,
  TagsInputItemContext,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemProps,
  TagsInputItemText,
  TagsInputLabel,
  TagsInputPropsProvider,
  TagsInputRoot as ChakraTagsInputRoot,
  TagsInputRootProps,
  TagsInputRootProvider,
} from "@chakra-ui/react/tags-input"
import { CloseButton } from "./close-button"
import * as React from "react"

interface TagsInputControlProps extends BaseTagsInputControlProps {
  clearable?: boolean
}

export const TagsInputControl = React.forwardRef<
  HTMLDivElement,
  TagsInputControlProps
>(function TagsInputControl(props, ref) {
  const { children, clearable, ...rest } = props
  return (
    <ChakraTagsInputControl {...rest} ref={ref}>
      {children}
      {clearable && <ChakraTagsInputClearTrigger />}
    </ChakraTagsInputControl>
  )
})

const TagsInputClearTrigger = React.forwardRef<
  HTMLButtonElement,
  TagsInputClearTriggerProps
>(function TagsInputClearTrigger(props, ref) {
  return (
    <ChakraTagsInputClearTrigger asChild {...props} ref={ref}>
      <CloseButton
        size="xs"
        variant="plain"
        focusVisibleRing="inside"
        focusRingWidth="2px"
        pointerEvents="auto"
      />
    </ChakraTagsInputClearTrigger>
  )
})

export const TagsInputItem = React.forwardRef<
  HTMLDivElement,
  TagsInputItemProps
>(function TagsInputItem(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraTagsInputItem {...rest} ref={ref}>
      <TagsInputItemText>{children}</TagsInputItemText>
      <TagsInputItemDeleteTrigger asChild>
        <CloseButton
          size="2xs"
          variant="plain"
          focusVisibleRing="inside"
          focusRingWidth="2px"
          pointerEvents="auto"
        />
      </TagsInputItemDeleteTrigger>
    </ChakraTagsInputItem>
  )
})

export const TagsInputRoot = React.forwardRef<
  HTMLDivElement,
  TagsInputRootProps
>(function TagsInputRoot(props, ref) {
  return <ChakraTagsInputRoot {...props} ref={ref} />
}) as TagsInputRootProps

export { TagsInputItemText, TagsInputItemPreview, TagsInputItemInput, TagsInputItemContext, TagsInputRootProvider, TagsInputPropsProvider, TagsInputLabel, TagsInputInput, TagsInputContext, TagsInputHiddenInput }
