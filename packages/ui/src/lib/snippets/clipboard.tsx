import type { ButtonProps, InputProps } from "@chakra-ui/react"
import {
  ClipboardIndicator,
  ClipboardIndicatorProps,
  ClipboardInput as ChakraClipboardInput,
  ClipboardLabel as ChakraClipboardLabel,
  ClipboardLabelProps,
  ClipboardRoot,
  ClipboardTrigger,
} from "@chakra-ui/react/clipboard"
import { Button, IconButton, Input } from "@chakra-ui/react"

import * as React from "react"
import { LuCheck, LuClipboard, LuLink } from "react-icons/lu"

const ClipboardIcon = React.forwardRef<
  HTMLDivElement,
  ClipboardIndicatorProps
>(function ClipboardIcon(props, ref) {
  return (
    <ClipboardIndicator copied={<LuCheck />} {...props} ref={ref}>
      <LuClipboard />
    </ClipboardIndicator>
  )
})

const ClipboardCopyText = React.forwardRef<
  HTMLDivElement,
  ClipboardIndicatorProps
>(function ClipboardCopyText(props, ref) {
  return (
    <ClipboardIndicator copied="Copied" {...props} ref={ref}>
      Copy
    </ClipboardIndicator>
  )
})

export const ClipboardLabel = React.forwardRef<
  HTMLLabelElement,
  ClipboardLabelProps
>(function ClipboardLabel(props, ref) {
  return (
    <ChakraClipboardLabel
      textStyle="sm"
      fontWeight="medium"
      display="inline-block"
      mb="1"
      {...props}
      ref={ref}
    />
  )
})

export const ClipboardButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardButton(props, ref) {
    return (
      <ClipboardTrigger asChild>
        <Button ref={ref} size="sm" variant="surface" {...props}>
          <ClipboardIcon />
          <ClipboardCopyText />
        </Button>
      </ClipboardTrigger>
    )
  },
)

export const ClipboardLink = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardLink(props, ref) {
    return (
      <ClipboardTrigger asChild>
        <Button
          unstyled
          variant="plain"
          size="xs"
          display="inline-flex"
          alignItems="center"
          gap="2"
          ref={ref}
          {...props}
        >
          <LuLink />
          <ClipboardCopyText />
        </Button>
      </ClipboardTrigger>
    )
  },
)

export const ClipboardIconButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function ClipboardIconButton(props, ref) {
  return (
    <ClipboardTrigger asChild>
      <IconButton ref={ref} size="xs" variant="subtle" {...props}>
        <ClipboardIcon />
        <ClipboardCopyText srOnly />
      </IconButton>
    </ClipboardTrigger>
  )
})

export const ClipboardInput = React.forwardRef<HTMLInputElement, InputProps>(
  function ClipboardInputElement(props, ref) {
    return (
      <ChakraClipboardInput asChild>
        <Input ref={ref} {...props} />
      </ChakraClipboardInput>
    )
  },
)

export { ClipboardRoot }
