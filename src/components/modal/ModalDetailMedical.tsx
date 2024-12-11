import { getDetailMedicalHistorie } from '@/services/medicalHistories.service';
import { MedicalRecord } from '@/types/medicalHistories.type';
import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import convertTime from '@/helpers/convertTime';
import LightBox from '../lightbox';
import convertLightBox from '@/helpers/convertLightBox';
import convertGender from '@/helpers/convertToGender';

interface DetailMedicalHistories {
  close: () => void;
  statusLog: boolean;
  id?: string;
}

const ModalDetailMedical = ({ close, statusLog, id }: DetailMedicalHistories) => {
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
          width: '600px',
          height: '100vh',
          maxWidth: '95vh',
          maxHeight: '95vh',
          borderRadius: '8px',
          overflowY: 'hidden',
          gap: '20px',
          margin: '0px',
        },
      }}
    >
      <div
        className="relative h-full bg-gray-50 py-8 px-6 mx-auto scroll-select
      scroll-select-hidden size-full overflow-y-auto"
      >
        <div className="flex items-center justify-between w-full mb-10">
          <div className="flex items-center gap-2">
            <img className="size-[40px]" src="/images/logo.png" alt="" />
            <div className="flex items-center gap-1 font-medium">
              Phòng khám <h1 className="text-primaryAdmin font-bold">ClinicPro</h1>
            </div>
          </div>

          <div className="text-[11px]">
            <div>
              <span className="mr-2">Mã bệnh án:</span>
              <span className="font-medium">{medicalRecord.id}</span>
            </div>
            <div>
              <span className="mr-2">Ngày khám:</span>
              <span className="font-medium">{convertTime(medicalRecord.created_at || '')}</span>
            </div>
          </div>
        </div>

        <h1 className="text-[22px] font-semibold text-gray-700 text-center mb-14">Chi tiết bệnh án</h1>

        <div className="mb-6 bg-white">
          <h2 className="text-[15px] font-semibold mb-2 pb-1 border-b-2 text-gray-700 border-gray-300 w-max">
            I - Thông tin người bệnh
          </h2>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Tên người bệnh:</p>
            <p className="uppercase text-gray-700">{medicalRecord?.patient?.fullname}</p>
          </div>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Giới tính:</p>
            <p className="capitalize text-gray-700">{convertGender(medicalRecord?.patient?.gender)}</p>
          </div>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Số điện thoại:</p>
            <p className="text-gray-700">{medicalRecord?.patient?.phone_number}</p>
          </div>
        </div>
        <div className="mb-6 bg-white">
          <h2 className="text-[15px] font-semibold mb-2 pb-1 border-b-2 text-gray-700 border-gray-300 w-max">
            II - Thông tin bác sĩ
          </h2>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Tên bác sĩ:</p>
            <p className="uppercase text-gray-700">{medicalRecord?.doctor?.fullname}</p>
          </div>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Giới tính:</p>
            <p className="capitalize text-gray-700">{convertGender(medicalRecord?.doctor?.gender)}</p>
          </div>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Số điện thoại:</p>
            <p className="text-gray-700">{medicalRecord?.doctor?.phone_number}</p>
          </div>
        </div>

        <div className="mb-6 bg-white">
          <h2 className="text-[15px] font-semibold mb-2 pb-1 border-b-2 text-gray-700 border-gray-300 w-max">
            III - Thông tin bệnh án
          </h2>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Mã bệnh án:</p>
            <p className="uppercase text-gray-700">{medicalRecord?.id}</p>
          </div>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Chẩn đoán sơ bộ:</p>
            <p className="text-gray-700">{medicalRecord?.diagnosis}</p>
          </div>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Phương pháp điều trị:</p>
            <p className="text-gray-700">{medicalRecord?.treatment}</p>
          </div>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Nội dung bệnh án:</p>
            <p className="text-gray-700">{medicalRecord?.description}</p>
          </div>
          <div className="flex gap-4 mb-1">
            <p className="font-medium text-gray-500">Chỉ định:</p>
            <p className="text-gray-700">{medicalRecord?.indication}</p>
          </div>
        </div>

        {/* Card: Ảnh chụp X-Quang */}
        {medicalRecord?.files?.length > 0 && (
          <div className="bg-white mb-6">
            <h2 className="text-[15px] font-semibold mb-2 pb-1 border-b-2 text-gray-700 border-gray-300 w-max">
              IV - Ảnh X-Quang
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {medicalRecord.files.map((file, index) => (
                <div
                  key={file.id}
                  className="relative group cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => openLightBox(index)}
                >
                  <img
                    className="w-full h-[180px] object-cover rounded-lg shadow-md"
                    src={file.file}
                    alt={file.description}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
                    <p className="text-white text-sm font-light">{file.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t-[2px] border-gray-400 border-dashed pt-6  flex justify-end">
          <div className="w-max text-center pb-20">
            <h1 className="text-[14px] font-light">Đà nẵng , 01-01-2025</h1>
            <h1 className="font-medium">Bác sĩ điều trị</h1>
          </div>
        </div>

        {isLightBoxOpen && (
          <LightBox
            images={convertLightBox(medicalRecord?.files || [])}
            currentIndex={currentImageIndex}
            onClose={closeLightBox}
          />
        )}
      </div>
    </Dialog>
  );
};

export default ModalDetailMedical;
