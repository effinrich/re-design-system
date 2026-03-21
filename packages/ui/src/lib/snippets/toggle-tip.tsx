import type { IconButtonProps } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverArrowTip,
  PopoverContent,
  PopoverContentProps,
  PopoverPositioner,
  PopoverRoot,
  PopoverRootProps,
  PopoverTrigger,
} from "@chakra-ui/react/popover"
import { Portal } from "@chakra-ui/react/portal"
import { IconButton } from "@chakra-ui/react"
import * as React from "react"
import { HiOutlineInformationCircle } from "react-icons/hi"

export interface ToggleTipProps extends PopoverRootProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  content?: React.ReactNode
  contentProps?: PopoverContentProps
}

export const ToggleTip = React.forwardRef<HTMLDivElement, ToggleTipProps>(
  function ToggleTip(props, ref) {
    const {
      showArrow,
      children,
      portalled = true,
      content,
      contentProps,
      portalRef,
      ...rest
    } = props

    return (
      <PopoverRoot
        {...rest}
        positioning={{ ...rest.positioning, gutter: 4 }}
      >
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <Portal disabled={!portalled} container={portalRef}>
          <PopoverPositioner>
            <PopoverContent
              width="auto"
              px="2"
              py="1"
              textStyle="xs"
              rounded="sm"
              ref={ref}
              {...contentProps}
            >
              {showArrow && (
                <PopoverArrow>
                  <PopoverArrowTip />
                </PopoverArrow>
              )}
              {content}
            </PopoverContent>
          </PopoverPositioner>
        </Portal>
      </PopoverRoot>
    )
  },
)

export interface InfoTipProps extends Partial<ToggleTipProps> {
  buttonProps?: IconButtonProps | undefined
}

export const InfoTip = React.forwardRef<HTMLDivElement, InfoTipProps>(
  function InfoTip(props, ref) {
    const { children, buttonProps, ...rest } = props
    return (
      <ToggleTip content={children} {...rest} ref={ref}>
        <IconButton
          variant="ghost"
          aria-label="info"
          size="2xs"
          colorPalette="gray"
          {...buttonProps}
        >
          <HiOutlineInformationCircle />
        </IconButton>
      </ToggleTip>
    )
  },
)
