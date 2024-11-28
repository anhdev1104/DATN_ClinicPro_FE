import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import former, { OptionsWithForm } from '@/lib/former';
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
    formState: { disabled },
  } = useFormContext<CreateDepartmentProps>();
  const { data: users } = useGetUsersQuery();
  const managers = useMemo(() => formatUserSelect(filterOutManagers(users?.data || [])), [users]);
  const listUser = useMemo(() => formatUserSelect(users?.data || []), [users]);
  const [addDepartment] = useCreateDepartmentMutation();
  const handleCreateDepartment = async (data: CreateDepartmentProps) => {
    const result = await addDepartment(data);
    if (result.error) {
      resolveErrorResponse((result.error as AxiosBaseQueryError).data, setError);
    } else {
      toast.success(result.data?.message as string);
      handleClose();
    }
  };
  return (
    <Form onSubmit={handleCreateDepartment}>
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
        <BaseButton loading={disabled} disabled={disabled} type="submit">
          Lưu
        </BaseButton>
      </Stack>
    </Form>
  );
};
const createDepartmentSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  manager_id: yup.string().nullable().optional(),
  users: yup.array().of(yup.string()).default([]),
});
const optionsWithForm: OptionsWithForm = {
  mode: 'onChange',
};
export default former(CreateDepartment, createDepartmentSchema, optionsWithForm);
