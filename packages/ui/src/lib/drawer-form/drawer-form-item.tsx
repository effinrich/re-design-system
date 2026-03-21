import type { JSX } from 'react'
import { Field } from '../snippets/field'
import { FieldLabel, FieldErrorText, FieldHelperText } from '@chakra-ui/react/field'

import { DrawerFormHeader } from '.'

export interface DrawerFormItemProps {
  label: string
  error?: string
  children: JSX.Element
  helperText?: string
  isInvalid?: boolean
}

export const DrawerFormItem = (props: DrawerFormItemProps) => {
  return (
    <Field invalid={props.isInvalid}>
      <DrawerFormHeader as={FieldLabel}>{props.label}</DrawerFormHeader>
      {props.children}
      <FieldErrorText>{props.error}</FieldErrorText>
      <FieldHelperText>{props.helperText}</FieldHelperText>
    </Field>
  )
}
