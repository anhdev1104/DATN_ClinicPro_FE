import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { useGetDepartmentQuery, useUpdateDepartmentMutation } from '@/redux/api/department';
import { Stack } from '@mantine/core';
import yup from '@/helpers/locate';
import { renderOption } from '@/helpers/format';
import Formik, { FormikHandler } from '@/lib/Formik';
import { useNavigate, useParams } from 'react-router-dom';
import { resolveErrorResponse } from '@/helpers/utils';
import { useGetUsersQuery } from '@/redux/api/users';
import toast from 'react-hot-toast';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';

const updateDepartmentSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional().nullable(),
  manager_id: yup.string().nullable().optional(),
  users: yup.array().of(yup.string()).default([]),
  users_delete: yup.array().of(yup.string()).default([]),
});
export type UpdateDepartmentProps = yup.InferType<typeof updateDepartmentSchema>;

const UpdateDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: department, isFetching: isUserFetching } = useGetDepartmentQuery(id as string);
  const { data: managers } = useGetUsersQuery({ role: 'manager' });
  const { data: users } = useGetUsersQuery();
  const [handleUpdate] = useUpdateDepartmentMutation();
  const handleUpdateDepartment: FormikHandler<UpdateDepartmentProps> = async (data, { setError }) => {
    const result = await handleUpdate({ id: id as string, ...data });
    if (result.error) {
      resolveErrorResponse((result.error as AxiosBaseQueryError)?.data, setError);
    } else {
      toast.success((result.data as any)?.message);
      navigate(-1);
    }
  };
  return (
    <div className="bg-white rounded-3xl w-full shadow-xl p-4">
      {!isUserFetching ? (
        <Formik
          withAutoValidate
          schema={updateDepartmentSchema}
          onSubmit={handleUpdateDepartment}
          options={{
            defaultValues: {
              manager_id: department?.manager?.id,
              description: department?.description,
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
                    data={managers?.data?.map(manager => ({
                      value: manager.id,
                      label: manager.user_info.fullname,
                      avatar: manager.user_info.avatar,
                      email: manager.email,
                    }))}
                    renderOption={renderOption}
                    clearable
                    searchable
                    allowDeselect={false}
                    nothingFoundMessage="không tìm thấy quản lý"
                  />
                  <BaseInput.MultiSelect
                    name="users"
                    data={users?.data?.map(user => ({
                      value: user.id,
                      label: user.user_info?.fullname,
                      avatar: user.user_info?.avatar,
                      email: user.email,
                    }))}
                    onRemove={value => setValue('users_delete', [...(getValues('users_delete') || ''), value])}
                    renderOption={renderOption}
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default UpdateDepartment;
