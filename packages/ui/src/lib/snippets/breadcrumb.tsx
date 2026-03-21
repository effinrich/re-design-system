import type { SystemStyleObject } from "@chakra-ui/react"
import {
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbRoot as ChakraBreadcrumbRoot,
  BreadcrumbRootProps as BaseBreadcrumbRootProps,
  BreadcrumbSeparator,
} from "@chakra-ui/react/breadcrumb"

import * as React from "react"

export interface BreadcrumbRootProps extends BaseBreadcrumbRootProps {
  separator?: React.ReactNode
  separatorGap?: SystemStyleObject["gap"]
}

export const BreadcrumbRoot = React.forwardRef<
  HTMLDivElement,
  BreadcrumbRootProps
>(function BreadcrumbRoot(props, ref) {
  const { separator, separatorGap, children, ...rest } = props

  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement,
  )

  return (
    <ChakraBreadcrumbRoot ref={ref} {...rest}>
      <BreadcrumbList gap={separatorGap}>
        {validChildren.map((child, index) => {
          const last = index === validChildren.length - 1
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>{child}</BreadcrumbItem>
              {!last && (
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </ChakraBreadcrumbRoot>
  )
})

export { BreadcrumbLink, BreadcrumbCurrentLink, BreadcrumbEllipsis }
