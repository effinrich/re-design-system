import { chakra } from '@chakra-ui/react'
import { Input, Text } from '@react/ui'

export const DrawerFormHeader = chakra(Text, {
  base: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 'medium',
    margin: '0px',
    color: 'gray.700',
  },
})

export const DrawerFormDescription = chakra(Text, {
  base: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 'normal',
    color: 'gray.500',
  },
})

export const DrawerFormInput = chakra(Input, {
  base: { _placeholder: { color: 'gray.500' } },
})

export const DrawerFormControl = chakra('div', {
  base: {
    display: 'flex',
    flexDir: 'column',
    gap: '3px',
  },
})
