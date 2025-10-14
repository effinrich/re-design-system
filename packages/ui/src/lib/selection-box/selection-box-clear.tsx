import { Button, ButtonProps } from '@react/ui'

type SelectionBoxClearProps = Omit<ButtonProps, 'children'>

export const SelectionBoxClear = (props: SelectionBoxClearProps) => {
  return (
    <Button {...props} variant="link" colorScheme="primary" size="sm">
      Clear
    </Button>
  )
}
