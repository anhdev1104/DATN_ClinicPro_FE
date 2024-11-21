import { Button } from '@/components/button';
import DirectRoute from '@/components/direct';
import Field from '@/components/field';
import { List } from '@/components/icons';
import Input from '@/components/input';
import Label from '@/components/label';
import { Controller, useForm } from 'react-hook-form';
import UploadFiles from './UploadFiles';
import { useEffect, useRef, useState } from 'react';
import yup from '@/helpers/locate';
import { yupResolver } from '@hookform/resolvers/yup';
import { uploadImages } from '@/services/uploadFile';
import { getDetailMedicalHistorie, updateMedicalHistorie } from '@/services/medicalHistories.service';
import { Link, useParams } from 'react-router-dom';
import { FileMidecal, MedicalRecord } from '@/types/medicalHistories.type';
import FormPatient from './FormPatient';
import { toast } from 'react-toastify';
import { ModalConfirm } from '@/components/modal';

interface ImageWithDescription {
  file: File | string;
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

  const { id } = useParams();

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
  const handleRemoveFilesOld = (url: string, id: string) => {
    const updatedFiles = initFiles?.filter(file => file.file !== url);
    const deleteId = [...filesDelete, id];
    setFilesDelete(deleteId);
    setInitFiles(updatedFiles);
  };
  // Xử lý data Ảnh đã có
  const handleChangeDescriptionOld = (fileUrl: string, newDescription: string) => {
    const updatedFiles = initFiles?.map(file =>
      file.file === fileUrl ? { ...file, description: newDescription } : file,
    );
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

        reset({
          diagnosis: data.diagnosis,
          description: data.description,
          treatment: data.treatment,
        });
      } catch (error) {
        toast.error('Lỗi khi lấy dữ liệu bệnh án:', error ? error : '');
      }
    })();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    const imagesNew = uploadFilesRef?.current?.getFiles() || [];
    let newImages = [];
    if (imagesNew.length > 0) {
      const formData = new FormData();
      imagesNew?.forEach((img: ImageWithDescription) => {
        formData.append('images[]', img.file);
      });

      const res = await uploadImages(formData);
      const imagesWithDescriptions = res.urls.map((url: string, index: any) => ({
        file: url,
        description: imagesNew[index]?.description || '',
      }));

      newImages = [...imagesWithDescriptions, ...initFiles];
    } else {
      newImages = [...initFiles];
    }

    try {
      const finalData = {
        ...data,
        patient_id: selectedPatientId?.id,
        user_id: '8a9c264e-d283-4550-a14c-cf932199f2dc',
        files: [...newImages],
        file_deletes: [...filesDelete],
      };

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

  return (
    <div>
      <DirectRoute nav="Quản lý bệnh án" subnav="Bệnh án" targetnav="Tạo bệnh án" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 flex items-center justify-start gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Sửa bệnh án</h1>
          </div>
          <Link
            to={'/dashboard/medical-histories'}
            className="text-[18px] font-medium gap-3 border-borderColor border p-2 rounded-lg bg-[#f3f4f7]"
          >
            <List className="text-primaryAdmin" />
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
          <div className="flex w-full gap-10 mb-5">
            <div className="w-1/2">
              <Field className="flex gap-3 flex-col">
                <Label htmlFor="diagnosis">Bệnh chấn đoán:</Label>
                <Input
                  className="h-[48px]"
                  placeholder="Chẩn đoán ..."
                  name="diagnosis"
                  type="text"
                  control={control}
                />
              </Field>
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
                      className="text-black mt-2"
                      type="button"
                      styled="normal"
                    >
                      Thay đổi bệnh nhân
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setSelectPatient(true)}
                    className="text-black h-[48px]"
                    type="button"
                    styled="normal"
                  >
                    Chọn bệnh nhân
                  </Button>
                )}
              </Field>
            </div>
            <div className="w-1/2">
              <Field className="flex gap-3 flex-col">
                <Label htmlFor="treatment">Phương pháp điều trị:</Label>
                <Controller
                  name="treatment"
                  control={control}
                  render={({ field }) => {
                    return (
                      <textarea
                        className="block w-full p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px]"
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
                        className="block w-full p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px]"
                        placeholder="Mô tả bệnh án ..."
                        id="description"
                        {...field}
                      ></textarea>
                    );
                  }}
                />
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
          <div className="flex gap-3 justify-end">
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
      />
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

export default EditMedicalHistories;
