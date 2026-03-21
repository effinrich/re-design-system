import {
  RadioCardItem as ChakraRadioCardItem,
  RadioCardItemAddon,
  RadioCardItemContent,
  RadioCardItemControl,
  RadioCardItemDescription,
  RadioCardItemHiddenInput,
  RadioCardItemIndicator,
  RadioCardItemProps as BaseRadioCardItemProps,
  RadioCardItemText,
  RadioCardLabel,
  RadioCardRoot,
} from "@chakra-ui/react/radio-card"
import * as React from "react"

interface RadioCardItemProps extends BaseRadioCardItemProps {
  icon?: React.ReactElement
  label?: React.ReactNode
  description?: React.ReactNode
  addon?: React.ReactNode
  indicator?: React.ReactNode | null
  indicatorPlacement?: "start" | "end" | "inside"
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const RadioCardItem = React.forwardRef<
  HTMLInputElement,
  RadioCardItemProps
>(function RadioCardItem(props, ref) {
  const {
    inputProps,
    label,
    description,
    addon,
    icon,
    indicator = <RadioCardItemIndicator />,
    indicatorPlacement = "end",
    ...rest
  } = props

  const hasContent = label || description || icon
  const ContentWrapper = indicator ? RadioCardItemContent : React.Fragment

  return (
    <ChakraRadioCardItem {...rest}>
      <RadioCardItemHiddenInput ref={ref} {...inputProps} />
      <RadioCardItemControl>
        {indicatorPlacement === "start" && indicator}
        {hasContent && (
          <ContentWrapper>
            {icon}
            {label && <RadioCardItemText>{label}</RadioCardItemText>}
            {description && (
              <RadioCardItemDescription>
                {description}
              </RadioCardItemDescription>
            )}
            {indicatorPlacement === "inside" && indicator}
          </ContentWrapper>
        )}
        {indicatorPlacement === "end" && indicator}
      </RadioCardItemControl>
      {addon && <RadioCardItemAddon>{addon}</RadioCardItemAddon>}
    </ChakraRadioCardItem>
  )
})

export { RadioCardRoot, RadioCardLabel, RadioCardItemIndicator }
