import { TablePlugin } from '@/@types/table';
import { ROW_PER_PAGE } from '@/constants/config';
import { getCoreRowModel, getGroupedRowModel, PaginationState } from '@tanstack/react-table';
import { getSortedRowModel } from '@tanstack/react-table';
import { getFilteredRowModel } from '@tanstack/react-table';
import { getPaginationRowModel } from '@tanstack/react-table';
import { useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

export const usePluginTable = <T, D>({
  manualPagination,
  data,
  columns,
  paginationFunction,
  rowPerPageFunction,
  filterFunction,
  manualFiltering,
}: TablePlugin<T, D>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: manualPagination?.pageIndex || 0,
    pageSize: manualPagination?.pageSize || ROW_PER_PAGE,
  });
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    meta: {
      paginationFunction,
      rowPerPageFunction,
      filterFunction,
      manualFiltering,
      manualPagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    manualPagination: manualPagination && true,
    rowCount: manualPagination && (manualPagination?.rowCount ?? data.length),
    pageCount: manualPagination?.pageCount,
    manualFiltering: manualFiltering && true,
  });
  return table;
};
