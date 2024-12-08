import { Table } from '@tanstack/react-table';
import BaseInput from '../base/input';
import { Box, Menu, Text } from '@mantine/core';
import BaseButton from '../base/button';
import BaseIcon from '../base/BaseIcon';
import { IconAdjustmentsHorizontal, IconCheck } from '@tabler/icons-react';
import { ExportFile } from '../export';
interface TableToolbarProps<T> {
  table: Table<T>;
  toolbar?: React.ReactNode;
  filterItem?: JSX.Element;
}

const TableToolbar = <T,>({ table, toolbar, filterItem }: TableToolbarProps<T>) => {
  return (
    <>
      <Box className="flex items-center py-2 space-x-2 justify-between">
        <Box className="flex space-x-2 flex-1 items-center">
          {filterItem || (
            <BaseInput
              value={table.getState().globalFilter}
              onChange={e => table.setGlobalFilter(e.target.value)}
              size="xs"
              radius="md"
              placeholder="tìm kiếm..."
            />
          )}
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
                      {column.id}
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
