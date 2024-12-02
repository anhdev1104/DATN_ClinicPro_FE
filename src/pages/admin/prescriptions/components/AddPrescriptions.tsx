import { List } from '@/components/icons';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import { Controller, SubmitHandler, useWatch } from 'react-hook-form';
import { Button } from '@/components/button';
import Select from '@/components/select';
import { createPrescription, getCategoryMedication, getMedication } from '@/services/prescriptions.service';
import { useEffect, useState } from 'react';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { IMedications, IPrescription } from '@/types/prescription.type';
import ModalMedication from '@/components/modal/ModalMedication';
import convertToOptions from '@/helpers/convertToOptions';
import DirectRoute from '@/components/direct';
import { toast } from 'react-toastify';
import FormPatient from '../../medical_histories/components/FormPatient';
import { IPatientSelect } from '../../medical_histories/components/AddMedicalHistories';
import MessageForm from '@/components/message';

interface AddPrescripton {
  navigate: () => void;
}

const AddPrescriptions = ({ navigate }: AddPrescripton) => {
  const [medicationCategory, setMedicationCategory] = useState([]);
  const [medications, setMedications] = useState<IMedications[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectPatient, setSelectPatient] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<IPatientSelect | null>(null);

  const {
    form: {
      control,
      reset,
      formState: { isSubmitting, errors },
      handleSubmit,
    },
  } = usePrescriptionContextForm();
  console.log('🚀 ~ AddPrescriptions ~ errors:', errors);

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
      const res = await getMedication(selectedCategoryId);
      setMedications(res.data);
    })();
  }, [selectedCategoryId]);

  const handleCreateMedication: SubmitHandler<any> = async data => {
    console.log('🚀 ~ AddPrescriptions ~ data:', data);
    // if (!isValid) return;
    const newPrescription = {
      patient_id: data.patient_id,
      user_id: '3119acf9-b33c-4de6-9b51-0275be8ea689',
      name: data.name,
      description: data.description,
      medications: data.medications,
    };
    const data1 = await createPrescription({
      medication_id: '828d04ca-111d-49ee-8043-611648cb5f65',
      ...newPrescription,
    } as IPrescription);
    console.log(data1);

    toast.success('Tạo đơn thuốc thành công !');
    handleResetForm();
  };

  const handleResetForm = () =>
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

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSelectedPatientId = (id: string | null, name: string | null) => {
    setSelectedPatientId({
      id,
      name,
    });
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
                <div className="min-w-[400px] w-1/2">
                  <Label>Tên bệnh nhân</Label>
                  <Button
                    onClick={() => setSelectPatient(true)}
                    className="text-black h-[42px] w-full bg-[#F3F4F7]"
                    type="button"
                    styled="normal"
                  >
                    Chọn bệnh nhân
                  </Button>
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
                  <MessageForm error={errors.medications?.message} />
                </div>
              </div>

              <div className="mb-7">
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

              <div className="flex items-center gap-7 w-1/4 justify-end ml-auto pt-3">
                <Button
                  type="submit"
                  styled="normal"
                  className="bg-primaryAdmin text-white disabled:bg-primaryAdmin/50"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Xác nhận
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
