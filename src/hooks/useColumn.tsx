import { TableHeader } from '@/components/common/table/primary';
import { AggregationFnOption } from '@tanstack/react-table';
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
export type ColumnProps<TData, TValue> = {
  key?: (string & {}) | keyof TData;
  keyFn?: AccessorFn<TData, TValue>;
  id?: string;
  columns?: ColumnDef<TData>[];
  aggregationFn?: AggregationFnOption<TData>;
  aggregatedCell?: ColumnDefTemplate<ReturnType<Cell<TData, TValue>['getContext']>>;
  enableGrouping?: boolean;
  getGroupingValue?: (row: TData) => any;
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
  hidable?: boolean;
  meta?: ColumnMeta<TData, TValue>;
};

type UseColumnsProps<TData, TValue> = (() => ColumnProps<TData, TValue>[]) | ColumnProps<TData, TValue>[];
export const useColumn = <TData, TValue = unknown>(props: UseColumnsProps<TData, TValue>) => {
  const [columnsData] = useState(props);
  const columns = useMemo(() => {
    return columnsData.map(
      ({ keyFn, header, cell, key, filterable = true, hidable = true, sortable = true, ...props }) => ({
        accessorKey: key,
        accessorFn: keyFn,
        header: ({ column }) => (header ? <TableHeader title={header} column={column} /> : undefined),
        cell: ({ renderValue, getValue, ...props }) =>
          cell ? cell({ value: renderValue(), ...props }) : renderValue() || getValue(),
        enableSorting: sortable,
        enableGlobalFilter: filterable,
        enableHiding: hidable,
        ...props,
      }),
    ) as ColumnDef<TData>[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return columns;
};
