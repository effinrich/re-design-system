import {
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderMarkerIndicator,
  SliderRange,
  SliderRoot,
  SliderRootProps,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from "@chakra-ui/react/slider"
import { For, HStack } from "@chakra-ui/react"
import * as React from "react"

export interface SliderProps extends SliderRootProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>
  label?: React.ReactNode
  showValue?: boolean
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const { marks: marksProp, label, showValue, ...rest } = props
    const value = props.defaultValue ?? props.value

    const marks = marksProp?.map((mark) => {
      if (typeof mark === "number") return { value: mark, label: undefined }
      return mark
    })

    const hasMarkLabel = !!marks?.some((mark) => mark.label)

    return (
      <SliderRoot ref={ref} thumbAlignment="center" {...rest}>
        {label && !showValue && (
          <SliderLabel>{label}</SliderLabel>
        )}
        {label && showValue && (
          <HStack justify="space-between">
            <SliderLabel>{label}</SliderLabel>
            <SliderValueText />
          </HStack>
        )}
        <SliderControl data-has-mark-label={hasMarkLabel || undefined}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs value={value} />
          <SliderMarks marks={marks} />
        </SliderControl>
      </SliderRoot>
    )
  },
)

function SliderThumbs(props: { value?: number[] }) {
  const { value } = props
  return (
    <For each={value}>
      {(_, index) => (
        <SliderThumb key={index} index={index}>
          <SliderHiddenInput />
        </SliderThumb>
      )}
    </For>
  )
}

interface SliderMarksProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>
}

const SliderMarks = React.forwardRef<HTMLDivElement, SliderMarksProps>(
  function SliderMarks(props, ref) {
    const { marks } = props
    if (!marks?.length) return null

    return (
      <SliderMarkerGroup ref={ref}>
        {marks.map((mark, index) => {
          const value = typeof mark === "number" ? mark : mark.value
          const label = typeof mark === "number" ? undefined : mark.label
          return (
            <SliderMarker key={index} value={value}>
              <SliderMarkerIndicator />
              {label}
            </SliderMarker>
          )
        })}
      </SliderMarkerGroup>
    )
  },
)
