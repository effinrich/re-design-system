"use client"

import {
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
  SegmentGroupRoot,
  SegmentGroupRootProps,
} from "@chakra-ui/react/segment-group"
import { For } from "@chakra-ui/react"
import * as React from "react"

interface Item {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps extends SegmentGroupRootProps {
  items: Array<string | Item>
}

function normalize(items: Array<string | Item>): Item[] {
  return items.map((item) => {
    if (typeof item === "string") return { value: item, label: item }
    return item
  })
}

export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(props, ref) {
  const { items, ...rest } = props
  const data = React.useMemo(() => normalize(items), [items])

  return (
    <SegmentGroupRoot ref={ref} {...rest}>
      <SegmentGroupIndicator />
      <For each={data}>
        {(item) => (
          <SegmentGroupItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            <SegmentGroupItemText>{item.label}</SegmentGroupItemText>
            <SegmentGroupItemHiddenInput />
          </SegmentGroupItem>
        )}
      </For>
    </SegmentGroupRoot>
  )
})
