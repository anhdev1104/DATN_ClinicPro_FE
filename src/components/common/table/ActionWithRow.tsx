import { Menu, MenuItemProps } from '@mantine/core';

import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { IconDots } from '@tabler/icons-react';
import BaseButton from '@/components/base/button';
import BaseIcon from '@/components/base/BaseIcon';

interface ActionWithRowProps {
  data?: Array<
    Omit<
      Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref'>,
      keyof MenuItemProps | 'component'
    > &
    MenuItemProps & { label: string }
  >;
}
export default function ActionWithRow({ data }: ActionWithRowProps) {
  return (
    <Menu
      radius="md"
      offset={4}
      classNames={{
        item: 'min-w-[100px] z-50 flex justify-between items-center',
        itemLabel: 'capitalize',
      }}
      transitionProps={{ transition: 'pop-top-right', }}
      position="bottom-end"
      withinPortal
    >
      <Menu.Target>
        <BaseButton.Icon radius="md" variant="subtle">
          <BaseIcon icon={IconDots} />
        </BaseButton.Icon>
      </Menu.Target>
      <Menu.Dropdown >
        {data &&
          data?.length > 0 &&
          data.map(({ label, ...props }) => (
            <Menu.Item key={label} {...props}>
              {label}
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
}
