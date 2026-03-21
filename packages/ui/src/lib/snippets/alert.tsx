import {
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertRoot,
  AlertRootProps,
  AlertTitle,
} from "@chakra-ui/react/alert"
import * as React from "react"

export interface AlertProps extends Omit<AlertRootProps, "title"> {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  title?: React.ReactNode
  icon?: React.ReactElement
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const { title, children, icon, startElement, endElement, ...rest } = props
    return (
      <AlertRoot ref={ref} {...rest}>
        {startElement || <AlertIndicator>{icon}</AlertIndicator>}
        {children ? (
          <AlertContent>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{children}</AlertDescription>
          </AlertContent>
        ) : (
          <AlertTitle flex="1">{title}</AlertTitle>
        )}
        {endElement}
      </AlertRoot>
    )
  },
)
