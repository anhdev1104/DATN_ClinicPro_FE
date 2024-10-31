import { useDispatch, useSelector } from '@/hooks/redux';
import { PopupNewDepartment } from '@/redux/department/departmentSlice';
import { Drawer, Input, Button, Autocomplete } from '@mui/joy';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetAllUsersQuery } from '@/redux/api/users';
import { useAddAnDepartmentMutation } from '@/redux/api/department';
import { useMemo } from 'react';
import { filterOutManagers } from '@/utils/utils';
interface NewDepartmentProps {
  open?: boolean;
}

export const departmentSchema = yup
  .object({
    name: yup.string().required().trim(),
    description: yup.string().required(),
    manager_id: yup.string().required(),
  })
  .required();

const NewDepartment: React.FC<NewDepartmentProps> = () => {
  const { data, isSuccess } = useGetAllUsersQuery();
  const [handleAddDepartment, { reset }] = useAddAnDepartmentMutation();
  const open = useSelector(state => state.department.isOpenNewDepartment);
  const dispatch = useDispatch();
  const users: any = useMemo(() => isSuccess && filterOutManagers(data.data), [data]);
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(departmentSchema),
    defaultValues: {
      name: '',
      description: '',
      manager_id: '',
    },
  });

  const handleHideNewDepartment = () => {
    dispatch(PopupNewDepartment(false));
  };

  const handleAddNewDaprtment = (data: yup.InferType<typeof departmentSchema>) => {
    handleAddDepartment(data);
    handleHideNewDepartment();
    reset();
  };
  return (
    <>
      <Drawer
        open={open}
        anchor="right"
        onClose={handleHideNewDepartment}
        size="md"
        sx={{
          '--Drawer-horizontalSize': 'clamp(300px, 40%, 100%)',
        }}
      >
        <div className="flex flex-col capitalize p-3 items-center">
          <h2 className="text-2xl font-bold">Tạo mới phòng ban</h2>
          <form onSubmit={handleSubmit(handleAddNewDaprtment)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input color="neutral" size="sm" variant="outlined" placeholder="Tên Phòng Ban" {...field} />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input color="neutral" size="sm" variant="outlined" placeholder="Mô Tả" {...field} />
              )}
            />
            <Autocomplete
              onChange={(_, value) => {
                setValue(
                  'manager_id',
                  value
                    ? users.find((user: any) => user.user_info.id.toString() === (value as string).split('-')[1]).id
                    : '',
                );
              }}
              options={
                isSuccess ? users.map((user: any) => `${user.user_info.fullname}-${user.user_info.id}`) : ['Not Found']
              }
            />
            <Button type="submit">Save</Button>
          </form>
        </div>
      </Drawer>
    </>
  );
};
export default NewDepartment;
