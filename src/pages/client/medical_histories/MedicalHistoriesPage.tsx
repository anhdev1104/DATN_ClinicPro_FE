import { useEffect, useState } from 'react';
import { CachedIcon, CloseIcon, CompareArrows } from '@/components/icons';
import { Dialog } from '@mui/material';
import { getDetailMedicalHistorie, getMedicalHistoriesById } from '@/services/medicalHistories.service';
import { MedicalRecord } from '@/types/medicalHistories.type';
import convertTime from '@/helpers/convertTime';
import LightBox from '@/components/lightbox';
import convertLightBox from '@/helpers/convertLightBox';
import LoadingSpin from '@/components/loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IUser } from '@/types/user.type';

interface DetailMedicalHistories {
  close: () => void;
  statusLog: boolean;
  id?: string;
}

const MedicalHistoriesPage = () => {
  const auth = useSelector((state: RootState) => state.auth.data) as IUser;
  const [currentDate] = useState(() => new Date().toLocaleDateString());
  const [listMedicalRecords, setListMedicalRecords] = useState<MedicalRecord[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen({ status: false, id: '#' });
  };

  const [open, setOpen] = useState<{ status: boolean; id: string }>({
    status: false,
    id: '#',
  });

  const handleClickOpen = (id: string) => {
    setOpen({ status: true, id });
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
            <div className="w-full flex justify-center items-center py-10">
              <LoadingSpin className="!size-16" color="border-primaryAdmin" />
            </div>
          ) : Array.isArray(listMedicalRecords) && listMedicalRecords.length > 0 ? (
            listMedicalRecords.map((record, index) => (
              <div
                key={index}
                className={`py-6 flex justify-between w-full text-left hover:opacity-100 opacity-75 cursor-pointer ${index % 2 === 1 ? 'bg-white' : 'bg-gray-100'} px-2`}
              >
                <div className="flex-[0_0_17%] truncate font-semibold">{record.id}</div>
                <div className="flex-[0_0_17%] truncate">{record.treatment}</div>
                <div className="flex-[0_0_17%] truncate font-semibold">{record.doctor.fullname}</div>
                <div className="flex-[0_0_17%] truncate font-semibold">{record.patient.fullname}</div>
                <div className="flex-[0_0_17%]">{convertTime(record.created_at)}</div>
                <div
                  onClick={() => handleClickOpen(record.id)}
                  className="flex-[0_0_9%] text-blue-600 hover:underline cursor-pointer"
                >
                  Xem chi tiết
                </div>
              </div>
            ))
          ) : (
            <div className="text-center font-bold text-[20px] py-8">Không tìm thấy bản ghi nào</div>
          )}
        </div>
      </div>
      {open.status && <DetailMedicalHistories close={handleClose} statusLog={open.status} id={open.id} />}
    </div>
  );
};

function DetailMedicalHistories({ close, statusLog, id }: DetailMedicalHistories) {
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord>({} as MedicalRecord);

  useEffect(() => {
    (async () => {
      const response = await getDetailMedicalHistorie(id);
      setMedicalRecord(response);
    })();
  }, [id]);

  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightBox = (index: number) => {
    if (index >= 0 && index < medicalRecord?.files?.length) {
      setCurrentImageIndex(index);
      setIsLightBoxOpen(true);
    }
  };

  const closeLightBox = () => {
    setIsLightBoxOpen(false);
  };

  return (
    <Dialog
      open={statusLog}
      onClose={close}
      className="!z-[999]"
      PaperProps={{
        style: {
          backgroundColor: '#f5f5f5',
          width: '700px',
          height: 'auto',
          maxWidth: '700px',
          borderRadius: '8px',
          overflowY: 'hidden',
          gap: '20px',
        },
      }}
    >
      <div className="scroll-select size-full overflow-y-auto py-10">
        <div style={{ position: 'absolute', top: '0', right: '0', padding: '10px', cursor: 'pointer' }} onClick={close}>
          <CloseIcon />
        </div>
        <div>
          <h1 className="uppercase text-center text-[30px] font-bold mb-14">Chi tiết bệnh án</h1>
          <div className="px-5">
            <div className="mb-12">
              <div className="font-bold mb-5 flex items-center gap-3">
                <h1 className="text-[24px]">I.</h1>
                <p className="text-[20px]">Thông tin cơ bản:</p>
              </div>
              <div className="flex flex-col gap-2 text-[15px] mb-7">
                <div className="mb-2">
                  <h1 className="text-[16px] font-semibold">1. Thông tin người bệnh:</h1>
                </div>
                <div className="flex gap-4">
                  <h1 className="font-medium">Tên người bệnh:</h1>
                  <span className="uppercase font-light">{medicalRecord?.patient?.fullname}</span>
                </div>
                <div className="flex gap-4">
                  <h1 className="font-medium">Giới tính:</h1>
                  <span className="font-light">{medicalRecord?.patient?.gender}</span>
                </div>
                <div className="flex gap-4">
                  <h1 className="font-medium">Số điện thoại:</h1>
                  <span className="font-light">{medicalRecord?.patient?.phone_number}</span>
                </div>
                <div className="flex gap-4">
                  <h1 className="font-medium">Ngày khám:</h1>
                  <span className="font-light">{convertTime(medicalRecord?.created_at)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[15px]">
                <div className="mb-2">
                  <h1 className="text-[16px] font-semibold">2. Thông tin bác sĩ:</h1>
                </div>
                <div className="flex gap-4">
                  <h1 className="font-medium">Tên bác sĩ:</h1>
                  <span className="uppercase font-light">{medicalRecord?.doctor?.fullname}</span>
                </div>
                <div className="flex gap-4">
                  <h1 className="font-medium">Giới tính:</h1>
                  <span className="font-light">{medicalRecord?.doctor?.gender}</span>
                </div>
                <div className="flex gap-4">
                  <h1 className="font-medium">Số điện thoại:</h1>
                  <span className="font-light">{medicalRecord?.doctor?.phone_number}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-5 flex items-center gap-3">
                <h1 className="text-[24px]">II.</h1>
                <p className="text-[20px]">Chi tiết bệnh án:</p>
              </div>
              <div className="flex flex-col gap-2 text-[15px]">
                <div className="flex gap-4">
                  <h1 className="font-medium">Mã bệnh án:</h1>
                  <span className="uppercase font-light">{medicalRecord?.id}</span>
                </div>
                <div className="flex gap-4">
                  <h1 className="font-medium">Chẩn đoán sơ bộ:</h1>
                  <span className="uppercase font-light">{medicalRecord?.diagnosis}</span>
                </div>
                <div className="flex gap-4">
                  <h1 className="font-medium">Phương pháp điều trị:</h1>
                  <span className="uppercase font-light">{medicalRecord?.treatment}</span>
                </div>

                <div className="flex gap-4">
                  <h1 className="font-medium">Nội dung bệnh án:</h1>
                  <span className="uppercase font-light">{medicalRecord?.description}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-medium">Ảnh chụp X-QUANG:</h1>
                  <div className="">
                    {medicalRecord?.files?.map((file, index) => (
                      <div
                        onClick={() => openLightBox(index)}
                        key={file.id}
                        className="h-fit w-[48%] inline-block m-1 float-start cursor-pointer"
                      >
                        <img className="object-cover w-full mb-2 max-h-[180px]" src={file.file} alt="" />
                        <div className="text-center">
                          <span className="uppercase font-light">{file.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLightBoxOpen && (
          <LightBox
            images={convertLightBox(medicalRecord.files)}
            currentIndex={currentImageIndex} // Hình ảnh hiện tại
            onClose={closeLightBox} // Hàm để đóng LightBox
          />
        )}
      </div>
    </Dialog>
  );
}

export default MedicalHistoriesPage;
