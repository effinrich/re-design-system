/* eslint-disable react/no-children-prop */
import { useState } from 'react'
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  NativeSelect
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'

import { Meta } from '@storybook/react-vite'

import { Button, Container, HStack, Input } from '../../index'

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel
} from './form-control'

export default {
  component: FormControl,
  title: 'Components / Forms / FormControl',
  decorators: [Story => <Container>{Story()}</Container>]
} as Meta

export const Basic = () => (
  <FormControl>
    <FormLabel>Email address</FormLabel>
    <Input type="email" />
    <FormHelperText>We'll never share your email.</FormHelperText>
  </FormControl>
)

export const WithRadioGroup = () => {
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">Favorite Naruto Character</FormLabel>
      <RadioGroup.Root defaultValue="Itachi">
        <HStack gap="24px">
          <RadioGroup.Item value="Sasuke"><RadioGroup.ItemHiddenInput /><RadioGroup.ItemIndicator /><RadioGroup.ItemText>Sasuke</RadioGroup.ItemText></RadioGroup.Item>
          <RadioGroup.Item value="Nagato"><RadioGroup.ItemHiddenInput /><RadioGroup.ItemIndicator /><RadioGroup.ItemText>Nagato</RadioGroup.ItemText></RadioGroup.Item>
          <RadioGroup.Item value="Itachi"><RadioGroup.ItemHiddenInput /><RadioGroup.ItemIndicator /><RadioGroup.ItemText>Itachi</RadioGroup.ItemText></RadioGroup.Item>
          <RadioGroup.Item value="Sage of the six Paths"><RadioGroup.ItemHiddenInput /><RadioGroup.ItemIndicator /><RadioGroup.ItemText>Sage of the six Paths</RadioGroup.ItemText></RadioGroup.Item>
        </HStack>
      </RadioGroup.Root>
      <FormHelperText>Select only if you're a fan.</FormHelperText>
    </FormControl>
  );
}

export const WithErrorMessage = () => {
  const [input, setInput] = useState('')

  const handleInputChange = (e: any) => setInput(e.target.value)

  const isError = input === ''

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>Email</FormLabel>
      <Input type="email" value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
    </FormControl>
  )
}

export const WithRequiredField = () => (
  <FormControl isRequired>
    <FormLabel>First name</FormLabel>
    <Input placeholder="First name" />
  </FormControl>
)

export const WithSelect = () => (
  <FormControl>
    <FormLabel>Country</FormLabel>
    <NativeSelect.Root>
      <NativeSelect.Field placeholder="Select country">
        <option>United Arab Emirates</option>
        <option>Nigeria</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  </FormControl>
)

export const WithNumberInput = () => (
  <FormControl>
    <FormLabel>Amount</FormLabel>
    <NumberInput.Root max={50} min={10}>
      <NumberInput.Input />
      <NumberInput.Control>
        <NumberInput.IncrementTrigger />
        <NumberInput.DecrementTrigger />
      </NumberInput.Control>
    </NumberInput.Root>
  </FormControl>
)

export const WithFormik = () => {
  function validateName(value: any) {
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  return (
    <Formik
      initialValues={{ name: 'Sasuke' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {props => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="primary"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}
