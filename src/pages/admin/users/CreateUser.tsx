import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { resolveErrorResponse } from '@/helpers/utils';
import { Form } from '@/lib/Form';
import former from '@/providers/former';
import { useCreateUserMutation } from '@/redux/api/users';
import { CreateUserProps, createUserSChema } from '@/schema/user.schema';
import { getAllRole } from '@/services/roles.service';
import { IRole } from '@/types/role.type';
import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ErrorResponse } from 'react-router-dom';
const CreateUser = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const { handleSubmit, setError, reset } = useFormContext<CreateUserProps>();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const handleCreateUser = async (data: CreateUserProps) => {
    const result = await createUser(data);
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
      .catch(error => toast.error(error.message));
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Form onSubmit={handleSubmit(handleCreateUser)} className="space-y-4">
          <Grid>
            <Grid.Col span={4}>
              <BaseInput.Group name="email" autoComplete="email" label="Email" />
            </Grid.Col>
            <Grid.Col span={4}>
              <BaseInput.Group name="password" autoComplete="password" label="Password" />
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
            Thêm
          </BaseButton>
        </Form>
      </div>
    </>
  );
};
export default former(CreateUser, createUserSChema, { mode: 'onChange' });
