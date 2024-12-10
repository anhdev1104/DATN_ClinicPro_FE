import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/users';
import { getAllRole } from '@/services/roles.service';
import { IRole } from '@/types/role.type';
import { Avatar, Flex, Grid, Radio } from '@mantine/core';
import {
  IconBuildingSkyscraper,
  IconCalendar,
  IconGenderTransgender,
  IconMail,
  IconMobiledata,
  IconPencilCheck,
  IconPhoneCall,
  IconShieldLock,
  IconUpload,
  IconUser,
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDepartmentsQuery } from '@/redux/api/department';
import { uploadFile } from '@/services/uploadFile.service';
import { formatDepartmentSelect, formatRoleSelect, resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import { GENDER, STATUS } from '@/constants/define';
import dayjs from 'dayjs';
import { Formik, FormikHandler } from '@/lib/form';
import NotFoundPage from '@/pages/client/404/NotFoundPage';
import yup from '@/lib/utils/yup';

const updateUserSchema = yup.object({
  email: yup.string().email().trim().required(),
  status: yup
    .string()
    .oneOf(Object.values(STATUS) as `${STATUS}`[])
    .default(STATUS.INACTIVE),
  role_id: yup.string().required(),
  user_info: yup.object({
    fullname: yup.string().trim().required(),
    address: yup.string().omit([null]),
    phone_number: yup.string().max(10).omit([null]),
    avatar: yup.string().url(),
    gender: yup
      .string()
      .oneOf(Object.values(GENDER) as `${GENDER}`[])
      .default(GENDER.OTHER),
    dob: yup.date().nullable(),
    department_id: yup.string().omit([null]),
  }),
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
    try {
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
          avatar: url?.data?.url,
          dob: user_info?.dob && (dayjs(user_info.dob).format('YYYY-MM-DD') as any),
        },
      });
      if (result.data) {
        toast.success(result.data.message);
        navigate(`/users/${userId}`, { replace: true });
        return;
      }
      resolveErrorResponse((result.error as AxiosBaseQueryError)?.data, setError);
    } catch (errorrs) {
      resolveErrorResponse(errorrs as ErrorResponse, setError);
    }
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
          schema={updateUserSchema}
          onSubmit={handleUpdateUser}
          options={{
            defaultValues: updateUserSchema.safeParse({ ...user, role_id: user?.role?.id }),
            mode: 'onChange',
          }}
        >
          {({ formState: { isSubmitting } }) => {
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
                          disabled={isSubmitting}
                          size="xs"
                          rightSection={<BaseIcon icon={IconUpload} />}
                        >
                          Upload
                        </BaseButton>
                      )}
                    </BaseButton.File>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <BaseInput.Group
                      name="user_info.fullname"
                      autoComplete="fullname"
                      leftSection={<BaseIcon icon={IconUser} />}
                      withAsterisk
                      label="Họ và Tên"
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <BaseInput.Group
                      name="email"
                      autoComplete="email"
                      leftSection={<BaseIcon icon={IconMail} />}
                      withAsterisk
                      label="Email"
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <BaseInput.Number
                      name="user_info.phone_number"
                      autoComplete="phone_number"
                      label="Số Điện Thoại"
                      leftSection={<BaseIcon icon={IconPhoneCall} />}
                      allowNegative={false}
                      trimLeadingZeroesOnBlur={false}
                      thousandSeparator=" "
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <BaseInput.Select
                      name="role_id"
                      autoComplete="role_id"
                      data={rolesOption}
                      label="Role"
                      leftSection={<BaseIcon icon={IconShieldLock} />}
                      placeholder="Role"
                      withAsterisk
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <BaseInput.Select
                      name="user_info.department_id"
                      autoComplete="department_id"
                      data={deparmentsOption}
                      leftSection={<BaseIcon icon={IconBuildingSkyscraper} />}
                      nothingFoundMessage="không tìm thấy phòng ban"
                      label="Phòng Ban"
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <BaseInput.Select
                      name="user_info.gender"
                      autoComplete="gender"
                      data={Object.values(GENDER)}
                      renderOption={({ option, checked }) => (
                        <Radio checked={checked} onChange={() => {}} value={option.value} label={option.value} />
                      )}
                      leftSection={<BaseIcon icon={IconGenderTransgender} />}
                      allowDeselect={false}
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
                      withAsterisk
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <BaseInput.Select
                      name="status"
                      autoComplete="status"
                      data={Object.values(STATUS)}
                      leftSection={<BaseIcon icon={IconMobiledata} />}
                      allowDeselect={false}
                      label="Status"
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <BaseInput.Textarea name="user_info.address" autoComplete="address" label="Địa Chỉ" />
                  </Grid.Col>
                </Grid>
                <Flex gap={10} className="justify-end">
                  <BaseButton onClick={() => navigate(-1)} color="gray">
                    Hủy
                  </BaseButton>
                  <BaseButton
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    leftSection={<BaseIcon icon={IconPencilCheck} />}
                    type="submit"
                  >
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
