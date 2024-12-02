import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/users';
import { getAllRole } from '@/services/roles.service';
import { IRole } from '@/types/role.type';
import { Avatar, Flex, Grid } from '@mantine/core';
import { IconCalendar, IconUpload } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDepartmentsQuery } from '@/redux/api/department';
import { uploadFile } from '@/services/uploadFile.service';
import { formatDepartmentSelect, formatRoleSelect, resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { GENDER, STATUS } from '@/constants/define';
import dayjs from 'dayjs';
import Formik, { FormikHandler } from '@/lib/Formik';
import NotFoundPage from '@/pages/client/404/NotFoundPage';
import yup from '@/helpers/locate';

const updateUserSchema = yup.object({
  email: yup.string().email().trim().required(),
  status: yup
    .string()
    .oneOf(Object.values(STATUS) as `${STATUS}`[])
    .default(STATUS.INACTIVE),
  role_id: yup.string().required(),
  user_info: yup
    .object({
      fullname: yup.string().trim().required(),
      address: yup.string().omit([null]),
      phone_number: yup.string().max(10).omit([null]),
      avatar: yup.string().url(),
      gender: yup
        .string()
        .oneOf(Object.values(GENDER) as `${GENDER}`[])
        .default(GENDER.OTHER),
      dob: yup.date(),
      department_id: yup.string().omit([null]),
    })
    .nonNullable(),
});
export type UpdateUserProps = yup.InferType<typeof updateUserSchema>;

export default function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data: user } = useGetUserQuery(userId!);
  const { data: departments } = useGetDepartmentsQuery();
  const [updateUser] = useUpdateUserMutation();

  const [roles, setRoles] = useState<IRole[]>([]);
  const [upload, setUpload] = useState<{ file?: File | null; image: string }>({
    file: null,
    image: user?.user_info?.avatar!,
  });

  const deparmentsOption = useMemo(() => formatDepartmentSelect(departments?.data || []), [departments]);
  const rolesOption = useMemo(() => formatRoleSelect(roles || []), [roles]);

  const handleUpdateUser: FormikHandler<UpdateUserProps> = async (data, { setError }) => {
    const { user_info, ...props } = data;
    let url;
    if (upload.file) {
      const formData = new FormData();
      formData.append('file', upload.file as File);
      url = await uploadFile(formData);
    }
    const result = await updateUser({
      ...props,
      id: userId!,
      user_info: {
        ...user_info,
        avatar: url,
        dob: user_info?.dob ? (dayjs(user_info.dob).format('YYYY-MM-DD') as any) : null,
      },
    });
    if (result.data) {
      toast.success(result.data.message);
      navigate(`/users/${userId}`);
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

  if (!user) return <NotFoundPage title="không tìm thấy người dùng" />;
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Formik
          withAutoValidate
          options={{
            defaultValues: updateUserSchema.safeParse({ ...user, role_id: user?.role?.id }),
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
                      onChange={file => setUpload({ file, image: URL.createObjectURL(file as File) })}
                      accept="image/png,image/jpeg"
                    >
                      {props => (
                        <BaseButton
                          {...props}
                          disabled={disabled}
                          size="xs"
                          rightSection={<BaseIcon icon={IconUpload} />}
                        >
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
                      type="number"
                      name="user_info.phone_number"
                      autoComplete="phone_number"
                      label="Số Điện Thoại"
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
                  <Grid.Col>
                    <BaseInput.Select
                      name="user_info.department_id"
                      autoComplete="department_id"
                      data={deparmentsOption}
                      nothingFoundMessage="không tìm thấy phòng ban"
                      label="Phòng Ban"
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <BaseInput.Select
                      name="user_info.gender"
                      autoComplete="gender"
                      data={Object.values(GENDER)}
                      label="Giới tính"
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <BaseInput.Date
                      name="user_info.dob"
                      autoComplete="dob"
                      leftSection={<BaseIcon icon={IconCalendar} />}
                      valueFormat="YYYY/MM/DD"
                      placeholder="Chọn ngày sinh"
                      label="Ngày Sinh"
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <BaseInput.Select name="status" autoComplete="status" data={Object.values(STATUS)} label="Status" />
                  </Grid.Col>
                  <Grid.Col>
                    <BaseInput.Textarea name="user_info.address" autoComplete="address" label="Địa Chỉ" />
                  </Grid.Col>
                </Grid>
                <Flex gap={10} className="justify-end">
                  <BaseButton onClick={() => navigate(-1)} disabled={disabled} loading={disabled} color="gray">
                    Hủy
                  </BaseButton>
                  <BaseButton disabled={disabled} loading={disabled} type="submit">
                    Cập Nhật
                  </BaseButton>
                </Flex>
              </>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
