import {
  Box,
  Button,
  Card,
  Divider,
  Stack
} from '@react/ui'

interface FormProps {
  children: React.ReactNode
  disabled?: boolean
  onSubmit(): void
  onCancel?(): void
  submitText?: string
  isPending: boolean
  isValid: boolean
  isSticky?: boolean
}

const FormMaster = ({
  onSubmit,
  onCancel,
  disabled,
  isPending,
  isValid,
  children,
  isSticky = false,
  submitText = 'Save changes'
}: FormProps) => {
  return (
    <Card.Root variant="unstyled">
      <form onSubmit={onSubmit} name={submitText}>
        <Stack gap={5}><Card.Body>{children}</Card.Body></Stack>

        <Box
          position={isSticky ? 'sticky' : 'relative'}
          bottom={isSticky ? 0 : 'auto'}
          w={isSticky ? 'full' : 'auto'}
          pb={isSticky ? 2 : 'auto'}
          bgColor="white"
        >
          <Divider mt={8} />
          <Card.Footer gap={3} justify="end" my={4}>
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button
              disabled={isPending || !isValid}
              loading={isPending}
              colorPalette="primary"
              type="submit"
            >
              {submitText}
            </Button>
          </Card.Footer>
        </Box>
      </form>
    </Card.Root>
  );
}

export default FormMaster
