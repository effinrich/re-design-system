import { ComponentPropsWithoutRef } from 'react'
import { Textarea } from '@react/ui'

export const DrawerFormTextArea = (props: ComponentPropsWithoutRef<typeof Textarea>) => {
  return (
    <Textarea
      maxLength={500}
      _placeholder={{ color: 'gray.500' }}
      h={{ base: '150px' }}
      resize="none"
      {...props}
    />
  )
}
