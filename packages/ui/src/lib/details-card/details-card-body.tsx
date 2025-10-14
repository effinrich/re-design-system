import { List, Stack, StackDivider, StackProps } from '@react/ui'

interface DetailsCardBodyProps extends StackProps {
  children: React.ReactNode
}
const DetailsCardBody = ({ children, ...rest }: DetailsCardBodyProps) => (
  <Stack as={List} divider={<StackDivider />} {...rest}>
    {children}
  </Stack>
)

export default DetailsCardBody
