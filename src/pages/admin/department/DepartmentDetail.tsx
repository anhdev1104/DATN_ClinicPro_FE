import { useSelector } from '@/hooks/redux';
import {
  useDeleteAnDepartmentMutation,
  useGetDepartmentDetailQuery,
  useUpdateAnDepartmentMutation,
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
import { Modal, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// eslint-disable-next-line react-refresh/only-export-components
export const departmentDetailSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  manager_id: yup.string(),
});
interface Options {
  label: string;
  id: string | number;
}
const DepartmentDetail = () => {
  const [opened, { close }] = useDisclosure(false);
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const open = useSelector(state => state.department.isOpenDepartmentDetail);
  // const { data: department, isSuccess } = useGetDepartmentDetailQuery(id as string, {
  //   refetchOnMountOrArgChange: true,
  // });
  // const [handleDelete] = useDeleteAnDepartmentMutation();
  // const [handleUpdate] = useUpdateAnDepartmentMutation();
  // const { currentData } = usersApi.endpoints.getAllUsers.useQuery();
  // const { isFetching } = usersApi.endpoints.getAllUsers.useQueryState();

  // const users = useMemo(() => (currentData ? filterOutManagers<IUserInfo[]>(currentData.data) : []), [isFetching]);
  // const options: Options[] = users.map((user: any) => ({ label: user.user_info.fullname, id: user.id }));

  // const { handleSubmit, control, setValue } = useForm({
  //   resolver: yupResolver(departmentDetailSchema),
  // });
  // const handleHideDrawer = () => {
  //   dispatch(PopupDepartmentDetail(false));
  //   navigate('/departments');
  // };
  // const handleDeleteDepartment = () => {
  //   if (isSuccess) {
  //     handleDelete(department.data.id as number);
  //     dispatch(PopupDepartmentDetail(false));
  //     navigate('/departments');
  //   }
  // };
  // const handleUpdateDepartment = (data: yup.InferType<typeof departmentDetailSchema>) => {
  //   if (isSuccess) {
  //     handleUpdate({ id: department?.data.id, ...data });
  //     handleHideDrawer();
  //   }
  // };
  return <Paper></Paper>;
};
export default DepartmentDetail;
