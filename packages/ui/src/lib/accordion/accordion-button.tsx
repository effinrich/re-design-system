import { forwardRef } from "react";
import { cx } from '@chakra-ui/shared-utils'
import { chakra, HTMLChakraProps, SystemStyleObject } from '@chakra-ui/react';

import {
  useAccordionItemContext,
  useAccordionStyles
} from './accordion-context'

export type AccordionButtonProps = HTMLChakraProps<'button'>

/**
 * AccordionButton is used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in a heading tag,
 * that is appropriate for the information architecture of the page.
 */

export const AccordionButton = forwardRef<HTMLButtonElement, AccordionButtonProps>(
  function AccordionButton(props, ref) {
    const { getButtonProps } = useAccordionItemContext()
    const buttonProps = getButtonProps(props, ref)

    const styles = useAccordionStyles()
    const buttonStyles: SystemStyleObject = {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      outline: 0,
      ...styles.button
    }

    return (
      <chakra.button
        {...buttonProps}
        className={cx('chakra-accordion__button', props.className)}
        __css={buttonStyles}
      />
    )
  }
)

AccordionButton.displayName = 'AccordionButton'

export default AccordionButton
