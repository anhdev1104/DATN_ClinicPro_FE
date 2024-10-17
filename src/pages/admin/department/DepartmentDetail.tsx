import { useSelector } from '@/hooks/redux';
import { useDeleteAnDepartmentMutation, useGetDepartmentDetailQuery } from '@/redux/api/department';
import { PopupDepartmentDetail } from '@/redux/department/departmentSlice';
import { Button, Input } from '@mui/joy';
import Drawer from '@mui/joy/Drawer';
import { Box, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentDetail = () => {
  const open = useSelector((state) => state.departmentState.isOpenDepartmentDetail);
  const { id } = useParams();
  const { data: department, isSuccess } = useGetDepartmentDetailQuery(id as string);
  const [handleDelete] = useDeleteAnDepartmentMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleHidetDrawer = () => {
    dispatch(PopupDepartmentDetail(false));
    navigate('/phong-ban');
  };
  const handleDeleteDepartment = () => {
    if (isSuccess) {
      handleDelete(department.data.id as number);
      dispatch(PopupDepartmentDetail(false));
      navigate('/phong-ban');
    }
  };
  return (
    <>
      {isSuccess ? (
        <Drawer
          open={open}
          anchor="right"
          onClose={handleHidetDrawer}
          sx={{
            '--Drawer-horizontalSize': 'clamp(500px, 30%, 100%)',
          }}
          className="transition-all"
        >
          <Box sx={{ padding: '10px' }}>
            <Stack spacing={2}>
              <Input value={department.data.id} />
              <Input value={department.data.manager.email} />
              <Input value={department.data.name} />
              <Input value={department.data.description} />
              <Input value={department.data.id} />
              <Input value={dayjs(department.data.created_at).format()} />
              <Input value={dayjs(department.data.updated_at).format()} />
            </Stack>
            <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <Button>Save</Button>
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
