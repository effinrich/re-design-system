import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchIndicator,
  SwitchLabel,
  SwitchRoot,
  SwitchRootProps,
  SwitchThumb,
  SwitchThumbIndicator,
} from "@chakra-ui/react/switch"
import * as React from "react"

export interface SwitchProps extends SwitchRootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  rootRef?: React.RefObject<HTMLLabelElement | null>
  trackLabel?: { on: React.ReactNode; off: React.ReactNode }
  thumbLabel?: { on: React.ReactNode; off: React.ReactNode }
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(props, ref) {
    const { inputProps, children, rootRef, trackLabel, thumbLabel, ...rest } =
      props

    return (
      <SwitchRoot ref={rootRef} {...rest}>
        <SwitchHiddenInput ref={ref} {...inputProps} />
        <SwitchControl>
          <SwitchThumb>
            {thumbLabel && (
              <SwitchThumbIndicator fallback={thumbLabel?.off}>
                {thumbLabel?.on}
              </SwitchThumbIndicator>
            )}
          </SwitchThumb>
          {trackLabel && (
            <SwitchIndicator fallback={trackLabel.off}>
              {trackLabel.on}
            </SwitchIndicator>
          )}
        </SwitchControl>
        {children != null && (
          <SwitchLabel>{children}</SwitchLabel>
        )}
      </SwitchRoot>
    )
  },
)
