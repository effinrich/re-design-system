import {
  AvatarFallback,
  AvatarGroup as ChakraAvatarGroup,
  AvatarImage,
  AvatarRoot,
  AvatarRootProps,
} from "@chakra-ui/react/avatar"
import * as React from "react"

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export interface AvatarProps extends AvatarRootProps {
  name?: string
  src?: string
  srcSet?: string
  loading?: ImageProps["loading"]
  icon?: React.ReactElement
  fallback?: React.ReactNode
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const { name, src, srcSet, loading, icon, fallback, children, ...rest } =
      props
    return (
      <AvatarRoot ref={ref} {...rest}>
        <AvatarFallback name={name}>
          {icon || fallback}
        </AvatarFallback>
        <AvatarImage src={src} srcSet={srcSet} loading={loading} />
        {children}
      </AvatarRoot>
    )
  },
)

export const AvatarGroup = ChakraAvatarGroup
