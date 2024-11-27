import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { GENDER } from '@/constants/define';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { resolveErrorResponse } from '@/helpers/utils';
import Form from '@/lib/Form';
import former from '@/lib/former';
import { useGetDepartmentsQuery } from '@/redux/api/department';
import { useCreateUserMutation } from '@/redux/api/users';
import { CreateUserProps, createUserSChema } from '@/schema/user.schema';
import { getAllRole } from '@/services/roles.service';
import { IRole } from '@/types/role.type';
import { Grid } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-hot-toast';
const CreateUser = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const { setError, reset, setValue } = useFormContext<CreateUserProps>();
  const [createUser] = useCreateUserMutation();
  const { data: department } = useGetDepartmentsQuery();
  const listDepartment = useMemo(
    () => department?.data.map(data => ({ label: data.name, value: data.id })),
    [department],
  );
  const handleCreateUser = async (data: CreateUserProps) => {
    const result = await createUser(data);
    if (result.data) {
      toast.success(result.data.message);
      reset();
    } else {
      resolveErrorResponse((result.error as AxiosBaseQueryError)?.data, setError);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    getAllRole<{ data: IRole[] }>({ signal: controller.signal })
      .then(role => setRoles(role.data))
      .catch(error => error && toast.error(error?.message));
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Form onSubmit={handleCreateUser}>
          <Grid>
            {/* <Grid.Col className="flex space-x-6 items-center"> */}
            {/* <Avatar size={100} src={image} alt="avatar"></Avatar> */}
            {/* <BaseButton.File
                        onChange={e => {
                          setFile(file => ({ ...file, file: e }));
                          const reader = new FileReader();
                          reader.onload = e => {
                            setImage(e.target?.result as string);
                          };
                          reader.readAsDataURL(e as File);
                        }}
                        accept="image/png,image/jpeg"
                      > */}
            {/* {props => (
                          <BaseButton {...props} size="xs" rightSection={<BaseIcon icon={IconUpload} />}>
                            Upload
                          </BaseButton>
                        )}
                      </BaseButton.File> */}
            {/* </Grid.Col> */}
            <Grid.Col span={4}>
              <BaseInput.Group name="user_info.fullname" autoComplete="fullname" label="Họ và Tên" />
            </Grid.Col>
            <Grid.Col span={4}>
              <BaseInput.Group name="email" autoComplete="email" label="Email" />
            </Grid.Col>
            <Grid.Col span={4}>
              <BaseInput.Group name="user_info.phone_number" autoComplete="phone_number" label="Số Điện Thoại" />
            </Grid.Col>
            <Grid.Col span={4}>
              <BaseInput.Password name="password" autoComplete="password" label="Password" />
            </Grid.Col>
            <Grid.Col span={4}>
              <BaseInput.Select
                name="user_info.gender"
                defaultSearchValue={'other'}
                onChange={value => setValue('user_info.gender', value as `${GENDER}`)}
                data={Object.values(GENDER)}
                autoComplete="gender"
                label="Giới tính"
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <BaseInput.Date
                name="user_info.dob"
                valueFormat="YYYY/MM/DD"
                onChange={value => setValue('user_info.dob', new Date(value as Date))}
                leftSection={<BaseIcon icon={IconCalendar} />}
                placeholder="Pick Date"
                autoComplete="dob"
                label="Ngày Sinh"
              />
            </Grid.Col>
            <Grid.Col>
              <BaseInput.Textarea name="user_info.address" autoComplete="address" label="Địa Chỉ" />
            </Grid.Col>
            <Grid.Col>
              <BaseInput.Select
                name="user_info.department_id"
                onChange={value => setValue('user_info.department_id', value)}
                data={listDepartment}
                autoComplete="department_id"
                nothingFoundMessage="Chưa có phòng ban nào"
                label="Phòng Ban"
              />
            </Grid.Col>
            <Grid.Col>
              <BaseInput.Select
                name="role_id"
                data={roles.map(role => ({ label: role.name, value: role.id }))}
                label="Role"
                placeholder="Role"
                autoComplete="role_id"
              />
            </Grid.Col>
          </Grid>
          <BaseButton type="submit" className="flex ml-auto">
            Thêm
          </BaseButton>
        </Form>
      </div>
    </>
  );
};
export default former(CreateUser, createUserSChema, { mode: 'onChange' });
