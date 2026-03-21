import { type CardRootProps, Card } from '@react/ui'

import { ListCardHeader } from './list-card-header'
import { ListCardRow } from './list-card-row'
import { ListCardRowsContainer } from './list-card-rows-container'

type ListCardProps = CardRootProps

export const ListCard = (props: ListCardProps) => {
  return <Card.Root variant="outline" borderRadius="12px" {...props} />
}

ListCard.Header = ListCardHeader
ListCard.Row = ListCardRow
ListCard.RowsContainer = ListCardRowsContainer
