"use client"

import {
  NativeSelectField as ChakraNativeSelectField,
  NativeSelectFieldProps as BaseNativeSelectFieldProps,
  NativeSelectIndicator,
  NativeSelectRoot as ChakraNativeSelectRoot,
  NativeSelectRootProps as BaseNativeSelectRootProps,
} from "@chakra-ui/react/native-select"
import * as React from "react"

interface NativeSelectRootProps extends BaseNativeSelectRootProps {
  icon?: React.ReactNode
}

export const NativeSelectRoot = React.forwardRef<
  HTMLDivElement,
  NativeSelectRootProps
>(function NativeSelect(props, ref) {
  const { icon, children, ...rest } = props
  return (
    <ChakraNativeSelectRoot ref={ref} {...rest}>
      {children}
      <NativeSelectIndicator>{icon}</NativeSelectIndicator>
    </ChakraNativeSelectRoot>
  )
})

interface NativeSelectItem {
  value: string
  label: string
  disabled?: boolean
}

interface NativeSelectFieldProps extends BaseNativeSelectFieldProps {
  items?: Array<string | NativeSelectItem>
}

export const NativeSelectField = React.forwardRef<
  HTMLSelectElement,
  NativeSelectFieldProps
>(function NativeSelectField(props, ref) {
  const { items: itemsProp, children, ...rest } = props

  const items = React.useMemo(
    () =>
      itemsProp?.map((item) =>
        typeof item === "string" ? { label: item, value: item } : item,
      ),
    [itemsProp],
  )

  return (
    <ChakraNativeSelectField ref={ref} {...rest}>
      {children}
      {items?.map((item) => (
        <option key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </option>
      ))}
    </ChakraNativeSelectField>
  )
})
