import {
  NumberInputDecrementTrigger,
  NumberInputDecrementTriggerProps,
  NumberInputIncrementTrigger,
  NumberInputIncrementTriggerProps,
  NumberInputLabel,
  NumberInputRoot,
  NumberInputRootProps,
  NumberInputValueText,
} from "@chakra-ui/react/number-input"
import { HStack, IconButton } from "@chakra-ui/react"
import * as React from "react"
import { LuMinus, LuPlus } from "react-icons/lu"

export interface StepperInputProps extends NumberInputRootProps {
  label?: React.ReactNode
}

export const StepperInput = React.forwardRef<HTMLDivElement, StepperInputProps>(
  function StepperInput(props, ref) {
    const { label, ...rest } = props
    return (
      <NumberInputRoot {...rest} unstyled ref={ref}>
        {label && <NumberInputLabel>{label}</NumberInputLabel>}
        <HStack gap="2">
          <DecrementTrigger />
          <NumberInputValueText textAlign="center" fontSize="lg" minW="3ch" />
          <IncrementTrigger />
        </HStack>
      </NumberInputRoot>
    )
  },
)

const DecrementTrigger = React.forwardRef<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>(function DecrementTrigger(props, ref) {
  return (
    <NumberInputDecrementTrigger {...props} asChild ref={ref}>
      <IconButton variant="outline" size="sm">
        <LuMinus />
      </IconButton>
    </NumberInputDecrementTrigger>
  )
})

const IncrementTrigger = React.forwardRef<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>(function IncrementTrigger(props, ref) {
  return (
    <NumberInputIncrementTrigger {...props} asChild ref={ref}>
      <IconButton variant="outline" size="sm">
        <LuPlus />
      </IconButton>
    </NumberInputIncrementTrigger>
  )
})
