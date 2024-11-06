import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { AxiosBaseQueryError } from '@/config/axiosBaseQuery';
import former, { OptionsWithForm } from '@/hocs/former';
import { useDispatch, useSelector } from '@/hooks/redux';
import Form from '@/lib/Form';
import { useUpdateAnDepartmentMutation } from '@/redux/api/department';
import { useGetAllUsersQuery } from '@/redux/api/users';
import { setOpenUpdateDepartment } from '@/redux/department/departmentSlice';
import { updateDepartmentSchema } from '@/schema/department.schema';
import { DepartmentDetail, NewDepartmentProps } from '@/types/department.type';
import { IUserInfo } from '@/types/user.type';
import { filterOutManagers } from '@/utils/utils';
import { Avatar, Group, Modal, Stack } from '@mantine/core';
import { Row } from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Options {
  value: string;
  label: string;
  avatar?: string;
}
interface UpdateDepartmentProps<T> {
  row: Row<T>;
}
const UpdateDepartment = <T,>({ row }: UpdateDepartmentProps<T>) => {
  const {
    handleSubmit,
    setValue,
    formState: { disabled },
    setError,
  } = useFormContext<NewDepartmentProps>();
  const { data, isSuccess } = useGetAllUsersQuery();
  const [update] = useUpdateAnDepartmentMutation();
  const open = useSelector(state => state.department.openUpdateDepartment);
  const dispatch = useDispatch();
  const department: IUserInfo[] = useMemo(() => (isSuccess ? filterOutManagers(data?.data) : []), [data]);
  const formatData: Options[] = useMemo(
    () =>
      department.map(item => ({
        value: item.id,
        label: item.user_info.fullname,
        avatar: item.user_info.avatar,
      })),
    [department],
  );
  const departmentId = useMemo(
    () => window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
    [window.location],
  );
  const departmentUpdate: DepartmentDetail = useMemo(() => row.original as DepartmentDetail, []);
  const handleUpdateDepartment: SubmitHandler<NewDepartmentProps> = async data => {
    const result = await update({ id: departmentId, ...data });
    if (result.error) {
      const errors = result.error as AxiosBaseQueryError<{ message: string; errors: any[] }>;
      const errorName: any = Object.keys(errors.data.errors);
      setError(errorName[0], { message: errors.data.errors[errorName[0]] });
    } else {
      toast.success((result.data as any)?.message);
      dispatch(setOpenUpdateDepartment(false));
    }
  };

  useEffect(() => {
    setValue('name', departmentUpdate.name);
    setValue('manager_id', departmentUpdate.manager?.id || '');
    setValue('description', departmentUpdate.description);
  }, []);

  return (
    <Modal title="Cập Nhật Phòng Ban" centered opened={open} onClose={() => dispatch(setOpenUpdateDepartment(false))}>
      <Form onSubmit={handleSubmit(handleUpdateDepartment)}>
        <Stack>
          <BaseInput.Group autoComplete="name" name="name" label="Tên phòng ban" placeholder="Phòng IT..." />
          <BaseInput.Textarea autoComplete="description" name="description" label="Mô tả" />
          <BaseInput.Select
            autoComplete="manager_id"
            name="manager_id"
            label="Chọn Quản lý"
            data={formatData}
            onChange={value => setValue('manager_id', value)}
            renderOption={({ option, checked }) => (
              <Group flex="1" gap="xs">
                <Avatar size="sm" src={(option as Options).avatar} />
                {option.label}
                {checked && <BaseIcon name="check" style={{ marginInlineStart: 'auto' }} />}
              </Group>
            )}
            clearable
            searchable
            allowDeselect={false}
            nothingFoundMessage="không tìm thấy quản lý"
          />
          <BaseButton loading={disabled} disabled={disabled} type="submit">
            Lưu
          </BaseButton>
        </Stack>
      </Form>
    </Modal>
  );
};

const optionsWithForm: OptionsWithForm = {
  mode: 'onChange',
};
export default former(UpdateDepartment, updateDepartmentSchema, optionsWithForm);
