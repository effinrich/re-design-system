"use client"

import {
  CarouselAutoplayTrigger,
  CarouselControl,
  CarouselControlProps,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselIndicatorGroupProps,
  CarouselItem as ChakraCarouselItem,
  CarouselItemGroup,
  CarouselItemProps,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselRoot as ChakraCarouselRoot,
  CarouselRootProps as BaseCarouselRootProps,
} from "@chakra-ui/react/carousel"
import { Box, IconButton, Image } from "@chakra-ui/react"

import * as React from "react"
import { LuPause, LuPlay } from "react-icons/lu"

interface CarouselRootProps extends BaseCarouselRootProps {
  withAutoplay?: boolean
}

export const CarouselRoot = React.forwardRef<HTMLDivElement, CarouselRootProps>(
  function CarouselRoot(props, ref) {
    const { children, withAutoplay, ...rest } = props
    return (
      <ChakraCarouselRoot {...rest} ref={ref}>
        {children}
        {withAutoplay && (
          <Box
            position="absolute"
            bottom="var(--carousel-spacing)"
            right="var(--carousel-spacing)"
          >
            <CarouselAutoplayTrigger asChild>
              <IconButton
                aria-label="Toggle autoplay"
                size="sm"
                variant="ghost"
              >
                <AutoplayIcon />
              </IconButton>
            </CarouselAutoplayTrigger>
          </Box>
        )}
      </ChakraCarouselRoot>
    )
  },
)

export const CarouselControls = React.forwardRef<
  HTMLDivElement,
  CarouselControlProps
>(function CarouselControls(props, ref) {
  return (
    <CarouselControl ref={ref} {...props}>
      <CarouselPrevTrigger aria-label="Previous" />
      <CarouselNextTrigger aria-label="Next" />
    </CarouselControl>
  )
})

export const CarouselIndicators = React.forwardRef<
  HTMLDivElement,
  CarouselIndicatorGroupProps
>(function CarouselIndicators(props, ref) {
  return <CarouselIndicatorGroup ref={ref} {...props} />
})

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  CarouselItemProps & { src?: string; alt?: string }
>(function CarouselItem({ src, alt, children, ...rest }, ref) {
  return (
    <ChakraCarouselItem {...rest} ref={ref}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          w="full"
          h="300px"
          objectFit="cover"
          borderRadius="md"
        />
      ) : (
        children
      )}
    </ChakraCarouselItem>
  )
})

const AutoplayIcon = () => {
  const [running, setRunning] = React.useState(true)
  const toggle = () => setRunning(!running)
  return <Box onClick={toggle}>{running ? <LuPause /> : <LuPlay />}</Box>
}

export { CarouselItemGroup, CarouselIndicator, CarouselPrevTrigger, CarouselNextTrigger, CarouselAutoplayTrigger }
