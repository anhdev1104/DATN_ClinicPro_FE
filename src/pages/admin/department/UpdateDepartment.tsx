import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { useGetDepartmentQuery, useUpdateDepartmentMutation } from '@/redux/api/department';
import { Flex, Stack } from '@mantine/core';
import yup from '@/helpers/locate';
import { renderOption } from '@/helpers/format';
import Formik, { FormikHandler } from '@/lib/Formik';
import { useNavigate, useParams } from 'react-router-dom';
import { filterOutManagers, formatUserSelect, resolveErrorResponse } from '@/helpers/utils';
import { useGetUsersQuery } from '@/redux/api/users';
import toast from 'react-hot-toast';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { useMemo } from 'react';
import NotFoundPage from '@/pages/client/404/NotFoundPage';

const updateDepartmentSchema = yup.object({
  name: yup.string().trim().omit([null]),
  description: yup.string().omit([null]),
  manager_id: yup.string(),
  users: yup.array().of(yup.string()),
  users_delete: yup.array().of(yup.string()).default([]),
});
export type UpdateDepartmentProps = yup.InferType<typeof updateDepartmentSchema>;

export default function UpdateDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [handleUpdate] = useUpdateDepartmentMutation();
  const { data: department } = useGetDepartmentQuery(id!);
  const { data: users } = useGetUsersQuery();
  const managers = useMemo(() => formatUserSelect(filterOutManagers(users?.data || [])), [users]);
  const listUsers = useMemo(() => formatUserSelect(users?.data || []), [users]);

  const handleUpdateDepartment: FormikHandler<UpdateDepartmentProps> = async (data, { setError }) => {
    const result = await handleUpdate({ id: id!, ...data });
    if (result.data) {
      toast.success(result.data?.message);
      navigate(-1);
      return;
    }
    resolveErrorResponse((result.error as AxiosBaseQueryError)?.data, setError);
  };
  if (!department) return <NotFoundPage title="không tìm thấy phòng ban" />;
  return (
    <div className="bg-white rounded-3xl w-full shadow-xl p-4">
      <Formik
        withAutoValidate
        onSubmit={handleUpdateDepartment}
        schema={updateDepartmentSchema}
        options={{
          defaultValues: updateDepartmentSchema.safeParse({
            ...department,
            users: department?.users.map(user => user?.id || ''),
          }),
          mode: 'onChange',
        }}
      >
        {({ formState: { disabled }, setValue, getValues }) => {
          return (
            <>
              <Stack>
                <BaseInput.Group name="name" autoComplete="name" label="Tên phòng ban" placeholder="Phòng IT..." />
                <BaseInput.Textarea name="description" autoComplete="description" label="Mô tả" />
                <BaseInput.Select
                  name="manager_id"
                  autoComplete="manager_id"
                  label="Chọn Quản lý"
                  data={managers}
                  renderOption={renderOption}
                  clearable
                  searchable
                  allowDeselect={false}
                  nothingFoundMessage="không tìm thấy quản lý"
                />
                <BaseInput.MultiSelect
                  name="users"
                  autoComplete="users"
                  onRemove={value => setValue('users_delete', [...(getValues('users_delete') || ''), value])}
                  data={listUsers}
                  renderOption={renderOption}
                  label="Chọn Nhân Viên"
                  clearable
                  searchable
                  hidePickedOptions
                  nothingFoundMessage="không tìm thấy nhân viên nào"
                />
              </Stack>
              <Flex gap={10} justify="end">
                <BaseButton color="gray" onClick={() => navigate(-1)}>
                  Hủy
                </BaseButton>
                <BaseButton w={100} loading={disabled} disabled={disabled} type="submit">
                  Lưu
                </BaseButton>
              </Flex>
            </>
          );
        }}
      </Formik>
    </div>
  );
}
