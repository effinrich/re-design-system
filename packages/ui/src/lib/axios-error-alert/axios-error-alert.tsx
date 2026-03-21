import { type ApiError } from '@redesignhealth/portal/data-assets'
import { type BoxProps, Box, Text } from '@chakra-ui/react'

import { Alert } from '../snippets/alert'

interface AxiosErrorAlertProps extends BoxProps {
  error?: ApiError | string
}

export const AxiosErrorAlert = ({ error, ...props }: AxiosErrorAlertProps) => {
  const titleText = (() => {
    if (typeof error === 'string') {
      return `Error: ${error}`
    } else if (error && error.message) {
      return `Error: ${error.message}`
    } else {
      return 'Problem with request...'
    }
  })()

  return (
    <Alert
      status="error"
      variant="outline"
      title={titleText}
      {...props}
    >
      {typeof error !== 'string' &&
        error?.errors?.map(err => (
          <Box key={err.name} textAlign="right">
            <Text as="span" textTransform="capitalize">
              {err.name}{' '}
            </Text>
            <Text as="span">{err.description}</Text>
          </Box>
        ))}
    </Alert>
  )
}

export default AxiosErrorAlert
