import {
  CheckboxCardAddon,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardDescription,
  CheckboxCardHiddenInput,
  CheckboxCardIndicator,
  CheckboxCardLabel,
  CheckboxCardRoot,
  CheckboxCardRootProps,
} from "@chakra-ui/react/checkbox-card"
import * as React from "react"

export interface CheckboxCardProps extends CheckboxCardRootProps {
  icon?: React.ReactElement
  label?: React.ReactNode
  description?: React.ReactNode
  addon?: React.ReactNode
  indicator?: React.ReactNode | null
  indicatorPlacement?: "start" | "end" | "inside"
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const CheckboxCard = React.forwardRef<
  HTMLInputElement,
  CheckboxCardProps
>(function CheckboxCard(props, ref) {
  const {
    inputProps,
    label,
    description,
    icon,
    addon,
    indicator = <CheckboxCardIndicator />,
    indicatorPlacement = "end",
    ...rest
  } = props

  const hasContent = label || description || icon
  const ContentWrapper = indicator ? CheckboxCardContent : React.Fragment

  return (
    <CheckboxCardRoot {...rest}>
      <CheckboxCardHiddenInput ref={ref} {...inputProps} />
      <CheckboxCardControl>
        {indicatorPlacement === "start" && indicator}
        {hasContent && (
          <ContentWrapper>
            {icon}
            {label && (
              <CheckboxCardLabel>{label}</CheckboxCardLabel>
            )}
            {description && (
              <CheckboxCardDescription>
                {description}
              </CheckboxCardDescription>
            )}
            {indicatorPlacement === "inside" && indicator}
          </ContentWrapper>
        )}
        {indicatorPlacement === "end" && indicator}
      </CheckboxCardControl>
      {addon && <CheckboxCardAddon>{addon}</CheckboxCardAddon>}
    </CheckboxCardRoot>
  )
})

export { CheckboxCardIndicator }
