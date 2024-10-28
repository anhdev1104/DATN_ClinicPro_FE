import { useSelector } from '@/hooks/redux';
import {
  useDeleteAnDepartmentMutation,
  useGetDepartmentDetailQuery,
  useUpdateAnDepartmentMutation
} from '@/redux/api/department';
import { PopupDepartmentDetail } from '@/redux/department/departmentSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { AutocompleteOption, Button, FormControl, FormLabel, Input, ListItemContent } from '@mui/joy';
import Autocomplete from '@mui/joy/Autocomplete';
import Drawer from '@mui/joy/Drawer';
import { Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { usersApi } from '@/redux/api/users';
import { filterOutManagers } from '@/utils/utils';
import { useMemo } from 'react';
import { IUserInfo } from '@/types/user.type';

export const departmentDetailSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  manager_id: yup.string()
});
interface Options {
  label: string;
  id: string | number;
}
const DepartmentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = useSelector(state => state.departmentState.isOpenDepartmentDetail);
  const { data: department, isSuccess } = useGetDepartmentDetailQuery(id as string, {
    refetchOnMountOrArgChange: true
  });
  const [handleDelete] = useDeleteAnDepartmentMutation();
  const [handleUpdate] = useUpdateAnDepartmentMutation();
  const { currentData } = usersApi.endpoints.getAllUsers.useQuery();
  const { isFetching } = usersApi.endpoints.getAllUsers.useQueryState();

  const users = useMemo(() => (currentData ? filterOutManagers<IUserInfo[]>(currentData.data) : []), [isFetching]);
  const options: Options[] = users.map((user: any) => ({ label: user.user_info.fullname, id: user.id }));

  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(departmentDetailSchema)
  });
  const handleHideDrawer = () => {
    dispatch(PopupDepartmentDetail(false));
    navigate('/departments');
  };
  const handleDeleteDepartment = () => {
    if (isSuccess) {
      handleDelete(department.data.id as number);
      dispatch(PopupDepartmentDetail(false));
      navigate('/departments');
    }
  };
  const handleUpdateDepartment = (data: yup.InferType<typeof departmentDetailSchema>) => {
    if (isSuccess) {
      handleUpdate({ id: department?.data.id, ...data });
      handleHideDrawer();
    }
  };
  return (
    <>
      {isSuccess ? (
        <Drawer
          open={open}
          anchor="right"
          onClose={handleHideDrawer}
          sx={{
            '--Drawer-horizontalSize': 'clamp(500px, 30%, 100%)'
          }}
        >
          <form onSubmit={handleSubmit(handleUpdateDepartment)} className="p-3">
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Tên Phòng Ban</FormLabel>
                <Controller
                  name="name"
                  defaultValue={department.data.name}
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Mô tả</FormLabel>
                <Controller
                  name="description"
                  control={control}
                  defaultValue={department.data.description}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Manager</FormLabel>
                <Autocomplete
                  onChange={(_, option) => {
                    setValue('manager_id', (option as Options).id.toString());
                  }}
                  defaultValue={options.find(op => {
                    return op.id == department.data.manager.id;
                  })}
                  options={options}
                  isOptionEqualToValue={() => true}
                  getOptionLabel={(option: Options) => option.label}
                  renderOption={(props, option) => {
                    return (
                      <AutocompleteOption {...props} key={option.id} className="!bg-white">
                        <ListItemContent>{option.label}</ListItemContent>
                      </AutocompleteOption>
                    );
                  }}
                />
                {/* <FormHelperText>A description for the combo box.</FormHelperText> */}
              </FormControl>
            </Stack>
            <div className="flex justify-between my-3">
              <Button type="submit">Save</Button>
              <Button onClick={handleDeleteDepartment}>Delete</Button>
            </div>
          </form>
        </Drawer>
      ) : (
        <Drawer open={open} anchor="right" onClose={handleHideDrawer}>
          <Button>OK</Button>
        </Drawer>
      )}
    </>
  );
};
export default DepartmentDetail;
