import {
  FieldErrorText,
  FieldHelperText,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRoot,
  FieldRootProps,
} from "@chakra-ui/react/field"
import * as React from "react"

export interface FieldProps extends Omit<FieldRootProps, "label"> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } =
      props
    return (
      <FieldRoot ref={ref} {...rest}>
        {label && (
          <FieldLabel>
            {label}
            <FieldRequiredIndicator fallback={optionalText} />
          </FieldLabel>
        )}
        {children}
        {helperText && (
          <FieldHelperText>{helperText}</FieldHelperText>
        )}
        {errorText && (
          <FieldErrorText>{errorText}</FieldErrorText>
        )}
      </FieldRoot>
    )
  },
)
