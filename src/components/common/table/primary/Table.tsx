import { TableToolbar, TablePagination } from '..';
import { Row, flexRender } from '@tanstack/react-table';
import { Skeleton, TableProps } from '@mantine/core';
import { TablePlugin } from '@/@types/table';
import BaseTable from '@/components/base/table';
import { usePluginTable } from '@/hooks/usePluginTable';
import { useMemo, useRef } from 'react';
import { TableVirtualize } from './TableVirtualize';
import { cn } from '@/helpers/utils';

export type BaseTableProps<T, D> = TablePlugin<T, D> &
  Omit<TableProps, 'data'> & {
    isFetching?: boolean;
    isLoading?: boolean;
    onRowClick?: (row: Row<T>, event: React.MouseEvent) => void;
    toolbar?: React.ReactNode;
    parentProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  };
export default function Table<T, D>(_props: BaseTableProps<T, D>) {
  const {
    toolbar,
    isFetching,
    parentProps,
    isLoading,
    onRowClick,
    manualPagination,
    data,
    columns,
    paginationFunction,
    rowPerPageFunction,
    filterFunction,
    manualFiltering,
    virtualize,
    ...props
  } = _props;
  const table = usePluginTable({
    manualPagination,
    data,
    columns,
    paginationFunction,
    rowPerPageFunction,
    filterFunction,
    manualFiltering,
    virtualize,
  } as TablePlugin<T, D>);

  const parentRef = useRef<HTMLDivElement>(null);
  const pageSize = table.getState().pagination.pageSize;
  const isVirtual = useMemo(() => virtualize && pageSize >= virtualize?.length, [pageSize]);

  return (
    <div className="w-full">
      <TableToolbar toolbar={toolbar} table={table} />
      <BaseTable.Scroll minWidth={800}>
        <BaseTable
          parentProps={{
            ref: parentRef,
            className: 'max-h-[560px] overflow-y-auto scrollbar-thin',
            style: {
              transform: 'translate3d(0, 0, 0)',
            },
            ...parentProps,
          }}
          withTableBorder
          {...props}
        >
          <BaseTable.Header>
            {table.getHeaderGroups().map(({ headers, id }) => (
              <BaseTable.Row key={id}>
                {headers.map(header => {
                  return (
                    <BaseTable.Head key={header.id} className="font-normal text-xs">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </BaseTable.Head>
                  );
                })}
              </BaseTable.Row>
            ))}
          </BaseTable.Header>
          <BaseTable.Body className="relative">
            {isLoading ? (
              columns.map((_, index) => {
                return (
                  <BaseTable.Row h={40} key={index}>
                    {columns.map((_, index) => (
                      <BaseTable.Cell key={index}>
                        <Skeleton height={14} radius={6} />
                      </BaseTable.Cell>
                    ))}
                  </BaseTable.Row>
                );
              })
            ) : table.getRowModel().rows.length ? (
              isVirtual ? (
                table.getRowModel().rows.map(row => (
                  <BaseTable.Row
                    key={row.id}
                    className={cn('cursor-pointer', {
                      'opacity-40 cursor-pointer select-none': isFetching,
                    })}
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <BaseTable.Cell
                          className="ml-3"
                          onClick={e => cell.column.columnDef.id !== 'actions' && onRowClick && onRowClick(row, e)}
                          key={cell.id}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </BaseTable.Cell>
                      );
                    })}
                  </BaseTable.Row>
                ))
              ) : (
                <TableVirtualize table={table} parentRef={parentRef} onRowClick={onRowClick} />
              )
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
      <TablePagination table={table} />
    </div>
  );
}
