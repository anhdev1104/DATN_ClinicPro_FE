import { ColumnDef, Row } from '@tanstack/react-table';
import { useMemo } from 'react';

/**
 * @warning during development, notify me if you get the bug
 */
export interface ColumnProps<TData> {
  key?: (string & {}) | keyof TData;
  id?: string;
  label?: string;
  cell?: string | ((props: { value: any; original: TData; row: Row<TData> }) => unknown);
  sortable?: boolean;
  filterable?: boolean;
  hiding?: boolean;
  placeholder?: boolean;
}
export const useColumn = <TData>(columnsData: ColumnProps<TData>[]) => {
  const columns = useMemo(() => {
    return columnsData.map(
      ({ id, label, filterable = true, hiding = true, sortable = true, placeholder = false, cell, key }) => ({
        accessorKey: key,
        id,
        header: ({ header }) => {
          header.isPlaceholder = placeholder;
          return label;
        },
        cell: ({ row, renderValue }) =>
          cell
            ? typeof cell !== 'string'
              ? cell({ value: row.getValue(String(key || id)), original: row.original, row })
              : cell
            : renderValue(),
        enableSorting: sortable,
        enableGlobalFilter: filterable,
        enableHiding: hiding,
      }),
    ) as ColumnDef<TData>[];
  }, []);
  return columns;
};