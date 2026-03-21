import React from 'react'
import { IconType } from 'react-icons/lib'
import { HStack } from '@chakra-ui/react'

import { Alert, type AlertProps } from '../snippets/alert'

export interface BannerAlert extends AlertProps {
  children: React.ReactNode
  icon?: IconType
  rightElement?: React.ReactNode
}

export const BannerAlert = ({
  children,
  icon,
  rightElement,
  ...rest
}: BannerAlert) => {
  return (
    <Alert
      status="warning"
      icon={icon ? React.createElement(icon) : undefined}
      {...rest}
    >
      <HStack gap={2}>
        {children}
        {rightElement}
      </HStack>
    </Alert>
  );
}
