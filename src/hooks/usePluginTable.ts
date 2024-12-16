import { TablePlugin } from '@/@types/table';
import { ROW_PER_PAGE } from '@/constants/config';
import { getCoreRowModel, getGroupedRowModel, PaginationState } from '@tanstack/react-table';
import { getSortedRowModel } from '@tanstack/react-table';
import { getFilteredRowModel } from '@tanstack/react-table';
import { getPaginationRowModel } from '@tanstack/react-table';
import { useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

export const usePluginTable = <T, D>({
  manualPagination,
  data,
  columns,
  paginationFunction,
  rowPerPageFunction,
  filterFunction,
  manualFiltering,
}: TablePlugin<T, D>) => {
  const [query] = useQueryParams({
    q: withDefault(StringParam, ''),
    limit: withDefault(NumberParam, ROW_PER_PAGE),
    page: withDefault(NumberParam, 1),
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: manualPagination ? query.page - 1 : 0,
    pageSize: manualPagination ? query.limit : ROW_PER_PAGE,
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
      q: query.q,
      limit: query.limit,
      page: query.page,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    manualPagination: manualPagination && true,
    rowCount: manualPagination && data.length,
    pageCount: manualPagination?.pageCount,
    manualFiltering: manualFiltering && true,
  });
  return table;
};
