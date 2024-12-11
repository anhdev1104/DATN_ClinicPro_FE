import { Menu, MenuItemProps } from '@mantine/core';
import { Row } from '@tanstack/react-table';

import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { IconDots } from '@tabler/icons-react';
import BaseButton from '@/components/base/button';
import BaseIcon from '@/components/base/BaseIcon';

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
export default function TableAction<T>({ data }: ActionWithRowProps<T>) {
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
        {data && data?.length > 0 ? (
          data.map(({ label, ...props }) => (
            <Menu.Item key={label} {...props}>
              {label}
            </Menu.Item>
          ))
        ) : (
          <></>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
