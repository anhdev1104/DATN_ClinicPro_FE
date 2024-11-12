import { CellContext, ColumnDef, ColumnDefTemplate, IdIdentifier, StringHeaderIdentifier } from '@tanstack/react-table';
import { useMemo } from 'react';

/**
 * @warning during development, don't use
 */
export interface ColumnRef<TData, TValue> {
  id?: string;
  key: (string & {}) | keyof TData;
  name: IdIdentifier<TData, TValue> | StringHeaderIdentifier;
  cell: ColumnDefTemplate<CellContext<TData, TValue>>;
  filter: boolean;
  sort: boolean;
}

type ColumnFucn<T, D> = () => ColumnRef<T, D>[] | ColumnRef<T, D>[];

export const useColumn = <T, D>(columnData: ColumnFucn<T, D>) => {};
