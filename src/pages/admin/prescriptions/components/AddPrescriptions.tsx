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
import { IMedications } from '@/types/prescription.type';
import ModalMedication from '@/components/modal/ModalMedication';
import convertToOptions from '@/helpers/convertToOptions';
import DirectRoute from '@/components/direct';
import { toast } from 'react-toastify';

const patientsOptions = [
  {
    label: 'Nguyễn Văn A',
    value: '1',
  },
  {
    label: 'Trần Thị B',
    value: '2',
  },
  {
    label: 'Lê Văn C',
    value: '3',
  },
  {
    label: 'Phạm Thị D',
    value: '4',
  },
  {
    label: 'Nguyễn Văn E',
    value: '5',
  },
  {
    label: 'Trần Văn F',
    value: '6',
  },
  {
    label: 'Lê Thị G',
    value: '7',
  },
];

interface AddPrescripton {
  navigate: () => void;
}

const AddPrescriptions = ({ navigate }: AddPrescripton) => {
  const [medicationCategory, setMedicationCategory] = useState([]);
  const [medications, setMedications] = useState<IMedications[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    form: {
      control,
      reset,
      formState: { isSubmitting },
      handleSubmit,
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
      const res = await getMedication(selectedCategoryId);
      setMedications(res.data);
    })();
  }, [selectedCategoryId]);

  const handleCreateMedication: SubmitHandler<any> = async data => {
    // if (!isValid) return;
    const newPrescription = {
      patient_id: data.patient_id,
      user_id: 'c3456789-e89b-12d3-a456-426614174002',
      name: data.name,
      description: data.description,
      medications: data.medications,
    };
    await createPrescription(newPrescription);
    toast.success('Tạo đơn thuốc thành công !');
  };

  const handleResetForm = () => reset();

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
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
                </Field>
                <div className="min-w-[400px] w-1/2">
                  <Label>Tên bệnh nhân</Label>
                  <Select
                    placeholder="Bệnh nhân chỉ định"
                    name="patient_id"
                    control={control}
                    options={patientsOptions}
                  />
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
    </div>
  );
};

export default AddPrescriptions;
