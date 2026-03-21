"use client"

import type { ButtonProps, TextProps } from "@chakra-ui/react"
import {
  PaginationContext,
  PaginationEllipsis as ChakraPaginationEllipsis,
  PaginationEllipsisProps,
  PaginationItem as ChakraPaginationItem,
  PaginationItemProps,
  PaginationNextTrigger as ChakraPaginationNextTrigger,
  PaginationNextTriggerProps,
  PaginationPrevTrigger as ChakraPaginationPrevTrigger,
  PaginationPrevTriggerProps,
  PaginationRoot as ChakraPaginationRoot,
  PaginationRootProps as ChakraPaginationRootProps,
  usePaginationContext,
} from "@chakra-ui/react/pagination"
import { Button, IconButton, Text, createContext } from "@chakra-ui/react"

import * as React from "react"
import {
  HiChevronLeft,
  HiChevronRight,
  HiMiniEllipsisHorizontal,
} from "react-icons/hi2"
import { LinkButton } from "./link-button"

interface ButtonVariantMap {
  current: ButtonProps["variant"]
  default: ButtonProps["variant"]
  ellipsis: ButtonProps["variant"]
}

type PaginationVariant = "outline" | "solid" | "subtle"

interface ButtonVariantContext {
  size: ButtonProps["size"]
  variantMap: ButtonVariantMap
  getHref?: (page: number) => string
}

const [RootPropsProvider, useRootProps] = createContext<ButtonVariantContext>({
  name: "RootPropsProvider",
})

export interface PaginationRootProps
  extends Omit<ChakraPaginationRootProps, "type"> {
  size?: ButtonProps["size"]
  variant?: PaginationVariant
  getHref?: (page: number) => string
}

const variantMap: Record<PaginationVariant, ButtonVariantMap> = {
  outline: { default: "ghost", ellipsis: "plain", current: "outline" },
  solid: { default: "outline", ellipsis: "outline", current: "solid" },
  subtle: { default: "ghost", ellipsis: "plain", current: "subtle" },
}

export const PaginationRoot = React.forwardRef<
  HTMLDivElement,
  PaginationRootProps
>(function PaginationRoot(props, ref) {
  const { size = "sm", variant = "outline", getHref, ...rest } = props
  return (
    <RootPropsProvider
      value={{ size, variantMap: variantMap[variant], getHref }}
    >
      <ChakraPaginationRoot
        ref={ref}
        type={getHref ? "link" : "button"}
        {...rest}
      />
    </RootPropsProvider>
  )
})

export const PaginationEllipsis = React.forwardRef<
  HTMLDivElement,
  PaginationEllipsisProps
>(function PaginationEllipsis(props, ref) {
  const { size, variantMap } = useRootProps()
  return (
    <ChakraPaginationEllipsis ref={ref} {...props} asChild>
      <Button as="span" variant={variantMap.ellipsis} size={size}>
        <HiMiniEllipsisHorizontal />
      </Button>
    </ChakraPaginationEllipsis>
  )
})

export const PaginationItem = React.forwardRef<
  HTMLButtonElement,
  PaginationItemProps
>(function PaginationItem(props, ref) {
  const { page } = usePaginationContext()
  const { size, variantMap, getHref } = useRootProps()

  const current = page === props.value
  const variant = current ? variantMap.current : variantMap.default

  if (getHref) {
    return (
      <LinkButton href={getHref(props.value)} variant={variant} size={size}>
        {props.value}
      </LinkButton>
    )
  }

  return (
    <ChakraPaginationItem ref={ref} {...props} asChild>
      <Button variant={variant} size={size}>
        {props.value}
      </Button>
    </ChakraPaginationItem>
  )
})

export const PaginationPrevTrigger = React.forwardRef<
  HTMLButtonElement,
  PaginationPrevTriggerProps
>(function PaginationPrevTrigger(props, ref) {
  const { size, variantMap, getHref } = useRootProps()
  const { previousPage } = usePaginationContext()

  if (getHref) {
    return (
      <LinkButton
        href={previousPage != null ? getHref(previousPage) : undefined}
        variant={variantMap.default}
        size={size}
      >
        <HiChevronLeft />
      </LinkButton>
    )
  }

  return (
    <ChakraPaginationPrevTrigger ref={ref} asChild {...props}>
      <IconButton variant={variantMap.default} size={size}>
        <HiChevronLeft />
      </IconButton>
    </ChakraPaginationPrevTrigger>
  )
})

export const PaginationNextTrigger = React.forwardRef<
  HTMLButtonElement,
  PaginationNextTriggerProps
>(function PaginationNextTrigger(props, ref) {
  const { size, variantMap, getHref } = useRootProps()
  const { nextPage } = usePaginationContext()

  if (getHref) {
    return (
      <LinkButton
        href={nextPage != null ? getHref(nextPage) : undefined}
        variant={variantMap.default}
        size={size}
      >
        <HiChevronRight />
      </LinkButton>
    )
  }

  return (
    <ChakraPaginationNextTrigger ref={ref} asChild {...props}>
      <IconButton variant={variantMap.default} size={size}>
        <HiChevronRight />
      </IconButton>
    </ChakraPaginationNextTrigger>
  )
})

export const PaginationItems = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <PaginationContext>
      {({ pages }) =>
        pages.map((page, index) => {
          return page.type === "ellipsis" ? (
            <ChakraPaginationEllipsis key={index} index={index} {...props} />
          ) : (
            <ChakraPaginationItem
              key={index}
              type="page"
              value={page.value}
              {...props}
            />
          )
        })
      }
    </PaginationContext>
  )
}

interface PageTextProps extends TextProps {
  format?: "short" | "compact" | "long"
}

export const PaginationPageText = React.forwardRef<
  HTMLParagraphElement,
  PageTextProps
>(function PaginationPageText(props, ref) {
  const { format = "compact", ...rest } = props
  const { page, totalPages, pageRange, count } = usePaginationContext()
  const content = React.useMemo(() => {
    if (format === "short") return `${page} / ${totalPages}`
    if (format === "compact") return `${page} of ${totalPages}`
    return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} of ${count}`
  }, [format, page, totalPages, pageRange, count])

  return (
    <Text fontWeight="medium" ref={ref} {...rest}>
      {content}
    </Text>
  )
})
