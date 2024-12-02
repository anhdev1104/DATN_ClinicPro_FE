import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { resolveErrorResponse } from '@/helpers/utils';
import { useDeleteDepartmentMutation } from '@/redux/api/department';
import { Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteDepartment = () => {
  const { id } = useParams();
  const [opened, { close, open }] = useDisclosure();
  const [handleDelete, { isLoading }] = useDeleteDepartmentMutation();
  const navigate = useNavigate();
  const handleDeleteDepartment = async () => {
    const result = await handleDelete(id!);
    if (result.data) {
      toast.success(result.data?.message!);
      navigate('/departments');
      return;
    }
    resolveErrorResponse((result.error as AxiosBaseQueryError).data);
    close();
  };
  return (
    <>
      <BaseButton size="xs" leftSection={<BaseIcon icon={IconTrash} />} onClick={open} color="red">
        Xóa Phòng Ban
      </BaseButton>
      <Modal title="Xóa Phòng Ban" centered opened={opened} onClose={close}>
        <Stack gap={10}>
          <Text size="sm" c="gray">
            Bạn có chắc muốn xóa phòng ban
          </Text>
          <BaseButton
            disabled={isLoading}
            loading={isLoading}
            onClick={handleDeleteDepartment}
            className="flex justify-center w-20 ml-auto"
            color="red"
          >
            Xóa
          </BaseButton>
        </Stack>
      </Modal>
    </>
  );
};
