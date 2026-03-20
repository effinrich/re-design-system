import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef
} from 'react'

import { Button as ChakraButton, ButtonGroup } from '@chakra-ui/react'

export type ButtonIntent = 'primary' | 'secondary' | 'danger'
export type ButtonSurface = 'default' | 'accent'

type ChakraButtonProps = ComponentPropsWithoutRef<typeof ChakraButton>
type ChakraButtonRef = ElementRef<typeof ChakraButton>
type ButtonVariant = ChakraButtonProps['variant'] | (string & {})

export interface ButtonProps extends Omit<ChakraButtonProps, 'variant'> {
  intent?: ButtonIntent
  surface?: ButtonSurface
  variant?: ButtonVariant
}

interface ResolvedButtonProps {
  colorPalette?: ChakraButtonProps['colorPalette']
  variant?: ButtonVariant
}

interface ButtonRecipeOptions {
  colorPalette?: ChakraButtonProps['colorPalette']
  intent?: ButtonIntent
  surface?: ButtonSurface
  variant?: ButtonVariant
}

const intentVariants: Record<
  ButtonIntent,
  Record<ButtonSurface, ButtonVariant>
> = {
  primary: {
    default: 'primary',
    accent: 'primary-on-accent'
  },
  secondary: {
    default: 'secondary',
    accent: 'secondary-on-accent'
  },
  danger: {
    default: 'solid',
    accent: 'solid'
  }
}

const intentColorSchemes: Partial<
  Record<ButtonIntent, ChakraButtonProps['colorPalette']>
> = {
  danger: 'red'
}

export const resolveButtonRecipe = ({
  colorScheme,
  intent,
  surface = 'default',
  variant
}: ButtonRecipeOptions): ResolvedButtonProps => {
  if (variant || colorScheme || !intent) {
    return { colorScheme, variant }
  }

  return {
    colorScheme: intentColorSchemes[intent],
    variant: intentVariants[intent][surface]
  }
}

export const Button = forwardRef<ChakraButtonRef, ButtonProps>(function Button(
  { colorScheme, intent, surface, variant, ...props },
  ref
) {
  const resolvedProps = resolveButtonRecipe({
    colorScheme,
    intent,
    surface,
    variant
  })

  return (
    <ChakraButton
      ref={ref}
      {...(resolvedProps as ChakraButtonProps)}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export { ButtonGroup }
