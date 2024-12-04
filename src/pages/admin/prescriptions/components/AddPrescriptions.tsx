import { ChangeCircleIcon, List } from '@/components/icons';
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
import ModalMedication from '@/components/modal/ModalMedication';
import convertToOptions from '@/helpers/convertToOptions';
import DirectRoute from '@/components/direct';
import { toast } from 'react-toastify';
import FormPatient from '../../medical_histories/components/FormPatient';
import { IPatientSelect } from '../../medical_histories/components/AddMedicalHistories';
import MessageForm from '@/components/message';
import renderMessageError from '@/helpers/renderMessageErrror';
import { Stack } from '@mui/material';

interface AddPrescripton {
  navigate: () => void;
}

const AddPrescriptions = ({ navigate }: AddPrescripton) => {
  const [medicationCategory, setMedicationCategory] = useState([]);
  const [medications, setMedications] = useState<IMedications[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectPatient, setSelectPatient] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<IPatientSelect | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    form: {
      control,
      reset,
      formState: { isSubmitting, errors, isValid },
      handleSubmit,
      setValue,
    },
  } = usePrescriptionContextForm();

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
      medical_history_id: '',
    };

    const res = await createPrescription(newPrescription);
    if (res.success === false) {
      return toast.error(renderMessageError(res.errors));
    }
    toast.success('Tạo đơn thuốc thành công !');
    // handleResetForm();
  };

  const handleResetForm = () => {
    reset({
      patient_id: '',
      user_id: '',
      description: '',
      name: '',
      medications: [
        {
          instructions: '',
          quantity: undefined,
          duration: undefined,
          medication_id: '',
        },
      ],
      isCategory: '',
    });
    setSelectedPatientId(null);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setValue('isCategory', '');
    setValue('medications', undefined);
  };

  const handleSelectedPatientId = (id: string | null, name: string | null) => {
    setSelectedPatientId({
      id,
      name,
    });
  };

  useEffect(() => {
    if (selectedPatientId) {
      selectedPatientId.id && setValue('patient_id', selectedPatientId.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatientId]);

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
                <div className="min-w-[400px] w-1/2 relative">
                  <Label>Tên bệnh nhân</Label>
                  {selectedPatientId ? (
                    <>
                      <div
                        className="absolute right-0 -top-1 cursor-pointer text-primaryAdmin"
                        onClick={() => setSelectPatient(true)}
                        title="Thay đổi bệnh nhân"
                      >
                        <ChangeCircleIcon className="font-bold" />
                      </div>
                      <div className="text-black h-[42px] w-full bg-white border flex justify-center items-center rounded-md">
                        {selectedPatientId.name}
                      </div>
                    </>
                  ) : (
                    <Button
                      onClick={() => setSelectPatient(true)}
                      className="text-black h-[42px] w-full bg-[#F3F4F7]"
                      type="button"
                      styled="normal"
                    >
                      Chọn bệnh nhân
                    </Button>
                  )}
                  {!selectedPatientId && <MessageForm error={errors.patient_id?.message} />}
                </div>
                <div className="min-w-[400px] w-1/2">
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
                <div className="w-2/5">
                  <Label htmlFor="description">Bệnh án</Label>
                  <Button className="text-black h-[42px] w-full bg-[#F3F4F7]" type="button" styled="normal">
                    Chọn bệnh án
                  </Button>
                  <MessageForm error={errors.medical_history_id?.message} />
                </div>
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

      {selectPatient && (
        <FormPatient
          onSelectPatient={handleSelectedPatientId}
          isDialogOpen={selectPatient}
          handleCloseDialog={() => setSelectPatient(false)}
          selectedPatientId={selectedPatientId?.id}
        />
      )}
    </>
  );
};

export default AddPrescriptions;
