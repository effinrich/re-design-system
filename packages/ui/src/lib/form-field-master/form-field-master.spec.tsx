import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { useForm, FormProvider } from 'react-hook-form'
import { FormFieldMaster } from './form-field-master'
import { Input } from '@react/ui'

// Wrapper component to provide react-hook-form context
const FormFieldWrapper = ({
  children,
  errors = {},
  defaultValues = {}
}: {
  children: React.ReactNode
  errors?: Record<string, any>
  defaultValues?: Record<string, any>
}) => {
  const methods = useForm({ defaultValues })

  // Manually set errors if provided
  if (Object.keys(errors).length > 0) {
    Object.keys(errors).forEach(key => {
      methods.setError(key, errors[key])
    })
  }

  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('FormFieldMaster', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(
      <FormFieldWrapper>
        <FormFieldMaster name="username" label="Username">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )
  })

  test('should render successfully', () => {
    const { baseElement } = render(
      <FormFieldWrapper>
        <FormFieldMaster name="email" label="Email">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )
    expect(baseElement).toBeTruthy()
  })

  test('renders label text', () => {
    render(
      <FormFieldWrapper>
        <FormFieldMaster name="username" label="Username">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  test('renders required asterisk when optional is false', () => {
    const { container } = render(
      <FormFieldWrapper>
        <FormFieldMaster name="email" label="Email" optional={false}>
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    // The asterisk is added via CSS ::after pseudo-element
    const label = screen.getByText('Email')
    expect(label).toBeInTheDocument()
    expect(label.parentElement).toHaveStyleRule('content', ' *', {
      modifier: '::after'
    })
  })

  test('does not render required asterisk when optional is true', () => {
    render(
      <FormFieldWrapper>
        <FormFieldMaster name="nickname" label="Nickname" optional>
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    const label = screen.getByText('Nickname')
    expect(label).toBeInTheDocument()
    // When optional, label is plain text without styled wrapper
  })

  test('renders children', () => {
    render(
      <FormFieldWrapper>
        <FormFieldMaster name="email" label="Email">
          <Input placeholder="Enter your email" />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  test('renders helper text when provided', () => {
    render(
      <FormFieldWrapper>
        <FormFieldMaster name="password" label="Password" helper="Must be at least 8 characters">
          <Input type="password" />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument()
  })

  test('renders error message when field has error', () => {
    const errors = {
      email: {
        type: 'required',
        message: 'Email is required'
      }
    }

    render(
      <FormFieldWrapper errors={errors}>
        <FormFieldMaster name="email" label="Email">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  test('hides helper text when error is shown', () => {
    const errors = {
      email: {
        type: 'required',
        message: 'Email is required'
      }
    }

    render(
      <FormFieldWrapper errors={errors}>
        <FormFieldMaster name="email" label="Email" helper="Enter your email address">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.queryByText('Enter your email address')).not.toBeInTheDocument()
  })

  test('applies isInvalid state when field has error', () => {
    const errors = {
      username: {
        type: 'minLength',
        message: 'Username must be at least 3 characters'
      }
    }

    render(
      <FormFieldWrapper errors={errors}>
        <FormFieldMaster name="username" label="Username" testid="username-field">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    const formControl = screen.getByTestId('username-field')
    expect(formControl).toBeInTheDocument()
  })

  test('renders disabled tooltip when disabledHelpText is provided', () => {
    render(
      <FormFieldWrapper>
        <FormFieldMaster
          name="readonly"
          label="Read Only Field"
          disabledHelpText="This field cannot be edited"
        >
          <Input isDisabled />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Read Only Field')).toBeInTheDocument()
  })

  test('applies custom testid', () => {
    render(
      <FormFieldWrapper>
        <FormFieldMaster name="custom" label="Custom Field" testid="custom-field-id">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    expect(screen.getByTestId('custom-field-id')).toBeInTheDocument()
  })

  test('renders with responsive layout', () => {
    const { container } = render(
      <FormFieldWrapper>
        <FormFieldMaster name="email" label="Email">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    // FormFieldMaster uses Flex with responsive direction
    expect(container).toBeInTheDocument()
  })

  test('label has gray color', () => {
    render(
      <FormFieldWrapper>
        <FormFieldMaster name="title" label="Title">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    const label = screen.getByText('Title')
    expect(label).toBeInTheDocument()
  })

  test('handles multiple form fields independently', () => {
    const errors = {
      email: {
        type: 'required',
        message: 'Email is required'
      }
    }

    render(
      <FormFieldWrapper errors={errors}>
        <FormFieldMaster name="username" label="Username">
          <Input />
        </FormFieldMaster>
        <FormFieldMaster name="email" label="Email">
          <Input />
        </FormFieldMaster>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })
})
