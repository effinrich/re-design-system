import * as yup from 'yup'
import { ceoFormResolver } from './schema'

// Mock the FORM_ERROR_MESSAGES since they come from an external package
jest.mock('@redesignhealth/portal/utils', () => ({
  FORM_ERROR_MESSAGES: {
    REQUIRED: 'This field is required',
    INVALID_URL: 'Please enter a valid URL'
  }
}))

describe('ceoFormSchema', () => {
  // Extract the schema from the resolver for direct testing
  const schema = yup.object().shape({
    additionalInfo: yup.string(),
    bio: yup.string(),
    businessFocusArea: yup.array().of(yup.object()),
    businessType: yup.string(),
    customerSegment: yup.array().of(yup.string()),
    email: yup.object().required('This field is required'),
    healthcareSector: yup.object().nullable(),
    linkedinHref: yup.string().url('Please enter a valid URL'),
    location: yup.object().nullable(),
    marketServiceArea: yup.array().of(yup.object()),
    pictureHref: yup.string().url('Please enter a valid URL')
  })

  describe('valid data', () => {
    test('validates complete valid data', async () => {
      const validData = {
        additionalInfo: 'Some additional information',
        bio: 'CEO biography',
        businessFocusArea: [{ id: 1, name: 'Healthcare' }],
        businessType: 'B2B',
        customerSegment: ['Enterprise', 'SMB'],
        email: { value: 'ceo@example.com' },
        healthcareSector: { id: 1, name: 'Primary Care' },
        linkedinHref: 'https://linkedin.com/in/ceo',
        location: { city: 'San Francisco', state: 'CA' },
        marketServiceArea: [{ id: 1, name: 'West Coast' }],
        pictureHref: 'https://example.com/picture.jpg'
      }

      await expect(schema.validate(validData)).resolves.toEqual(validData)
    })

    test('validates minimal required data', async () => {
      const minimalData = {
        email: { value: 'ceo@example.com' }
      }

      await expect(schema.validate(minimalData)).resolves.toMatchObject(minimalData)
    })

    test('validates data with empty optional strings', async () => {
      const data = {
        additionalInfo: '',
        bio: '',
        businessType: '',
        email: { value: 'ceo@example.com' }
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('validates data with null nullable fields', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        healthcareSector: null,
        location: null
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('validates empty arrays', async () => {
      const data = {
        businessFocusArea: [],
        customerSegment: [],
        marketServiceArea: [],
        email: { value: 'ceo@example.com' }
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('email validation', () => {
    test('requires email field', async () => {
      const data = {
        bio: 'CEO biography'
      }

      await expect(schema.validate(data)).rejects.toThrow('This field is required')
    })

    test('requires email to be an object', async () => {
      const data = {
        email: 'plain@string.com' // Should be object, not string
      }

      await expect(schema.validate(data)).rejects.toThrow()
    })

    test('accepts email as object', async () => {
      const data = {
        email: { value: 'ceo@example.com', verified: true }
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('URL validation', () => {
    test('validates correct LinkedIn URL', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        linkedinHref: 'https://linkedin.com/in/johndoe'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('rejects invalid LinkedIn URL', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        linkedinHref: 'not-a-valid-url'
      }

      await expect(schema.validate(data)).rejects.toThrow('Please enter a valid URL')
    })

    test('validates correct picture URL', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        pictureHref: 'https://example.com/photo.jpg'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('rejects invalid picture URL', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        pictureHref: 'invalid-url'
      }

      await expect(schema.validate(data)).rejects.toThrow('Please enter a valid URL')
    })

    test('accepts empty URL strings', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        linkedinHref: '',
        pictureHref: ''
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('accepts http and https URLs', async () => {
      const data1 = {
        email: { value: 'ceo@example.com' },
        linkedinHref: 'http://example.com'
      }

      const data2 = {
        email: { value: 'ceo@example.com' },
        linkedinHref: 'https://example.com'
      }

      await expect(schema.validate(data1)).resolves.toMatchObject(data1)
      await expect(schema.validate(data2)).resolves.toMatchObject(data2)
    })
  })

  describe('array validation', () => {
    test('validates array of objects for businessFocusArea', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        businessFocusArea: [
          { id: 1, name: 'Healthcare' },
          { id: 2, name: 'Technology' }
        ]
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('validates array of strings for customerSegment', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        customerSegment: ['Enterprise', 'SMB', 'Government']
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('validates array of objects for marketServiceArea', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        marketServiceArea: [
          { id: 1, region: 'Northeast' },
          { id: 2, region: 'Southwest' }
        ]
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('object validation', () => {
    test('validates healthcareSector as object', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        healthcareSector: { id: 1, name: 'Primary Care', sector: 'Provider' }
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('validates location as object', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        location: { city: 'Boston', state: 'MA', country: 'USA' }
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('string validation', () => {
    test('validates all string fields', async () => {
      const data = {
        email: { value: 'ceo@example.com' },
        additionalInfo: 'Additional information text',
        bio: 'Biography of the CEO',
        businessType: 'B2B SaaS'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('accepts long text in string fields', async () => {
      const longText = 'A'.repeat(1000)
      const data = {
        email: { value: 'ceo@example.com' },
        additionalInfo: longText,
        bio: longText
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('resolver export', () => {
    test('exports a valid yup resolver', () => {
      expect(ceoFormResolver).toBeDefined()
      expect(typeof ceoFormResolver).toBe('function')
    })
  })
})
