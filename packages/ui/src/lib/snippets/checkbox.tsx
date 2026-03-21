import {
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
  CheckboxRootProps,
} from "@chakra-ui/react/checkbox"
import * as React from "react"

export interface CheckboxProps extends CheckboxRootProps {
  icon?: React.ReactNode
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  rootRef?: React.RefObject<HTMLLabelElement | null>
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props
    return (
      <CheckboxRoot ref={rootRef} {...rest}>
        <CheckboxHiddenInput ref={ref} {...inputProps} />
        <CheckboxControl>
          {icon || <CheckboxIndicator />}
        </CheckboxControl>
        {children != null && (
          <CheckboxLabel>{children}</CheckboxLabel>
        )}
      </CheckboxRoot>
    )
  },
)
