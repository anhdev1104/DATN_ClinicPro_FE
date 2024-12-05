import BaseButton from '@/components/base/button';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { resolveErrorResponse } from '@/helpers/utils';
import { useDeleteDepartmentMutation } from '@/redux/api/department';
import { Stack, Text } from '@mantine/core';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const DeleteDepartment = ({ id, close }: { id: string; close: () => void }) => {
  const [handleDelete, { isLoading }] = useDeleteDepartmentMutation();
  const navigate = useNavigate();
  const handleDeleteDepartment = async () => {
    const result = await handleDelete(id!);
    if (result.data) {
      toast.success(result.data?.message);
      navigate('/departments');
      close();
      return;
    }
    resolveErrorResponse((result.error as AxiosBaseQueryError).data);
    close();
  };
  return (
    <>
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
    </>
  );
};
