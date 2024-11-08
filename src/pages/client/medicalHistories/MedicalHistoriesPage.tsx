import { useEffect, useState } from 'react';
import { CachedIcon, CloseIcon, CompareArrows } from '@/components/icons';
import { Dialog } from '@mui/material';
import { getMedicalHistoriesById } from '@/services/medicalHistories.service';
import { MedicalRecord } from '@/types/medicalHistories.type';
import Loading from './components/Loading';
import convertTime from '@/helpers/convertTime';

interface DetailMedicalHistories {
  close: () => void;
  statusLog: boolean;
}

const MedicalHistoriesPage = () => {
  const [currentDate] = useState(() => new Date().toLocaleDateString());
  const [listMedicalRecords, setListMedicalRecords] = useState<MedicalRecord[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen({ status: false });
  };

  const [open, setOpen] = useState<{ status: boolean }>({
    status: false,
  });

  const handleClickOpen = () => {
    setOpen({ status: true });
  };

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      setLoading(true);
      setTimeout(async () => {
        const medicalRecords = await getMedicalHistoriesById('13b50927-da93-47e7-9a4b-e1c14fc951e1');
        setListMedicalRecords(medicalRecords);
        setLoading(false);
      }, 1000);
    };
    fetchMedicalRecords();
  }, [resetKey]);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="py-[3rem] container-page">
      <div className="mb-20 flex flex-col gap-2">
        <div className="font-bold text-[30px] text-primary">Xin chào, Lê Nguyễn Bảo Tâm ...</div>
        <div>{currentDate}</div>
      </div>
      <div className="mb-10 flex justify-between">
        <div className="text-[25px] font-bold ">Lịch sử bệnh án:</div>
        <div className="flex gap-3">
          <button>
            <CompareArrows className="!transform !rotate-90 size-[25px] hover:text-primaryAdmin cursor-pointer" />
          </button>
          <button onClick={handleReset}>
            <CachedIcon className="size-[25px] hover:text-primaryAdmin cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between border-b border-borderColor text-left py-4 font-semibold px-2">
          <div className="flex-[0_0_17%]">Mã bệnh án</div>
          <div className="flex-[0_0_17%]">Chẩn đoán</div>
          <div className="flex-[0_0_17%]">Bác sĩ</div>
          <div className="flex-[0_0_17%]">Người bệnh</div>
          <div className="flex-[0_0_17%]">Ngày khám</div>
          <div className="flex-[0_0_9%]"></div>
        </div>
        <div className="w-full border-b border-borderColor text-left">
          {loading ? (
            <Loading />
          ) : Array.isArray(listMedicalRecords) && listMedicalRecords.length > 0 ? (
            listMedicalRecords.map((record, index) => (
              <div
                key={index}
                className={`py-6 flex justify-between w-full text-left hover:opacity-100 opacity-75 cursor-pointer ${index % 2 === 1 ? 'bg-white' : 'bg-gray-100'} px-2`}
              >
                <div className="flex-[0_0_17%] truncate">{record.id}</div>
                <div className="flex-[0_0_17%] truncate">{record.treatment}</div>
                <div className="flex-[0_0_17%] truncate">{record.doctor.fullname}</div>
                <div className="flex-[0_0_17%] truncate">{record.patient.fullname}</div>
                <div className="flex-[0_0_17%]">{convertTime(record.created_at)}</div>
                <div onClick={handleClickOpen} className="flex-[0_0_9%] text-blue-600 hover:underline cursor-pointer">
                  Xem chi tiết
                </div>
              </div>
            ))
          ) : (
            <div className="text-center font-bold text-[20px] py-8">Không tìm thấy bản ghi nào</div>
          )}
        </div>
      </div>
      {open.status && <DetailMedicalHistories close={handleClose} statusLog={open.status} />}
    </div>
  );
};

function DetailMedicalHistories({ close, statusLog }: DetailMedicalHistories) {
  return (
    <Dialog
      open={statusLog}
      onClose={close}
      PaperProps={{
        style: {
          backgroundColor: '#f5f5f5',
          padding: '40px',
          width: '600px',
          borderRadius: '8px',
          gap: '20px',
        },
      }}
    >
      <div style={{ padding: '15px' }}>
        <div style={{ position: 'absolute', top: '0', right: '0', padding: '10px', cursor: 'pointer' }} onClick={close}>
          <CloseIcon />
        </div>
      </div>
    </Dialog>
  );
}

export default MedicalHistoriesPage;
