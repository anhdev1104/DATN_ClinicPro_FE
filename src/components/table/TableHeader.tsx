import { Column } from '@tanstack/react-table';
import BaseIcon from '../base/BaseIcon';
import BaseButton from '../base/button';
import { Box, Menu } from '@mantine/core';
import { IconArrowDown, IconArrowsUpDown, IconArrowUp, IconEyeOff } from '@tabler/icons-react';

interface TableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: any;
}

const TableHeader = <T, D>({ column, title }: TableHeaderProps<T, D>) => {
  if (!column.getCanSort()) {
    return (
      <Box component="div" color="gray" className="text-gray-400 text-xs">
        {title}
      </Box>
    );
  }
  return (
    <Menu withinPortal={false} width={150} position="bottom-start" radius="md">
      <Menu.Target>
        <BaseButton
          variant="subtle"
          size="xs"
          className="font-normal hover:text-gray-800 capitalize -ml-3"
          color="gray"
          rightSection={
            column.getIsSorted() === 'desc' ? (
              <BaseIcon icon={IconArrowDown} />
            ) : column.getIsSorted() === 'asc' ? (
              <BaseIcon icon={IconArrowUp} />
            ) : (
              <BaseIcon icon={IconArrowsUpDown} size="xs" />
            )
          }
        >
          {title}
        </BaseButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          leftSection={
            column.getIsSorted() === 'asc' ? <BaseIcon icon={IconArrowUp} /> : <BaseIcon icon={IconArrowDown} />
          }
        >
          {column.getIsSorted() || 'Sort'}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => column.toggleVisibility(false)} leftSection={<BaseIcon icon={IconEyeOff} />}>
          Hide
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default TableHeader;
