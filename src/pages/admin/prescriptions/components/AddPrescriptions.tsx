import { ChevronRightIcon, List } from '@/components/icons';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import Select from '@/components/select';

const TabletOptions = [
  {
    value: 'Thuốc Pymenospain Pymepharco chống co thắt dạ dày - ruột (200 viên)',
    label: 'Thuốc Pymenospain Pymepharco chống co thắt dạ dày - ruột (200 viên)'
  },
  {
    value: 'Viên sủi Efferalgan 500mg UPSA SAS giảm đau, hạ sốt (4 vỉ x 4 viên)',
    label: 'Viên sủi Efferalgan 500mg UPSA SAS giảm đau, hạ sốt (4 vỉ x 4 viên)'
  },
  {
    value: 'Thuốc bột pha hỗn dịch uống Smecta vị cam điều trị tiêu chảy (30 gói x 3g)',
    label: 'Thuốc bột pha hỗn dịch uống Smecta vị cam điều trị tiêu chảy (30 gói x 3g)'
  },
  {
    value: 'Viên sủi Berocca Bayer bổ sung vitamin và khoáng chất (10 viên)',
    label: 'Viên sủi Berocca Bayer bổ sung vitamin và khoáng chất (10 viên)'
  },
  {
    value: 'Men vi sinh Enterogermina 2 tỷ/5ml điều trị rối loạn tiêu hóa (2 vỉ x 10 ống)',
    label: 'Men vi sinh Enterogermina 2 tỷ/5ml điều trị rối loạn tiêu hóa (2 vỉ x 10 ống)'
  },
  {
    value: 'Thuốc Eugica MEGA We care điều trị ho đờm, cảm cúm, sổ mũi (10 vỉ x 10 viên)',
    label: 'Thuốc Eugica MEGA We care điều trị ho đờm, cảm cúm, sổ mũi (10 vỉ x 10 viên)'
  },
  {
    value: 'Thuốc Clorpheniramin 4 DHG điều trị viêm mũi dị ứng, chảy nước mũi (10 vỉ x 20 viên)',
    label: 'Thuốc Clorpheniramin 4 DHG điều trị viêm mũi dị ứng, chảy nước mũi (10 vỉ x 20 viên)'
  },
  {
    value: 'Gel bôi da Klenzit MS điều trị mụn trứng cá (15g)',
    label: 'Gel bôi da Klenzit MS điều trị mụn trứng cá (15g)'
  },
  {
    value: 'Viên nhai Kremil-S United điều trị đau dạ dày, giảm nóng rát dạ dày, ợ nóng, ợ chua (10 vỉ x 10 viên)',
    label: 'Viên nhai Kremil-S United điều trị đau dạ dày, giảm nóng rát dạ dày, ợ nóng, ợ chua (10 vỉ x 10 viên)'
  },
  {
    value: 'Thuốc Telfast HD 180mg Sanofi điều trị viêm mũi dị ứng, mày đay (1 vỉ x 10 viên)',
    label: 'Thuốc Telfast HD 180mg Sanofi điều trị viêm mũi dị ứng, mày đay (1 vỉ x 10 viên)'
  },
  {
    value: 'Thuốc Farzincol Pharmedic điều trị thiếu kẽm (10 vỉ x 10 viên)',
    label: 'Thuốc Farzincol Pharmedic điều trị thiếu kẽm (10 vỉ x 10 viên)'
  },
  {
    value: 'Kem Differin Galderma điều trị mụn trứng cá (30g)',
    label: 'Kem Differin Galderma điều trị mụn trứng cá (30g)'
  }
];

const PatientsOptions = [
  {
    value: 'Nguyễn Văn A',
    label: 'Nguyễn Văn A'
  },
  {
    value: 'Trần Thị B',
    label: 'Trần Thị B'
  },
  {
    value: 'Lê Văn C',
    label: 'Lê Văn C'
  },
  {
    value: 'Phạm Thị D',
    label: 'Phạm Thị D'
  },
  {
    value: 'Nguyễn Văn E',
    label: 'Nguyễn Văn E'
  },
  {
    value: 'Trần Văn F',
    label: 'Trần Văn F'
  },
  {
    value: 'Lê Thị G',
    label: 'Lê Thị G'
  },
  {
    value: 'Nguyễn Văn H',
    label: 'Nguyễn Văn H'
  },
  {
    value: 'Trần Thị I',
    label: 'Trần Thị I'
  },
  {
    value: 'Lê Văn J',
    label: 'Lê Văn J'
  },
  {
    value: 'Phạm Thị K',
    label: 'Phạm Thị K'
  }
];

const schema = yup.object({
  prescriptionName: yup.string().trim().required('Trường này là bắt buộc !')
});

interface AddPrescripton {
  navigate: () => void;
}

const AddPrescriptions = ({ navigate }: AddPrescripton) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const handleCreateTablet: SubmitHandler<{ prescriptionName: string }> = async data => {
    if (!isValid) return;
    console.log(data);
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
            <div>
              <h1 className="text-[18px] text-black font-medium">Chi tiết đơn thuốc</h1>
            </div>
            <div>
              <button
                onClick={navigate}
                className="text-[18px] text-black font-medium flex items-center gap-3 border-borderColor border p-3 rounded-lg bg-[#f3f4f7]"
              >
                <List className="text-[#4d54b1]" />
                Danh sách đơn thuốc
              </button>
            </div>
          </div>
          <div>
            <form className="mb-3 w-full relative" onSubmit={handleSubmit(handleCreateTablet)}>
              <div className="flex gap-7 mb-3">
                <Field>
                  <Label htmlFor="dosage">Liều lượng ( .../Lần )</Label>
                  <Input
                    name="dosage"
                    type="text"
                    className="h-[48px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Nhập Liều lượng ..."
                    control={control}
                  />
                </Field>
                <Field>
                  <Label htmlFor="frequency"> Số ngày sử dụng </Label>
                  <Input
                    name="frequency"
                    type="text"
                    className="h-[48px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Nhập Liều lượng ..."
                    control={control}
                  />
                </Field>
              </div>
              <div className="flex gap-7 mb-3">
                <div className="min-w-[400px] w-1/2">
                  <Label htmlFor="prescriptionName">Tên đơn thuốc</Label>
                  <Select
                    name="selectTablets"
                    placeholder="Đơn thuốc chỉ định"
                    options={TabletOptions}
                    control={control}
                  />
                </div>
                <div className="min-w-[400px] w-1/2">
                  <Label htmlFor="selectDoctor">Tên đơn thuốc</Label>
                  <Select
                    name="searchPrescription"
                    placeholder="Bệnh nhân chỉ định"
                    options={PatientsOptions}
                    control={control}
                  />
                </div>
              </div>

              <div className="flex flex-col mb-3">
                <Label htmlFor="description">Chi tiêt đơn thuốc</Label>
                <textarea
                  className="p-3 border border-borderColor rounded-md focus:border-third focus:outline-none min-h-[130px]"
                  name="description"
                  id="description"
                  placeholder="Nhập chi tiết đơn thuốc ..."
                ></textarea>
              </div>

              <div className="flex gap-7 w-1/4 justify-end float-end">
                <Button
                  type="submit"
                  className="bg-primaryAdmin rounded-md w-full mt-3 h-[40px] hover:scale-[1.02]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Xác nhận
                </Button>
                <Button
                  type="submit"
                  className="bg-[#8e8e8e6b] hover:!text-white !text-black rounded-md w-full mt-3 h-[40px] hover:scale-[1.02]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
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
