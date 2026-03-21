import { ReactNode } from 'react'
import { Box, Button } from '@react/ui'

import { Alert } from '../snippets/alert'

export interface InfoAlertProps {
  children: ReactNode
  title: string
  onClick?: VoidFunction
}

export const InfoAlert = ({ onClick, title, children }: InfoAlertProps) => {
  return (
    <Alert
      status="info"
      title={title}
      mb="24px"
      bg="gray.200"
      rounded="lg"
    >
      <Box mt="16px">
        {children}
      </Box>
      <Button onClick={onClick} colorPalette="primary" mt="16px">
        Got it
      </Button>
    </Alert>
  )
}

export default InfoAlert
