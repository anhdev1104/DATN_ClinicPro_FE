import { Menu } from '@mantine/core';
import BaseButton from '../base/button';
import BaseIcon from '../base/BaseIcon';

const ActionWithRow = () => {
  return (
    <Menu
      radius={12}
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
          <BaseIcon name="ellipsis" />
        </BaseButton.Icon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<BaseIcon name="pencil-line" />}>sửa</Menu.Item>
        <Menu.Item color="red" leftSection={<BaseIcon name="trash-2" />}>
          xóa
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default ActionWithRow;
