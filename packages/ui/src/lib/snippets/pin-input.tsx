import {
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputRoot,
  PinInputRootProps,
} from "@chakra-ui/react/pin-input"
import { Group } from "@chakra-ui/react/group"
import * as React from "react"

export interface PinInputProps extends PinInputRootProps {
  rootRef?: React.RefObject<HTMLDivElement | null>
  count?: number
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  attached?: boolean
}

export const PinInput = React.forwardRef<HTMLInputElement, PinInputProps>(
  function PinInput(props, ref) {
    const { count = 4, inputProps, rootRef, attached, ...rest } = props
    return (
      <PinInputRoot ref={rootRef} {...rest}>
        <PinInputHiddenInput ref={ref} {...inputProps} />
        <PinInputControl>
          <Group attached={attached}>
            {Array.from({ length: count }).map((_, index) => (
              <PinInputInput key={index} index={index} />
            ))}
          </Group>
        </PinInputControl>
      </PinInputRoot>
    )
  },
)
