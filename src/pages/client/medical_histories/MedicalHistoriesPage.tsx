import { useEffect, useState } from 'react';
import { CachedIcon } from '@/components/icons';
import { getMedicalHistoriesById } from '@/services/medicalHistories.service';
import { MedicalRecord } from '@/types/medicalHistories.type';
import convertTime from '@/helpers/convertTime';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IUser } from '@/types/user.type';
import { MedicalRecordSekeleton } from '@/pages/admin/medical_histories/components/MedicalRecords';
import ModalDetailMedical from '@/components/modal/ModalDetailMedical';

const MedicalHistoriesPage = () => {
  const auth = useSelector((state: RootState) => state.auth.data) as IUser;
  const [currentDate] = useState(() => new Date().toLocaleDateString());
  const [listMedicalRecords, setListMedicalRecords] = useState<MedicalRecord[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<{ status: boolean; item: MedicalRecord | null }>({
    status: false,
    item: null,
  });

  const handleClose = () => {
    setOpen({ status: false, item: null });
  };

  const handleClickOpen = (item: MedicalRecord | null) => {
    setOpen({ status: true, item });
  };

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      setLoading(true);
      const medicalRecords = await getMedicalHistoriesById(auth.data.user_info.patient_id as string);
      setListMedicalRecords(medicalRecords);
      setLoading(false);
    };
    fetchMedicalRecords();
  }, [resetKey]);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="py-[3rem] container-page">
      <div className="mb-20 flex flex-col gap-2">
        <div className="font-bold text-[30px] text-primary">Xin chào, {auth.data.user_info.fullname} ...</div>
        <div>{currentDate}</div>
      </div>
      <div className="mb-10 flex justify-between">
        <div className="text-[25px] font-bold ">Lịch sử khám bệnh:</div>
        <div className="flex gap-3">
          <button onClick={handleReset}>
            <CachedIcon className="size-[25px] hover:text-primaryAdmin cursor-pointer" />
          </button>
        </div>
      </div>
      <div className={`grid grid-cols-3 gap-5`}>
        {loading && new Array(6).fill(0).map((_, index) => <MedicalRecordSekeleton key={index} />)}
        {!loading && (listMedicalRecords || []).length > 0 ? (
          listMedicalRecords.map(item => (
            <div
              className="border-2 border-gray-300 p-3 rounded-md cursor-pointer hover:bg-primaryAdmin/5 transition-all ease-linear"
              key={item.id}
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={item?.doctor.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{item?.doctor?.fullname}</h3>
                  <span className="font-light text-xs">{item?.doctor?.phone_number}</span>
                </div>
              </div>
              <div className="text-xs mt-3">
                <p>Mã bệnh án:</p>
                <div className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm">{item?.id}</div>
              </div>
              <div className="text-xs mt-3">
                <p>Chuẩn đoán bệnh:</p>
                <div
                  className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate"
                  title={item?.diagnosis}
                >
                  {item?.diagnosis}
                </div>
              </div>
              <div className="text-xs mt-3">
                <p>Bác sĩ phụ trách:</p>
                <div className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate">
                  BS: <span className="font-normal pl-1 text-primaryAdmin">{item?.doctor?.fullname}</span>
                </div>
              </div>
              <div className="text-xs mt-3">
                <p>Ngày khám bệnh:</p>
                <div className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate" title="">
                  {convertTime(item?.created_at || '')}
                </div>
              </div>
              <div
                onClick={() => handleClickOpen(item)}
                className="text-xs mt-3 bg-primaryAdmin text-white rounded-sm py-2 px-5 text-center transition-all ease-linear hover:bg-opacity-75"
              >
                Chi tiết
              </div>
            </div>
          ))
        ) : (
          <div className="text-center font-bold text-[20px] py-8">Không tìm thấy bản ghi nào</div>
        )}
      </div>
      {open.status && <ModalDetailMedical close={handleClose} statusLog={open.status} id={open.item?.id} />}
    </div>
  );
};

export default MedicalHistoriesPage;
