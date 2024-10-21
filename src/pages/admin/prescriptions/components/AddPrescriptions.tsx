import { ChevronRightIcon, List } from '@/components/icons';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useWatch, useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import Select from '@/components/select';
import { IPrescription } from '@/types/prescription.type';
import { createPrescription } from '@/services/prescriptions.service';
import { useState } from 'react';
import Tablet from './Tablet';

const categories = [
  { value: 1, label: 'Stomach Medicine' },
  { value: 2, label: 'Cold Medicine' },
  { value: 3, label: 'Pain Relief' },
  { value: 4, label: 'Antibiotics' }
];

const medicines = [
  { id: 1, name: 'Omeprazole', instructions: '', quantity: 10, unit: 'Viên', categoryId: 1 },
  { id: 2, name: 'Ranitidine', instructions: '', quantity: 10, unit: 'Viên', categoryId: 1 },
  { id: 3, name: 'Esomeprazole', instructions: '', quantity: 10, unit: 'Viên', categoryId: 1 },
  { id: 4, name: 'Lansoprazole', instructions: '', quantity: 10, unit: 'Viên', categoryId: 1 },
  { id: 5, name: 'Pantoprazole', instructions: '', quantity: 10, unit: 'Viên', categoryId: 1 },
  { id: 6, name: 'Paracetamol', instructions: '', quantity: 10, unit: 'Viên', categoryId: 2 },
  { id: 7, name: 'Ibuprofen', instructions: '', quantity: 10, unit: 'Viên', categoryId: 2 },
  { id: 8, name: 'Cough Syrup', instructions: '', quantity: 10, unit: 'Viên', categoryId: 2 },
  { id: 9, name: 'Pseudoephedrine', instructions: '', quantity: 10, unit: 'Viên', categoryId: 2 },
  { id: 10, name: 'Phenylephrine', instructions: '', quantity: 10, unit: 'Viên', categoryId: 2 },
  { id: 11, name: 'Aspirin', instructions: '', quantity: 10, unit: 'Viên', categoryId: 3 },
  { id: 12, name: 'Acetaminophen', instructions: '', quantity: 10, unit: 'Viên', categoryId: 3 },
  { id: 13, name: 'Morphine', instructions: '', quantity: 10, unit: 'Viên', categoryId: 3 },
  { id: 14, name: 'Ibuprofen', instructions: '', quantity: 10, unit: 'Viên', categoryId: 3 },
  { id: 15, name: 'Naproxen', instructions: '', quantity: 10, unit: 'Viên', categoryId: 3 },
  { id: 16, name: 'Amoxicillin', instructions: '', quantity: 10, unit: 'Viên', categoryId: 4 },
  { id: 17, name: 'Azithromycin', instructions: '', quantity: 10, unit: 'Viên', categoryId: 4 },
  { id: 18, name: 'Ciprofloxacin', instructions: '', quantity: 10, unit: 'Viên', categoryId: 4 },
  { id: 19, name: 'Doxycycline', instructions: '', quantity: 10, unit: 'Viên', categoryId: 4 },
  { id: 20, name: 'Cephalexin', instructions: '', quantity: 10, unit: 'Viên', categoryId: 4 }
];

const patientsOptions = [
  {
    label: 'Nguyễn Văn A',
    value: 1
  },
  {
    label: 'Trần Thị B',
    value: 2
  },
  {
    label: 'Lê Văn C',
    value: 3
  },
  {
    id: '1',
    label: 'Phạm Thị D',
    value: 4
  },
  {
    id: '1',
    label: 'Nguyễn Văn E',
    value: 5
  },
  {
    id: '1',
    label: 'Trần Văn F',
    value: 6
  },
  {
    id: '1',
    label: 'Lê Thị G',
    value: 7
  }
];

const schema = yup.object({
  patient_id: yup.number().required('Trường này là bắt buộc !'),
  categoryId: yup.number().required('Trường này là bắt buộc !'),
  duration: yup.number().required('Trường này là bắt buộc !'),
  name: yup.string().trim().required('Trường này là bắt buộc !'),
  advice: yup.string().trim()
});

interface AddPrescripton {
  navigate: () => void;
}

const AddPrescriptions = ({ navigate }: AddPrescripton) => {
  const [selectedMedicines, setSelectedMedicines] = useState<number[]>([]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
    reset,
    register
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const selectedCategory = useWatch({
    control,
    name: 'categoryId'
  });

  const filteredMedicines = medicines.filter(med => med.categoryId === Number(selectedCategory));

  const handleMedicineSelect = (id: number) => {
    setSelectedMedicines(prev => (prev.includes(id) ? prev.filter(medId => medId !== id) : [...prev, id]));
  };

  const handleCreateTablet: SubmitHandler<IPrescription> = async data => {
    if (!isValid) return;
    const { categoryId, ...dataPrescription } = data;

    const prescriptionData: IPrescription = {
      ...dataPrescription,
      user_id: 1, // Hoặc lấy từ thông tin người dùng thực tế
      medicines: selectedMedicines, // Mảng thuốc đã chọn
      categoryId // Duy trì categoryId để gửi đi
    };

    console.log(prescriptionData);

    // await createPrescription(prescriptionData);
  };

  const handleReset = () => reset();

  return (
    <div>
      <div className="text-primaryAdmin flex items-center text-base mb-10">
        <h2>Quản lý đơn thuốc</h2>
        <ChevronRightIcon fontSize="small" className="mx-2" />
        <span className="text-primaryAdmin">Đơn thuốc</span>
        <ChevronRightIcon fontSize="small" className="mx-2" />
        <span className="text-primaryAdmin/60">Thêm đơn thuốc</span>
      </div>
      <div className="flex bg-white size-full p-[20px] rounded-[26px]">
        <div className="flex-1">
          <div className="mb-6 flex justify-between">
            <h1 className="text-[18px] text-black font-medium">Thêm đơn thuốc</h1>
            <div className="border-borderColor border p-3 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
              <button onClick={navigate} className="text-dark font-medium flex items-center gap-3">
                <List className="text-primaryAdmin" />
                Danh sách đơn thuốc
              </button>
            </div>
          </div>
          <div>
            <form className="mb-3 w-full relative" onSubmit={handleSubmit(handleCreateTablet)}>
              <div className="flex gap-7 mb-3">
                <Field>
                  <Label htmlFor="name"> Tên đơn thuốc </Label>
                  <Input
                    name="name"
                    type="text"
                    className="h-[48px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Nhập tên đơn thuốc ..."
                    control={control}
                  />
                </Field>
                <Field>
                  <Label htmlFor="duration"> Số ngày sử dụng</Label>
                  <Input
                    name="duration"
                    type="text"
                    className="h-[48px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Nhập số lượng ..."
                    control={control}
                  />
                </Field>
              </div>
              <div className="flex gap-7 mb-7">
                <div className="min-w-[400px] w-1/2">
                  <Label htmlFor="categoryId">Danh mục thuốc</Label>
                  <Select placeholder="Đơn thuốc chỉ định" name="categoryId" control={control} options={categories} />
                </div>
                <div className="min-w-[400px] w-1/2">
                  <Label htmlFor="patient_id">Tên bệnh nhân</Label>
                  <Select
                    placeholder="Bệnh nhân chỉ định"
                    name="patient_id"
                    control={control}
                    options={patientsOptions}
                  />
                </div>
              </div>
              <div className="flex gap-7 mb-7 flex-col">
                <Label htmlFor="name">Danh mục thuốc</Label>
                {filteredMedicines.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {filteredMedicines.map(med => (
                      <Tablet
                        key={med.id}
                        checked={selectedMedicines.includes(med.id)}
                        onChange={() => handleMedicineSelect(med.id)}
                        tablet={med}
                        value={med.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center">Vui lòng chọn danh mục thuốc</div>
                )}
              </div>

              <div className="flex flex-col mb-7">
                <Label htmlFor="advice">Lời dặn</Label>
                <textarea
                  {...register('advice')}
                  className="p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px]"
                  name="advice"
                  placeholder="Nhập lời dặn ..."
                  id="advice"
                ></textarea>
              </div>

              <div className="flex items-center gap-7 w-1/4 justify-end ml-auto pt-3">
                <Button
                  type="submit"
                  styled="normal"
                  className="bg-primaryAdmin text-white"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Xác nhận
                </Button>
                <Button
                  type="submit"
                  styled="normal"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={handleReset}
                >
                  Nhập lại
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrescriptions;
