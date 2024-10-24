/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRightIcon, List, SearchIcon } from '@/components/icons';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/button';
import Select from '@/components/select';
import { IPrescription } from '@/types/prescription.type';
import { getCategoriMedication, getMedication } from '@/services/prescriptions.service';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Medication from './Medication';

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
  patient_id: yup.string().trim().required('Trường này là bắt buộc !'),
  name: yup.string().trim().required('Trường này là bắt buộc !'),
  description: yup.string().trim(),
  categoryId: yup.string().required('Chọn danh mục thuốc!'),
  user_id: yup.string()
});

interface AddPrescripton {
  navigate: () => void;
}

const AddPrescriptions = ({ navigate }: AddPrescripton) => {
  const [medicationCategori, setMedicationCategori] = useState([]); // Lưu danh mục thuốc
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái của Dialog
  const [medications, setMedications] = useState([]); // Lưu thông tin thuốc được fetch

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

  const selectedCategoryId = useWatch({
    control,
    name: 'categoryId'
  });

  const convertToOptions = (data: any) => {
    return data.map((item: any) => ({
      value: item.id,
      label: item.name
    }));
  };

  // Fetch danh mục thuốc khi component mount
  useEffect(() => {
    const getCategori = async () => {
      const res = await getCategoriMedication();
      setMedicationCategori(convertToOptions(res.data));
    };

    getCategori();
  }, []);

  // Fetch thông tin thuốc khi thay đổi danh mục được chọn
  useEffect(() => {
    if (selectedCategoryId) {
      console.log('Selected category ID:', selectedCategoryId);
      const getMedications = async (selectedCategoryId: string) => {
        const res = await getMedication(selectedCategoryId);
        console.log(res);

        setMedications(res.data); // Cập nhật thông tin thuốc
        setIsDialogOpen(true); // Mở dialog sau khi fetch xong
      };

      getMedications(String(selectedCategoryId));
    }
  }, [selectedCategoryId]);

  const handleCreateMedication: SubmitHandler<IPrescription> = async data => {
    if (!isValid) return;
    const { categoryId, ...formData } = data;

    console.log('Category ID:', categoryId);
    console.log('Form Data:', formData);
  };

  const handleReset = () => reset();

  // Hàm để đóng dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

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
            <form className="mb-3 w-full relative" onSubmit={handleSubmit(handleCreateMedication)}>
              <div className="flex gap-7 mb-3">
                <Field>
                  <Label htmlFor="name">Tên đơn thuốc</Label>
                  <Input
                    name="name"
                    type="text"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Nhập tên đơn thuốc ..."
                    control={control}
                  />
                </Field>
                <div className="min-w-[400px] w-1/2">
                  <Label htmlFor="patient_id">Tên bệnh nhân</Label>
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
                    name="categoryId"
                    control={control}
                    options={medicationCategori}
                  />
                </div>
              </div>

              <div className="flex flex-col mb-7">
                <Label htmlFor="description">Lời dặn</Label>
                <textarea
                  {...register('description')}
                  className="p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px]"
                  name="description"
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

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: '#fff',
            padding: '20px', // Giảm padding để có thêm không gian
            width: '1000px',
            height: '800px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 'none'
          }
        }}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      >
        <div className="flex justify-between items-end mb-6">
          <div className="flex justify-center items-start flex-col gap-2">
            <Label htmlFor="categoryId">Danh mục thuốc</Label>
            <Select placeholder="Đơn thuốc chỉ định" name="categoryId" control={control} options={medicationCategori} />
          </div>
          <div className="flex-[0_0_50%] flex justify-end items-center gap-3">
            <Input
              colorGlass="text-primaryAdmin"
              className="placeholder:text-[14px] text-[14px] text-primaryAdmin h-[40px]"
              control={control}
              name="search"
              placeholder="Tìm thuốc ..."
              isGlass
            />
            <button
              type="submit"
              className={`w-[53px] h-[40px] flex items-center justify-center bg-primaryAdmin rounded-[9px] transition-all duration-300 ease-linear`}
            >
              <SearchIcon className="text-white" />
            </button>
          </div>
        </div>

        <div>
          {medications.length > 0 ? (
            <ul className="space-y-2">
              {medications.map((medication: any) => (
                <Medication key={medication.id} name={medication.name} id={medication.id} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">Không có thuốc nào cho danh mục này.</p>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default AddPrescriptions;
