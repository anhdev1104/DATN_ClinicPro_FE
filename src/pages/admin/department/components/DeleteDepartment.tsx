import BaseButton from '@/components/base/button';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { resolveErrorResponse } from '@/helpers/utils';
import { useDeleteDepartmentMutation } from '@/redux/api/department';
import { Modal, Stack, Text } from '@mantine/core';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteDepartment = ({ close, opened }: { close: () => void; opened: boolean }) => {
  const { id } = useParams();
  const [handleDelete, { isLoading }] = useDeleteDepartmentMutation();
  const navigate = useNavigate();
  const handleDeleteDepartment = async () => {
    const result = await handleDelete(id as string);
    if (result.error) {
      resolveErrorResponse((result.error as AxiosBaseQueryError).data);
      close();
    } else {
      toast.success(result.data?.message as string);
      navigate('/departments');
    }
  };
  return (
    <>
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
