import {
  ProgressLabel as ChakraProgressLabel,
  ProgressLabelProps as BaseProgressLabelProps,
  ProgressRange,
  ProgressRoot,
  ProgressTrack,
  ProgressTrackProps,
  ProgressValueText,
} from "@chakra-ui/react/progress"
import { InfoTip } from "./toggle-tip"
import * as React from "react"

export const ProgressBar = React.forwardRef<
  HTMLDivElement,
  ProgressTrackProps
>(function ProgressBar(props, ref) {
  return (
    <ProgressTrack {...props} ref={ref}>
      <ProgressRange />
    </ProgressTrack>
  )
})

export interface ProgressLabelProps extends BaseProgressLabelProps {
  info?: React.ReactNode
}

export const ProgressLabel = React.forwardRef<
  HTMLDivElement,
  ProgressLabelProps
>(function ProgressLabel(props, ref) {
  const { children, info, ...rest } = props
  return (
    <ChakraProgressLabel {...rest} ref={ref}>
      {children}
      {info && <InfoTip>{info}</InfoTip>}
    </ChakraProgressLabel>
  )
})

export { ProgressRoot, ProgressValueText }
