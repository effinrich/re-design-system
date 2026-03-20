import { List, Stack, StackDivider, StackProps } from '@react/ui'

interface DetailsCardBodyProps extends StackProps {
  children: React.ReactNode
}
const DetailsCardBody = ({ children, ...rest }: DetailsCardBodyProps) => (
  <Stack as={List} {...rest}>{children}</Stack>
)

export default DetailsCardBody
