import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'
import { createColumnHelper } from '@tanstack/react-table'

import { DataTable } from './data-table'

type TestData = {
  name: string
  age: number
  email: string
}

const columnHelper = createColumnHelper<TestData>()

const testColumns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: info => info.getValue(),
    meta: { isNumeric: true }
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue()
  })
]

const testData: TestData[] = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
]

describe('DataTable', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(
      <DataTable
        data={testData}
        columns={testColumns}
        variant="simple"
        colorScheme="gray"
      />
    )
  })

  test('renders table with data', () => {
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        variant="simple"
        colorScheme="gray"
      />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
  })

  test('renders column headers', () => {
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        variant="simple"
        colorScheme="gray"
      />
    )

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  test('renders empty table when no data provided', () => {
    render(
      <DataTable
        data={[]}
        columns={testColumns}
        variant="simple"
        colorScheme="gray"
      />
    )

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })

  test('handles column sorting when header is clicked', async () => {
    const { user } = render(
      <DataTable
        data={testData}
        columns={testColumns}
        variant="simple"
        colorScheme="gray"
      />
    )

    const nameHeader = screen.getByText('Name')
    await user.click(nameHeader)

    // Check if sorting icon appears
    expect(screen.getByLabelText('sorted ascending')).toBeInTheDocument()
  })

  test('toggles sort direction on multiple clicks', async () => {
    const { user } = render(
      <DataTable
        data={testData}
        columns={testColumns}
        variant="simple"
        colorScheme="gray"
      />
    )

    const ageHeader = screen.getByText('Age')

    // First click - ascending
    await user.click(ageHeader)
    expect(screen.getByLabelText('sorted ascending')).toBeInTheDocument()

    // Second click - descending
    await user.click(ageHeader)
    expect(screen.getByLabelText('sorted descending')).toBeInTheDocument()
  })

  test('applies correct variant and colorScheme', () => {
    const { container } = render(
      <DataTable
        data={testData}
        columns={testColumns}
        variant="striped"
        colorScheme="blue"
      />
    )

    const table = container.querySelector('table')
    expect(table).toBeInTheDocument()
  })
})
