import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import former from '@/lib/former';
import Form from '@/lib/Form';
import { useCreateDepartmentMutation } from '@/redux/api/department';
import { useGetUsersQuery } from '@/redux/api/users';
import { Stack } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { IconUsersGroup } from '@tabler/icons-react';
import yup from '@/helpers/locate';
import { useMemo } from 'react';
import { filterOutManagers, formatUserSelect, resolveErrorResponse } from '@/helpers/utils';
import { renderOption } from '@/helpers/format';
import toast from 'react-hot-toast';

export type CreateDepartmentProps = yup.InferType<typeof createDepartmentSchema>;

const CreateDepartment = ({ handleClose }: { handleClose: () => void }) => {
  const {
    setError,
    formState: { isSubmitting },
  } = useFormContext<CreateDepartmentProps>();
  const { data: users } = useGetUsersQuery();
  const managers = useMemo(() => formatUserSelect(filterOutManagers(users?.data || [])), [users]);
  const listUser = useMemo(() => formatUserSelect(users?.data || []), [users]);
  const [createDepartment] = useCreateDepartmentMutation();
  const handleCreateDepartment = async (data: CreateDepartmentProps) => {
    const result = await createDepartment(data);
    if (result.data) {
      toast.success(result.data?.message);
      handleClose();
      return;
    }
    resolveErrorResponse((result.error as AxiosBaseQueryError)?.data, setError);
  };
  return (
    <Form withAutoValidate onSubmit={handleCreateDepartment}>
      <Stack>
        <BaseInput.Group autoComplete="name" name="name" label="Tên phòng ban" placeholder="Phòng IT..." />
        <BaseInput.Textarea autoComplete="description" name="description" label="Mô tả" />
        <BaseInput.Select
          autoComplete="manager_id"
          name="manager_id"
          label="Chọn Quản lý"
          data={managers}
          renderOption={renderOption}
          clearable
          searchable
          nothingFoundMessage="không tìm thấy quản lý"
        />
        <BaseInput.MultiSelect
          name="users"
          autoComplete="users"
          label="Chọn nhân viên trong phòng ban"
          placeholder="Pick value"
          maxDropdownHeight={200}
          hidePickedOptions
          searchable
          leftSection={<BaseIcon icon={IconUsersGroup} />}
          comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
          data={listUser}
          renderOption={renderOption}
          nothingFoundMessage="Không tìm thấy người dùng"
        />
        <BaseButton loading={isSubmitting} disabled={isSubmitting} type="submit">
          Lưu
        </BaseButton>
      </Stack>
    </Form>
  );
};
const createDepartmentSchema = yup.object({
  name: yup.string().trim().required(),
  description: yup.string(),
  manager_id: yup.string().nullable(),
  users: yup.array().of(yup.string()).default([]),
});
export default former(CreateDepartment, createDepartmentSchema, {
  mode: 'onChange',
});
