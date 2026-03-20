import { Link } from 'react-router-dom'
import { Menu, Portal } from '@chakra-ui/react';
import { Button, ChevronDownIcon } from '@react/ui'

export const AddResearchMenu = ({
  hideArticlesSupport
}: {
  hideArticlesSupport?: boolean
}) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild><Button colorPalette="primary" variant="solid">Add research
                <ChevronDownIcon /></Button></Menu.Trigger>
      <Portal><Menu.Positioner><Menu.Content>
            <Menu.Item as={Link} to="/research-hub/research-sprints/add" value='item-0'>
              Research report
            </Menu.Item>
            <Menu.Item as={Link} to="/research-hub/call-notes/add" value='item-1'>
              Call notes
            </Menu.Item>
            {!hideArticlesSupport && <Menu.Item value='item-2'>External content</Menu.Item>}
          </Menu.Content></Menu.Positioner></Portal>
    </Menu.Root>
  );
}
