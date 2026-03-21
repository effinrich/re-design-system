import type { BadgeProps } from "@chakra-ui/react"
import {
  StatDownIndicator,
  StatHelpText,
  StatLabel as ChakraStatLabel,
  StatLabelProps as BaseStatLabelProps,
  StatRoot,
  StatUpIndicator,
  StatValueText as ChakraStatValueText,
  StatValueTextProps as BaseStatValueTextProps,
  StatValueUnit,
} from "@chakra-ui/react/stat"
import { Badge, FormatNumber } from "@chakra-ui/react"

import { InfoTip } from "./toggle-tip"
import * as React from "react"

interface StatLabelProps extends BaseStatLabelProps {
  info?: React.ReactNode
}

export const StatLabel = React.forwardRef<HTMLDivElement, StatLabelProps>(
  function StatLabel(props, ref) {
    const { info, children, ...rest } = props
    return (
      <ChakraStatLabel {...rest} ref={ref}>
        {children}
        {info && <InfoTip>{info}</InfoTip>}
      </ChakraStatLabel>
    )
  },
)

interface StatValueTextProps extends BaseStatValueTextProps {
  value?: number
  formatOptions?: Intl.NumberFormatOptions
}

export const StatValueText = React.forwardRef<
  HTMLDivElement,
  StatValueTextProps
>(function StatValueText(props, ref) {
  const { value, formatOptions, children, ...rest } = props
  return (
    <ChakraStatValueText {...rest} ref={ref}>
      {children ||
        (value != null && <FormatNumber value={value} {...formatOptions} />)}
    </ChakraStatValueText>
  )
})

export const StatUpTrend = React.forwardRef<HTMLDivElement, BadgeProps>(
  function StatUpTrend(props, ref) {
    return (
      <Badge colorPalette="green" gap="0" {...props} ref={ref}>
        <StatUpIndicator />
        {props.children}
      </Badge>
    )
  },
)

export const StatDownTrend = React.forwardRef<HTMLDivElement, BadgeProps>(
  function StatDownTrend(props, ref) {
    return (
      <Badge colorPalette="red" gap="0" {...props} ref={ref}>
        <StatDownIndicator />
        {props.children}
      </Badge>
    )
  },
)

export { StatRoot, StatHelpText, StatValueUnit }
