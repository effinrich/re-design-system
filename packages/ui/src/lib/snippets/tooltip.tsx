import {
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipContentProps,
  TooltipPositioner,
  TooltipRoot,
  TooltipRootProps,
  TooltipTrigger,
} from "@chakra-ui/react/tooltip"
import { Portal } from "@chakra-ui/react/portal"
import * as React from "react"

export interface TooltipProps extends TooltipRootProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  content: React.ReactNode
  contentProps?: TooltipContentProps
  disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      portalRef,
      ...rest
    } = props

    if (disabled) return children

    return (
      <TooltipRoot {...rest}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <Portal disabled={!portalled} container={portalRef}>
          <TooltipPositioner>
            <TooltipContent ref={ref} {...contentProps}>
              {showArrow && (
                <TooltipArrow>
                  <TooltipArrowTip />
                </TooltipArrow>
              )}
              {content}
            </TooltipContent>
          </TooltipPositioner>
        </Portal>
      </TooltipRoot>
    )
  },
)
