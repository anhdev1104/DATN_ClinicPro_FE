import DirectRoute from '@/components/direct';
import Field from '@/components/field';
import { List } from '@/components/icons';
import Input from '@/components/input';
import Label from '@/components/label';
import { getPatientById, updatePatient } from '@/services/patient.service';
import { INewPatient, IPatient } from '@/types/patient.type';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Select from '@/components/select';
import yup from '@/helpers/locate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/button';
import convertTime from '@/helpers/convertTime';
import { MedicalRecord } from '@/types/medicalHistories.type';
import { ModalConfirm } from '@/components/modal';
import { toast } from 'react-toastify';
import MessageForm from '@/components/message';
import { MedicalRecordSekeleton } from '../../medical_histories/components/MedicalRecords';
import ModalDetailMedical from '@/components/modal/ModalDetailMedical';

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

const DetailPatient = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [patient, setPatient] = useState<IPatient>({} as IPatient);
  const [open, setOpen] = useState<{ status: boolean; item: MedicalRecord | null }>({
    status: false,
    item: null,
  });
  const [modalStatus, setModalStatus] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const { id } = useParams();

  const handleClose = () => {
    setOpen({ status: false, item: null });
  };

  const handleClickOpen = (item: MedicalRecord | null) => {
    setOpen({ status: true, item });
  };

  useEffect(() => {
    (async () => {
      setIsLoadingList(true);
      const data = await getPatientById(id);
      setPatient(data);
      reset({
        insurance_number: data.insurance_number || 'Chưa nhập',
        status: data.status || 'inactive',
        user_info: {
          fullname: data.patient_info?.fullname || 'Chưa nhập',
          email: data.patient_info?.email || 'Chưa nhập',
          phone_number: data.patient_info?.phone_number || 'Chưa nhập',
          address: data.patient_info?.address || 'Chưa nhập',
          gender: data.patient_info?.gender || 'male',
          dob: data.patient_info?.dob || '1970-01-01',
        },
        identity_card: {
          type_name: data.identity_card?.type_name || 'Căn cước công dân',
          identity_card_number: data.identity_card?.identity_card_number || 'Chưa nhập',
        },
      });
      setIsLoadingList(false);
    })();
  }, [id, reset]);

  const handleCloseModal = () => {
    setModalStatus(!modalStatus);
  };

  const onSubmit: SubmitHandler<INewPatient> = async (formData: any) => {
    try {
      const result = await updatePatient(id, formData);
      handleCloseModal();
      if (!result.success) {
        toast.error(result.message, { position: 'top-right' });
      } else {
        toast.success(result.message, { position: 'top-right' });
        const updatedProfile = await getPatientById(id);
        setPatient(updatedProfile);
      }
    } catch (error) {
      return error;
    }
  };

  const handleSubmitForm = handleSubmit(onSubmit);

  return (
    <>
      <DirectRoute
        nav="Quản lý bệnh nhân"
        subnav="Bệnh nhân"
        targetnav={`Bệnh nhân  ${patient?.patient_info?.fullname}`}
      />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 w-full flex items-center justify-between gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Chi tiết bệnh nhân</h1>
          </div>
          <div className="border-borderColor border px-3 py-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
            <Link to={'/patient'} className="text-dark font-medium flex items-center gap-3">
              <List className="text-primaryAdmin" />
              Danh sách bệnh nhân
            </Link>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4 mb-7">
            <img className="size-[80px] rounded-full object-contain" src={patient?.patient_info?.avatar} alt="" />
            <div className="font-bold">
              <h1 className="text-[18px] text-black tracking-[0.2px] mb-1">{patient.patient_info?.fullname}</h1>
              <p className="font-light">{patient?.patient_info?.email}</p>
            </div>
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
                className="!font-normal !text-dark"
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
            <Button
              onClick={() => setModalStatus(true)}
              className="h-[44px] bg-primaryAdmin text-white"
              styled="normal"
              type="button"
            >
              Cập nhật
            </Button>
            <Button className="h-[44px]" styled="normal" type="button" onClick={() => reset()}>
              Đặt lại
            </Button>
          </div>
        </form>
        <div className="flex flex-col">
          <h1 className="text-[18px] text-black font-medium mb-5">Bệnh án liên quan:</h1>

          <div className={`grid grid-cols-3 gap-5`}>
            {isLoadingList && new Array(6).fill(0).map((_, index) => <MedicalRecordSekeleton key={index} />)}
            {!isLoadingList &&
              (patient.medical_histories || []).length > 0 &&
              patient?.medical_histories?.map(item => (
                <div
                  className="border-2 border-gray-300 p-3 rounded-md cursor-pointer hover:bg-primaryAdmin/5 transition-all ease-linear"
                  key={item.id}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img src={item?.doctor.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item?.doctor?.fullname}</h3>
                      <span className="font-light text-xs">{item?.doctor?.phone_number}</span>
                    </div>
                  </div>
                  <div className="text-xs mt-3">
                    <p>Mã bệnh án:</p>
                    <div className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm">
                      {item?.id}
                    </div>
                  </div>
                  <div className="text-xs mt-3">
                    <p>Chuẩn đoán bệnh:</p>
                    <div
                      className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate"
                      title={item?.diagnosis}
                    >
                      {item?.diagnosis}
                    </div>
                  </div>
                  <div className="text-xs mt-3">
                    <p>Bác sĩ phụ trách:</p>
                    <div className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate">
                      BS: <span className="font-normal pl-1 text-primaryAdmin">{item?.doctor?.fullname}</span>
                    </div>
                  </div>
                  <div className="text-xs mt-3">
                    <p>Ngày khám bệnh:</p>
                    <div
                      className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate"
                      title=""
                    >
                      {convertTime(item?.created_at)}
                    </div>
                  </div>
                  <div
                    onClick={() => handleClickOpen(item)}
                    className="text-xs mt-3 bg-primaryAdmin text-white rounded-sm py-2 px-5 text-center transition-all ease-linear hover:bg-opacity-75"
                  >
                    Chi tiết
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ModalConfirm
        isLoading={isSubmitting}
        disabled={isSubmitting}
        submit={handleSubmitForm}
        isClose={handleCloseModal}
        isOpen={modalStatus}
        className="!bg-primaryAdmin"
        title="Cập nhập thông tin"
        description="Bạn có chắc muốn cập nhập hồ sơ thông tin cá nhân ? Các thông tin cũ sẽ mất vỉnh viễn và không được khôi phục lại! "
      />
      {open.status && <ModalDetailMedical close={handleClose} statusLog={open.status} id={open.item?.id} />}
    </>
  );
};

export default DetailPatient;
