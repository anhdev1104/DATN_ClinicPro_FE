import { TableHeader } from '@/lib/table';
import {
  AccessorFn,
  Cell,
  Column,
  ColumnDef,
  ColumnDefTemplate,
  ColumnMeta,
  HeaderContext,
  Row,
  Table,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

/**
 * @warning during development, notify me if you get the bug
 */
export interface ColumnProps<TData, TValue> {
  key?: (string & {}) | keyof TData;
  keyFn?: AccessorFn<TData, TValue>;
  id?: string;
  columns?: ColumnDef<TData>[];
  header?: string;
  footer?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
  cell?: (props: {
    value: any;
    table: Table<TData>;
    column: Column<TData>;
    cell: Cell<TData, unknown>;
    row: Row<TData>;
  }) => unknown;
  sortable?: boolean;
  filterable?: boolean;
  hiding?: boolean;
  meta?: ColumnMeta<TData, TValue>;
}
type UseColumnsProps<TData, TValue> = (() => ColumnProps<TData, TValue>[]) | ColumnProps<TData, TValue>[];
export const useColumn = <TData, TValue = unknown>(props: UseColumnsProps<TData, TValue>) => {
  const [columnsData] = useState(props);
  const columns = useMemo(() => {
    return columnsData.map(
      ({ keyFn, header, cell, key, filterable = true, hiding = true, sortable = true, ...props }) => ({
        accessorKey: key,
        accessorFn: keyFn,
        header: ({ column }) => (header ? <TableHeader title={header} column={column} /> : undefined),
        cell: ({ renderValue, getValue, ...props }) =>
          cell ? cell({ value: renderValue(), ...props }) : renderValue() || getValue(),
        enableSorting: sortable,
        enableGlobalFilter: filterable,
        enableHiding: hiding,
        ...props,
      }),
    ) as ColumnDef<TData>[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return columns;
};
