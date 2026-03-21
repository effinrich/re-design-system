import {
  HoverCardArrow as ChakraHoverCardArrow,
  HoverCardArrowProps,
  HoverCardArrowTip,
  HoverCardContent as ChakraHoverCardContent,
  HoverCardContentProps as BaseHoverCardContentProps,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger,
} from "@chakra-ui/react/hover-card"
import { Portal } from "@chakra-ui/react/portal"
import * as React from "react"

interface HoverCardContentProps extends BaseHoverCardContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(function HoverCardContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <HoverCardPositioner>
        <ChakraHoverCardContent ref={ref} {...rest} />
      </HoverCardPositioner>
    </Portal>
  )
})

export const HoverCardArrow = React.forwardRef<
  HTMLDivElement,
  HoverCardArrowProps
>(function HoverCardArrow(props, ref) {
  return (
    <ChakraHoverCardArrow ref={ref} {...props}>
      <HoverCardArrowTip />
    </ChakraHoverCardArrow>
  )
})

export { HoverCardRoot, HoverCardTrigger }
