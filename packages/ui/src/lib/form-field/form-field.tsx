import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { Tooltip } from '@react/ui'
import { Field } from '../snippets/field'
import {
  FieldLabel,
  FieldErrorText,
  FieldHelperText
} from '@chakra-ui/react/field'

interface FormFieldProps {
  name: string
  label: string
  helper?: string
  children: ReactNode
  disabledHelpText?: string
  testid?: string
  optional?: boolean
}

export const FormField = ({
  children,
  name,
  helper,
  label,
  testid,
  disabledHelpText,
  optional = false
}: FormFieldProps) => {
  const { formState } = useFormContext()
  const errorMessage = formState.errors[name]?.message as string | undefined
  const isInvalid = Boolean(errorMessage)

  return (
    <Tooltip
      content={disabledHelpText}
      positioning={{ placement: 'top-start' }}
      disabled={!disabledHelpText}
    >
      <Field data-testid={testid} invalid={isInvalid}>
        <FieldLabel>{optional ? `${label} (optional)` : label}</FieldLabel>
        {children}
        {isInvalid ? (
          <FieldErrorText>{errorMessage}</FieldErrorText>
        ) : (
          <FieldHelperText>{helper}</FieldHelperText>
        )}
      </Field>
    </Tooltip>
  )
}
