import { TableHeader } from '@/components/common/table/primary';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export const useColumn = <TData, TValue = any>(columnsData: ColumnDef<TData, TValue>[]) => {
  const columns = useMemo(
    () =>
      columnsData.map(({ header, ...props }) => ({
        header: typeof header === 'string' ? ({ column }) => <TableHeader title={header} column={column} /> : header,
        ...props,
      })) as ColumnDef<TData>[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return columns;
};
