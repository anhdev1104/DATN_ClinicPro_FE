import { getDetailMedicalHistorie } from '@/services/medicalHistories.service';
import { MedicalRecord } from '@/types/medicalHistories.type';
import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import { CloseIcon } from '../icons';
import convertTime from '@/helpers/convertTime';
import LightBox from '../lightbox';
import convertLightBox from '@/helpers/convertLightBox';

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
          width: '700px',
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
      <div className="relative h-full bg-gray-50 py-8 px-2 rounded-3xl shadow-lg max-w-[1000px] mx-auto scroll-select size-full overflow-y-auto">
        {/* Nút đóng */}
        <button
          className="absolute top-5 right-5 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-md"
          onClick={close}
        >
          <CloseIcon />
        </button>

        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10 tracking-wide uppercase">Chi tiết bệnh án</h1>

        {/* Card: Thông tin người bệnh */}
        <div className="mb-8 bg-white shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Thông tin người bệnh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Tên người bệnh:</p>
              <p className="text-gray-800 uppercase">{medicalRecord?.patient?.fullname}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Giới tính:</p>
              <p className="text-gray-800 capitalize">{medicalRecord?.patient?.gender}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Số điện thoại:</p>
              <p className="text-gray-800">{medicalRecord?.patient?.phone_number}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Ngày khám:</p>
              <p className="text-gray-800">{convertTime(medicalRecord?.created_at || '')}</p>
            </div>
          </div>
        </div>

        {/* Card: Thông tin bác sĩ */}
        <div className="mb-8 bg-white shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Thông tin bác sĩ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Tên bác sĩ:</p>
              <p className="text-gray-800 uppercase">{medicalRecord?.doctor?.fullname}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Số điện thoại:</p>
              <p className="text-gray-800">{medicalRecord?.doctor?.phone_number}</p>
            </div>
          </div>
        </div>

        {/* Card: Chi tiết bệnh án */}
        <div className="mb-8 bg-white shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Chi tiết bệnh án</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Mã bệnh án:</p>
              <p className="text-gray-800 uppercase">{medicalRecord?.id}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Chẩn đoán sơ bộ:</p>
              <p className="text-gray-800">{medicalRecord?.diagnosis}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Phương pháp điều trị:</p>
              <p className="text-gray-800">{medicalRecord?.treatment}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Nội dung bệnh án:</p>
              <p className="text-gray-800">{medicalRecord?.description}</p>
            </div>
          </div>
        </div>

        {/* Card: Ảnh chụp X-Quang */}
        {medicalRecord?.files?.length > 0 && (
          <div className="bg-white shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Ảnh chụp X-QUANG</h2>
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

        {/* Lightbox */}
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
