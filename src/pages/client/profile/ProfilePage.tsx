import { Button } from '@/components/button';
import Field from '@/components/field';
import { EmailIcon } from '@/components/icons';
import Input from '@/components/input';
import Label from '@/components/label';
import MessageForm from '@/components/message';
import { ModalConfirm } from '@/components/modal';
import Select from '@/components/select';
import { getProfile, updateProfile } from '@/services/auth.service';
import { IProfile, IUpdate } from '@/types/auth.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const GENDER_OPTIONS = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
];

const schema = yup.object({
  fullname: yup.string().trim().required('Họ và tên không được bỏ trống!'),
  phone_number: yup
    .string()
    .trim()
    .required('Số điện thoại không được bỏ trống!')
    .matches(/^((\+84|84|0)[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ!'),
  dob: yup.string().trim().required('Ngày sinh không được bỏ trống!'),
  gender: yup.string().required('Vui lòng chọn giới tính!'),
  address: yup.string().trim().required('Địa chỉ không được bỏ trống!'),
  insurance_number: yup.string().trim(),
  identity_card_number: yup.string().trim(),
});

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDate] = useState(() => new Date().toLocaleDateString());
  const [profile, setProfile] = useState<IProfile>({} as IProfile);
  const [modalStatus, setModalStatus] = useState(false);

  const handleClose = () => {
    setModalStatus(!modalStatus);
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    (async () => {
      const data = await getProfile();
      setProfile(data);
      reset({
        fullname: data.user_info?.fullname || '',
        phone_number: data.user_info?.phone_number || 'Chưa nhập số điện thoại',
        dob: data.user_info?.dob || '1970-01-01',
        gender: data.user_info?.gender?.toString() || '',
        insurance_number: data.user_info?.insurance_number || 'Chưa có mã bảo hiểm',
        identity_card_number: data.user_info?.identity_card?.identity_card_number || 'Chưa nhập CMND/CCCD',
        address: data.user_info?.address || 'Chưa nhập địa chỉ',
      });
    })();
  }, [reset]);

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const onSubmit: SubmitHandler<IUpdate> = async formData => {
    if (!isValid) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { identity_card, insurance_number, ...dataUpdate } = formData;

    const updatedData = {
      user_info: dataUpdate,
      avatar: profile.user_info.avatar,
    };

    const res = await updateProfile(profile.user_info.id, updatedData);
    handleClose();
    toast.success(res.message, { position: 'top-right' });
    const updatedProfile = await getProfile();
    setProfile(updatedProfile);
  };

  const handleSubmitForm = handleSubmit(onSubmit);

  return (
    <div className="py-[3rem] container-page">
      <div className="mb-20 flex flex-col gap-2">
        <div className="font-bold text-[30px] text-primary">Xin chào, {profile.user_info?.fullname} ...</div>
        <div>{currentDate}</div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-5 mb-10">
          <img className="size-[80px] rounded-full object-contain" src={profile.user_info?.avatar} alt="" />
          <div className="font-bold">
            <h1 className="text-[18px] text-black tracking-[0.2px] mb-1">{profile.user_info?.fullname}</h1>
            <p className="font-light">{profile.email}</p>
          </div>
        </div>
        <Button className="h-[40px]" onClick={toggleEditMode} type="button">
          Chỉnh sửa
        </Button>
      </div>

      <form className="mb-14" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <Field>
            <Label htmlFor="fullname">Họ và tên:</Label>
            <Input
              disabled={!isEditMode}
              name="fullname"
              placeholder="Họ tên ..."
              control={control}
              className={`h-[40px] ${!isEditMode && 'cursor-not-allowed select-none'}`}
            />
            <MessageForm error={errors.fullname?.message} />
          </Field>
          <Field>
            <Label htmlFor="phone_number">Số điện thoại:</Label>
            <Input
              disabled={!isEditMode}
              name="phone_number"
              placeholder="Số điện thoại ..."
              control={control}
              className={`h-[40px] ${!isEditMode && 'cursor-not-allowed select-none'}`}
            />
            <MessageForm error={errors.phone_number?.message} />
          </Field>
        </div>

        <div className="flex gap-5">
          <Field>
            <Label htmlFor="dob">Ngày sinh:</Label>
            <Input
              disabled={!isEditMode}
              name="dob"
              type="date"
              placeholder="Ngày sinh ..."
              control={control}
              className={`h-[40px] ${!isEditMode && 'cursor-not-allowed select-none'}`}
            />
            <MessageForm error={errors.dob?.message} />
          </Field>
          <Field>
            <Label htmlFor="gender">Giới tính:</Label>
            <Select
              disabled={!isEditMode}
              name="gender"
              options={GENDER_OPTIONS}
              placeholder="Chọn giới tính:"
              control={control}
            />
            <MessageForm error={errors.gender?.message} />
          </Field>
        </div>

        <div className="flex gap-5">
          <Field>
            <Label htmlFor="insurance_number">Mã số bảo hiểm:</Label>
            <Input
              disabled={true}
              name="insurance_number"
              placeholder="Mã số bảo hiểm ..."
              control={control}
              className={`h-[40px] cursor-not-allowed select-none`}
            />
            <MessageForm error={errors.insurance_number?.message} />
          </Field>
          <Field>
            <Label htmlFor="identity_card_number">Chứng minh nhân dân:</Label>
            <Input
              disabled={true}
              name="identity_card_number"
              placeholder="Chứng minh nhân dân ..."
              control={control}
              className={`h-[40px] cursor-not-allowed select-none`}
            />
            <MessageForm error={errors.identity_card_number?.message} />
          </Field>
        </div>

        <Field>
          <Label htmlFor="address">Địa chỉ:</Label>
          <Input
            disabled={!isEditMode}
            name="address"
            placeholder="Địa chỉ ..."
            control={control}
            className={`h-[40px] ${!isEditMode && 'cursor-not-allowed select-none'}`}
          />
          <MessageForm error={errors.address?.message} />
        </Field>

        {isEditMode && (
          <div className="flex gap-5 justify-end">
            <Button onClick={() => setModalStatus(true)} className="h-[40px]" type="button">
              Cập nhật
            </Button>
            <Button className="h-[40px]" type="button" onClick={() => reset()}>
              Đặt lại
            </Button>
          </div>
        )}
        <ModalConfirm
          isLoading={isSubmitting}
          disabled={isSubmitting}
          submit={handleSubmitForm}
          isClose={handleClose}
          isOpen={modalStatus}
          title="Cập nhập thông tin"
          description="Bạn có chắc muốn cập nhập hồ sơ thông tin cá nhân ? Các thông tin cũ sẽ mất vỉnh viễn và không được khôi phục lại! "
        />
      </form>

      <div className="flex flex-col gap-3">
        <Label>Địa chỉ email của bạn</Label>
        <div className="flex gap-5">
          <div className="bg-[#ecf3ff] w-max p-3 rounded-full">
            <EmailIcon className="text-primaryAdmin" />
          </div>
          <div className="text-[14px]">
            <h1 className="text-black">{profile.email}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
