import { List, Separator, Stack, type StackProps } from '@chakra-ui/react'

interface DetailsCardBodyProps extends StackProps {
  children: React.ReactNode
}
const DetailsCardBody = ({ children, ...rest }: DetailsCardBodyProps) => (
  <Stack as={List.Root} separator={<Separator />} {...rest}>{children}</Stack>
)

export default DetailsCardBody
