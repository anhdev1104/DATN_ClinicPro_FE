import { Table } from '@tanstack/react-table';
import { Box, Menu, Text } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconCheck } from '@tabler/icons-react';
import { useDebouncedCallback } from '@mantine/hooks';
import { ExportFile } from '@/components/export';
import BaseInput from '@/components/base/input';
import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
interface TableToolbarProps<T> {
  table: Table<T>;
  toolbar?: React.ReactNode;
  filterItem?: JSX.Element;
}

const TableToolbar = <T,>({ table, toolbar }: TableToolbarProps<T>) => {
  const handleSearch = useDebouncedCallback(
    e => {
      table.options.meta?.filterFunction?.(e);
      table.setGlobalFilter(e.target.value);
      table.setPageIndex(0);
    },
    table.options.meta?.manualFiltering
      ? (table.options.meta?.manualFiltering as { timeOut: number })?.timeOut || 500
      : 0,
  );
  return (
    <>
      <Box className="flex items-center py-2 space-x-2 justify-between">
        <Box className="flex space-x-2 flex-1 items-center">
          <BaseInput
            onChange={handleSearch}
            defaultValue={table.options.meta?.q}
            size="xs"
            radius="md"
            placeholder="tìm kiếm..."
          />
          {toolbar}
        </Box>
        <ExportFile rows={table.getRowModel().rows} />
        <Menu shadow="md" position="bottom-end" withinPortal={false}>
          <Menu.Target>
            <BaseButton size="xs" leftSection={<BaseIcon icon={IconAdjustmentsHorizontal} />}>
              View
            </BaseButton>
          </Menu.Target>
          <Menu.Dropdown className="max-w-48">
            {table
              .getAllColumns()
              .filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide())
              .map(column => {
                return (
                  <Menu.Item
                    onClick={() => column.toggleVisibility()}
                    leftSection={
                      <BaseIcon
                        icon={IconCheck}
                        className={column.getIsVisible() ? '' : 'text-transparent'}
                        size="xxs"
                      />
                    }
                    key={column.id}
                    className="capitalize overflow-hidden"
                  >
                    <Text lineClamp={1} fw={400} size="xs" className="text-gray-700">
                      {column.columnDef.meta?.label || column.id}
                    </Text>
                  </Menu.Item>
                );
              })}
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  );
};
export default TableToolbar;