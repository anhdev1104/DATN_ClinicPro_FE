import HeaderDepartment from './components/Header';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Divider } from '@mui/material';
import dayjs from 'dayjs';
import { useGetAllDepartmentQuery } from '@/redux/api/department';
import NewDepartment from './NewDepartment';
import { useDispatch } from '@/hooks/redux';
import { PopupDepartmentDetail } from '@/redux/department/departmentSlice';
import { useNavigate } from 'react-router-dom';
import Paginations from './components/Pagination';
import { useState } from 'react';
import type { Department } from '@/types/department.type';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    editable: false,
    hideable: true,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    pinnable: false
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    editable: false,
    hideable: true,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    pinnable: false
  },
  {
    field: 'manager',
    headerName: 'Manager',
    flex: 1,
    editable: false,
    hideable: true,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    pinnable: false
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    flex: 1,
    editable: false,
    hideable: true,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    pinnable: false
  },
  {
    field: 'created_at',
    headerName: 'Date',
    flex: 1,
    editable: false,
    hideable: true,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    pinnable: false
  }
];

const formatDepartmentData = (department: Department[]) => {
  return department.map(({ id, description, manager, name, created_at, ...props }) => ({
    id,
    name,
    description,
    created_at: dayjs(created_at).format('MM-DD-YYYY'),
    manager: manager.email,
    ...props
  }));
};
const Department = () => {
  const [limit, _] = useState(10);
  const { data: departments, isSuccess } = useGetAllDepartmentQuery({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDepartmentDetail = ({ row }: GridRowParams<Department>) => {
    dispatch(PopupDepartmentDetail(true));
    navigate(`/departments/${row.id}`, { replace: true });
    // window.history.replaceState(null, '', `/phong-ban/${row.id}`)
  };

  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl">
        <HeaderDepartment />
        <Divider />
        <div className="flex flex-col p-2 items-center space-y-6 overflow-hidden">
          {isSuccess && (
            <>
              <DataGrid
                rows={formatDepartmentData(departments.data)}
                columns={columns}
                columnHeaderHeight={36}
                className="cursor-pointer border-none w-full max-w-full"
                onRowClick={handleDepartmentDetail}
                slots={{ pagination: Paginations }}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: limit } }
                }}
              />
            </>
          )}
        </div>
      </div>
      <NewDepartment />
    </>
  );
};
export default Department;
