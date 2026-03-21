import {
  TimelineConnector as ChakraTimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineIndicatorProps,
  TimelineItem,
  TimelineRoot,
  TimelineSeparator,
  TimelineTitle,
} from "@chakra-ui/react/timeline"
import * as React from "react"

export const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  TimelineIndicatorProps
>(function TimelineConnector(props, ref) {
  return (
    <ChakraTimelineConnector ref={ref}>
      <TimelineSeparator />
      <TimelineIndicator {...props} />
    </ChakraTimelineConnector>
  )
})

export { TimelineRoot, TimelineContent, TimelineItem, TimelineIndicator, TimelineTitle, TimelineDescription }
