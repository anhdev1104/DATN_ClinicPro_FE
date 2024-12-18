import DirectRoute from '@/components/direct';
import { AddIcon, DeleteIcon, SettingsIcon, VisibilityIcon } from '@/components/icons';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  createSpecialties,
  deleteSpecialties,
  getSpecialties,
  updateSpecialties,
} from '@/services/specialties.service';
import { ISpecialties } from '@/types/specialties.type';
import { toast } from 'react-toastify';
import { ModalConfirm } from '@/components/modal';
import { Dialog } from '@mui/material';
import { Button } from '@/components/button';
import Label from '@/components/label';
import Field from '@/components/field';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '@/lib/utils/yup';
import { Table } from '@/components/common/table/primary';
import { useColumn } from '@/hooks/useColumn';
import convertTime from '@/helpers/convertTime';

interface ModalDetailSpecial {
  close: () => void;
  statusLog: boolean;
  special?: ISpecialties | null;
  iAction?: boolean;
  iUpdate?: boolean;
  setDataAdd: any;
}

const Specialtie = () => {
  const [specialties, setSpecialties] = useState<ISpecialties[]>([]);
  const [idSpecial, setIdSpecial] = useState<string | null | undefined>('');
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetData, setResetData] = useState(0);
  const [open, setOpen] = useState<{ status: boolean; id: ISpecialties | null; action: boolean; iUpdate: boolean }>({
    status: false,
    id: null,
    action: false,
    iUpdate: false,
  });

  useEffect(() => {
    (async () => {
      const data = await getSpecialties();
      setSpecialties(data);
    })();
  }, [resetData]);

  const handleCloseModal = () => {
    setActiveModal(!activeModal);
  };

  const deleteSpecial = async (id: any) => {
    setIsLoading(true);
    const response = await deleteSpecialties(id);
    setIsLoading(false);
    handleCloseModal();
    toast.success(response.message, { position: 'top-right' });
    setResetData(pre => pre + 1);
  };

  const handleClickOpen = (id: ISpecialties | null, action = false, iUpdate = false) => {
    setOpen({ status: true, id, action, iUpdate });
  };

  const handleClose = () => {
    setOpen({ status: false, id: null, action: false, iUpdate: false });
  };

  const column = useColumn<ISpecialties>([
    {
      accessorKey: 'id',
      header: '#',
    },
    {
      accessorKey: 'name',
      header: 'Tên',
    },
    {
      accessorKey: 'created_at',
      header: 'Ngày tạo',
      cell: ({ row }) => <div>{convertTime(row.original.created_at || '')}</div>,
    },
    {
      accessorKey: 'doctors_count',
      header: 'Số lượng bác sĩ',
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              handleClickOpen(row.original);
            }}
          >
            <VisibilityIcon className="text-blue-500" />
          </button>
          <button
            onClick={() => {
              handleClickOpen(row.original, true, true);
            }}
          >
            <SettingsIcon className="text-yellow-500" />
          </button>
          <button
            onClick={() => {
              setActiveModal(true);
              setIdSpecial(row.original.id);
            }}
          >
            <DeleteIcon className="text-red-500" />
          </button>
        </div>
      ),
    },
  ]);

  return (
    <>
      <DirectRoute nav="Quản lý chuyên khoa" subnav="Chuyên khoa" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 w-full flex items-center justify-between gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Danh sách chuyên khoa</h1>
          </div>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => handleClickOpen(null, true)}
              className="text-[18px] font-medium gap-3 border-borderColor border py-2 px-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-transparent hover:border-primaryAdmin"
            >
              <AddIcon className="text-primaryAdmin" />
            </button>
          </div>
        </div>
        <Table columns={column} data={specialties}></Table>
        <ModalConfirm
          description="Dữ liệu sẽ không thể khôi phục"
          title="Bạn có chắc muốn xóa ?"
          isClose={handleCloseModal}
          isOpen={activeModal}
          submit={() => deleteSpecial(idSpecial)}
          isLoading={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white"
        />
      </div>

      {open.status && (
        <ModalDetailSpecial
          close={handleClose}
          statusLog={open.status}
          special={open.id}
          iAction={open.action}
          iUpdate={open.iUpdate}
          setDataAdd={setResetData}
        />
      )}
    </>
  );
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  description: yup.string().trim().required(),
});

function ModalDetailSpecial({ close, statusLog, special, iAction, setDataAdd, iUpdate }: ModalDetailSpecial) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  useEffect(() => {
    if (iAction && special && iUpdate) {
      reset({
        name: special.name || '',
        description: special.description || '',
      });
    } else {
      reset({
        name: '',
        description: '',
      });
    }
  }, [iAction, special, reset, iUpdate]);

  const onSubmit = async (data: any) => {
    const handleResponse = (response: any) => {
      if (response.errors) {
        toast.error(response.message, { position: 'top-right' });
      } else {
        toast.success(response.data.message, { position: 'top-right' });
        reset();
        setDataAdd((prev: any) => prev + 1);
      }
    };

    try {
      let response;
      if (iUpdate && iAction) {
        response = await updateSpecialties(special?.id, data);
        toast.success(response.message, { position: 'top-right' });
        setDataAdd((prev: any) => prev + 1);
        close();
      } else {
        response = await createSpecialties(data);
        handleResponse(response);
        close();
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <Dialog
      open={statusLog}
      onClose={close}
      PaperProps={{
        style: {
          backgroundColor: '#f5f5f5',
          width: '700px',
          height: 'auto',
          maxWidth: '700px',
          borderRadius: '8px',
          overflowY: 'hidden',
        },
      }}
    >
      {iAction ? (
        <div className="bg-white size-full p-[20px] rounded-[26px]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
            <div className="flex w-full gap-10 mb-5">
              <Field className="flex gap-3 flex-col">
                <Label htmlFor="name">Tên chuyên khoa:</Label>
                <Input
                  className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                  placeholder="Tên chuyên khoa ..."
                  name="name"
                  type="text"
                  control={control}
                />
              </Field>
              <Field className="flex gap-3 flex-col">
                <Label htmlFor="description">Chi tiết:</Label>
                <Input
                  className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                  placeholder="Chi tiết ..."
                  name="description"
                  type="text"
                  control={control}
                />
              </Field>
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                isLoading={isSubmitting}
                type="submit"
                styled="normal"
                className="bg-primaryAdmin text-white disabled:bg-primaryAdmin/50"
              >
                Xác nhận
              </Button>
              <Button onClick={() => close()} type="submit" styled="normal">
                Hủy bỏ
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-6">
          {/* Title */}
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Chi tiết chuyên khoa</h2>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div className="flex">
              <span className="font-semibold text-gray-600 w-1/3">ID:</span>
              <span className="text-gray-800">{special?.id || 'Không có'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-600 w-1/3">Tên:</span>
              <span className="text-gray-800">{special?.name || 'Không có'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-600 w-1/3">Mô tả:</span>
              <span className="text-gray-800">{special?.description || 'Không có'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-600 w-1/3">Số lượng bác sĩ:</span>
              <span className="text-gray-800">{special?.doctors_count || '0'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-600 w-1/3">Ngày tạo:</span>
              <span className="text-gray-800">
                {special?.created_at ? new Date(special.created_at).toLocaleString() : 'Không có'}
              </span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-600 w-1/3">Ngày cập nhật:</span>
              <span className="text-gray-800">
                {special?.updated_at ? new Date(special.updated_at).toLocaleString() : 'Không có'}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={close}
              className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400 transition-all duration-500"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}

export default Specialtie;
