import { ListRoot, type ListRootProps } from '@react/ui'

type ListCardRowsContainerProps = ListRootProps

export const ListCardRowsContainer = (props: ListCardRowsContainerProps) => {
  return <ListRoot variant="striped" {...props} />
}
