import DirectRoute from '@/components/direct';
import Field from '@/components/field';
import { List } from '@/components/icons';
import Input from '@/components/input';
import Label from '@/components/label';
import { getPatientById } from '@/services/patient.service';
import { IPatient } from '@/types/patient.type';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Select from '@/components/select';
import yup from '@/helpers/locate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/button';
import convertTime from '@/helpers/convertTime';

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

const DetailPatient = () => {
  const { control, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [patient, setPatient] = useState<IPatient>({} as IPatient);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const data = await getPatientById(id);
      setPatient(data);
      reset({
        fullname: data.patient_info?.fullname || '',
        phone_number: data.patient_info?.phone_number || 'Chưa nhập số điện thoại',
        dob: data.patient_info?.dob || '1970-01-01',
        gender: data.patient_info?.gender?.toString() || '',
        insurance_number: data.patient_info?.insurance_number || 'Chưa có mã bảo hiểm',
        identity_card_number: data.patient_info?.identity_card?.identity_card_number || 'Chưa nhập CMND/CCCD',
        address: data.patient_info?.address || 'Chưa nhập địa chỉ',
      });
    })();
  }, [id, reset]);

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
            <img
              className="size-[80px] rounded-full object-contain"
              src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
              alt=""
            />
            <div className="font-bold">
              <h1 className="text-[18px] text-black tracking-[0.2px] mb-1">{patient.patient_info?.fullname}</h1>
              <p className="font-light">{patient?.patient_info?.email}</p>
            </div>
          </div>
          <Button className="h-[44px] bg-primaryAdmin text-white" styled="normal" type="button">
            Chỉnh sửa
          </Button>
        </div>
        <form className="flex flex-col gap-2 mb-7">
          <div className="flex gap-3">
            <Field>
              <Label htmlFor="fullname">Họ và tên:</Label>
              <Input
                name="fullname"
                control={control}
                className="h-[44px] text-primaryAdmin"
                placeholder="Họ và tên ..."
              />
            </Field>
            <Field>
              <Label htmlFor="phone_number">Số điện thoại:</Label>
              <Input
                name="phone_number"
                control={control}
                className="h-[44px] text-primaryAdmin"
                placeholder="Họ và tên ..."
              />
            </Field>
            <Field>
              <Label htmlFor="gender">Giới tính:</Label>
              <Select
                name="gender"
                className="text-primaryAdmin"
                options={GENDER_OPTIONS}
                placeholder="Chọn giới tính:"
                control={control}
              />
            </Field>
          </div>
          <div className="flex gap-3">
            <Field>
              <Label htmlFor="dob">Ngày sinh:</Label>
              <Input
                name="dob"
                type="date"
                placeholder="Ngày sinh ..."
                control={control}
                className={`h-[44px] text-primaryAdmin`}
              />
            </Field>
            <Field>
              <Label htmlFor="insurance_number">Mã số bảo hiểm:</Label>
              <Input
                name="insurance_number"
                placeholder="Mã số bảo hiểm ..."
                control={control}
                className={`h-[44px] text-primaryAdmin`}
              />
            </Field>
            <Field>
              <Label htmlFor="identity_card_number">Chứng minh nhân dân:</Label>
              <Input
                name="identity_card_number"
                placeholder="Chứng minh nhân dân ..."
                control={control}
                className={`h-[44px] text-primaryAdmin`}
              />
            </Field>
          </div>
          <div className="flex gap-3">
            <Field>
              <Label htmlFor="address">Địa chỉ:</Label>
              <Input
                name="address"
                placeholder="Địa chỉ ..."
                control={control}
                className={`h-[44px] text-primaryAdmin`}
              />
            </Field>
          </div>
        </form>
        <div className="flex flex-col">
          <h1 className="text-[18px] text-black font-medium mb-5">Bệnh án:</h1>
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
              {patient.medical_histories?.map((record, index) => (
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
                    <img
                      className="size-[30px] rounded-full"
                      src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="text-[14px]">{patient?.patient_info?.fullname}</span>
                      <span className="text-[12px] opacity-70">{patient?.patient_info?.email}</span>
                    </div>
                  </div>
                  <div className="flex-[0_0_14%]">{convertTime(record?.created_at)}</div>
                  <Link to={'#'} className="flex-[0_0_8%] text-primaryAdmin hover:underline">
                    Xem chi tiết
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPatient;
