import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from '@emotion/styled'
import {
  Box,
  Flex,
  Spacer,
  Tooltip
} from '@react/ui'
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

const StyledReqInput = styled.span`
  ::after {
    content: ' *';
    color: #fd3131; // this needs to a theme prop
    white-space: nowrap;
  }
`

export const FormFieldMaster = ({
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
        <Flex direction={['column', 'column', 'row']}>
          <Box w={['100%', '100%', '25%']} mr={4}>
            <FieldLabel color="gray.800">
              {optional ? label : <StyledReqInput>{label}</StyledReqInput>}
            </FieldLabel>
          </Box>

          <Spacer />
          <Box w={['100%', '100%', '75%']}>
            {children}
            {isInvalid ? (
              <FieldErrorText>{errorMessage}</FieldErrorText>
            ) : (
              <FieldHelperText>{helper}</FieldHelperText>
            )}
          </Box>
        </Flex>
      </Field>
    </Tooltip>
  )
}

export default FormFieldMaster
