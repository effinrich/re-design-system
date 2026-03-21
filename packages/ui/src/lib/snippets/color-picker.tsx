import type { IconButtonProps, StackProps } from "@chakra-ui/react"
import {
  ColorPickerArea as ChakraColorPickerArea,
  ColorPickerAreaBackground,
  ColorPickerAreaProps,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelInputProps,
  ColorPickerChannelSlider as ChakraColorPickerChannelSlider,
  ColorPickerChannelSliderProps,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent as ChakraColorPickerContent,
  ColorPickerContentProps as BaseColorPickerContentProps,
  ColorPickerControl,
  ColorPickerEyeDropperTrigger,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerRoot as ChakraColorPickerRoot,
  ColorPickerRootProps,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
  ColorPickerSwatchIndicator,
  ColorPickerSwatchTrigger as ChakraColorPickerSwatchTrigger,
  ColorPickerSwatchTriggerProps,
  ColorPickerTransparencyGrid,
  ColorPickerTrigger as ChakraColorPickerTrigger,
  ColorPickerTriggerProps,
  ColorPickerValueSwatch,
  ColorPickerValueText,
  ColorPickerView,
  ColorPickerViewProps,
} from "@chakra-ui/react/color-picker"
import { Portal } from "@chakra-ui/react/portal"
import { For, IconButton, Span, Stack, Text, VStack } from "@chakra-ui/react"

import * as React from "react"
import { LuCheck, LuPipette } from "react-icons/lu"

export const ColorPickerTrigger = React.forwardRef<
  HTMLButtonElement,
  ColorPickerTriggerProps & { fitContent?: boolean }
>(function ColorPickerTrigger(props, ref) {
  const { fitContent, ...rest } = props
  return (
    <ChakraColorPickerTrigger
      data-fit-content={fitContent || undefined}
      ref={ref}
      {...rest}
    >
      {props.children || <ColorPickerValueSwatch />}
    </ChakraColorPickerTrigger>
  )
})

export const ColorPickerInput = React.forwardRef<
  HTMLInputElement,
  Omit<ColorPickerChannelInputProps, "channel">
>(function ColorHexInput(props, ref) {
  return <ColorPickerChannelInput channel="hex" ref={ref} {...props} />
})

interface ColorPickerContentProps extends BaseColorPickerContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const ColorPickerContent = React.forwardRef<
  HTMLDivElement,
  ColorPickerContentProps
>(function ColorPickerContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ColorPickerPositioner>
        <ChakraColorPickerContent ref={ref} {...rest} />
      </ColorPickerPositioner>
    </Portal>
  )
})

export const ColorPickerInlineContent = React.forwardRef<
  HTMLDivElement,
  ColorPickerContentProps
>(function ColorPickerInlineContent(props, ref) {
  return (
    <ChakraColorPickerContent
      animation="none"
      shadow="none"
      padding="0"
      ref={ref}
      {...props}
    />
  )
})

export const ColorPickerSliders = React.forwardRef<HTMLDivElement, StackProps>(
  function ColorPickerSliders(props, ref) {
    return (
      <Stack gap="1" flex="1" px="1" ref={ref} {...props}>
        <ChakraColorPickerChannelSlider channel="hue" />
        <ChakraColorPickerChannelSlider channel="alpha" />
      </Stack>
    )
  },
)

export const ColorPickerArea = React.forwardRef<
  HTMLDivElement,
  ColorPickerAreaProps
>(function ColorPickerArea(props, ref) {
  return (
    <ChakraColorPickerArea ref={ref} {...props}>
      <ColorPickerAreaBackground />
      <ColorPickerAreaThumb />
    </ChakraColorPickerArea>
  )
})

export const ColorPickerEyeDropper = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(function ColorPickerEyeDropper(props, ref) {
  return (
    <ColorPickerEyeDropperTrigger asChild>
      <IconButton size="xs" variant="outline" ref={ref} {...props}>
        <LuPipette />
      </IconButton>
    </ColorPickerEyeDropperTrigger>
  )
})

export const ColorPickerChannelSlider = React.forwardRef<
  HTMLDivElement,
  ColorPickerChannelSliderProps
>(function ColorPickerSlider(props, ref) {
  return (
    <ChakraColorPickerChannelSlider ref={ref} {...props}>
      <ColorPickerTransparencyGrid size="0.6rem" />
      <ColorPickerChannelSliderTrack />
      <ColorPickerChannelSliderThumb />
    </ChakraColorPickerChannelSlider>
  )
})

export const ColorPickerSwatchTrigger = React.forwardRef<
  HTMLButtonElement,
  ColorPickerSwatchTriggerProps & {
    swatchSize?: ColorPickerSwatchTriggerProps["boxSize"]
  }
>(function ColorPickerSwatchTrigger(props, ref) {
  const { swatchSize, children, ...rest } = props
  return (
    <ChakraColorPickerSwatchTrigger
      ref={ref}
      style={{ ["--color" as string]: props.value }}
      {...rest}
    >
      {children || (
        <ColorPickerSwatch boxSize={swatchSize} value={props.value}>
          <ColorPickerSwatchIndicator>
            <LuCheck />
          </ColorPickerSwatchIndicator>
        </ColorPickerSwatch>
      )}
    </ChakraColorPickerSwatchTrigger>
  )
})

export const ColorPickerRoot = React.forwardRef<
  HTMLDivElement,
  ColorPickerRootProps
>(function ColorPickerRoot(props, ref) {
  return (
    <ChakraColorPickerRoot ref={ref} {...props}>
      {props.children}
      <ColorPickerHiddenInput tabIndex={-1} />
    </ChakraColorPickerRoot>
  )
})

const formatMap = {
  rgba: ["red", "green", "blue", "alpha"],
  hsla: ["hue", "saturation", "lightness", "alpha"],
  hsba: ["hue", "saturation", "brightness", "alpha"],
  hexa: ["hex", "alpha"],
} as const

export const ColorPickerChannelInputs = React.forwardRef<
  HTMLDivElement,
  ColorPickerViewProps
>(function ColorPickerChannelInputs(props, ref) {
  const channels = formatMap[props.format]
  return (
    <ColorPickerView flexDirection="row" ref={ref} {...props}>
      {channels.map((channel) => (
        <VStack gap="1" key={channel} flex="1">
          <ColorPickerChannelInput
            channel={channel}
            px="0"
            height="7"
            textStyle="xs"
            textAlign="center"
          />
          <Text textStyle="xs" color="fg.muted" fontWeight="medium">
            {channel.charAt(0).toUpperCase()}
          </Text>
        </VStack>
      ))}
    </ColorPickerView>
  )
})

export const ColorPickerChannelSliders = React.forwardRef<
  HTMLDivElement,
  ColorPickerViewProps
>(function ColorPickerChannelSliders(props, ref) {
  const channels = formatMap[props.format]
  return (
    <ColorPickerView {...props} ref={ref}>
      <For each={channels}>
        {(channel) => (
          <Stack gap="1" key={channel}>
            <Span
              textStyle="xs"
              minW="5ch"
              textTransform="capitalize"
              fontWeight="medium"
            >
              {channel}
            </Span>
            <ChakraColorPickerChannelSlider channel={channel} />
          </Stack>
        )}
      </For>
    </ColorPickerView>
  )
})

export { ColorPickerLabel, ColorPickerControl, ColorPickerValueText, ColorPickerValueSwatch, ColorPickerChannelInput, ColorPickerSwatchGroup }
