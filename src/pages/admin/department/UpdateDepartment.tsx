import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { useGetDepartmentQuery, useUpdateDepartmentMutation } from '@/redux/api/department';
import { Stack } from '@mantine/core';
import yup from '@/helpers/locate';
import { renderOption } from '@/helpers/format';
import Formik, { FormikHandler } from '@/lib/Formik';
import { useNavigate, useParams } from 'react-router-dom';
import { filterOutManagers, formatUserSelect, resolveErrorResponse } from '@/helpers/utils';
import { useGetUsersQuery } from '@/redux/api/users';
import toast from 'react-hot-toast';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { useMemo } from 'react';

const updateDepartmentSchema = yup.object({
  name: yup.string().required().optional(),
  description: yup.string().optional(),
  manager_id: yup.string().optional(),
  users: yup.array().of(yup.string()).optional(),
  users_delete: yup.array().of(yup.string()).optional(),
});
export type UpdateDepartmentProps = yup.InferType<typeof updateDepartmentSchema>;

export default function UpdateDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: department, isSuccess } = useGetDepartmentQuery(id as string);
  const { data: users } = useGetUsersQuery();

  const managers = useMemo(() => formatUserSelect(filterOutManagers(users?.data || [])), [users]);
  const listUsers = useMemo(() => formatUserSelect(users?.data || []), [users]);

  const [handleUpdate] = useUpdateDepartmentMutation();
  const handleUpdateDepartment: FormikHandler<UpdateDepartmentProps> = async (data, { setError }) => {
    const result = await handleUpdate({ id: id as string, ...data });
    if (result.data) {
      toast.success(result.data?.message || '');
      navigate(-1);
      return;
    }
    resolveErrorResponse((result.error as AxiosBaseQueryError)?.data, setError);
  };

  return (
    <div className="bg-white rounded-3xl w-full shadow-xl p-4">
      {isSuccess && (
        <Formik
          withAutoValidate
          schema={updateDepartmentSchema}
          onSubmit={handleUpdateDepartment}
          options={{
            defaultValues: {
              manager_id: department?.manager?.id,
              description: department?.description || '',
              name: department?.name,
              users: department?.users?.map(user => user.id) || [],
            },
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
                    onRemove={value => setValue('users_delete', [...(getValues('users_delete') || ''), value])}
                    data={listUsers}
                    renderOption={renderOption}
                    name="users"
                    autoComplete="users"
                    label="Chọn Nhân Viên"
                    clearable
                    searchable
                    hidePickedOptions
                    nothingFoundMessage="không tìm thấy nhân viên nào"
                  />
                </Stack>
                <BaseButton fullWidth loading={disabled} disabled={disabled} type="submit">
                  Lưu
                </BaseButton>
              </>
            );
          }}
        </Formik>
      )}
    </div>
  );
}
