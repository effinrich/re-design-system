import 'focus-visible/dist/focus-visible'

import { createSystem, defaultConfig } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose'

import * as components from './components'
import * as foundations from './foundations'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: { ...foundations.colors, primary: {
        value: foundations.colors.primary,
      } },
    },
  },

  ...foundations,
  components: { ...components },
})
