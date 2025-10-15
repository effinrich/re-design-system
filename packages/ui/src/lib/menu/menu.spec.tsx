import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'

import { Menu, MenuButton, MenuItem, MenuList, MenuDivider, MenuGroup } from './menu'
import { Button } from '../button/button'

describe('Menu', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    )
  })

  test('renders menu button', () => {
    render(
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
        </MenuList>
      </Menu>
    )

    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  test('opens menu when button is clicked', async () => {
    const { user } = render(
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
        </MenuList>
      </Menu>
    )

    const menuButton = screen.getByText('Actions')
    await user.click(menuButton)

    expect(screen.getByText('Download')).toBeVisible()
    expect(screen.getByText('Create a Copy')).toBeVisible()
  })

  test('closes menu when menu item is clicked', async () => {
    const { user } = render(
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
        </MenuList>
      </Menu>
    )

    const menuButton = screen.getByText('Actions')
    await user.click(menuButton)

    const downloadItem = screen.getByText('Download')
    await user.click(downloadItem)

    expect(screen.queryByText('Download')).not.toBeVisible()
  })

  test('renders menu with dividers', async () => {
    const { user } = render(
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuDivider />
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    )

    const menuButton = screen.getByText('Actions')
    await user.click(menuButton)

    expect(screen.getByText('Download')).toBeVisible()
    expect(screen.getByText('Delete')).toBeVisible()
  })

  test('renders menu with groups', async () => {
    const { user } = render(
      <Menu>
        <MenuButton as={Button}>Profile</MenuButton>
        <MenuList>
          <MenuGroup title="Profile">
            <MenuItem>My Account</MenuItem>
            <MenuItem>Payments</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Help">
            <MenuItem>Docs</MenuItem>
            <MenuItem>FAQ</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    )

    const menuButton = screen.getByText('Profile')
    await user.click(menuButton)

    expect(screen.getByText('My Account')).toBeVisible()
    expect(screen.getByText('Payments')).toBeVisible()
    expect(screen.getByText('Docs')).toBeVisible()
    expect(screen.getByText('FAQ')).toBeVisible()
  })

  test('calls onClick handler when menu item is clicked', async () => {
    const handleClick = jest.fn()
    const { user } = render(
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem onClick={handleClick}>Download</MenuItem>
        </MenuList>
      </Menu>
    )

    const menuButton = screen.getByText('Actions')
    await user.click(menuButton)

    const downloadItem = screen.getByText('Download')
    await user.click(downloadItem)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('navigates menu items with keyboard', async () => {
    const { user } = render(
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    )

    const menuButton = screen.getByText('Actions')
    await user.click(menuButton)

    const downloadItem = screen.getByText('Download')
    expect(downloadItem).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByText('Create a Copy')).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByText('Delete')).toHaveFocus()
  })
})
