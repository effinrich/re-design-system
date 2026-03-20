import { MdInfoOutline, MdOutlineClose } from 'react-icons/md'
import { Flex, IconButton, Popover, Text } from '@chakra-ui/react';

interface GroupPopoverProps {
  description?: string
}

export const GroupPopover = ({ description }: GroupPopoverProps) => {
  if (!description) return null

  return (
    <Popover.Root lazyMount positioning={{
      placement: 'right-start'
    }}>
      <Popover.Trigger asChild>
        <IconButton
          aria-label="Info"
          color="gray.600"
          css={{
            '& & svg': { h: '24px', w: '24px' }
          }}
          variant="unstyled"><MdInfoOutline /></IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content w="403px">
          <Popover.Title
            as={Flex}
            justifyContent="space-between"
            align="center"
            px="16px"
            py="20px"
          >
            <Text
              fontSize="18px"
              fontWeight="700"
              lineHeight="28px"
              color="gray.900"
            >
              Description
            </Text>
            <Popover.CloseTrigger
              as={IconButton}
              icon={<MdOutlineClose />}
              position="static"
              height="40px"
              width="40px"
              css={{
                '& & svg': { height: '24px', width: '24px' }
              }}
            />
          </Popover.Title>
          <Popover.Body px="24px" py="16px">
            <Text
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              color="black"
            >
              {description}
            </Text>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
