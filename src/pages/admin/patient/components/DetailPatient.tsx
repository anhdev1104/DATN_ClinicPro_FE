import DirectRoute from '@/components/direct';
import Field from '@/components/field';
import { CloseIcon, List } from '@/components/icons';
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
import LightBox from '@/components/lightbox';
import convertLightBox from '@/helpers/convertLightBox';
import { Dialog } from '@mui/material';
import { MedicalRecord } from '@/types/medicalHistories.type';
import { ModalConfirm } from '@/components/modal';
import { toast } from 'react-toastify';
import LoadingSpin from '@/components/loading';
import MessageForm from '@/components/message';

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
  const [isEditMode, setIsEditMode] = useState(false);
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
      if (result.errors) {
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
          <Button
            onClick={() => setIsEditMode(!isEditMode)}
            className="h-[44px] bg-primaryAdmin text-white"
            styled="normal"
            type="button"
          >
            Chỉnh sửa
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Field>
              <Label htmlFor="user_info.fullname">Họ và tên:</Label>
              <Input
                name="user_info.fullname"
                control={control}
                placeholder="Họ và tên ..."
                className="h-[44px] text-primaryAdmin"
              />
              {errors.user_info?.fullname && <MessageForm error={errors.user_info.fullname.message} />}
            </Field>
            <Field>
              <Label htmlFor="user_info.phone_number">Số điện thoại:</Label>
              <Input
                name="user_info.phone_number"
                control={control}
                placeholder="Số điện thoại ..."
                className="h-[44px] text-primaryAdmin"
              />
              {errors.user_info?.phone_number && <MessageForm error={errors.user_info.phone_number.message} />}
            </Field>
            <Field>
              <Label htmlFor="user_info.email">Email:</Label>
              <Input
                name="user_info.email"
                control={control}
                placeholder="Email ..."
                className="h-[44px] text-primaryAdmin"
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
                className="text-primaryAdmin"
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
                className="h-[44px] text-primaryAdmin"
              />
              {errors.user_info?.dob && <MessageForm error={errors.user_info.dob.message} />}
            </Field>
            <Field>
              <Label htmlFor="user_info.address">Địa chỉ:</Label>
              <Input
                name="user_info.address"
                control={control}
                placeholder="Địa chỉ ..."
                className="h-[44px] text-primaryAdmin"
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
                className="h-[44px] text-primaryAdmin"
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
                className="h-[44px] text-primaryAdmin"
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
                className="h-[44px] text-primaryAdmin"
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
                className="text-primaryAdmin"
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
          <div className="w-full">
            <div className="w-full flex justify-between border-b-2 border-primaryAdmin/20 bg-primaryAdmin/5 text-left py-4 font-semibold px-2">
              <div className="flex-[0_0_21%]">Mã bệnh án</div>
              <div className="flex-[0_0_11%]">Chẩn đoán</div>
              <div className="flex-[0_0_20%]">Bác sĩ</div>
              <div className="flex-[0_0_20%]">Người bệnh</div>
              <div className="flex-[0_0_14%]">Ngày khám</div>
              <div className="flex-[0_0_8%]"></div>
            </div>
            <div className="w-full border-b-[2px] border-borderColor text-left">
              {isLoadingList ? (
                <div className="mx-auto text-center pt-10">
                  <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
                </div>
              ) : (patient.medical_histories || []).length > 0 ? (
                patient.medical_histories?.map((record, index) => (
                  <div
                    key={index}
                    className={`py-4 text-black flex items-center justify-between w-full text-left cursor-pointer ${index % 2 === 1 ? ' bg-[#f5f5f5]' : 'bg-white'} px-2`}
                  >
                    <div className="flex-[0_0_21%]">{record?.id}</div>
                    <div className="flex-[0_0_11%] font-semibold">{record?.diagnosis}</div>
                    <div className="flex-[0_0_20%] flex items-center gap-2">
                      <img className="size-[30px] rounded-full" src={record?.doctor?.avatar} alt="" />
                      <div className="flex flex-col">
                        <span className="text-[14px] font-semibold">{record?.doctor?.fullname}</span>
                        <span className="text-[12px] opacity-70">{record?.doctor?.email}</span>
                      </div>
                    </div>
                    <div className="flex-[0_0_20%]  font-semibold flex items-center gap-2">
                      <img className="size-[30px] rounded-full" src={patient?.patient_info?.avatar} alt="" />
                      <div className="flex flex-col">
                        <span className="text-[14px]">{patient?.patient_info?.fullname}</span>
                        <span className="text-[12px] opacity-70">{patient?.patient_info?.email}</span>
                      </div>
                    </div>
                    <div className="flex-[0_0_14%]">{convertTime(record?.created_at)}</div>
                    <button
                      onClick={() => handleClickOpen(record)}
                      className="flex-[0_0_8%] text-primaryAdmin hover:underline"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-10 font-bold text-center "> Chưa có bệnh án nào </div>
              )}
            </div>
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
      {open.status && (
        <DetailMedicalHistories close={handleClose} statusLog={open.status} item={open.item} patient={patient} />
      )}
    </>
  );
};

interface IDetailMedicalHistories {
  close: () => void;
  statusLog: boolean;
  item?: any;
  patient?: IPatient;
}

function DetailMedicalHistories({ close, statusLog, item, patient }: IDetailMedicalHistories) {
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord>({} as MedicalRecord);

  useEffect(() => {
    setMedicalRecord(item);
  }, [item]);

  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightBox = (index: number) => {
    if (index >= 0 && index < medicalRecord?.files?.length) {
      setCurrentImageIndex(index);
      setIsLightBoxOpen(true);
    }
  };

  const closeLightBox = () => {
    setIsLightBoxOpen(false);
  };

  return (
    <Dialog
      open={statusLog}
      onClose={close}
      className="!z-[999]"
      PaperProps={{
        style: {
          backgroundColor: '#f5f5f5',
          width: '700px',
          height: 'auto',
          maxWidth: '700px',
          borderRadius: '8px',
          overflowY: 'hidden',
          gap: '20px',
        },
      }}
    >
      <div className="relative bg-gray-50 py-8 px-6 md:px-12 rounded-3xl shadow-lg max-w-[900px] mx-auto scroll-select size-full overflow-y-auto">
        {/* Nút đóng */}
        <button
          className="absolute top-5 right-5 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-md"
          onClick={close}
        >
          <CloseIcon />
        </button>

        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10 tracking-wide uppercase">Chi tiết bệnh án</h1>

        {/* Card: Thông tin người bệnh */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Thông tin người bệnh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Tên người bệnh:</p>
              <p className="text-gray-800 uppercase">{patient?.patient_info?.fullname}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Giới tính:</p>
              <p className="text-gray-800 capitalize">{patient?.patient_info?.gender}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Số điện thoại:</p>
              <p className="text-gray-800">{patient?.patient_info?.phone_number}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Ngày khám:</p>
              <p className="text-gray-800">{convertTime(medicalRecord?.created_at || '')}</p>
            </div>
          </div>
        </div>

        {/* Card: Thông tin bác sĩ */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Thông tin bác sĩ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Tên bác sĩ:</p>
              <p className="text-gray-800 uppercase">{medicalRecord?.doctor?.fullname}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Số điện thoại:</p>
              <p className="text-gray-800">{medicalRecord?.doctor?.phone_number}</p>
            </div>
          </div>
        </div>

        {/* Card: Chi tiết bệnh án */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Chi tiết bệnh án</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Mã bệnh án:</p>
              <p className="text-gray-800 uppercase">{medicalRecord?.id}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Chẩn đoán sơ bộ:</p>
              <p className="text-gray-800">{medicalRecord?.diagnosis}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Phương pháp điều trị:</p>
              <p className="text-gray-800">{medicalRecord?.treatment}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Nội dung bệnh án:</p>
              <p className="text-gray-800">{medicalRecord?.description}</p>
            </div>
          </div>
        </div>

        {/* Card: Ảnh chụp X-Quang */}
        {medicalRecord?.files?.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Ảnh chụp X-QUANG</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {medicalRecord.files.map((file, index) => (
                <div
                  key={file.id}
                  className="relative group cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => openLightBox(index)}
                >
                  <img
                    className="w-full h-[180px] object-cover rounded-lg shadow-md"
                    src={file.file}
                    alt={file.description}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
                    <p className="text-white text-sm font-light">{file.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {isLightBoxOpen && (
          <LightBox
            images={convertLightBox(medicalRecord?.files || [])}
            currentIndex={currentImageIndex}
            onClose={closeLightBox}
          />
        )}
      </div>
    </Dialog>
  );
}

export default DetailPatient;
