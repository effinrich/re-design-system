"use client"

import {
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastDescription,
  ToastIndicator,
  ToastRoot,
  ToastTitle,
  Toaster as ChakraToaster,
  createToaster,
} from "@chakra-ui/react/toast"
import { Portal } from "@chakra-ui/react/portal"
import { Spinner, Stack } from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <ToastRoot width={{ md: "sm" }}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <ToastIndicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </Stack>
            {toast.action && (
              <ToastActionTrigger>{toast.action.label}</ToastActionTrigger>
            )}
            {toast.closable && <ToastCloseTrigger />}
          </ToastRoot>
        )}
      </ChakraToaster>
    </Portal>
  )
}
