import { List } from '@/components/icons';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import { SubmitHandler, useWatch } from 'react-hook-form';
import { Button } from '@/components/button';
import Select from '@/components/select';
import { getCategoriMedication, getMedication } from '@/services/prescriptions.service';
import { useEffect, useState } from 'react';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { IMedications, IPrescription } from '@/types/prescription.type';
import ModalMedication from '@/components/modal/ModalMedication';
import convertToOptions from '@/helpers/convertToOptions';
import DirectRoute from '@/components/direct';

const patientsOptions = [
  {
    label: 'Nguyễn Văn A',
    value: 1,
  },
  {
    label: 'Trần Thị B',
    value: 2,
  },
  {
    label: 'Lê Văn C',
    value: 3,
  },
  {
    id: '1',
    label: 'Phạm Thị D',
    value: 4,
  },
  {
    id: '1',
    label: 'Nguyễn Văn E',
    value: 5,
  },
  {
    id: '1',
    label: 'Trần Văn F',
    value: 6,
  },
  {
    id: '1',
    label: 'Lê Thị G',
    value: 7,
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
      formState: { isSubmitting, isValid },
      handleSubmit,
      // getValues,
    },
  } = usePrescriptionContextForm();

  const selectedCategoryId = useWatch({
    control,
    name: 'isCategory',
  });

  useEffect(() => {
    (async () => {
      const res = await getCategoriMedication();
      const data = convertToOptions(res.data);
      setMedicationCategory(data);
    })();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      (async () => {
        const res = await getMedication(selectedCategoryId);
        setMedications(res.data);
      })();
    }
  }, [selectedCategoryId]);

  const handleCreateMedication: SubmitHandler<IPrescription> = async data => {
    if (!isValid) return;
    console.log(data);
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
                <textarea
                  dirName="description"
                  className="block w-full p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px]"
                  name="description"
                  placeholder="Nhập lời dặn ..."
                  id="description"
                ></textarea>
              </div>

              <div className="flex items-center gap-7 w-1/4 justify-end ml-auto pt-3">
                <Button
                  type="submit"
                  styled="normal"
                  className="bg-primaryAdmin text-white disabled:bg-primaryAdmin/50"
                  isLoading={isSubmitting}
                  disabled={!isValid || isSubmitting}
                >
                  Xác nhận
                </Button>
                <Button
                  type="submit"
                  styled="normal"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={handleResetForm}
                >
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
