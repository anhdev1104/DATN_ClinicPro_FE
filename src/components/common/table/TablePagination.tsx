import BaseInput from '@/components/base/input';
import { ROW_PER_PAGE_SELECT } from '@/constants/config';
import { Flex, Pagination } from '@mantine/core';
import { Table } from '@tanstack/react-table';

interface TablePaginationProps<T> {
  table: Table<T>;
}
export default function TablePagination<T>({ table }: TablePaginationProps<T>) {
  return (
    <Flex justify="space-between" className="relative p-2 min-h-12">
      <Flex className="absolute left-2 top-2/4 -translate-y-2/4 space-x-2 items-center">
        <div>Hàng mỗi trang</div>
        <BaseInput.Select
          value={`${table.getState().pagination.pageSize}`}
          onChange={value => {
            table.setPageSize(Number(value));
            table.resetPageIndex();
            table.options.meta?.rowPerPageFunction?.(Number(value));
          }}
          data={ROW_PER_PAGE_SELECT}
          comboboxProps={{
            width: 120,
            position: 'top-start',
            shadow: 'md',
            transitionProps: { transition: 'fade' },
          }}
          allowDeselect={false}
          checkIconPosition="right"
          placeholder="All"
          className="w-[80px]"
        />
      </Flex>
      <Pagination
        onChange={value => {
          table.setPageIndex(value - 1);
          table.options.meta?.paginationFunction?.(value);
        }}
        total={table.getPageCount()}
        value={table.getState().pagination.pageIndex + 1}
        radius="md"
        className="w-full flex justify-center"
      />
    </Flex>
  );
}
