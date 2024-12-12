import { TableToolbar, TablePagination } from '..';
import { Row, flexRender } from '@tanstack/react-table';
import { Skeleton, TableProps } from '@mantine/core';
import { TablePlugin } from '@/@types/table';
import BaseTable from '@/components/base/table';
import { usePluginTable } from '@/hooks/usePluginTable';

export type BaseTableProps<T, D> = TablePlugin<T, D> & {
  isFetching?: boolean;
  isLoading?: boolean;
  onRowClick?: (row: Row<T>, event: React.MouseEvent) => void;
  toolbar?: React.ReactNode;
  tableProps?: Omit<TableProps, 'data'>;
};
export default function Table<T, D>({
  toolbar,
  tableProps,
  isFetching,
  isLoading,
  onRowClick,
  ...props
}: BaseTableProps<T, D>) {
  const table = usePluginTable(props);
  return (
    <div className="w-full">
      <TableToolbar toolbar={toolbar} table={table} />
      <BaseTable.Scroll minWidth={800}>
        <BaseTable withTableBorder {...tableProps}>
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
              props.columns.map((_, index) => {
                return (
                  <BaseTable.Row h={40} key={index}>
                    {props.columns.map((_, index) => (
                      <BaseTable.Cell key={index}>
                        <Skeleton height={14} radius={6} />
                      </BaseTable.Cell>
                    ))}
                  </BaseTable.Row>
                );
              })
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <BaseTable.Row
                  key={row.id}
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
              ))
            ) : (
              <BaseTable.Row>
                <BaseTable.Cell colSpan={props.columns.length} className="h-24 text-center">
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
