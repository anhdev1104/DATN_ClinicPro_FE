import BaseTable from '../base/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Pagination } from '@mantine/core';
import { useState } from 'react';
import TableSkeleton from '../skeleton/TableSkeleton';
interface BaseTableProps<T, D> {
  data: T[];
  columns: ColumnDef<T, D>[];
  loading?: boolean;
  onRowClick?: (data: T, event: React.MouseEvent) => void;
}
const DataTable = <T, D>({ data, columns, loading, onRowClick, ...props }: BaseTableProps<T, D>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="flex flex-col items-center">
      <BaseTable highlightOnHover {...props}>
        <BaseTable.Header>
          {table.getHeaderGroups().map(headerGroup => (
            <BaseTable.Row key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <BaseTable.Head key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </BaseTable.Head>
                );
              })}
            </BaseTable.Row>
          ))}
        </BaseTable.Header>

        <BaseTable.Body>
          {loading ? (
            <BaseTable.Row>
              {columns.map((_, index) => {
                return (
                  <BaseTable.Cell key={index}>
                    <TableSkeleton />
                  </BaseTable.Cell>
                );
              })}
            </BaseTable.Row>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <BaseTable.Row key={row.id} data-state={row.getIsSelected() && 'selected'} className="cursor-pointer">
                {row.getAllCells().map(({ id, column, row, getContext }) => {
                  return (
                    <BaseTable.Cell
                      onClick={e => column.columnDef.id !== 'actions' && onRowClick && onRowClick(row.original, e)}
                      key={id}
                    >
                      {flexRender(column.columnDef.cell, getContext())}
                    </BaseTable.Cell>
                  );
                })}
              </BaseTable.Row>
            ))
          ) : (
            <BaseTable.Row>
              <BaseTable.Cell colSpan={columns.length} className="h-24 text-center">
                không có kết quả hiện thị
              </BaseTable.Cell>
            </BaseTable.Row>
          )}
        </BaseTable.Body>
      </BaseTable>
      <Pagination
        onChange={value => table.setPageIndex(value - 1)}
        total={table.getPageCount()}
        radius="lg"
        className="w-full flex justify-center py-2"
      />
    </div>
  );
};

export default DataTable;
