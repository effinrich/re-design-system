import type { Meta } from '@storybook/react-vite'

import { DrawerForm } from './drawer-form'

const Story: Meta<typeof DrawerForm> = {
  component: DrawerForm,
  title: 'DrawerForm'
}
export default Story

export const Default = {
  args: {}
}
