import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { DeleteIcon, EditNoteIcon, KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '@/components/icons';
import { IPermissions } from '@/types/permissions.type';
import { useGetActionDetailQuery } from '@/redux/api/action';
import { useEffect, useState } from 'react';

type TPermissionRow = {
  data: IPermissions;
  index: number;
  handleToggleConfirm: (id: string) => void;
  handleToggleFormUpdate: (id: string) => void;
};

const PermissionRow = ({ data, index, handleToggleConfirm, handleToggleFormUpdate }: TPermissionRow) => {
  const [idPermission, setIdPermission] = useState<string | undefined>('');
  const [open, setOpen] = useState(false);
  const { data: actionData } = useGetActionDetailQuery(idPermission || '');

  useEffect(() => {
    if (data) {
      data.permission_actions[index ?? 0] && setIdPermission(data.permission_actions[index ?? 0].action_id);
    }
  }, [data, index]);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.name}
        </TableCell>
        <TableCell sx={{ maxWidth: '200px' }}>{data.description}</TableCell>
        <TableCell
          sx={{
            width: '200px',
          }}
        >
          <div className="flex items-center gap-5 w-fit">
            <div
              className="text-yellow-400 transition-all  cursor-pointer hover:bg-primaryAdmin/5 p-2 rounded-full"
              onClick={() => {
                data.id && handleToggleFormUpdate(data.id);
              }}
            >
              <EditNoteIcon />
            </div>
            <div
              className="text-red-500 transition-all  cursor-pointer hover:bg-primaryAdmin/5 p-2 rounded-full"
              onClick={() => {
                data.id && handleToggleConfirm(data.id);
              }}
            >
              <DeleteIcon />
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontSize: '14px', fontWeight: 600 }}>
                Các hành động được sử dụng với quyền
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Tên hành động</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Mô tả</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.permission_actions.map(permission => (
                    <TableRow key={permission.id}>
                      <TableCell component="th" scope="row">
                        {actionData?.data.name}
                      </TableCell>
                      <TableCell> {actionData?.data.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PermissionRow;
