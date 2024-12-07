import { List, PersonRemoveIcon } from '@/components/icons';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import { Controller, SubmitHandler, useWatch } from 'react-hook-form';
import { Button } from '@/components/button';
import Select from '@/components/select';
import { createPrescription, getCategoryMedication, getMedication } from '@/services/prescriptions.service';
import { useEffect, useState } from 'react';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { IMedications } from '@/types/prescription.type';
import convertToOptions from '@/helpers/convertToOptions';
import DirectRoute from '@/components/direct';
import { toast } from 'react-toastify';
import MessageForm from '@/components/message';
import renderMessageError from '@/helpers/renderMessageErrror';
import { Stack } from '@mui/material';
import { ModalMedicalHistories, ModalMedication } from '@/components/modal';
import useToggle from '@/hooks/useToggle';
import { MedicalRecord } from '@/types/medicalHistories.type';

interface AddPrescripton {
  navigate: () => void;
}

const AddPrescriptions = ({ navigate }: AddPrescripton) => {
  const [medicationCategory, setMedicationCategory] = useState([]);
  const [medications, setMedications] = useState<IMedications[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const { show: isMedicalHistories, handleToggle } = useToggle();

  const {
    form: {
      control,
      reset,
      formState: { isSubmitting, errors, isValid },
      handleSubmit,
      setValue,
    },
    medicalRecord,
    setMedicalRecord,
  } = usePrescriptionContextForm();
  console.log('🚀 ~ AddPrescriptions ~ medicalRecord:', medicalRecord);

  const selectedCategoryId = useWatch({
    control,
    name: 'isCategory',
  }) as string;

  useEffect(() => {
    (async () => {
      const res = await getCategoryMedication();
      const data = convertToOptions(res.data);
      setMedicationCategory(data);
    })();
  }, []);

  useEffect(() => {
    if (!selectedCategoryId) return;
    (async () => {
      try {
        setLoading(true);
        const res = await getMedication(selectedCategoryId);
        setMedications(res.data);
      } catch (error: any) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedCategoryId]);

  const handleCreateMedication: SubmitHandler<any> = async data => {
    if (!isValid) return;
    const newPrescription = {
      patient_id: data.patient_id,
      user_id: '281a55be-1aa1-4c82-8712-7d76ea7d0ae8',
      name: data.name,
      description: data.description,
      medications: data.medications,
      medical_histories_id: data.medical_histories_id,
    };

    const res = await createPrescription(newPrescription);
    if (res.success === false) {
      return toast.error(renderMessageError(res.errors));
    }
    handleResetForm();
    setMedicalRecord({} as MedicalRecord);
    toast.success('Tạo đơn thuốc thành công !');
    navigate();
  };

  const handleResetForm = () => {
    reset({
      patient_id: '',
      user_id: '',
      description: '',
      name: '',
      medications: undefined,
      isCategory: '',
      medical_histories_id: undefined,
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setValue('isCategory', '');
    setValue('medications', undefined);
  };

  const removeTargetMedicalRecord = () => {
    setMedicalRecord({} as MedicalRecord);
    setValue('medical_histories_id', '');
    setValue('patient_id', '');
  };

  return (
    <>
      <DirectRoute nav="Quản lý đơn thuốc" subnav="Đơn thuốc" targetnav="Tạo đơn thuốc" />
      <div className="flex bg-white size-full p-[20px] rounded-[26px]">
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-[18px] text-black font-medium">Tạo đơn thuốc</h1>
            <div className="border-borderColor border px-3 py-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
              <button onClick={navigate} className="text-dark font-medium flex items-center gap-3">
                <List className="text-primaryAdmin" />
                Danh sách đơn thuốc
              </button>
            </div>
          </div>
          <div>
            <form className="mb-3 w-full relative" onSubmit={handleSubmit(handleCreateMedication)}>
              <div className="flex gap-7 mb-3">
                <Field>
                  <Label htmlFor="name">Tên đơn thuốc</Label>
                  <Input
                    name="name"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Nhập tên đơn thuốc ..."
                    control={control}
                  />
                  <MessageForm error={errors.name?.message} />
                </Field>
                <div className="min-w-[400px] relative">
                  <Label>Bệnh án</Label>
                  {medicalRecord.id ? (
                    <>
                      <Button
                        className="text-[13px] h-[42px] w-full bg-[#F3F4F7] cursor-default"
                        type="button"
                        styled="normal"
                      >
                        Bệnh nhân <span className="ml-1 text-primaryAdmin/70">{medicalRecord.patient.fullname}</span>
                      </Button>
                      <div
                        className="absolute top-0 right-0 cursor-pointer text-red-500 transition-all hover:text-red-300"
                        onClick={removeTargetMedicalRecord}
                      >
                        <PersonRemoveIcon className="text-xl" />
                      </div>
                    </>
                  ) : (
                    <Button
                      className="text-black h-[42px] w-full bg-[#F3F4F7]"
                      type="button"
                      styled="normal"
                      onClick={handleToggle}
                    >
                      Chọn bệnh án
                    </Button>
                  )}
                  {Object.keys(medicalRecord).length <= 0 && (
                    <MessageForm error={errors.medical_histories_id?.message} />
                  )}
                </div>
                <div className="min-w-[400px]">
                  <Label htmlFor="categoryId">Danh mục thuốc</Label>
                  <Select
                    placeholder="Đơn thuốc chỉ định"
                    name="isCategory"
                    control={control}
                    options={medicationCategory}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                  <MessageForm error={errors.isCategory?.message} />
                </div>
              </div>
              <Stack direction="row" gap={'20px'}>
                <div className="mb-7 flex-1">
                  <Label htmlFor="description">Lời dặn</Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => {
                      return (
                        <textarea
                          className="block w-full p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px]"
                          placeholder="Nhập lời dặn ..."
                          id="description"
                          {...field}
                        ></textarea>
                      );
                    }}
                  />
                </div>
                <div></div>
              </Stack>

              <div className="flex items-center gap-7 w-1/4 justify-end ml-auto pt-3">
                <Button
                  type="submit"
                  styled="normal"
                  className="bg-primaryAdmin text-white disabled:bg-primaryAdmin/50"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Tạo đơn
                </Button>
                <Button type="button" styled="normal" onClick={handleResetForm}>
                  Nhập lại
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ModalMedication
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
        medications={medications}
        medicationCategory={medicationCategory}
        loading={loading}
        setIsDialogOpen={setIsDialogOpen}
      />

      <ModalMedicalHistories open={isMedicalHistories} onClose={handleToggle} />
    </>
  );
};

export default AddPrescriptions;
