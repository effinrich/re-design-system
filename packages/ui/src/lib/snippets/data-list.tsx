import {
  DataListItem as ChakraDataListItem,
  DataListItemLabel,
  DataListItemProps,
  DataListItemValue,
  DataListRoot,
} from "@chakra-ui/react/data-list"
import { InfoTip } from "./toggle-tip"
import * as React from "react"

interface ItemProps extends DataListItemProps {
  label: React.ReactNode
  value: React.ReactNode
  info?: React.ReactNode
  grow?: boolean
}

export const DataListItem = React.forwardRef<HTMLDivElement, ItemProps>(
  function DataListItem(props, ref) {
    const { label, info, value, children, grow, ...rest } = props
    return (
      <ChakraDataListItem ref={ref} {...rest}>
        <DataListItemLabel flex={grow ? "1" : undefined}>
          {label}
          {info && <InfoTip>{info}</InfoTip>}
        </DataListItemLabel>
        <DataListItemValue flex={grow ? "1" : undefined}>
          {value}
        </DataListItemValue>
        {children}
      </ChakraDataListItem>
    )
  },
)

export { DataListRoot }
