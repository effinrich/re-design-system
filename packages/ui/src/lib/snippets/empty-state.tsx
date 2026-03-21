import {
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIndicator,
  EmptyStateRoot,
  EmptyStateRootProps,
  EmptyStateTitle,
} from "@chakra-ui/react/empty-state"
import { VStack } from "@chakra-ui/react"
import * as React from "react"

export interface EmptyStateProps extends EmptyStateRootProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props
    return (
      <EmptyStateRoot ref={ref} {...rest}>
        <EmptyStateContent>
          {icon && (
            <EmptyStateIndicator>{icon}</EmptyStateIndicator>
          )}
          {description ? (
            <VStack textAlign="center">
              <EmptyStateTitle>{title}</EmptyStateTitle>
              <EmptyStateDescription>
                {description}
              </EmptyStateDescription>
            </VStack>
          ) : (
            <EmptyStateTitle>{title}</EmptyStateTitle>
          )}
          {children}
        </EmptyStateContent>
      </EmptyStateRoot>
    )
  },
)
