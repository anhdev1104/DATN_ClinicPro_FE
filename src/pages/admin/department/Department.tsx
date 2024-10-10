import HeaderDepartment from './HeaderDepartment';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Divider, Pagination } from '@mui/material';
import dayjs from 'dayjs';

interface Manager {
  id: number;
  status: string;
  email: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface DepartmentData {
  id: number;
  name: string;
  description?: string;
  manager_id?: number;
  created_at: Date;
  updated_at?: Date;
  users_count?: number;
  manager: Manager;
}
// const paginationModel = { page: 0, pageSize: 1 };
const Department = () => {

  const rows = [
    { id: 1, name: 'hai', manager: 'ahihi', created_at: dayjs().format('MM-DD-YYYY') },
    { id: 2, name: 'hai', manager: 'ahihi', created_at: dayjs().format('MM-DD-YYYY') },
    { id: 3, name: 'hai', manager: 'ahihi', created_at: dayjs().format('MM-DD-YYYY') },
    { id: 4, name: 'hai', manager: 'ahihi', created_at: dayjs().format('MM-DD-YYYY') },
    { id: 5, name: 'hai', manager: 'ahihi', created_at: dayjs().format('MM-DD-YYYY') },
    { id: 6, name: 'hai', manager: 'ahihi', created_at: dayjs().format('MM-DD-YYYY') },
    { id: 7, name: 'hai', manager: 'ahihi', created_at: dayjs().format('MM-DD-YYYY') },
    { id: 8, name: 'hai', manager: 'ahihi', created_at: dayjs().format('MM-DD-YYYY') },
    { id: 9, name: 'hai', manager: 'ahihi', created_at: dayjs().format('MM-DD-YYYY') },
  ]
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, editable: false, hideable: true, filterable: false, sortable: false, disableColumnMenu: true, pinnable: false, },
    { field: 'name', headerName: 'Name', flex: 1, editable: false, hideable: true, filterable: false, sortable: false, disableColumnMenu: true, pinnable: false, },
    { field: 'manager', headerName: 'Manager', flex: 1, editable: false, hideable: true, filterable: false, sortable: false, disableColumnMenu: true, pinnable: false, },
    { field: 'created_at', headerName: 'Date', flex: 1, editable: false, hideable: true, filterable: false, sortable: false, disableColumnMenu: true, pinnable: false, },
  ]

  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl">
        <HeaderDepartment />
        <Divider />
        <div className='flex flex-col p-2 items-center space-y-6 overflow-hidden'>
          <DataGrid
            rows={rows} columns={columns}
            columnHeaderHeight={36}
            hideFooterPagination
            hideFooter
            className='border-none w-full max-w-full'
          />
          <Pagination count={10} color='primary' />
        </div>
      </div>
    </>
  );
};
export default Department;
