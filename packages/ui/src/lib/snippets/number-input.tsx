import {
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputRoot as ChakraNumberInputRoot,
  NumberInputRootProps,
  NumberInputScrubber,
} from "@chakra-ui/react/number-input"
import * as React from "react"

export interface NumberInputProps extends NumberInputRootProps {}

export const NumberInputRoot = React.forwardRef<
  HTMLDivElement,
  NumberInputProps
>(function NumberInput(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraNumberInputRoot ref={ref} variant="outline" {...rest}>
      {children}
      <NumberInputControl>
        <NumberInputIncrementTrigger />
        <NumberInputDecrementTrigger />
      </NumberInputControl>
    </ChakraNumberInputRoot>
  )
})

export const NumberInputField = NumberInputInput

export { NumberInputScrubber, NumberInputLabel }
