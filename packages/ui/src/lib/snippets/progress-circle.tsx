import type { SystemStyleObject } from "@chakra-ui/react"
import {
  ProgressCircleCircle,
  ProgressCircleCircleProps,
  ProgressCircleRange,
  ProgressCircleRoot,
  ProgressCircleTrack,
  ProgressCircleValueText as ChakraProgressCircleValueText,
  ProgressCircleValueTextProps,
} from "@chakra-ui/react/progress-circle"
import { AbsoluteCenter } from "@chakra-ui/react/absolute-center"

import * as React from "react"

interface ProgressCircleRingProps extends ProgressCircleCircleProps {
  trackColor?: SystemStyleObject["stroke"]
  cap?: SystemStyleObject["strokeLinecap"]
}

export const ProgressCircleRing = React.forwardRef<
  SVGSVGElement,
  ProgressCircleRingProps
>(function ProgressCircleRing(props, ref) {
  const { trackColor, cap, color, ...rest } = props
  return (
    <ProgressCircleCircle {...rest} ref={ref}>
      <ProgressCircleTrack stroke={trackColor} />
      <ProgressCircleRange stroke={color} strokeLinecap={cap} />
    </ProgressCircleCircle>
  )
})

export const ProgressCircleValueText = React.forwardRef<
  HTMLDivElement,
  ProgressCircleValueTextProps
>(function ProgressCircleValueText(props, ref) {
  return (
    <AbsoluteCenter>
      <ChakraProgressCircleValueText {...props} ref={ref} />
    </AbsoluteCenter>
  )
})

export { ProgressCircleRoot }
