import { CellContext, ColumnDef, ColumnDefTemplate, IdIdentifier, StringHeaderIdentifier } from '@tanstack/react-table';
import { useMemo } from 'react';

export interface ColumnRef<TData, TValue> {
  id?: string;
  key: (string & {}) | keyof TData;
  name: IdIdentifier<TData, TValue> | StringHeaderIdentifier;
  element: ColumnDefTemplate<CellContext<TData, TValue>>;
}

type ColumnFucn<T, D> = () => ColumnRef<T, D>[];
export const useColumn = <T, D>(columnData: ColumnFucn<T, D>) => {
  const columns = useMemo((): ColumnDef<T, D>[] => {
    columnData().map(column => ({
      accessorKey: column.key,
      header: column.name,
      cell: column.element,
    }));

    return columns;
  }, []);
};
