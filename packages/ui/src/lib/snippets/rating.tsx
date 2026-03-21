import {
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupLabel,
  RatingGroupRoot,
  RatingGroupRootProps,
} from "@chakra-ui/react/rating-group"
import * as React from "react"

export interface RatingProps extends RatingGroupRootProps {
  icon?: React.ReactElement
  count?: number
  label?: React.ReactNode
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  function Rating(props, ref) {
    const { icon, count = 5, label, ...rest } = props
    return (
      <RatingGroupRoot ref={ref} count={count} {...rest}>
        {label && <RatingGroupLabel>{label}</RatingGroupLabel>}
        <RatingGroupHiddenInput />
        <RatingGroupControl>
          {Array.from({ length: count }).map((_, index) => (
            <RatingGroupItem key={index} index={index + 1}>
              <RatingGroupItemIndicator icon={icon} />
            </RatingGroupItem>
          ))}
        </RatingGroupControl>
      </RatingGroupRoot>
    )
  },
)
