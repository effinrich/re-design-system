import {
  RadioGroupItem,
  RadioGroupItemHiddenInput,
  RadioGroupItemIndicator,
  RadioGroupItemProps,
  RadioGroupItemText,
  RadioGroupRoot,
} from "@chakra-ui/react/radio-group"
import * as React from "react"

export interface RadioProps extends RadioGroupItemProps {
  rootRef?: React.RefObject<HTMLDivElement | null>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props
    return (
      <RadioGroupItem ref={rootRef} {...rest}>
        <RadioGroupItemHiddenInput ref={ref} {...inputProps} />
        <RadioGroupItemIndicator />
        {children && (
          <RadioGroupItemText>{children}</RadioGroupItemText>
        )}
      </RadioGroupItem>
    )
  },
)

export const RadioGroup = RadioGroupRoot
