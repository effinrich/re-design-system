import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu'

import {
  rh,
  Table,
} from '../../index'

export type DataTableProps<Data extends object> = {
  data: Data[]
  columns: ColumnDef<Data, any>[]
  variant: string
  colorScheme: string
}

export function DataTable<Data extends object>({
  data,
  columns,
  variant,
  colorScheme
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    },
    debugTable: true
  })

  return (
    <Table.ScrollArea borderBottomRadius="8px">
      <Table.Root variant={variant} colorPalette={colorScheme}>
        <Table.Header>
          {table.getHeaderGroups().map(headerGroup => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta
                return (
                  <Table.ColumnHeader
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    {...(meta?.isNumeric && { textAlign: 'end' })}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <rh.span pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <LuChevronDown aria-label="sorted descending" />
                        ) : (
                          <LuChevronUp aria-label="sorted ascending" />
                        )
                      ) : null}
                    </rh.span>
                  </Table.ColumnHeader>
                )
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map(row => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map(cell => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = cell.column.columnDef.meta
                return (
                  <Table.Cell
                    key={cell.id}
                    {...(meta?.isNumeric && { textAlign: 'end' })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}
