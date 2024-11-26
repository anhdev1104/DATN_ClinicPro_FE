import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import former, { OptionsWithForm } from '@/providers/former';
import Form from '@/lib/Form';
import { useUpdateDepartmentMutation } from '@/redux/api/department';
import { useGetUsersQuery } from '@/redux/api/users';
import { IUserInfo } from '@/types/user.type';
import { filterOutManagers } from '@/helpers/utils';
import { Stack } from '@mantine/core';
import { useMemo } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import yup from '@/helpers/locate';
import { renderOption } from '@/lib/format';

const updateDepartmentSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  manager_id: yup.string().nullable().optional(),
  users: yup.array().of(yup.string()).default([]),
});
export type UpdateDepartmentProps = yup.InferType<typeof updateDepartmentSchema>;

const UpdateDepartment = () => {
  const {
    setValue,
    formState: { disabled },
    setError,
  } = useFormContext<UpdateDepartmentProps>();
  const { data, isSuccess } = useGetUsersQuery();
  const [update] = useUpdateDepartmentMutation();
  const department: IUserInfo[] = useMemo(() => (isSuccess ? filterOutManagers(data?.data) : []), [data]);
  const departmentId = useMemo(
    () => window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
    [window.location.pathname],
  );
  const handleUpdateDepartment: SubmitHandler<UpdateDepartmentProps> = async data => {
    const result = await update({ id: departmentId, ...data });
    if (result.error) {
      const errors = result.error as AxiosBaseQueryError<{ message: string; errors: any[] }>;
      const errorName: any = Object.keys(errors.data.errors);
      setError(errorName[0], { message: errors.data.errors[errorName[0]] });
    } else {
      toast.success((result.data as any)?.message);
      // handleModalUpdate.close();
    }
  };
  return (
    <Form onSubmit={handleUpdateDepartment}>
      <Stack>
        <BaseInput.Group autoComplete="name" name="name" label="Tên phòng ban" placeholder="Phòng IT..." />
        <BaseInput.Textarea autoComplete="description" name="description" label="Mô tả" />
        <BaseInput.Select
          autoComplete="manager_id"
          name="manager_id"
          label="Chọn Quản lý"
          data={department.map(item => ({
            value: item.id,
            label: item.user_info.fullname,
            avatar: item.user_info.avatar,
          }))}
          onChange={value => setValue('manager_id', value)}
          renderOption={renderOption}
          clearable
          searchable
          allowDeselect={false}
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
export default former(UpdateDepartment, updateDepartmentSchema, optionsWithForm);
