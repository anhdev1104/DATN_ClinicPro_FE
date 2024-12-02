/* eslint-disable react-refresh/only-export-components */
import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { BaseModalProps } from '@/components/base/modal';
import { GENDER, STATUS } from '@/constants/define';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import yup from '@/helpers/locate';
import { formatDepartmentSelect, resolveErrorResponse } from '@/helpers/utils';
import Form from '@/lib/Form';
import former from '@/lib/former';
import { useGetDepartmentsQuery } from '@/redux/api/department';
import { useCreateUserMutation } from '@/redux/api/users';
import { getAllRole } from '@/services/roles.service';
import { uploadFile } from '@/services/uploadFile.service';
import { IRole } from '@/types/role.type';
import { Avatar, Grid } from '@mantine/core';
import { IconCalendar, IconUpload } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export type CreateUserProps = yup.InferType<typeof createUserSChema>;

const CreateUser = ({ close }: BaseModalProps) => {
  const [upload, setUpload] = useState<{ file?: File | null; image?: string }>({ file: null, image: '' });
  const [roles, setRoles] = useState<IRole[]>([]);
  const {
    setError,
    formState: { disabled },
  } = useFormContext<CreateUserProps>();

  const { data: department } = useGetDepartmentsQuery();
  const [createUser] = useCreateUserMutation();

  const departmentsOption = useMemo(() => formatDepartmentSelect(department?.data || []), [department]);
  const rolesOption = useMemo(() => roles.map(role => ({ label: role.name, value: role.id })), [roles]);

  const handleCreateUser = async (data: CreateUserProps) => {
    const { user_info, ...rest } = data;
    let url;
    if (upload.file) {
      const formData = new FormData();
      formData.append('file', upload.file as File);
      url = await uploadFile(formData);
    }
    const result = await createUser({
      ...rest,
      user_info: {
        ...user_info,
        avatar: url?.data?.url,
        dob: user_info.dob && dayjs(user_info.dob).format('YYYY-MM-DD'),
      },
    });
    if (result.data) {
      toast.success(result.data.message);
      close();
      return;
    }
    resolveErrorResponse((result.error as AxiosBaseQueryError)?.data, setError);
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
      <Form onSubmit={handleCreateUser}>
        <Grid>
          <Grid.Col className="flex space-x-6 items-center">
            <Avatar size={100} src={upload.image} alt="avatar" />
            <BaseButton.File
              onChange={file => setUpload({ file, image: URL.createObjectURL(file as File) })}
              accept="image/png,image/jpeg"
            >
              {props => (
                <BaseButton {...props} disabled={disabled} size="xs" rightSection={<BaseIcon icon={IconUpload} />}>
                  Upload
                </BaseButton>
              )}
            </BaseButton.File>
          </Grid.Col>
          <Grid.Col span={4}>
            <BaseInput.Group name="user_info.fullname" autoComplete="fullname" label="Họ và Tên" />
          </Grid.Col>
          <Grid.Col span={4}>
            <BaseInput.Group name="email" autoComplete="email" label="Email" />
          </Grid.Col>
          <Grid.Col span={4}>
            <BaseInput.Group
              name="user_info.phone_number"
              type="number"
              autoComplete="phone_number"
              label="Số Điện Thoại"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <BaseInput.Password name="password" autoComplete="password" label="Password" />
          </Grid.Col>
          <Grid.Col span={4}>
            <BaseInput.Select
              name="user_info.gender"
              data={Object.values(GENDER)}
              autoComplete="gender"
              label="Giới tính"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <BaseInput.Date
              name="user_info.dob"
              autoComplete="dob"
              leftSection={<BaseIcon icon={IconCalendar} />}
              placeholder="Chọn ngày sinh"
              label="Ngày Sinh"
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <BaseInput.Textarea name="user_info.address" autoComplete="address" label="Địa Chỉ" />
          </Grid.Col>
          <Grid.Col span={4}>
            <BaseInput.Select data={Object.values(STATUS)} name="status" autoComplete="status" label="Status" />
          </Grid.Col>
          <Grid.Col>
            <BaseInput.Select
              name="user_info.department_id"
              autoComplete="department_id"
              data={departmentsOption}
              nothingFoundMessage="Chưa có phòng ban nào"
              label="Phòng Ban"
            />
          </Grid.Col>
          <Grid.Col>
            <BaseInput.Select
              name="role_id"
              autoComplete="role_id"
              data={rolesOption}
              label="Role"
              placeholder="Role"
            />
          </Grid.Col>
        </Grid>
        <BaseButton type="submit" className="flex ml-auto">
          Thêm
        </BaseButton>
      </Form>
    </>
  );
};
export const createUserSChema = yup.object({
  email: yup.string().email().trim().required(),
  password: yup.string().trim().required().min(8),
  status: yup
    .string()
    .oneOf(Object.values(STATUS) as `${STATUS}`[])
    .default(STATUS.INACTIVE),
  role_id: yup.string().required(),
  user_info: yup.object({
    fullname: yup.string().required().trim(),
    address: yup.string().nullable(),
    phone_number: yup.string().max(10).nullable(),
    avatar: yup.string().url(),
    gender: yup
      .string()
      .oneOf(Object.values(GENDER) as `${GENDER}`[])
      .default(GENDER.OTHER),
    dob: yup.string().nullable().default(null),
    department_id: yup.string().nullable(),
  }),
});
export default former(CreateUser, createUserSChema, { mode: 'onChange' });
