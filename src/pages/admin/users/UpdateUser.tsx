import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { resolveErrorResponse } from '@/helpers/utils';
import Form from '@/lib/Form';
import former from '@/providers/former';
import { useGetUsersQuery, useUpdateUserMutation } from '@/redux/api/users';
import { UpdateUserProps, updateUserSchema } from '@/schema/user.schema';
import { getAllRole } from '@/services/roles.service';
import { IRole } from '@/types/role.type';
import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ErrorResponse, useParams } from 'react-router-dom';
const UpdateUser = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const { userId } = useParams();
  const { handleSubmit, setError, reset, setValue } = useFormContext<UpdateUserProps>();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { user } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      user: data?.data.find(data => data.id === userId),
    }),
  });
  const handleUpdateUser = async (data: UpdateUserProps) => {
    const result = await updateUser({ id: '12423354', ...data });
    if (result.data) {
      toast.success(result.data.message);
      reset();
    } else {
      resolveErrorResponse((result.error as ErrorResponse)?.data, setError);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    getAllRole<{ data: IRole[] }>({ signal: controller.signal })
      .then(role => setRoles(role.data))
      .catch(error => error && toast.error(error?.message));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setValue('email', user?.email || '');
    setValue('user_info.fullname', user?.user_info.fullname || '');
    setValue('role_id', user?.role.id || '');
    setValue('user_info.fullname', user?.user_info.fullname || '');
  }, []);
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Form onSubmit={handleSubmit(handleUpdateUser)} className="space-y-4">
          <Grid>
            <Grid.Col span={4}>
              <BaseInput.Group name="email" autoComplete="email" label="Email" />
            </Grid.Col>
            <Grid.Col span={4}>
              <BaseInput.Group name="user_info.fullname" autoComplete="fullname" label="Họ và Tên" />
            </Grid.Col>
            <Grid.Col>
              <BaseInput.Group name="user_info.phone_number" autoComplete="phone_number" label="Số Điện Thoại" />
            </Grid.Col>
            <Grid.Col>
              <BaseInput.Select
                placeholder="Role"
                name="role_id"
                autoComplete="role_id"
                data={roles.map(role => ({ label: role.name, value: role.id }))}
              />
            </Grid.Col>
          </Grid>
          <BaseButton disabled={isLoading} loading={isLoading} type="submit" className="flex ml-auto">
            Cập Nhật
          </BaseButton>
        </Form>
      </div>
    </>
  );
};
export default former(UpdateUser, updateUserSchema, { mode: 'onChange' });
