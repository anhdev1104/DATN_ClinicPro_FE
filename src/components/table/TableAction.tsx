import { Menu, MenuItemProps } from '@mantine/core';
import BaseButton from '../base/button';
import BaseIcon from '../base/BaseIcon';
import { Row } from '@tanstack/react-table';

import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from 'react';
import { IconDots } from '@tabler/icons-react';

interface ActionWithRowProps<T> {
  row: Row<T>;
  data?: Array<
    Omit<
      Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref'>,
      keyof MenuItemProps | 'component'
    > &
      MenuItemProps & { label: string }
  >;
}
const ActionWithRow = <T,>({ data }: ActionWithRowProps<T>) => {
  return (
    <Menu
      radius="md"
      offset={4}
      classNames={{
        item: 'min-w-[100px] flex justify-between items-center',
        itemLabel: 'capitalize',
      }}
      transitionProps={{ transition: 'pop-top-right' }}
      position="bottom-end"
    >
      <Menu.Target>
        <BaseButton.Icon radius="md" variant="subtle">
          <BaseIcon icon={IconDots} />
        </BaseButton.Icon>
      </Menu.Target>
      <Menu.Dropdown>
        {data?.length && data.map(({ label, ...props }) => <Menu.Item {...props}>{label}</Menu.Item>)}
      </Menu.Dropdown>
    </Menu>
  );
};
export default memo(ActionWithRow);
