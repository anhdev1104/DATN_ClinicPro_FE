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
import TableSkeleton from '../skeleton/TableSkeleton';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import { useState } from 'react';
interface BaseTableProps<T, D> extends Omit<TableProps, 'data'> {
  data: T[];
  columns: ColumnDef<T, D>[];
  isFetching?: boolean;
  onRowClick?: (data: T, event: React.MouseEvent) => void;
  toolbar?: React.ReactNode | boolean;
  manualPagination?: boolean;
  rowCount?: number;
  manualFiltering?: boolean;
  filterItem?: JSX.Element;
  pagination?: JSX.Element | boolean;
}
const Table = <T, D>({
  data,
  columns,
  isFetching,
  toolbar,
  onRowClick,
  rowCount,
  manualFiltering,
  filterItem,
  manualPagination,
  pagination,
  ...props
}: BaseTableProps<T, D>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      globalFilter,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination,
    rowCount,
    manualFiltering,
  });

  return (
    <div className="w-full p-2">
      {toolbar !== false && <TableToolbar filterItem={filterItem} toolbar={toolbar} table={table} />}
      <BaseTable.Scroll minWidth={800}>
        <BaseTable withTableBorder {...props}>
          <BaseTable.Header>
            {table.getHeaderGroups().map(headerGroup => (
              <BaseTable.Row key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <BaseTable.Head key={header.id}>
                      {header.isPlaceholder ? null : (
                        <TableHeader
                          column={header.column}
                          title={flexRender(header.column.columnDef.header, header.getContext())}
                        ></TableHeader>
                      )}
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
                  {row.getVisibleCells().map(({ id, column, row, getContext }) => {
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
      {pagination !== false &&
        (pagination ||
          (table.getPageCount() > 1 && (
            <Pagination
              onChange={value => table.setPageIndex(value - 1)}
              total={table.getPageCount()}
              radius="md"
              className="w-full flex justify-center py-2"
            />
          )))}
    </div>
  );
};

export default Table;
