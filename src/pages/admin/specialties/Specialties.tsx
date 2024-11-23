import DirectRoute from '@/components/direct';
import { AddIcon, MoreHorizIcon } from '@/components/icons';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import Select from '@/components/select';
import { useEffect, useState } from 'react';
import { deleteSpecialties, getSpecialties } from '@/services/specialties.service';
import { ISpecialties } from '@/types/specialties.type';
import convertTime from '@/helpers/convertTime';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ModalConfirm } from '@/components/modal';
import LoadingSpin from '@/components/loading';
import { Dialog } from '@mui/material';

const SearchOptions = [
  {
    label: 'Theo mã ',
    value: 'Theo mã ',
  },
  {
    label: 'Theo mã người bệnh',
    value: 'Theo mã người bệnh',
  },
];

interface ModalDetailSpecial {
  close: () => void;
  statusLog: boolean;
  special?: ISpecialties | null;
}

const Specialtie = () => {
  const [specialties, setSpecialties] = useState<ISpecialties[]>([]);
  const [showDropdown, setShowDropdown] = useState<string | undefined | null>(null);
  const [idSpecial, setIdSpecial] = useState<string | null | undefined>('');
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [resetData, setResetData] = useState(0);
  const [open, setOpen] = useState<{ status: boolean; id: ISpecialties | null }>({
    status: false,
    id: null,
  });

  const handleToggle = (id: string | null | undefined) => {
    setShowDropdown(showDropdown === id ? null : id);
    setIdSpecial(id);
  };

  useEffect(() => {
    (async () => {
      setIsLoadingList(true);
      const data = await getSpecialties();
      setSpecialties(data);
      setIsLoadingList(false);
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

  const handleClickOpen = (id: ISpecialties) => {
    setOpen({ status: true, id });
  };

  const handleClose = () => {
    setOpen({ status: false, id: null });
  };

  return (
    <>
      <DirectRoute nav="Quản lý chuyên khoa" subnav="Chuyên khoa" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 w-full flex items-center justify-between gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Danh sách chuyên khoa</h1>
          </div>
          <div className="flex gap-5">
            <Link
              to={'/add-specialties'}
              className="text-[18px] font-medium gap-3 border-borderColor border py-2 px-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-transparent hover:border-primaryAdmin"
            >
              <AddIcon className="text-primaryAdmin" />
            </Link>
            <SpecialtiesSearch />
          </div>
        </div>
        <div className="w-full">
          {isLoadingList && (
            <div className="mx-auto text-center pt-10">
              <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
            </div>
          )}
          {!isLoadingList && (
            <table className="min-w-full table-auto border-collapse">
              <thead className="border-b-2 border-primaryAdmin/20 bg-primaryAdmin/5">
                <tr className=" text-gray-700">
                  <th className="p-4 font-medium text-left">#</th>
                  <th className="p-4 font-medium text-left">Tên chuyên khoa</th>
                  <th className="p-4 font-medium text-left">Mô tả</th>
                  <th className="p-4 font-medium text-left">Ngày tạo</th>
                  <th className="p-4 font-medium text-left"></th>
                </tr>
              </thead>
              <tbody>
                {specialties &&
                  specialties?.map((item, index) => (
                    <tr className="even:bg-[#f5f5f5]" key={item.id}>
                      <td className="py-2 px-5">{index + 1}</td>
                      <td className="py-2 px-5 text-gray-800 font-semibold max-w-[250px]">{item.name}</td>
                      <td className="py-2 px-5 text-gray-600">{item.description}</td>
                      <td className="py-2 px-5 text-gray-600 max-w-[300px]">{convertTime(item.created_at)}</td>
                      <td className="py-2 px-5 text-end">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            className="flex justify-center w-1/2 rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                            onClick={() => handleToggle(item.id)}
                          >
                            <MoreHorizIcon />
                          </button>
                          {showDropdown === item.id && (
                            <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white">
                              <div
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  handleToggle(item.id);
                                  handleClickOpen(item);
                                }}
                              >
                                Chi tiết
                              </div>
                              <Link
                                to={`/edit-specialties/${item.id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleToggle(item.id)}
                              >
                                Sửa
                              </Link>
                              <div
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  handleToggle(item.id);
                                  setActiveModal(true);
                                }}
                              >
                                Xóa bỏ
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
        <ModalConfirm
          description="Dữ liệu sẽ không thể khôi phục"
          title="Bạn có chắc muốn xóa"
          isClose={handleCloseModal}
          isOpen={activeModal}
          submit={() => deleteSpecial(idSpecial)}
          isLoading={isLoading}
          className="bg-primaryAdmin hover:bg-primaryAdmin/50"
        />
      </div>

      {open.status && <ModalDetailSpecial close={handleClose} statusLog={open.status} special={open.id} />}
    </>
  );
};

function SpecialtiesSearch() {
  const { control } = useForm({
    mode: 'onChange',
  });
  return (
    <form className="relative flex gap-5 items-center">
      <Input
        name="searchadmin"
        className="border-none !h-10 !font-light text-primaryAdmin"
        isGlass
        colorGlass="text-primaryAdmin top-[9px]"
        placeholder="Tìm kiếm chuyên khoa ..."
        control={control}
      />
      <Select name="searchPrescription" placeholder="Bộ lọc chuyên khoa" options={SearchOptions} control={control} />
    </form>
  );
}

function ModalDetailSpecial({ close, statusLog, special }: ModalDetailSpecial) {
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
          <button onClick={close} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
            Đóng
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default Specialtie;
