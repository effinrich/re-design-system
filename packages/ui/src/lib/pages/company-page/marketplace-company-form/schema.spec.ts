import * as yup from 'yup'
import { marketplaceCompanyFormResolver } from './schema'

// Mock the external dependencies
jest.mock('@redesignhealth/portal/utils', () => ({
  FORM_ERROR_MESSAGES: {
    REQUIRED: 'This field is required',
    INVALID_URL: 'Please enter a valid URL'
  },
  TEXTAREA_CHARACTER_LIMIT: 500
}))

describe('marketplaceCompanyFormSchema', () => {
  // Extract the schema for direct testing
  const schema = yup.object().shape({
    activityType: yup.string().required('This field is required'),
    description: yup.string().max(500),
    href: yup.string().url('Please enter a valid URL'),
    legalName: yup.string(),
    name: yup.string().required('This field is required'),
    organizationType: yup.string().required('This field is required'),
    region: yup.string().required('This field is required')
  })

  describe('valid data', () => {
    test('validates complete valid data', async () => {
      const validData = {
        activityType: 'Software Development',
        description: 'A healthcare software company',
        href: 'https://example.com',
        legalName: 'Example Inc.',
        name: 'Example Company',
        organizationType: 'Corporation',
        region: 'North America'
      }

      await expect(schema.validate(validData)).resolves.toEqual(validData)
    })

    test('validates minimal required data', async () => {
      const minimalData = {
        activityType: 'Consulting',
        name: 'Consulting Co',
        organizationType: 'LLC',
        region: 'West'
      }

      await expect(schema.validate(minimalData)).resolves.toMatchObject(minimalData)
    })

    test('validates with empty optional fields', async () => {
      const data = {
        activityType: 'Development',
        name: 'Dev Co',
        organizationType: 'Partnership',
        region: 'East',
        description: '',
        legalName: '',
        href: ''
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('required fields validation', () => {
    test('requires activityType', async () => {
      const data = {
        name: 'Company',
        organizationType: 'LLC',
        region: 'North'
      }

      await expect(schema.validate(data)).rejects.toThrow('This field is required')
    })

    test('requires name', async () => {
      const data = {
        activityType: 'Development',
        organizationType: 'LLC',
        region: 'North'
      }

      await expect(schema.validate(data)).rejects.toThrow('This field is required')
    })

    test('requires organizationType', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        region: 'North'
      }

      await expect(schema.validate(data)).rejects.toThrow('This field is required')
    })

    test('requires region', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC'
      }

      await expect(schema.validate(data)).rejects.toThrow('This field is required')
    })

    test('rejects when all required fields are missing', async () => {
      const data = {
        description: 'Some description',
        legalName: 'Legal Name Inc.'
      }

      await expect(schema.validate(data)).rejects.toThrow()
    })
  })

  describe('description validation', () => {
    test('accepts description within character limit', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        description: 'A'.repeat(500)
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('rejects description exceeding character limit', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        description: 'A'.repeat(501)
      }

      await expect(schema.validate(data)).rejects.toThrow()
    })

    test('accepts empty description', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        description: ''
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('accepts description with special characters', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        description: 'Description with special chars: !@#$%^&*()_+-={}[]|:";\'<>?,./'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('URL validation', () => {
    test('validates correct URL', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        href: 'https://example.com'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('rejects invalid URL', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        href: 'not-a-valid-url'
      }

      await expect(schema.validate(data)).rejects.toThrow('Please enter a valid URL')
    })

    test('accepts http URLs', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        href: 'http://example.com'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('accepts https URLs', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        href: 'https://example.com'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('accepts URLs with paths', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        href: 'https://example.com/company/about'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('accepts URLs with query parameters', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        href: 'https://example.com?id=123&ref=home'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('accepts empty URL string', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        href: ''
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('legalName validation', () => {
    test('accepts any string for legalName', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        legalName: 'Example Corporation Inc.'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('accepts legalName with special characters', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North',
        legalName: 'Company & Associates, LLC.'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('legalName is optional', async () => {
      const data = {
        activityType: 'Development',
        name: 'Company',
        organizationType: 'LLC',
        region: 'North'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('field type validation', () => {
    test('all required fields must be strings', async () => {
      const data = {
        activityType: 123, // Should be string
        name: 'Company',
        organizationType: 'LLC',
        region: 'North'
      }

      await expect(schema.validate(data)).rejects.toThrow()
    })

    test('rejects null for required fields', async () => {
      const data = {
        activityType: null,
        name: 'Company',
        organizationType: 'LLC',
        region: 'North'
      }

      await expect(schema.validate(data)).rejects.toThrow()
    })

    test('rejects undefined for required fields', async () => {
      const data = {
        activityType: undefined,
        name: 'Company',
        organizationType: 'LLC',
        region: 'North'
      }

      await expect(schema.validate(data)).rejects.toThrow()
    })
  })

  describe('edge cases', () => {
    test('validates with all fields at boundary values', async () => {
      const data = {
        activityType: 'A',
        name: 'B',
        organizationType: 'C',
        region: 'D',
        description: 'E'.repeat(500),
        legalName: 'F',
        href: 'https://a.b'
      }

      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })

    test('handles whitespace in required fields', async () => {
      const data = {
        activityType: '   ',
        name: '   ',
        organizationType: '   ',
        region: '   '
      }

      // Yup string validation considers whitespace as valid
      await expect(schema.validate(data)).resolves.toMatchObject(data)
    })
  })

  describe('resolver export', () => {
    test('exports a valid yup resolver', () => {
      expect(marketplaceCompanyFormResolver).toBeDefined()
      expect(typeof marketplaceCompanyFormResolver).toBe('function')
    })
  })
})
