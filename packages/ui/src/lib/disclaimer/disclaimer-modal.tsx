import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react'
import { Button } from '@react/ui'
import {
  DialogRoot,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../snippets/dialog'

export interface DisclaimerModalProps {
  children: ReactNode
  header: string
  buttonText: string
}

export const DisclaimerModal = forwardRef(
  ({ children, header, buttonText }: DisclaimerModalProps, ref) => {
    const [open, setOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      handleOnOpen() {
        setOpen(true)
      }
    }))

    return (
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)} centered size={['full', 'md']}>
        <DialogContent>
          <DialogHeader>{header}</DialogHeader>
          <DialogBody color="gray.500">{children}</DialogBody>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} colorPalette="primary">
              {buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    )
  }
)

DisclaimerModal.displayName = 'DisclaimerModal'
