import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { AddIcon, DeleteIcon, EditNoteIcon, VisibilityIcon } from '@/components/icons';
import { useRef, useState } from 'react';
import Select from '@/components/select';
import DirectRoute from '@/components/direct';
import { deletePrescription, getPrescription, getPrescriptionDetails } from '@/services/prescriptions.service';
import { IPrescriptions } from '@/types/prescription.type';
import useFetchingData from '@/hooks/useFetchingData';
import LoadingSpin from '@/components/loading';
import convertTime from '@/helpers/convertTime';
import { Box } from '@mui/material';
import { ModalConfirm, ModalPrescription } from '@/components/modal';
import useToggle from '@/hooks/useToggle';
import { toast } from 'react-toastify';
import renderMessageError from '@/helpers/renderMessageErrror';
import prettyId from '@/helpers/prettyId';

const SearchOptions = [
  {
    label: 'Theo mã đơn thuốc',
    value: 'Theo mã đơn thuốc',
  },
  {
    label: 'Theo mã người bệnh',
    value: 'Theo mã người bệnh',
  },
];

interface ListPrescriptons {
  navigate: () => void;
}

const ListPrescriptions = ({ navigate }: ListPrescriptons) => {
  const {
    isLoading,
    data: prescription,
    setData: setPrescription,
  } = useFetchingData<IPrescriptions[]>({
    serviceFetching: getPrescription,
    initialData: [],
  });

  const { show: showConfirm, handleToggle: handleToggleConfirm } = useToggle();
  const { show: prescriptionDetail, handleToggle: setPrescriptionDetail } = useToggle();
  const [detailMedication, setDetailMedication] = useState<IPrescriptions>({} as IPrescriptions);
  const [idPrescription, setIdPrescription] = useState<string | undefined>('');

  const contentRef = useRef<any>(null);
  const handleRemovePrescription = async () => {
    handleToggleConfirm();
    if (!idPrescription) return;
    try {
      const res = await deletePrescription(idPrescription);
      if (res.message === false) {
        return toast.error(renderMessageError(res.errors));
      }
      setPrescription(prev => prev.filter(item => item.id !== idPrescription));
      toast.success('Xoá đơn thuốc thành công');
    } catch (error) {
      console.log(error);
    }
  };

  const getPrescriptionDetail = async (id: string | undefined) => {
    if (!id) return;
    try {
      const res = await getPrescriptionDetails(id);
      if (res.message === false) {
        return toast.error(renderMessageError(res.errors));
      }
      setDetailMedication(res);
      setPrescriptionDetail();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DirectRoute nav="Quản lý đơn thuốc" subnav="Đơn thuốc" />
      <div className="bg-white size-full p-[20px] rounded-[26px] min-h-[500px]">
        <div className={`mb-6 flex items-center justify-between gap-5 w-[${window.screen.width}px]`}>
          <h1 className="text-[18px] text-black font-medium">Danh sách đơn thuốc</h1>
          <div className="flex gap-5">
            <button
              onClick={navigate}
              className="text-[18px] font-medium gap-3 border-borderColor border py-2 px-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-transparent hover:border-primaryAdmin"
            >
              <AddIcon className="text-primaryAdmin" />
            </button>
            <PrescriptionSearch />
          </div>
        </div>

        <table className="min-w-full table-auto border-collapse">
          <thead className="border-b-2 border-primaryAdmin/20 bg-primaryAdmin/5">
            <tr className=" text-gray-700">
              <th className="p-4 font-medium">Mã đơn thuốc</th>
              <th className="p-4 font-medium">Tên đơn thuốc</th>
              <th className="p-4 font-medium">Bệnh nhân</th>
              <th className="p-4 font-medium">Lời dặn</th>
              <th className="p-4 font-medium">Bác sĩ kê đơn</th>
              <th className="p-4 font-medium">Ngày tạo</th>
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              prescription.length > 0 &&
              prescription.map(item => (
                <tr className="even:bg-[#f5f5f5]" key={item.id}>
                  <td className="py-2 px-5">{item.id && prettyId(item.id)}</td>
                  <td className="py-2 px-5 text-gray-800 font-semibold">{item.name}</td>
                  <td className="py-2 px-5 text-gray-600">{item.patient.patient_info?.fullname}</td>
                  <td className="py-2 px-5 text-gray-600">{item.description}</td>
                  <td className="py-2 px-5 text-gray-800">{item.user.user_info.fullname}</td>
                  <td className="py-2 px-5 text-gray-800">{item.created_at && convertTime(item.created_at)}</td>
                  <td className="py-2 px-5 flex gap-4 mt-2">
                    <div
                      className="text-primaryAdmin/70 transition-all hover:text-primaryAdmin/50 cursor-pointer"
                      onClick={() => getPrescriptionDetail(item.id)}
                    >
                      <VisibilityIcon />
                    </div>
                    <div className="text-yellow-400 transition-all hover:text-yellow-300 cursor-pointer">
                      <EditNoteIcon />
                    </div>
                    <div
                      className="text-red-400 transition-all hover:text-red-300 cursor-pointer"
                      onClick={() => {
                        setIdPrescription(item.id);
                        handleToggleConfirm();
                      }}
                    >
                      <DeleteIcon />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="mx-auto text-center pt-6">
            <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
          </div>
        )}
        {!isLoading && prescription.length <= 0 && (
          <Box
            sx={{
              textAlign: 'center',
              marginTop: '50px',
            }}
          >
            Chưa có đơn thuốc nào !
          </Box>
        )}
      </div>
      <ModalConfirm
        isOpen={showConfirm}
        isClose={handleToggleConfirm}
        title="Xoá đơn thuốc ?"
        description="Bạn muốn xoá đơn thuốc này vĩnh viễn?"
        submit={handleRemovePrescription}
        textApprove="Xoá"
        className="bg-red-500 hover:bg-red-400"
      />
      <ModalPrescription
        open={prescriptionDetail}
        onClose={setPrescriptionDetail}
        detailMedication={detailMedication}
        ref={contentRef}
      />
    </>
  );
};

function PrescriptionSearch() {
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
        placeholder="Tìm kiếm đơn thuốc ..."
        control={control}
      />
      <Select
        name="searchPrescription"
        placeholder="Bộ lọc đơn thuốc"
        options={SearchOptions}
        className="!min-w-[200px]"
        control={control}
      />
    </form>
  );
}

export default ListPrescriptions;
