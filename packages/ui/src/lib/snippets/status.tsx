import type { ColorPalette } from "@chakra-ui/react"
import { StatusIndicator, StatusRoot, StatusRootProps } from "@chakra-ui/react/status"

import * as React from "react"

type StatusValue = "success" | "error" | "warning" | "info"

export interface StatusProps extends StatusRootProps {
  value?: StatusValue
}

const statusMap: Record<StatusValue, ColorPalette> = {
  success: "green",
  error: "red",
  warning: "orange",
  info: "blue",
}

export const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  function Status(props, ref) {
    const { children, value = "info", ...rest } = props
    const colorPalette = rest.colorPalette ?? statusMap[value]
    return (
      <StatusRoot ref={ref} {...rest} colorPalette={colorPalette}>
        <StatusIndicator />
        {children}
      </StatusRoot>
    )
  },
)
