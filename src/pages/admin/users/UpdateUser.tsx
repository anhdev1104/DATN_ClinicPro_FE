import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/users';
import { getAllRole } from '@/services/roles.service';
import { IRole } from '@/types/role.type';
import { Avatar, Grid } from '@mantine/core';
import { IconCalendar, IconUpload } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useGetDepartmentsQuery } from '@/redux/api/department';
import { uploadFile } from '@/services/uploadFile.service';
import { resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { GENDER, STATUS } from '@/constants/define';
import dayjs from 'dayjs';
import Formik, { FormikHandler } from '@/lib/Formik';
import NotFoundPage from '@/pages/client/404/NotFoundPage';
import yup from '@/helpers/locate';

const updateUserSchema = yup.object({
  email: yup.string().email().required(),
  status: yup.string().oneOf(Object.values(STATUS) as `${STATUS}`[]),
  role_id: yup.string().required(),
  user_info: yup.object({
    fullname: yup.string().required(),
    address: yup.string().nullable(),
    phone_number: yup.string().nullable(),
    avatar: yup.string().url(),
    gender: yup.string().oneOf(Object.values(GENDER) as `${GENDER}`[]),
    dob: yup.string().nullable().optional(),
    department_id: yup.string().nullable(),
  }),
});
export type UpdateUserProps = yup.InferType<typeof updateUserSchema>;
export default function UpdateUser() {
  const [roles, setRoles] = useState<IRole[]>([]);
  const { userId } = useParams();
  const [updateUser] = useUpdateUserMutation();
  const { data: user } = useGetUserQuery(userId as string);
  const { data } = useGetDepartmentsQuery();
  const [upload, setUpload] = useState<{ file?: File | null; image: string }>({
    file: null,
    image: user?.user_info.avatar || '',
  });
  const listDepartment = useMemo(
    () => data?.data.map(department => ({ label: department.name, value: department.id })) || [],
    [data],
  );
  const handleUpdateUser: FormikHandler<UpdateUserProps> = async (data, { reset, setError }) => {
    const { user_info, ...props } = data;
    if (upload.file) {
      const formData = new FormData();
      formData.append('file', upload?.file as File);
      const url = await uploadFile(formData);
      if (url?.error) {
        toast.error(url.error);
        return;
      }
      setUpload({ ...upload, image: url.url });
    }
    const result = await updateUser({
      ...props,
      id: userId as string,
      user_info: {
        ...user_info,
        avatar: upload?.image || user_info.avatar,
        dob: dayjs(user_info.dob).format('YYYY-MM-DD'),
      },
    });
    if (result.data) {
      toast.success(result.data.message);
      reset();
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
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        {user ? (
          <Formik
            withAutoValidate
            options={{
              defaultValues: {
                email: user.email,
                role_id: user.role.id,
                status: user.status,
                user_info: {
                  ...user.user_info,
                  dob: dayjs(user.user_info.dob) as any,
                },
              },
              mode: 'onChange',
            }}
            schema={updateUserSchema}
            onSubmit={handleUpdateUser}
          >
            {({ formState: { disabled } }) => {
              return (
                <>
                  <Grid>
                    <Grid.Col className="flex space-x-6 items-center">
                      <Avatar size={100} src={upload?.image} alt="avatar"></Avatar>
                      <BaseButton.File
                        onChange={file => {
                          setUpload({ file, image: URL.createObjectURL(file as File) });
                        }}
                        accept="image/png,image/jpeg"
                      >
                        {props => (
                          <BaseButton {...props} size="xs" rightSection={<BaseIcon icon={IconUpload} />}>
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
                        autoComplete="phone_number"
                        label="Số Điện Thoại"
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <BaseInput.Textarea name="user_info.address" autoComplete="address" label="Địa Chỉ" />
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
                        valueFormat="YYYY/MM/DD"
                        placeholder="Pick Date"
                        label="Ngày Sinh"
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <BaseInput.Select
                        name="status"
                        data={Object.values(STATUS)}
                        autoComplete="status"
                        label="Status"
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <BaseInput.Select
                        name="user_info.department_id"
                        data={listDepartment}
                        autoComplete="department"
                        nothingFoundMessage="không tìm thấy phòng ban"
                        label="Phòng Ban"
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <BaseInput.Select
                        data={roles.map(role => ({ label: role.name, value: role.id }))}
                        name="role_id"
                        label="Role"
                        placeholder="Role"
                        autoComplete="role_id"
                      />
                    </Grid.Col>
                  </Grid>
                  <BaseButton disabled={disabled} loading={disabled} type="submit" className="flex ml-auto">
                    Cập Nhật
                  </BaseButton>
                </>
              );
            }}
          </Formik>
        ) : (
          <NotFoundPage title="không tìm thấy người dùng" />
        )}
      </div>
    </>
  );
}
