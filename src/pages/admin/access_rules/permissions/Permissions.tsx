import DirectRoute from '@/components/direct';
import { AddIcon } from '@/components/icons';
import useToggle from '@/hooks/useToggle';
import { Pagination } from '@mantine/core';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import PermissionRow from '../components/PermissionRow';
import PermissionsForm from '../components/PermissionsForm';
import { useDeletePermissionsMutation, useGetPermissionsQuery } from '@/redux/api/permissions';
import { ModalConfirm } from '@/components/modal';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import { resolveErrorResponse } from '@/helpers/utils';
import { toast } from 'react-toastify';

const Permissions = () => {
  const { show: openPopup, handleToggle: handleOpenPopup } = useToggle();
  const [page, setPage] = useState(1);
  const { data: permissionsData, isLoading } = useGetPermissionsQuery({ page, limit: 4 });
  const [handleDelete] = useDeletePermissionsMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [idPermissions, setIdPermissions] = useState<string>('');
  const { show: showConfirm, handleToggle } = useToggle();

  const deleteAction = async (id: string) => {
    if (!id) return;
    const res = await handleDelete(id);
    if (res.data) {
      handleToggle();
      return toast.success(res.data.message);
    }
    resolveErrorResponse((res.error as AxiosBaseQueryError).data);
    handleToggle();
  };

  const handleToggleConfirm = (id: string) => {
    setIdPermissions(id);
    handleToggle();
  };

  const handleToggleFormUpdate = (id: string) => {
    setIdPermissions(id);
    setIsEdit(true);
    handleOpenPopup();
  };
  return (
    <>
      <DirectRoute nav="Phân quyền" subnav="Permissions" />
      <div className="bg-white size-full p-[20px] rounded-[26px] min-h-[500px]">
        <div className={`mb-6 flex items-center justify-between gap-5 w-[${window.screen.width}px]`}>
          <h1 className="text-[18px] text-black font-medium">Danh sách quyền</h1>
          <button
            className="text-[18px] font-medium gap-3 border-borderColor border py-2 px-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-transparent hover:border-primaryAdmin"
            onClick={handleOpenPopup}
          >
            <AddIcon className="text-primaryAdmin" />
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead sx={{ backgroundColor: '#116aef0d' }}>
              <TableRow>
                <TableCell />
                <TableCell sx={{ fontWeight: 600 }}>Tên quyền</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Mô tả</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                permissionsData &&
                permissionsData.data.map((result, index) => (
                  <PermissionRow
                    data={result}
                    index={index}
                    handleToggleConfirm={handleToggleConfirm}
                    handleToggleFormUpdate={handleToggleFormUpdate}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {!isLoading && permissionsData && permissionsData.data.length <= 0 && (
          <Box
            sx={{
              textAlign: 'center',
              marginTop: '50px',
              minHeight: '136px',
            }}
          >
            Chưa có quyền nào !
          </Box>
        )}
        <div className="mt-16">
          <Pagination
            value={page}
            onChange={setPage}
            total={(permissionsData && Math.ceil(permissionsData.total / 5)) || 1}
            radius="md"
            className="w-full flex justify-center"
          />
        </div>
      </div>
      {openPopup && (
        <PermissionsForm
          open={openPopup}
          onClose={() => {
            handleOpenPopup();
            setIsEdit(false);
          }}
          isEdit={isEdit}
          idPermissions={idPermissions}
        />
      )}
      <ModalConfirm
        isOpen={showConfirm}
        isClose={handleToggle}
        title="Bạn chắc chắn muốn xoá hành động này ?"
        description="Sau khi xác nhận hành động sẽ được xoá vĩnh viễn, bạn không thể thực hiện được chức năng này!"
        submit={() => deleteAction(idPermissions)}
        textApprove="Xoá"
        className="bg-red-500 hover:bg-red-400"
      />
    </>
  );
};

export default Permissions;
