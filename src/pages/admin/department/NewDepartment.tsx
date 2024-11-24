import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import former, { OptionsWithForm } from '@/providers/former';
import { Form } from '@/lib/Form';
import { useAddAnDepartmentMutation } from '@/redux/api/department';
import { useGetUsersQuery } from '@/redux/api/users';
import { newDepartmentSchema } from '@/schema/department.schema';
import { NewDepartmentProps } from '@/types/department.type';
import { IUserInfo } from '@/types/user.type';
import { filterOutManagers } from '@/helpers/utils';
import { Avatar, Group, Stack } from '@mantine/core';
import { useMemo } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IconCheck } from '@tabler/icons-react';

interface Options {
  value: string;
  label: string;
  avatar?: string;
}
const NewDepartment = ({ handleClose }: { handleClose: () => void }) => {
  const {
    handleSubmit,
    setValue,
    formState: { disabled },
    setError,
  } = useFormContext<NewDepartmentProps>();
  const { data, isSuccess } = useGetUsersQuery();
  const [addDepartment] = useAddAnDepartmentMutation();
  const department: IUserInfo[] = useMemo(() => (isSuccess ? filterOutManagers(data?.data) : []), [data]);
  const formatData: Options[] = useMemo(
    () =>
      department.map(item => ({
        value: item.id,
        label: item.user_info.fullname,
        avatar: item.user_info.avatar,
      })),
    [department],
  );

  const handleAddNewDepartment: SubmitHandler<NewDepartmentProps> = async data => {
    try {
      const result = await addDepartment(data);
      if (result.error) {
        const errors = result.error as AxiosBaseQueryError<{ message: string; errors: any[] }>;
        setError('name', { message: errors.data.message });
      } else {
        toast.success(result.data?.message);
        handleClose();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleAddNewDepartment)}>
      <Stack>
        <BaseInput.Group autoComplete="name" name="name" label="Tên phòng ban" placeholder="Phòng IT..." />
        <BaseInput.Textarea autoComplete="description" name="description" label="Mô tả" />
        <BaseInput.Select
          autoComplete="manager_id"
          name="manager_id"
          label="Chọn Quản lý"
          data={formatData}
          onChange={value => setValue('manager_id', value)}
          renderOption={({ option, checked }) => (
            <Group flex="1" gap="xs">
              <Avatar size="sm" src={(option as Options).avatar} />
              {option.label}
              {checked && <BaseIcon icon={IconCheck} style={{ marginInlineStart: 'auto' }} />}
            </Group>
          )}
          clearable
          searchable
          nothingFoundMessage="không tìm thấy quản lý"
        />
        <BaseButton loading={disabled} disabled={disabled} type="submit">
          Lưu
        </BaseButton>
      </Stack>
    </Form>
  );
};

const optionsWithForm: OptionsWithForm = {
  mode: 'onChange',
};
export default former(NewDepartment, newDepartmentSchema, optionsWithForm);
