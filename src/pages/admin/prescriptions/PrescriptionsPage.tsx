import { ChevronRightIcon } from '@/components/icons';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import MessageForm from '@/components/message/MessageForm';
import Select from '@/components/select';

const schema = yup.object({
  prescriptionName: yup.string().trim().required('Trường này là bắt buộc !'),
});

const PrescriptionsPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
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
          <div className="mb-6">
            <h1 className="text-[18px] text-black font-medium">Prescription Detail</h1>
          </div>
          <div>
            <form className="mb-3 w-full" onSubmit={handleSubmit(handleCreateTablet)}>
              <div className="flex gap-7">
                <div>
                  <Label htmlFor="prescriptionName">Tên đơn thuốc</Label>
                  {/* <Select> */}
                  <option value="" disabled selected hidden>
                    Chọn thuốc
                  </option>
                  <option value="aspirin">Aspirin</option>
                  <option value="ibuprofen">Ibuprofen</option>
                  <option value="paracetamol">Paracetamol</option>
                  <option value="amoxicillin">Amoxicillin</option>
                  {/* </Select> */}
                  <MessageForm error={errors.prescriptionName?.message} />
                </div>
                <Field>
                  <Label htmlFor="quantity">Số lượng</Label>
                  <Input
                    name="quantity"
                    type="text"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Nhập Số lượng ..."
                    control={control}
                  />
                  <MessageForm error={errors.prescriptionName?.message} />
                </Field>
                <Field>
                  <Label htmlFor="dosage">Liều lượng ( Viên/Lần )</Label>
                  <Input
                    name="dosage"
                    type="text"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Nhập Liều lượng ..."
                    control={control}
                  />
                  <MessageForm error={errors.prescriptionName?.message} />
                </Field>
              </div>

              <div className="flex flex-col">
                <Label htmlFor="description">Chi tiêt đơn thuốc</Label>
                <textarea
                  className="p-3 border border-borderColor rounded-md focus:border-third focus:outline-none"
                  name="description"
                  id="description"
                  placeholder="Nhập chi tiết đơn thuốc ..."
                ></textarea>
              </div>

              <Button
                type="submit"
                className="bg-third rounded-md w-full mt-3 h-[40px]"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Gửi mã
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
