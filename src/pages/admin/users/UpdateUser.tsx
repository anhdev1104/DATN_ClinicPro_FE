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
const UpdateUser = () => {
  const [file, setFile] = useState<{ file: File | null; url?: string }>();
  const [roles, setRoles] = useState<IRole[]>([]);
  const { userId } = useParams();
  const [updateUser] = useUpdateUserMutation();
  const { data: user } = useGetUserQuery(userId as string);
  const { data } = useGetDepartmentsQuery();
  const listDepartment = useMemo(
    () => data?.data.map(department => ({ label: department.name, value: department.id })) || [],
    [data],
  );
  const [image, setImage] = useState(user?.user_info?.avatar);
  const handleUpdateUser: FormikHandler<UpdateUserProps> = async (data, { reset, setError }) => {
    const { user_info, ...props } = data;
    if (file) {
      const formData = new FormData();
      formData.append('file', new Blob([file?.file as File], { type: file?.file?.type }));
      const url = await uploadFile(formData);
      if (url?.error) {
        toast.error(url.error);
      } else {
        setFile({ ...file, url: url.url });
      }
    }
    const result = await updateUser({
      ...props,
      id: '',
      user_info: {
        ...user_info,
        avatar: file?.url || user_info.avatar,
      },
    });
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
        {user ? (
          <Formik
            options={{
              defaultValues: {
                email: user.email,
                role_id: user.role.id,
                status: user.status,
                user_info: user.user_info,
              },
              mode: 'onChange',
            }}
            schema={updateUserSchema}
            onSubmit={handleUpdateUser}
          >
            {({
              formState: {
                errors: { email, user_info, role_id, status, ...props },
                disabled,
                defaultValues,
              },
              register,
              setValue,
            }) => {
              console.log(props);
              return (
                <>
                  <Grid>
                    <Grid.Col className="flex space-x-6 items-center">
                      <Avatar size={100} src={image} alt="avatar"></Avatar>
                      <BaseButton.File
                        onChange={e => {
                          setFile(file => ({ ...file, file: e }));
                          const reader = new FileReader();
                          reader.onload = e => {
                            setImage(e.target?.result as string);
                          };
                          reader.readAsDataURL(e as File);
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
                      <BaseInput.Group
                        {...register('user_info.fullname')}
                        error={user_info?.fullname?.message}
                        autoComplete="fullname"
                        label="Họ và Tên"
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <BaseInput.Group
                        error={email?.message}
                        {...register('email')}
                        autoComplete="email"
                        label="Email"
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <BaseInput.Group
                        {...register('user_info.phone_number')}
                        error={user_info?.phone_number?.message}
                        autoComplete="phone_number"
                        label="Số Điện Thoại"
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <BaseInput.Textarea
                        {...register('user_info.address')}
                        error={user_info?.address?.message}
                        autoComplete="fullname"
                        label="Địa Chỉ"
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <BaseInput.Select
                        defaultSearchValue={defaultValues?.user_info?.gender}
                        onChange={value => setValue('user_info.gender', value as `${GENDER}`)}
                        data={Object.values(GENDER)}
                        error={user_info?.gender?.message}
                        autoComplete="fullname"
                        label="Giới tính"
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <BaseInput.Date
                        valueFormat="YYYY/MM/DD"
                        defaultValue={new Date((defaultValues?.user_info?.dob as string) || Date.now()) as any}
                        onChange={value => setValue('user_info.dob', dayjs(value as Date).format('YYYY-MM-DD'))}
                        error={user_info?.dob?.message}
                        leftSection={<BaseIcon icon={IconCalendar} />}
                        placeholder="Pick Date"
                        autoComplete="date of birth"
                        label="Ngày Sinh"
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <BaseInput.Select
                        defaultSearchValue={defaultValues?.status}
                        onChange={value => setValue('status', value as `${STATUS}`)}
                        data={Object.values(STATUS)}
                        error={status?.message}
                        autoComplete="status"
                        label="Status"
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <BaseInput.Select
                        defaultSearchValue={listDepartment
                          ?.find(department => department?.value == user?.user_info?.department_id)
                          ?.label.toString()}
                        onChange={value => setValue('user_info.department_id', value)}
                        data={listDepartment}
                        error={user_info?.department_id?.message}
                        autoComplete="department"
                        nothingFoundMessage="không tìm thấy phòng ban"
                        label="Phòng Ban"
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <BaseInput.Select
                        defaultSearchValue={user?.role.name}
                        onChange={value => setValue('role_id', value as string)}
                        error={role_id?.message}
                        data={roles.map(role => ({ label: role.name, value: role.id }))}
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
};
export default UpdateUser;
