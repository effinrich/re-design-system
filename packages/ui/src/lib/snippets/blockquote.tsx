import {
  BlockquoteCaption,
  BlockquoteContent,
  BlockquoteIcon,
  BlockquoteRoot,
  BlockquoteRootProps,
} from "@chakra-ui/react/blockquote"
import * as React from "react"

export interface BlockquoteProps extends BlockquoteRootProps {
  cite?: React.ReactNode
  citeUrl?: string
  icon?: React.ReactNode
  showDash?: boolean
}

export const Blockquote = React.forwardRef<HTMLDivElement, BlockquoteProps>(
  function Blockquote(props, ref) {
    const { children, cite, citeUrl, showDash, icon, ...rest } = props

    return (
      <BlockquoteRoot ref={ref} {...rest}>
        {icon}
        <BlockquoteContent cite={citeUrl}>
          {children}
        </BlockquoteContent>
        {cite && (
          <BlockquoteCaption>
            {showDash ? <>&mdash;</> : null} <cite>{cite}</cite>
          </BlockquoteCaption>
        )}
      </BlockquoteRoot>
    )
  },
)

export { BlockquoteIcon }
