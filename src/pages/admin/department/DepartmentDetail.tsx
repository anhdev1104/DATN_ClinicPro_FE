import { useSelector } from '@/hooks/redux';
import { useDeleteAnDepartmentMutation, useGetDepartmentDetailQuery } from '@/redux/api/department';
import { PopupDepartmentDetail } from '@/redux/department/departmentSlice';
import { Department } from '@/types/department.type';
import * as yup from '@hookform/resolvers/yup';
import { Button, Input } from '@mui/joy';
import Drawer from '@mui/joy/Drawer';
import { Box, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = useSelector(state => state.departmentState.isOpenDepartmentDetail);
  const { data: department, isSuccess } = useGetDepartmentDetailQuery(id as string);
  const [handleDelete] = useDeleteAnDepartmentMutation();

  const {} = useForm<Department>({
    defaultValues: {}
  });
  const handleHidetDrawer = () => {
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
  const handeUpdateDepartment = () => {};
  return (
    <>
      {isSuccess ? (
        <Drawer
          open={open}
          anchor="right"
          onClose={handleHidetDrawer}
          sx={{
            '--Drawer-horizontalSize': 'clamp(500px, 30%, 100%)'
          }}
        >
          <Box className="p-3">
            <Stack spacing={2}>
              <Input value={department.data.id} />
              <Input value={department.data.manager.email} />
              <Input value={department.data.name} />
              <Input value={department.data.description} />
              <Input value={department.data.id} />
              <Input value={dayjs(department.data.created_at).format()} />
              <Input value={dayjs(department.data.updated_at).format()} />
            </Stack>
            <Box component="div" className="flex justify-between my-3">
              <Button onClick={handeUpdateDepartment}>Save</Button>
              <Button onClick={handleDeleteDepartment}>Delete</Button>
            </Box>
          </Box>
        </Drawer>
      ) : (
        <Drawer open={open} anchor="right" onClose={handleHidetDrawer}>
          <Button>OK</Button>
        </Drawer>
      )}
    </>
  );
};
export default DepartmentDetail;
