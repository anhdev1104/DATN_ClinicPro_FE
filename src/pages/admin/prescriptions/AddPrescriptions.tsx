import { ChevronRightIcon, List } from '@/components/icons';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import Select from '@/components/select';
import { Link } from 'react-router-dom';

const listMedicine = [
  {
    label: 'Thuốc Pymenospain Pymepharco chống co thắt dạ dày - ruột (200 viên)',
    value: 'Thuốc Pymenospain Pymepharco chống co thắt dạ dày - ruột (200 viên)'
  },
  {
    label: 'Viên sủi Efferalgan 500mg UPSA SAS giảm đau, hạ sốt (4 vỉ x 4 viên)',
    value: 'Viên sủi Efferalgan 500mg UPSA SAS giảm đau, hạ sốt (4 vỉ x 4 viên)'
  },
  {
    label: 'Thuốc bột pha hỗn dịch uống Smecta vị cam điều trị tiêu chảy (30 gói x 3g)',
    value: 'Thuốc bột pha hỗn dịch uống Smecta vị cam điều trị tiêu chảy (30 gói x 3g)'
  },
  {
    label: 'Viên sủi Berocca Bayer bổ sung vitamin và khoáng chất (10 viên)',
    value: 'Viên sủi Berocca Bayer bổ sung vitamin và khoáng chất (10 viên)'
  },
  {
    label: 'Men vi sinh Enterogermina 2 tỷ/5ml điều trị rối loạn tiêu hóa (2 vỉ x 10 ống)',
    value: 'Men vi sinh Enterogermina 2 tỷ/5ml điều trị rối loạn tiêu hóa (2 vỉ x 10 ống)'
  },
  {
    label: 'Thuốc Eugica MEGA We care điều trị ho đờm, cảm cúm, sổ mũi (10 vỉ x 10 viên)',
    value: 'Thuốc Eugica MEGA We care điều trị ho đờm, cảm cúm, sổ mũi (10 vỉ x 10 viên)'
  },
  {
    label: 'Thuốc Clorpheniramin 4 DHG điều trị viêm mũi dị ứng, chảy nước mũi (10 vỉ x 20 viên)',
    value: 'Thuốc Clorpheniramin 4 DHG điều trị viêm mũi dị ứng, chảy nước mũi (10 vỉ x 20 viên)'
  },
  {
    label: 'Gel bôi da Klenzit MS điều trị mụn trứng cá (15g)',
    value: 'Gel bôi da Klenzit MS điều trị mụn trứng cá (15g)'
  },
  {
    label: 'Viên nhai Kremil-S United điều trị đau dạ dày, giảm nóng rát dạ dày, ợ nóng, ợ chua (10 vỉ x 10 viên)',
    value: 'Viên nhai Kremil-S United điều trị đau dạ dày, giảm nóng rát dạ dày, ợ nóng, ợ chua (10 vỉ x 10 viên)'
  },
  {
    label: 'Thuốc Telfast HD 180mg Sanofi điều trị viêm mũi dị ứng, mày đay (1 vỉ x 10 viên)',
    value: 'Thuốc Telfast HD 180mg Sanofi điều trị viêm mũi dị ứng, mày đay (1 vỉ x 10 viên)'
  },
  {
    label: 'Thuốc Farzincol Pharmedic điều trị thiếu kẽm (10 vỉ x 10 viên)',
    value: 'Thuốc Farzincol Pharmedic điều trị thiếu kẽm (10 vỉ x 10 viên)'
  },
  {
    label: 'Kem Differin Galderma điều trị mụn trứng cá (30g)',
    value: 'Kem Differin Galderma điều trị mụn trứng cá (30g)'
  }
];

const patientsOptions = [
  {
    label: 'Nguyễn Văn A',
    value: 'Nguyễn Văn A'
  },
  {
    label: 'Trần Thị B',
    value: 'Trần Thị B'
  },
  {
    label: 'Lê Văn C',
    value: 'Lê Văn C'
  },
  {
    label: 'Phạm Thị D',
    value: 'Phạm Thị D'
  },
  {
    label: 'Nguyễn Văn E',
    value: 'Nguyễn Văn E'
  },
  {
    label: 'Trần Văn F',
    value: 'Trần Văn F'
  },
  {
    label: 'Lê Thị G',
    value: 'Lê Thị G'
  },
  {
    label: 'Nguyễn Văn H',
    value: 'Nguyễn Văn H'
  },
  {
    label: 'Trần Thị I',
    value: 'Trần Thị I'
  },
  {
    label: 'Lê Văn J',
    value: 'Lê Văn J'
  },
  {
    label: 'Phạm Thị K',
    value: 'Phạm Thị K'
  }
];

const schema = yup.object({
  prescriptionName: yup.string().trim().required('Trường này là bắt buộc !')
});

const PrescriptionsPage = () => {
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
      </div>
      <div className="flex bg-white size-full p-[20px] rounded-[26px]">
        <div className="flex-1">
          <div className="mb-6 flex justify-between">
            <h1 className="text-[18px] text-black font-medium">Thêm đơn thuốc</h1>
            <div className="border-borderColor border p-3 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
              <Link to={'/prescriptions'} className="text-dark font-medium flex items-center gap-3">
                <List className="text-primaryAdmin" />
                Danh sách đơn thuốc
              </Link>
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
                    placeholder="Đơn thuốc chỉ định"
                    name="prescriptionData"
                    control={control}
                    options={listMedicine}
                  />
                </div>
                <div className="min-w-[400px] w-1/2">
                  <Label htmlFor="prescriptionName">Tên bệnh nhân</Label>
                  <Select
                    placeholder="Bệnh nhân chỉ định"
                    name="partientSearch"
                    control={control}
                    options={patientsOptions}
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
                <Button type="submit" styled="normal" isLoading={isSubmitting} disabled={isSubmitting}>
                  Xác nhận
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
