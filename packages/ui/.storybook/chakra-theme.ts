import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6e6ff',
      100: '#c4c4ff',
      200: '#9d9dff',
      300: '#7676ff',
      400: '#5454ff',
      500: '#3d3dff',
      600: '#3232cc',
      700: '#272799',
      800: '#1c1c66',
      900: '#111133'
    },
    purple: {
      50: '#f5e6ff',
      100: '#e0b3ff',
      200: '#ca80ff',
      300: '#b54dff',
      400: '#a01aff',
      500: '#8600e6',
      600: '#6900b3',
      700: '#4d0080',
      800: '#30004d',
      900: '#13001a'
    }
  },
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50'
      }
    })
  }
})
