import {
  TagCloseTrigger,
  TagEndElement,
  TagLabel,
  TagRoot,
  TagRootProps,
  TagStartElement,
} from "@chakra-ui/react/tag"
import * as React from "react"

export interface TagProps extends TagRootProps {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  onClose?: VoidFunction
  closable?: boolean
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  function Tag(props, ref) {
    const {
      startElement,
      endElement,
      onClose,
      closable = !!onClose,
      children,
      ...rest
    } = props

    return (
      <TagRoot ref={ref} {...rest}>
        {startElement && (
          <TagStartElement>{startElement}</TagStartElement>
        )}
        <TagLabel>{children}</TagLabel>
        {endElement && (
          <TagEndElement>{endElement}</TagEndElement>
        )}
        {closable && (
          <TagEndElement>
            <TagCloseTrigger onClick={onClose} />
          </TagEndElement>
        )}
      </TagRoot>
    )
  },
)
