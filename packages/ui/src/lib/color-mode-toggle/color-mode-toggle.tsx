import { IconButton } from '@chakra-ui/react'

import { useColorMode } from '../snippets/color-mode'
import { MoonIcon } from '../icons/src/Moon'
import { SunIcon } from '../icons/src/Sun'

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      onClick={toggleColorMode}
      size="md"
      aria-label="theme toggle"
      colorPalette="primary"
    >
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  )
}

export default ColorModeToggle
