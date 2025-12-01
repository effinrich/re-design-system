import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { useForm, FormProvider } from 'react-hook-form'
import { FormField } from './form-field'
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

describe('FormField', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(
      <FormFieldWrapper>
        <FormField name="username" label="Username">
          <Input />
        </FormField>
      </FormFieldWrapper>
    )
  })

  test('should render successfully', () => {
    const { baseElement } = render(
      <FormFieldWrapper>
        <FormField name="email" label="Email">
          <Input />
        </FormField>
      </FormFieldWrapper>
    )
    expect(baseElement).toBeTruthy()
  })

  test('renders label text', () => {
    render(
      <FormFieldWrapper>
        <FormField name="username" label="Username">
          <Input />
        </FormField>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  test('renders children', () => {
    render(
      <FormFieldWrapper>
        <FormField name="email" label="Email">
          <Input placeholder="Enter your email" />
        </FormField>
      </FormFieldWrapper>
    )

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  test('renders helper text when provided', () => {
    render(
      <FormFieldWrapper>
        <FormField name="password" label="Password" helper="Must be at least 8 characters">
          <Input type="password" />
        </FormField>
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
        <FormField name="email" label="Email">
          <Input />
        </FormField>
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
        <FormField name="email" label="Email" helper="Enter your email address">
          <Input />
        </FormField>
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
        <FormField name="username" label="Username" testid="username-field">
          <Input />
        </FormField>
      </FormFieldWrapper>
    )

    const formControl = screen.getByTestId('username-field')
    expect(formControl).toBeInTheDocument()
  })

  test('renders optional label when optional is true', () => {
    render(
      <FormFieldWrapper>
        <FormField name="nickname" label="Nickname" optional>
          <Input />
        </FormField>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Nickname (optional)')).toBeInTheDocument()
  })

  test('renders required label when optional is false', () => {
    render(
      <FormFieldWrapper>
        <FormField name="email" label="Email" optional={false}>
          <Input />
        </FormField>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.queryByText('Email (optional)')).not.toBeInTheDocument()
  })

  test('renders disabled tooltip when disabledHelpText is provided', () => {
    render(
      <FormFieldWrapper>
        <FormField
          name="readonly"
          label="Read Only Field"
          disabledHelpText="This field cannot be edited"
        >
          <Input isDisabled />
        </FormField>
      </FormFieldWrapper>
    )

    // The tooltip component should be rendered but not visible by default
    expect(screen.getByText('Read Only Field')).toBeInTheDocument()
  })

  test('applies custom testid', () => {
    render(
      <FormFieldWrapper>
        <FormField name="custom" label="Custom Field" testid="custom-field-id">
          <Input />
        </FormField>
      </FormFieldWrapper>
    )

    expect(screen.getByTestId('custom-field-id')).toBeInTheDocument()
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
        <FormField name="username" label="Username">
          <Input />
        </FormField>
        <FormField name="email" label="Email">
          <Input />
        </FormField>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  test('handles nested error paths', () => {
    const errors = {
      'user.email': {
        type: 'required',
        message: 'User email is required'
      }
    }

    render(
      <FormFieldWrapper errors={errors}>
        <FormField name="user.email" label="User Email">
          <Input />
        </FormField>
      </FormFieldWrapper>
    )

    // The FormField should handle nested paths
    expect(screen.getByText('User Email')).toBeInTheDocument()
  })

  test('renders without optional helper text', () => {
    render(
      <FormFieldWrapper>
        <FormField name="title" label="Title">
          <Input />
        </FormField>
      </FormFieldWrapper>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.queryByText('Title (optional)')).not.toBeInTheDocument()
  })

  test('does not show error when field is valid', () => {
    render(
      <FormFieldWrapper>
        <FormField name="valid" label="Valid Field" helper="This is a helper">
          <Input />
        </FormField>
      </FormFieldWrapper>
    )

    expect(screen.getByText('This is a helper')).toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })
})
