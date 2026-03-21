import {
  SplitterContext,
  SplitterPanel as ChakraSplitterPanel,
  SplitterPanelProps,
  SplitterPropsProvider,
  SplitterResizeTrigger as ChakraSplitterResizeTrigger,
  SplitterResizeTriggerProps,
  SplitterRoot,
  SplitterRootProps,
  SplitterRootProvider,
} from "@chakra-ui/react/splitter"
import * as React from "react"

export interface SplitterProps extends SplitterRootProps {
  orientation?: "horizontal" | "vertical"
}

export const Splitter = React.forwardRef<HTMLDivElement, SplitterProps>(
  function Splitter(props, ref) {
    const { orientation = "horizontal", children, ...rest } = props
    return (
      <SplitterRoot ref={ref} orientation={orientation} {...rest}>
        {children}
      </SplitterRoot>
    )
  },
)

export const SplitterPanel = React.forwardRef<
  HTMLDivElement,
  SplitterPanelProps
>(function SplitterPanel(props, ref) {
  return <ChakraSplitterPanel {...props} ref={ref} />
})

export const SplitterResizeTrigger = React.forwardRef<
  HTMLButtonElement,
  SplitterResizeTriggerProps
>(function SplitterResizeTrigger(props, ref) {
  return <ChakraSplitterResizeTrigger {...props} ref={ref} />
})

export { SplitterRoot, SplitterRootProvider, SplitterPropsProvider, SplitterContext }
