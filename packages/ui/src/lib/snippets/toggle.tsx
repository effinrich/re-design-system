"use client"

import type { ButtonProps } from "@chakra-ui/react"
import {
  ToggleIndicator,
  ToggleRoot,
  ToggleRootProps,
  useToggleContext,
} from "@chakra-ui/react/toggle"
import { Button } from "@chakra-ui/react"

import * as React from "react"

interface ToggleProps extends ToggleRootProps {
  variant?: keyof typeof variantMap
  size?: ButtonProps["size"]
}

const variantMap = {
  solid: { on: "solid", off: "outline" },
  surface: { on: "surface", off: "outline" },
  subtle: { on: "subtle", off: "ghost" },
  ghost: { on: "subtle", off: "ghost" },
} as const

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(props, ref) {
    const { variant = "subtle", size, children, ...rest } = props
    const variantConfig = variantMap[variant]

    return (
      <ToggleRoot asChild {...rest}>
        <ToggleBaseButton size={size} variant={variantConfig} ref={ref}>
          {children}
        </ToggleBaseButton>
      </ToggleRoot>
    )
  },
)

interface ToggleBaseButtonProps extends Omit<ButtonProps, "variant"> {
  variant: Record<"on" | "off", ButtonProps["variant"]>
}

const ToggleBaseButton = React.forwardRef<
  HTMLButtonElement,
  ToggleBaseButtonProps
>(function ToggleBaseButton(props, ref) {
  const toggle = useToggleContext()
  const { variant, ...rest } = props
  return (
    <Button
      variant={toggle.pressed ? variant.on : variant.off}
      ref={ref}
      {...rest}
    />
  )
})

export { ToggleIndicator }
