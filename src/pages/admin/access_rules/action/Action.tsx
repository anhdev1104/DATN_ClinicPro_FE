import DirectRoute from '@/components/direct';
import { AddCircleOutlineIcon, AddIcon, DeleteIcon, EditNoteIcon } from '@/components/icons';
import { ModalConfirm } from '@/components/modal';
import useToggle from '@/hooks/useToggle';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ActionForm from '../components/ActionForm';
import { Box } from '@mui/material';
import { useDeleteActionMutation, useGetActionQuery } from '@/redux/api/action';
import { cn, resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import { LoadingSkeleton } from '@/components/loading';
import { Pagination } from '@mantine/core';

export default function Action() {
  const { show: openPopup, handleToggle } = useToggle();
  const { show: showConfirm, handleToggle: handleToggleConfirm } = useToggle();
  const [idAction, setIdAction] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [handleDelete] = useDeleteActionMutation();
  const [page, setPage] = useState(1);
  const { data: actions, isLoading } = useGetActionQuery({ page, limit: 6 });

  const deleteAction = async (id: string) => {
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
      <DirectRoute nav="Phân quyền" subnav="Action" />
      <div className="bg-white size-full p-[20px] rounded-[26px] min-h-[500px]">
        <div className={`mb-6 flex items-center justify-between gap-5 w-[${window.screen.width}px]`}>
          <h1 className="text-[18px] text-black font-medium">Danh sách hành động</h1>
          <button
            className="text-[18px] font-medium gap-3 border-borderColor border py-2 px-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-transparent hover:border-primaryAdmin"
            onClick={handleToggle}
          >
            <AddIcon className="text-primaryAdmin" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-5 min-h-[295px]">
          {isLoading && <ActionSkeleton />}
          {!isLoading &&
            actions &&
            actions?.data.map(action => (
              <div
                className={cn(
                  'h-[136px] rounded-2xl border-4 p-5 border-cyan-200',
                  action.name === 'READ' && 'border-primaryAdmin/40',
                  action.name === 'CREATE' && 'border-primary/40',
                  action.name === 'UPDATE' && 'border-yellow-400/40',
                  action.name === 'DELETE' && 'border-red-500/40',
                )}
                key={action.id}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      'w-fit flex gap-5 items-center pl-2 pr-10 rounded-md text-white mb-2 bg-cyan-400',
                      action.name === 'READ' && 'bg-primaryAdmin',
                      action.name === 'CREATE' && 'bg-primary',
                      action.name === 'UPDATE' && 'bg-yellow-400',
                      action.name === 'DELETE' && 'bg-red-400',
                    )}
                  >
                    <AddCircleOutlineIcon />
                    <span className="font-semibold text-lg">{action.name}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div
                      className="text-yellow-400 transition-all  cursor-pointer hover:bg-primaryAdmin/5 p-2 rounded-full"
                      onClick={() => {
                        action.id && setIdAction(action.id);
                        setIsEdit(true);
                        handleToggle();
                      }}
                    >
                      <EditNoteIcon />
                    </div>
                    <div
                      className="text-red-500 transition-all  cursor-pointer hover:bg-primaryAdmin/5 p-2 rounded-full"
                      onClick={() => {
                        action.id && setIdAction(action.id);
                        handleToggleConfirm();
                      }}
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                </div>
                <span>Mô tả:</span>
                <p className="line-clamp-2 font-light">{action.value}</p>
              </div>
            ))}
        </div>
        <div className="mt-16">
          <Pagination
            value={page}
            onChange={setPage}
            total={(actions && Math.ceil(actions.total / 6)) || 1}
            radius="md"
            className="w-full flex justify-center"
          />
        </div>

        {!isLoading && actions && actions.data.length <= 0 && (
          <Box
            sx={{
              textAlign: 'center',
              marginTop: '50px',
            }}
          >
            Chưa có hành động nào !
          </Box>
        )}
      </div>
      {openPopup && (
        <ActionForm
          open={openPopup}
          onClose={() => {
            handleToggle();
            setIsEdit(false);
          }}
          isEdit={isEdit}
          idAction={idAction}
        />
      )}
      <ModalConfirm
        isOpen={showConfirm}
        isClose={handleToggleConfirm}
        title="Bạn chắc chắn muốn xoá hành động này ?"
        description="Sau khi xác nhận hành động sẽ được xoá vĩnh viễn, bạn không thể thực hiện được chức năng này!"
        submit={() => deleteAction(idAction)}
        textApprove="Xoá"
        className="bg-red-500 hover:bg-red-400"
      />
    </>
  );
}

const ActionSkeleton = () =>
  new Array(6).fill(0).map((_, index) => <LoadingSkeleton className="w-full h-[136px] rounded-2xl" key={index} />);
