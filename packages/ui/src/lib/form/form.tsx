import {
  Button,
  Card,
  Stack
} from '@react/ui'

interface FormProps {
  children: React.ReactNode
  disabled: boolean
  onSubmit(): void
  onCancel?(): void
  submitText?: string
}

const Form = ({
  onSubmit,
  onCancel,
  disabled,
  children,
  submitText = 'Save changes'
}: FormProps) => {
  return (
    <Card.Root variant="unstyled" maxWidth="6xl">
      <form onSubmit={onSubmit} name={submitText}>
        <Stack gap={5}><Card.Body>{children}</Card.Body></Stack>
        <Card.Footer gap={3} justify="end" mt={4}>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={disabled} colorPalette="primary" type="submit">
            {submitText}
          </Button>
        </Card.Footer>
      </form>
    </Card.Root>
  );
}

export default Form
