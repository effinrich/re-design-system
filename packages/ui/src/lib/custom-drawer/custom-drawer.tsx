import { forwardRef, ReactElement, useImperativeHandle, useState, useCallback } from 'react'
import { FieldErrors } from 'react-hook-form'
import { Button, Text } from '@chakra-ui/react'

import {
  DrawerRoot,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '../snippets/drawer'
import { AxiosErrorAlert } from '../axios-error-alert/axios-error-alert'

interface CustomDrawerProps {
  title: string
  children: ReactElement
  description?: string
  errors: FieldErrors
  isLoading: boolean
  isError: boolean
  ctaText?: string
  isValid?: boolean
  handleOnSubmit: () => void
  handleOnCloseComplete?: () => void
}

export const CustomDrawer = forwardRef(
  (
    {
      title,
      description,
      children,
      isLoading,
      isError,
      ctaText = 'Submit',
      isValid,
      errors,
      handleOnSubmit,
      handleOnCloseComplete
    }: CustomDrawerProps,
    ref
  ) => {
    const [open, setOpen] = useState(true)

    const handleClose = useCallback(() => {
      setOpen(false)
      handleOnCloseComplete?.()
    }, [handleOnCloseComplete])

    useImperativeHandle(ref, () => ({
      handleOnClose() {
        handleClose()
      }
    }))

    return (
      <DrawerRoot
        open={open}
        placement="end"
        onOpenChange={(details) => {
          if (!details.open) handleClose()
        }}
        size={{ base: 'full', md: 'lg' }}
      >
        <DrawerContent pt={6}>
          <DrawerCloseTrigger />
          <DrawerHeader borderBottomWidth="1px" fontSize="30px">
            {title}
            {description && (
              <Text
                as="p"
                my="4px"
                fontSize="14px"
                lineHeight="20px"
                fontWeight="normal"
                color="gray.500"
              >
                {description}
              </Text>
            )}
          </DrawerHeader>
          <DrawerBody py={6}>
            {isError && (
              <AxiosErrorAlert
                error={errors?.root?.serverError.message}
                mb={3}
              />
            )}
            {children}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              mr={3}
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              colorPalette="brand"
              disabled={isLoading || !isValid}
              loading={isLoading}
              type="submit"
              onClick={() => handleOnSubmit()}
            >
              {ctaText}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    )
  }
)

CustomDrawer.displayName = 'CustomDrawer'
