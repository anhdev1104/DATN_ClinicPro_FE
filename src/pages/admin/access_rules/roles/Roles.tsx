import DirectRoute from '@/components/direct';
import { AddIcon, DeleteIcon, EditNoteIcon } from '@/components/icons';
import useToggle from '@/hooks/useToggle';
import { useDeleteRolesMutation, useGetRolesQuery } from '@/redux/api/roles';
import { Pagination } from '@mantine/core';
import { Box } from '@mui/material';
import { useState } from 'react';
import RolesForm from '../components/RolesForm';
import { ModalConfirm } from '@/components/modal';
import { toast } from 'react-toastify';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import { resolveErrorResponse } from '@/helpers/utils';
import { LoadingSkeleton } from '@/components/loading';

const Roles = () => {
  const { show: openPopup, handleToggle: handleTogglePopup } = useToggle();
  const [page, setPage] = useState(1);
  const { data: rolesData, isLoading } = useGetRolesQuery({ page, limit: 6 });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [idRoles, setIdRoles] = useState<string>('');
  const { show: showConfirm, handleToggle: handleToggleConfirm } = useToggle();
  const [handleDelete] = useDeleteRolesMutation();

  const handleShowForm = (id: string) => {
    setIdRoles(id);
    setIsEdit(true);
    handleTogglePopup();
  };

  const handleDeleteRoles = async (id: string) => {
    if (!id) return;
    const res = await handleDelete(id);
    if (res.data) {
      handleToggleConfirm();
      return toast.success(res.data.message);
    }
    resolveErrorResponse((res.error as AxiosBaseQueryError).data);
    handleToggleConfirm();
  };

  return (
    <>
      <DirectRoute nav="Phân quyền" subnav="Permissions" />
      <div className="bg-white size-full p-[20px] rounded-[26px] min-h-fit">
        <div className={`mb-6 flex items-center justify-between gap-5 w-[${window.screen.width}px]`}>
          <h1 className="text-[18px] text-black font-medium">Danh sách role</h1>
          <button
            className="text-[18px] font-medium gap-3 border-borderColor border py-2 px-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-transparent hover:border-primaryAdmin"
            onClick={handleTogglePopup}
          >
            <AddIcon className="text-primaryAdmin" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {isLoading && <RolesSkeleton />}
          {!isLoading &&
            rolesData &&
            rolesData.data.map(role => (
              <div className="border p-5 rounded-md shadow-md min-h-[170px]" key={role.id}>
                <div className="flex justify-between items-center">
                  <h6>Tổng {role.users_count} nhân viên</h6>
                  <div
                    className="flex cursor-pointer"
                    // onClick={() => role.id && +role.users_count !== 0 && handleShowForm(role.id)}
                  >
                    {role.users.length > 0 && (
                      <div>
                        <img
                          src={
                            role.users[0]?.avatar ||
                            'https://res.cloudinary.com/dsdyprt1q/image/upload/v1726997687/CLINIC/avatars/kcopet60brdlxcpybxjw.png'
                          }
                          alt=""
                          className="rounded-full w-10"
                        />
                      </div>
                    )}
                    <div className="-translate-x-5 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-white">
                        {role.users_count > 99 ? '99+' : +role.users_count === 0 ? '0' : role.users_count + '+'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <span className="font-bold text-xl text-primaryAdmin uppercase">{role.name}</span>
                  <p className="mt-2 line-clamp-2">{role.description}</p>
                  <div className="flex w-full justify-end">
                    <div className="flex gap-5 mt-1">
                      <div
                        className="text-yellow-400 transition-all  cursor-pointer hover:bg-primaryAdmin/5 p-2 rounded-full"
                        onClick={() => role.id && handleShowForm(role.id)}
                      >
                        <EditNoteIcon />
                      </div>
                      <div
                        className="text-red-500 transition-all  cursor-pointer hover:bg-primaryAdmin/5 p-2 rounded-full"
                        onClick={() => {
                          role.id && setIdRoles(role.id);
                          handleToggleConfirm();
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-8">
          <Pagination
            value={page}
            onChange={setPage}
            total={(rolesData && Math.ceil(rolesData.total / 6)) || 1}
            radius="md"
            className="w-full flex justify-center"
          />
        </div>
        {!isLoading && rolesData && rolesData.data.length <= 0 && (
          <Box
            sx={{
              textAlign: 'center',
              marginTop: '50px',
              minHeight: '136px',
            }}
          >
            Chưa có roles nào !
          </Box>
        )}
      </div>
      <RolesForm open={openPopup} onClose={handleTogglePopup} isEdit={isEdit} idRoles={idRoles} />
      <ModalConfirm
        isOpen={showConfirm}
        isClose={handleToggleConfirm}
        title="Bạn chắc chắn muốn xoá role này ?"
        description="Sau khi xác nhận role sẽ được xoá vĩnh viễn."
        submit={() => handleDeleteRoles(idRoles)}
        textApprove="Xoá"
        className="bg-red-500 hover:bg-red-400"
      />
    </>
  );
};

const RolesSkeleton = () =>
  new Array(6).fill(0).map((_, index) => <LoadingSkeleton className="w-full h-[186px] rounded-2xl" key={index} />);

export default Roles;
