import { type CardRootProps, Card } from '@chakra-ui/react'

interface DetailsCardProps extends CardRootProps {
  children: React.ReactNode
}
const DetailsCard = ({ children, ...cardProps }: DetailsCardProps) => {
  return (
    <Card.Root variant="unstyled" gap={6} {...cardProps}>
      {children}
    </Card.Root>
  )
}

export default DetailsCard
