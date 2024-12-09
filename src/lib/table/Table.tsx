import BaseTable from '@/components/base/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableProps } from '@mantine/core';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import TableToolbar from './TableToolbar';
import { Fragment } from 'react';
import { Row } from '@tanstack/react-table';
import TablePagination from './TablePagination';
interface BaseTableProps<T, D> extends Omit<TableProps, 'data'> {
  data: T[];
  columns: ColumnDef<T, D>[];
  isFetching?: boolean;
  isLoading?: boolean;
  onRowClick?: (row: Row<T>, event: React.MouseEvent) => void;
  toolbar?: React.ReactNode | boolean;
  rowCount?: number;
  filterItem?: JSX.Element;
  pagination?: JSX.Element | boolean;
  detailPanel?: (row: Row<T>) => React.ReactNode;
}
export default function Table<T, D>({
  data,
  columns,
  isFetching,
  isLoading,
  toolbar,
  onRowClick,
  rowCount,
  filterItem,
  pagination,
  detailPanel,
  ...props
}: BaseTableProps<T, D>) {
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => (detailPanel ? true : false),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualPagination: pagination ? true : false,
    manualFiltering: filterItem ? true : false,
    rowCount,
  });

  return (
    <div className="w-full">
      {toolbar !== false && <TableToolbar filterItem={filterItem} toolbar={toolbar} table={table} />}
      <BaseTable.Scroll minWidth={800}>
        <BaseTable withTableBorder {...props}>
          <BaseTable.Header>
            {table.getHeaderGroups().map(({ headers, id }) => (
              <BaseTable.Row key={id}>
                {headers.map(({ id, column, getContext, isPlaceholder }) => {
                  return (
                    <BaseTable.Head key={id} className="font-normal text-xs">
                      {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
                    </BaseTable.Head>
                  );
                })}
              </BaseTable.Row>
            ))}
          </BaseTable.Header>

          <BaseTable.Body className="relative">
            {isLoading ? (
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
                <Fragment key={row.id}>
                  <BaseTable.Row
                    data-state={row.getIsSelected() && 'selected'}
                    className={`cursor-pointer ${isFetching && 'opacity-40 cursor-pointer select-none'}`}
                  >
                    {row.getVisibleCells().map(({ id, column, row, getContext }) => {
                      return (
                        <BaseTable.Cell
                          className="duration-1000 transition-all animate-accordion-down"
                          onClick={e => column.columnDef.id !== 'actions' && onRowClick && onRowClick(row, e)}
                          key={id}
                        >
                          {flexRender(column.columnDef.cell, getContext())}
                        </BaseTable.Cell>
                      );
                    })}
                  </BaseTable.Row>
                  {row.getIsExpanded() && (
                    <BaseTable.Row className="duration-1000 transition-all animate-accordion-down">
                      <BaseTable.Cell className="" colSpan={row.getVisibleCells().length}>
                        {detailPanel?.(row)}
                      </BaseTable.Cell>
                    </BaseTable.Row>
                  )}
                </Fragment>
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
      {pagination || <TablePagination table={table} />}
    </div>
  );
}
