import { Menu, Modal, Stack, Text } from '@mantine/core';
import BaseButton from '../base/button';
import BaseIcon from '../base/BaseIcon';
import { useDeleteAnDepartmentMutation } from '@/redux/api/department';
import { useDisclosure } from '@mantine/hooks';
import { Row } from '@tanstack/react-table';
import { useDispatch, useSelector } from '@/hooks/redux';
import { toast } from 'react-toastify';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { DepartmentDetail } from '@/types/department.type';
import UpdateDepartment from '@/pages/admin/department/UpdateDepartment';
import { memo } from 'react';
import { setOpenUpdateDepartment } from '@/redux/department/departmentSlice';

interface ActionWithRowProps<T> {
  row: Row<T>;
}
const ActionWithRow = <T,>({ row }: ActionWithRowProps<T>) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { loading } = useSelector(state => state.global);
  const dispatch = useDispatch();
  const [deleteDepartment] = useDeleteAnDepartmentMutation();
  const handleDeleteDepartment = async () => {
    const result = await deleteDepartment((row.original as DepartmentDetail).id);
    if (result.error) {
      toast.error((result.error as AxiosBaseQueryError<any>).data.error);
    } else {
      toast.success((result.data as any).data);
      close();
    }
  };
  return (
    <>
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
            <BaseIcon name="ellipsis" />
          </BaseButton.Icon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => {
              window.history.replaceState(null, '', `/departments/${(row.original as any).id}`);
              dispatch(setOpenUpdateDepartment(true));
            }}
            leftSection={<BaseIcon name="pencil-line" />}
          >
            sửa
          </Menu.Item>
          <Menu.Item onClick={open} color="red" leftSection={<BaseIcon name="trash-2" />}>
            xóa
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal title="Xóa Phòng Ban" centered opened={opened} onClose={close}>
        <Stack gap={10}>
          <Text size="sm" c="gray">
            Bạn có chắc muốn xóa phòng ban
          </Text>
          <BaseButton
            disabled={loading}
            loading={loading}
            onClick={handleDeleteDepartment}
            className="flex justify-center w-20 ml-auto"
            color="red"
          >
            Xóa
          </BaseButton>
        </Stack>
      </Modal>
      <UpdateDepartment row={row as any} />
    </>
  );
};
export default memo(ActionWithRow);
