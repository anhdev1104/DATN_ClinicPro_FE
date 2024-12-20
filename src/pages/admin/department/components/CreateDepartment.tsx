import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import { Form, former } from '@/lib/form';
import { useCreateDepartmentMutation } from '@/redux/api/department';
import { useGetUsersQuery } from '@/redux/api/users';
import { Stack } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { IconBuilding, IconUsers, IconUsersGroup } from '@tabler/icons-react';
import yup from '@/lib/utils/yup';
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
        <BaseInput.Group
          autoComplete="name"
          name="name"
          leftSection={<BaseIcon icon={IconBuilding} />}
          label="Tên phòng ban"
          withAsterisk
          placeholder="Phòng IT..."
        />
        <BaseInput.Select
          autoComplete="manager_id"
          name="manager_id"
          label="Chọn Quản lý"
          data={managers}
          renderOption={renderOption}
          leftSection={<BaseIcon icon={IconUsers} />}
          clearable
          searchable
          nothingFoundMessage="không tìm thấy quản lý"
        />
        <BaseInput.MultiSelect
          name="users"
          autoComplete="users"
          label="Chọn nhân viên trong phòng ban"
          placeholder="Pick value"
          hidePickedOptions
          searchable
          leftSection={<BaseIcon icon={IconUsersGroup} />}
          data={listUser}
          renderOption={renderOption}
          nothingFoundMessage="Không tìm thấy người dùng"
        />
        <BaseInput.Textarea autoComplete="description" name="description" label="Mô tả" />
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
const CreateDepartmentComp = former(CreateDepartment, createDepartmentSchema, {
  mode: 'onChange',
});
export default CreateDepartmentComp;
