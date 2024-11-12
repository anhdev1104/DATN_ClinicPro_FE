import BaseTable from '../base/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Pagination, TableProps } from '@mantine/core';
import { useState } from 'react';
import TableSkeleton from '../skeleton/TableSkeleton';
import BaseInput from '../base/input';
interface BaseTableProps<T, D> extends Omit<TableProps, 'data'> {
  data: T[];
  columns: ColumnDef<T, D>[];
  isFetching?: boolean;
  onRowClick?: (data: T, event: React.MouseEvent) => void;
}
const DataTable = <T, D>({ data, columns, isFetching, onRowClick, ...props }: BaseTableProps<T, D>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
  });
  return (
    <div className="w-full p-2">
      <div className="flex items-center p-2">
        <BaseInput
          value={globalFilter}
          onChange={e => table.setGlobalFilter(e.target.value)}
          radius="md"
          placeholder="tìm kiếm..."
        />
      </div>
      <BaseTable.Scroll minWidth={800}>
        <BaseTable withTableBorder {...props}>
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
            {isFetching ? (
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
      </BaseTable.Scroll>
      {table.getPageCount() > 1 && (
        <Pagination
          onChange={value => table.setPageIndex(value - 1)}
          total={table.getPageCount()}
          radius="md"
          className="w-full flex justify-center py-2"
        />
      )}
    </div>
  );
};

export default DataTable;
