import Select from '@/components/select';
import { Button } from '@/components/button';
import DirectRoute from '@/components/direct';
import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import yup from '@/lib/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { List } from '@/components/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { INewPatient } from '@/types/patient.type';
import MessageForm from '@/components/message';
import { createPatient } from '@/services/patient.service';
import { toast } from 'react-toastify';

const schema = yup.object({
  insurance_number: yup.string().trim().required('Số bảo hiểm không được bỏ trống!'),
  status: yup
    .string()
    .trim()
    .oneOf(['active', 'inactive'], 'Trạng thái không hợp lệ!')
    .required('Trạng thái không được bỏ trống!'),
  user_info: yup.object({
    fullname: yup.string().trim().required('Họ và tên không được bỏ trống!'),
    email: yup.string().trim().email('Email không hợp lệ!').required('Email không được bỏ trống!'),
    phone_number: yup
      .string()
      .trim()
      .required('Số điện thoại không được bỏ trống!')
      .matches(/^((\+84|84|0)[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ!'),
    address: yup.string().trim().required('Địa chỉ không được bỏ trống!'),
    gender: yup
      .string()
      .oneOf(['male', 'female', 'other'], 'Giới tính không hợp lệ!')
      .required('Vui lòng chọn giới tính!'),
    dob: yup
      .string()
      .trim()
      .required('Ngày sinh không được bỏ trống!')
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'Ngày sinh phải đúng định dạng YYYY-MM-DD!'),
  }),
  identity_card: yup.object({
    type_name: yup.string().trim().required('Loại giấy tờ không được bỏ trống!'),
    identity_card_number: yup.string().trim().required('Số giấy tờ không được bỏ trống!'),
  }),
});

const GENDER_OPTIONS = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
];
const STATUS_OPTIONS = [
  { label: 'Hoạt động', value: 'active' },
  { label: 'Không hoạt động', value: 'inactive' },
];

const identity_card_options = [
  { label: 'Chứng minh nhân dân', value: 'Chứng minh nhân dân' },
  { label: 'Căn cước công dân', value: 'Căn cước công dân' },
];

const AddPatient = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<INewPatient> = async (formData: any) => {
    try {
      const result = await createPatient(formData);
      if (result.errors) {
        toast.error(result.message, { position: 'top-right' });
      } else {
        toast.success(result.data.message, { position: 'top-right' });
        reset();
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <>
      <DirectRoute nav="Quản lý bệnh nhân" subnav="Bệnh nhân" targetnav="Tạo mới bệnh nhân" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 w-full flex items-center justify-between gap-5">
          <h1 className="text-[18px] text-black font-medium">Chi tiết bệnh nhân</h1>
          <div className="border-borderColor border px-3 py-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
            <Link to={'/patient'} className="text-dark font-medium flex items-center gap-3">
              <List className="text-primaryAdmin" />
              Danh sách bệnh nhân
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Field>
              <Label htmlFor="user_info.fullname">Họ và tên:</Label>
              <Input
                name="user_info.fullname"
                control={control}
                placeholder="Họ và tên ..."
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
              />
              {errors.user_info?.fullname && <MessageForm error={errors.user_info.fullname.message} />}
            </Field>
            <Field>
              <Label htmlFor="user_info.phone_number">Số điện thoại:</Label>
              <Input
                name="user_info.phone_number"
                control={control}
                placeholder="Số điện thoại ..."
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
              />
              {errors.user_info?.phone_number && <MessageForm error={errors.user_info.phone_number.message} />}
            </Field>
            <Field>
              <Label htmlFor="user_info.email">Email:</Label>
              <Input
                name="user_info.email"
                control={control}
                placeholder="Email ..."
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
              />
              {errors.user_info?.email && <MessageForm error={errors.user_info.email.message} />}
            </Field>
            <Field>
              <Label htmlFor="user_info.gender">Giới tính:</Label>
              <Select
                name="user_info.gender"
                control={control}
                options={GENDER_OPTIONS}
                placeholder="Chọn giới tính"
                className="!font-normal !text-dark"
              />
              {errors.user_info?.gender && <MessageForm error={errors.user_info.gender.message} />}
            </Field>
          </div>

          <div className="flex gap-3">
            <Field>
              <Label htmlFor="user_info.dob">Ngày sinh:</Label>
              <Input
                name="user_info.dob"
                control={control}
                type="date"
                placeholder="Ngày sinh ..."
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
              />
              {errors.user_info?.dob && <MessageForm error={errors.user_info.dob.message} />}
            </Field>
            <Field>
              <Label htmlFor="user_info.address">Địa chỉ:</Label>
              <Input
                name="user_info.address"
                control={control}
                placeholder="Địa chỉ ..."
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
              />
              {errors.user_info?.address && <MessageForm error={errors.user_info.address.message} />}
            </Field>
          </div>

          <div className="flex gap-3">
            <Field>
              <Label htmlFor="identity_card.type_name">Loại giấy tờ:</Label>
              <Select
                name="identity_card.type_name"
                control={control}
                placeholder="Loại giấy tờ ..."
                className="h-[40px] !font-normal !text-dark rounded-md focus:border-third"
                options={identity_card_options}
              />
              {errors.identity_card?.type_name && <MessageForm error={errors.identity_card.type_name.message} />}
            </Field>
            <Field>
              <Label htmlFor="identity_card.identity_card_number">Số giấy tờ:</Label>
              <Input
                name="identity_card.identity_card_number"
                control={control}
                placeholder="Số giấy tờ ..."
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
              />
              {errors.identity_card?.identity_card_number && (
                <MessageForm error={errors.identity_card.identity_card_number.message} />
              )}
            </Field>
          </div>

          <div className="flex gap-3">
            <Field>
              <Label htmlFor="insurance_number">Số bảo hiểm:</Label>
              <Input
                name="insurance_number"
                control={control}
                placeholder="Số bảo hiểm ..."
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
              />
              {errors.insurance_number && <MessageForm error={errors.insurance_number.message} />}
            </Field>
            <Field>
              <Label htmlFor="status">Trạng thái:</Label>
              <Select
                name="status"
                control={control}
                options={STATUS_OPTIONS}
                placeholder="Chọn trạng thái"
                className="!font-normal !text-dark"
              />
              {errors.status && <MessageForm error={errors.status.message} />}
            </Field>
          </div>

          <div className="flex gap-5 justify-end">
            <Button className="h-[44px] bg-primaryAdmin text-white" styled="normal" type="submit">
              Cập nhật
            </Button>
            <Button className="h-[44px]" styled="normal" type="button" onClick={() => reset()}>
              Đặt lại
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPatient;
