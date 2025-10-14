import { List, ListProps } from '@react/ui'

type ListCardRowsContainerProps = ListProps

export const ListCardRowsContainer = (props: ListCardRowsContainerProps) => {
  return <List variant="striped" {...props} />
}
