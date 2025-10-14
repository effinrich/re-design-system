import { Textarea, TextareaProps } from '@react/ui'

export const DrawerFormTextArea = (props: TextareaProps) => {
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
