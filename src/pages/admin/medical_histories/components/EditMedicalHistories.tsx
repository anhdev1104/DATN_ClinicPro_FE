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
import { uploadImages } from '@/services/uploadFile.service';
import { getDetailMedicalHistorie, updateMedicalHistorie } from '@/services/medicalHistories.service';
import { Link, useParams } from 'react-router-dom';
import { FileMidecal, MedicalRecord } from '@/types/medicalHistories.type';
import FormPatient from './FormPatient';
import { toast } from 'react-toastify';
import { ModalConfirm } from '@/components/modal';
import { getService } from '@/services/service.service';
import { Services } from '@/types/services.type';
import FormService from './FormService';
import NotFoundPage from '@/pages/client/404/NotFoundPage';

interface ImageWithDescription {
  file?: any;
  description: string;
}

const schema = yup.object().shape({
  diagnosis: yup.string().trim().required(),
  description: yup.string().trim().required(),
  treatment: yup.string().trim().required(),
});

interface IPatientSelect {
  id: string | null | undefined;
  name: string | null | undefined;
}

const EditMedicalHistories = () => {
  const {
    handleSubmit,
    control,
    reset,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { isSubmitting, errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  const uploadFilesRef = useRef<{
    getFiles: () => ImageWithDescription[];
    resetFiles: () => void;
  } | null>(null);
  const [medicalDetail, setMedicalDetail] = useState<MedicalRecord>();
  const [selectPatient, setSelectPatient] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<IPatientSelect | null>(null);
  const [initFiles, setInitFiles] = useState<FileMidecal[] | []>(medicalDetail?.files || []);
  const [filesDelete, setFilesDelete] = useState<string[]>([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [selectService, setSelectService] = useState(false);
  const [services, setServices] = useState<Services[]>([]);
  const [selectServiceId, setSelectServiceId] = useState<string[]>([]);
  const [serviceDelete, setServiceDelete] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await getService();
      setServices(response);
    })();
  }, []);

  const filteredServices = services.filter(service => selectServiceId.includes(service.id));

  const handleCloseDialogService = () => {
    setSelectService(false);
  };

  // Xử lý với form Patient
  const handleCloseDialog = () => {
    setSelectPatient(false);
  };
  // Xử lý với form Patient
  const handleSelectedPatientId = (id: string | null, name: string | null) => {
    setSelectedPatientId({
      id,
      name,
    });
  };
  // Xử lý data Ảnh đã có
  const handleRemoveFilesOld = (id: string) => {
    const updatedFiles = initFiles?.filter(file => file.id !== id);
    const deleteId = [...filesDelete, id];
    setFilesDelete(deleteId);
    setInitFiles(updatedFiles);
  };
  // Xử lý data Ảnh đã có
  const handleChangeDescriptionOld = (id: string, newDescription: string) => {
    const updatedFiles = initFiles?.map(file => (file.id === id ? { ...file, description: newDescription } : file));
    setInitFiles(updatedFiles);
  };

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const data = await getDetailMedicalHistorie(id);
        setMedicalDetail(data);
        const oldPatient = {
          name: data.patient.fullname,
          id: data.patient.id,
        };
        const oldFiles = [...data.files];
        setSelectedPatientId(oldPatient);
        setInitFiles(oldFiles);

        setSelectServiceId((prev: any) => {
          const newIds = data.services.map((service: any) => service.id);
          return Array.from(new Set([...prev, ...newIds]));
        });

        reset({
          diagnosis: data.diagnosis,
          description: data.description,
          treatment: data.treatment,
        });
      } catch (error) {
        setError(true);
        return error;
      }
    })();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    console.log('Data to submit:', data);
    const imagesNew = uploadFilesRef?.current?.getFiles() || [];
    let newImages = [];

    if (imagesNew.length > 0) {
      const formData = new FormData();
      imagesNew?.forEach((img: ImageWithDescription) => {
        formData.append('images[]', img.file);
      });

      const res = await uploadImages(formData);
      const imagesWithDescriptions = res.data?.urls?.map((url: string, index: any) => ({
        file: url,
        description: imagesNew[index]?.description || '',
      }));

      newImages = [...imagesWithDescriptions, ...initFiles];
    } else {
      newImages = [...initFiles];
    }

    try {
      const finalSelectId = [...new Set(selectServiceId)].map(id => ({ id }));
      const updatedServiceDelete = [
        ...new Set(serviceDelete.filter(deleteId => !finalSelectId.some(selected => selected.id === deleteId))),
      ];

      const finalData = {
        ...data,
        patient_id: selectedPatientId?.id,
        user_id: '885acee8-3042-4f9f-a306-923991dee831',
        files: [...newImages],
        file_deletes: [...filesDelete],
        services: finalSelectId,
        service_deletes: updatedServiceDelete,
      };
      console.log('Final data being sent:', finalData);
      const idDoctor = id ? id : '';
      const response = await updateMedicalHistorie(idDoctor, finalData);
      toast.success(response.message, { position: 'top-right' });
      handleClose();
    } catch (error) {
      return error;
    }
  };
  const handleClose = () => {
    setModalStatus(!modalStatus);
  };
  const handleSubmitForm = handleSubmit(onSubmit);

  if (error) {
    return <NotFoundPage title="Không tìm thấy bệnh án." />;
  }

  return (
    <>
      <div>
        <DirectRoute nav="Quản lý bệnh án" subnav="Bệnh án" targetnav="Tạo bệnh án" />
        <div className="bg-white size-full p-[20px] rounded-[26px]">
          <div className="mb-6 flex items-center justify-between gap-5">
            <div>
              <h1 className="text-[18px] text-black font-medium">Sửa bệnh án</h1>
            </div>

            <div className="border-borderColor border px-3 py-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
              <Link to={'/medical-record'} className="text-dark font-medium flex items-center gap-3">
                <List className="text-primaryAdmin" />
                Danh sách bệnh án
              </Link>
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
                          className="scroll-select block w-full p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px] t !font-normal !text-dark  bg-white "
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
                          className="scroll-select block w-full p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px] t !font-normal !text-dark  bg-white "
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
                <Field className="flex gap-3 flex-col">
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
                            <div
                              onClick={() => {
                                setSelectServiceId(prev => prev.filter(id => id !== service.id));
                                setServiceDelete(prev => [...prev, service.id]);
                              }}
                            >
                              <RemoveCircleOutline className="w-5 h-5 text-gray-400 hover:text-red-500" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Field>
                <Field>
                  <Button
                    onClick={() => {
                      localStorage.setItem('idMedical', JSON.stringify(id));
                    }}
                    styled="normal"
                    type="button"
                    className="w-full bg-[#F3F4F7] border border-borderColor"
                  >
                    <Link to={'/prescriptions'} className="text-black">
                      Tạo đơn thuốc cho bệnh án
                    </Link>
                  </Button>
                </Field>
              </div>
            </div>
            <UploadFiles
              handleRemoveFilesOld={handleRemoveFilesOld}
              setInitData={setInitFiles}
              initData={initFiles}
              ref={uploadFilesRef}
              handleChangeDescriptionOld={handleChangeDescriptionOld}
            />
            <div className="flex gap-3 justify-end mt-5">
              <Button
                type="button"
                onClick={() => setModalStatus(true)}
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
        <ModalConfirm
          isLoading={isSubmitting}
          disabled={isSubmitting}
          submit={handleSubmitForm}
          isClose={handleClose}
          isOpen={modalStatus}
          title="Cập nhập bệnh án"
          description="Bạn có chắc muốn cập nhập hồ sơ bệnh án ? Các thông tin cũ sẽ mất vỉnh viễn và không được khôi phục lại! "
          className="bg-primaryAdmin hover:bg-primaryAdmin/50"
        />
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
    </>
  );
};

export default EditMedicalHistories;
