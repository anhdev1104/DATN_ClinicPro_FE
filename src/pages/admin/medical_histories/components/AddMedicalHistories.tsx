import { Button } from '@/components/button';
import DirectRoute from '@/components/direct';
import Field from '@/components/field';
import { List, RemoveCircleOutline } from '@/components/icons';
import Input from '@/components/input';
import Label from '@/components/label';
import { Controller, useForm } from 'react-hook-form';
import UploadFiles from './UploadFiles';
import { useEffect, useRef, useState } from 'react';
import yup from '@/lib/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { NewMedical } from '@/types/medicalHistories.type';
import { uploadImages } from '@/services/uploadFile.service';
import { createMedicalHistorie } from '@/services/medicalHistories.service';
import { toast } from 'react-toastify';
import FormPatient from './FormPatient';
import FormService from './FormService';
import { getService } from '@/services/service.service';
import { Services } from '@/types/services.type';

interface AddMedicalHistories {
  navigate: () => void;
}

interface ImageWithDescription {
  file: File | string;
  description: string;
}

const schema = yup.object().shape({
  diagnosis: yup.string().trim().required(),
  description: yup.string().trim().required(),
  treatment: yup.string().trim().required(),
});

export interface IPatientSelect {
  id: string | null;
  name: string | null;
}

const AddMedicalHistories = ({ navigate }: AddMedicalHistories) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const uploadFilesRef = useRef<{
    getFiles: () => ImageWithDescription[];
    resetFiles: () => void;
  } | null>(null);

  const [selectPatient, setSelectPatient] = useState(false);
  const [selectService, setSelectService] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<IPatientSelect | null>(null);
  const [services, setServices] = useState<Services[]>([]);
  const [selectServiceId, setSelectServiceId] = useState<string[]>([]);

  const handleCloseDialog = () => {
    setSelectPatient(false);
  };

  const handleCloseDialogService = () => {
    setSelectService(false);
  };

  const handleSelectedPatientId = (id: string | null, name: string | null) => {
    setSelectedPatientId({
      id,
      name,
    });
  };

  useEffect(() => {
    (async () => {
      const response = await getService();
      setServices(response);
    })();
  }, []);

  const filteredServices = services.filter(service => selectServiceId.includes(service.id));

  const onSubmit = async (data: any) => {
    const images = uploadFilesRef.current ? uploadFilesRef.current.getFiles() : [];

    if (!images.length) {
      toast.warn('Chưa chọn ảnh', { position: 'top-right' });
      return;
    }

    const formData = new FormData();
    images.forEach((img: ImageWithDescription) => {
      formData.append('images[]', img.file);
    });

    try {
      const res = await uploadImages(formData);
      if (res) {
        toast.error('Tải ảnh thất bại', { position: 'top-right' });
      }

      if (res?.data?.urls) {
        const imagesWithDescriptions = res.data?.urls?.map((url: string, index: any) => ({
          file: url,
          description: images[index]?.description || '',
        }));

        const finalSelectId = selectServiceId.map(id => ({ id: id }));

        const medicalHistoryData = {
          ...data,
          files: imagesWithDescriptions,
          user_id: '885acee8-3042-4f9f-a306-923991dee831',
          patient_id: selectedPatientId?.id,
          services: finalSelectId,
        };

        const response = await createMedicalHistorie(medicalHistoryData);
        toast.success(response.data.message, { position: 'top-right' });
        reset({
          diagnosis: '',
          description: '',
          treatment: '',
        });
        setSelectedPatientId(null);
        setSelectServiceId([]);

        if (uploadFilesRef.current) {
          uploadFilesRef.current.resetFiles();
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('Error: No URLs returned from upload API.');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div>
      <DirectRoute nav="Quản lý bệnh án" subnav="Bệnh án" targetnav="Tạo bệnh án" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 w-full flex items-center justify-between gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Thêm bệnh án</h1>
          </div>
          <div className="border-borderColor border px-3 py-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
            <button onClick={navigate} className="text-dark font-medium flex items-center gap-3">
              <List className="text-primaryAdmin" />
              Danh sách bệnh án
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
          <div className="flex w-full gap-10 mb-5">
            <div className="w-1/2">
              <Field className="flex gap-3 flex-col">
                <Label htmlFor="diagnosis">Bệnh chấn đoán:</Label>
                <Input
                  className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                  placeholder="Chẩn đoán ..."
                  name="diagnosis"
                  type="text"
                  control={control}
                />
              </Field>

              <Field className="flex gap-3 flex-col">
                <Label htmlFor="treatment">Phương pháp điều trị:</Label>
                <Controller
                  name="treatment"
                  control={control}
                  render={({ field }) => {
                    return (
                      <textarea
                        className="scroll-select block w-full p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px]  !font-normal !text-dark bg-white "
                        placeholder="Phương pháp điều trị  ..."
                        id="treatment"
                        {...field}
                      ></textarea>
                    );
                  }}
                />
              </Field>
              <Field className="flex gap-3 flex-col">
                <Label htmlFor="description">Mô tả bệnh án:</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => {
                    return (
                      <textarea
                        className="scroll-select block w-full p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px]  !font-normal !text-dark bg-white "
                        placeholder="Mô tả bệnh án ..."
                        id="description"
                        {...field}
                      ></textarea>
                    );
                  }}
                />
              </Field>
            </div>
            <div className="w-1/2">
              <Field className="flex flex-col gap-3">
                <Label htmlFor="patient_id">Danh sách bệnh nhân:</Label>

                {selectedPatientId ? (
                  <div className="flex flex-col gap-2 border p-3 rounded-md bg-gray-100">
                    <div>
                      <strong>ID:</strong> {selectedPatientId.id}
                    </div>
                    <div>
                      <strong>Tên:</strong> {selectedPatientId.name}
                    </div>
                    <Button
                      onClick={() => setSelectPatient(true)}
                      className="text-black mt-2 bg-white border"
                      type="button"
                      styled="normal"
                    >
                      Thay đổi bệnh nhân
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setSelectPatient(true)}
                    className="text-black h-[48px] bg-[#F3F4F7]"
                    type="button"
                    styled="normal"
                  >
                    Chọn bệnh nhân
                  </Button>
                )}
              </Field>
              <Field>
                <Label htmlFor="patient_id">Danh sách dịch vụ:</Label>
                <Button
                  className="text-black h-[48px] bg-[#F3F4F7] w-full"
                  onClick={() => setSelectService(true)}
                  styled="normal"
                  type="button"
                >
                  Chọn dịch vụ
                </Button>

                {selectServiceId.length > 0 && (
                  <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md ">
                    <h1 className="mb-3">Dịch vụ đã chọn:</h1>
                    <div className="max-h-60 overflow-y-auto flex gap-2 flex-wrap">
                      {filteredServices.map(service => (
                        <button
                          type="button"
                          key={service.id}
                          className="flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 gap-3"
                        >
                          <span className="text-sm text-gray-700">{service.service_name}</span>
                          <div onClick={() => setSelectServiceId(prev => prev.filter(id => id !== service.id))}>
                            <RemoveCircleOutline className="w-5 h-5 text-gray-400 hover:text-red-500" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Field>
            </div>
          </div>
          <UploadFiles ref={uploadFilesRef} />
          <div className="flex gap-3 justify-end mt-5">
            <Button
              isLoading={isSubmitting}
              type="submit"
              styled="normal"
              className="bg-primaryAdmin text-white disabled:bg-primaryAdmin/50"
            >
              Xác nhận
            </Button>
            <Button type="submit" styled="normal">
              Nhập lại
            </Button>
          </div>
        </form>
      </div>
      {selectService && (
        <FormService
          services={services}
          selectServiceId={selectServiceId}
          onSelectService={setSelectServiceId}
          isDialogOpen={selectService}
          handleCloseDialog={handleCloseDialogService}
        />
      )}
      {selectPatient && (
        <FormPatient
          onSelectPatient={handleSelectedPatientId}
          isDialogOpen={selectPatient}
          handleCloseDialog={handleCloseDialog}
          selectedPatientId={selectedPatientId?.id}
        />
      )}
    </div>
  );
};

export default AddMedicalHistories;
