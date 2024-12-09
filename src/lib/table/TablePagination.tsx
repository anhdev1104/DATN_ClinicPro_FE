import { Pagination } from '@mantine/core';
import { Table } from '@tanstack/react-table';

interface TablePaginationProps<T> {
  table: Table<T>;
}
export default function TablePagination<T>({ table }: TablePaginationProps<T>) {
  return (
    <>
      <Pagination
        onChange={value => table.setPageIndex(value - 1)}
        total={table.getPageCount()}
        radius="md"
        className="w-full flex justify-center py-2"
      />
    </>
  );
}
