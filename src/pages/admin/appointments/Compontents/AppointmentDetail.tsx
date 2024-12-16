import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { getAppointmentbyId, updateApointment } from '@/services/appointments.service';
import { emailRegex } from '@/constants/regex';
import { getPatient } from '@/services/patient.service';
import { getDoctors } from '@/services/user.service';
import { getPackageBySpecialty } from '@/services/package.service';
import { IPackage } from '@/types/package.type';
import { getSpecialties } from '@/services/specialties.service';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ISpecialties } from '@/types/specialties.type';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { GENDER } from '@/constants/define';
import { IListAppointment } from '@/types/appointment.type';
import SelectUsers from '@/components/select';
import { FormControl, FormControlLabel, Radio, RadioGroup, MenuItem, Select } from '@mui/material';
import * as yup from 'yup';
import MessageForm from '@/components/message';
const schema = yup.object().shape({
  fullname: yup.string().trim().required('Họ và tên là trường bắt buộc.'),
  email: yup
    .string()
    .trim()
    .required('Vui lòng điền email của bạn !')
    .matches(emailRegex, { message: 'Email không dúng định dạng.' }),
  phone_number: yup
    .string()
    .trim()
    .required('Vui lòng nhập số điện thoại.')
    .matches(/^\d+$/, 'Số điện thoại chỉ được chứa ký tự số.')
    .length(10, 'Số điện thoại phải gồm 10 chữ số.'),
  address: yup.string().trim().required('Vui lòng điền vào địa chỉ.'),
  gender: yup.string().default('male'),
  description: yup.string(),
  dob: yup.date().typeError('Ngày sinh không hợp lệ.').required('Vui lòng điền ngày sinh.'),
  appointment_date: yup
    .date()
    .typeError('Ngày và giờ khám không hợp lệ.')
    .required('Vui lòng chọn ngày và giờ khám bệnh.'),
  specialty_id: yup
    .string()
    .test('specialty_id', 'Vui lòng chọn chuyên khoa.', val => val !== '0')
    .required('Vui lòng chọn chuyên khoa.'),
  package_id: yup
    .string()
    .test('package_id', 'Vui lòng chọn gói khám.', val => val !== '0')
    .required('Vui lòng chọn gói khám.'),
});
const AppointmentDetail = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<IListAppointment | null>(null);
  const [patients, setPatient] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState<ISpecialties[]>([]);
  const [packages, setPackages] = useState<IPackage[]>([]);
  const convertToOption = users =>
    users.map(user => ({
      label: user.user_info.fullname,
      value: user.id,
    }));
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    formState: {},
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  console.log(errors);

  const idSpecialty = watch('specialty_id');
  useEffect(() => {
    (async () => {
      const data = await getSpecialties();
      setSpecialties(data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (!idSpecialty || idSpecialty === '0') return;
      const dataPackage = await getPackageBySpecialty(idSpecialty);
      setPackages(dataPackage);
    })();
  }, [idSpecialty]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const userRes = await getDoctors();
        const patientRes = await getPatient();
        setPatient(patientRes || []);
        const doctorOptions = convertToOption(userRes);
        setUser(doctorOptions);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng hoặc bệnh nhân:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const getPatientInfo = (patientId: string) => {
    const patient = patients.find(pa => pa.id === patientId);
    return patient
      ? {
          fullname: patient.patient_info.fullname,
          phone_number: patient.patient_info.phone_number,
          email: patient.patient_info.email,
          address: patient.patient_info.address,
          avatar: patient.patient_info.avatar,
          gender: patient.patient_info.gender,
          dob: patient.patient_info.dob,
        }
      : {};
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await getAppointmentbyId(id);
        const appointmentData = response.data;
        if (!appointmentData) {
          setError('Không tìm thấy dữ liệu cuộc hẹn');
          return;
        }
        setAppointment(appointmentData);
        const patientInfo = await getPatientInfo(appointmentData?.patient?.id);
        if (!patientInfo) {
          setError('Không tìm thấy thông tin bệnh nhân');
          return;
        }
        setValue('fullname', patientInfo.fullname || '');
        setValue('email', patientInfo.email || '');
        setValue('phone_number', patientInfo.phone_number || '');
        setValue('address', patientInfo.address || '');
        setValue('gender', patientInfo.gender || '');
        setValue('description', appointmentData?.description || '');
        setValue('dob', patientInfo.dob ? dayjs(patientInfo.dob) : null);
        setValue('date', appointmentData?.appointment_date ? dayjs(appointmentData.appointment_date) : null);
        setValue('specialty_id', appointmentData?.specialty?.id || '');
        setValue('package_id', appointmentData?.package?.id || '');
      } catch (err) {
        setError('Không thể tải dữ liệu cuộc hẹn');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue]);
  const handleUpdate: SubmitHandler<any> = async data => {
    console.log(data);

    if (!isValid) {
      console.error(errors);
      toast.error('Dữ liệu nhập không hợp lệ!');
      return;
    }
    if (!id) {
      toast.error('Không có ID để cập nhật!');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('fullname', data.fullname || appointmentData?.fullname || '');
    formData.append('email', data.email || appointmentData?.email || '');
    formData.append('phone_number', data.phone_number || appointmentData?.phone_number || '');
    formData.append('address', data.address || appointmentData?.address || '');
    formData.append('gender', data.gender || appointmentData?.gender || '');
    formData.append('description', data.description || appointmentData?.description || '');
    if (data.dob) {
      formData.append('dob', dayjs(data.dob).format('YYYY-MM-DD'));
    }
    if (data.appointment_date) {
      formData.append(
        'appointment_date',
        dayjs(data.appointment_date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
      );
    }
    formData.append('specialty_id', data.specialty_id || appointmentData?.specialty_id || '0');
    formData.append('package_id', data.package_id || appointmentData?.package_id || '0');
    const selectedUserId = watch('user_id');
    if (selectedUserId) {
      formData.append('user_id', selectedUserId);
    }
    try {
      const res = await updateApointment(String(id), formData);
      console.log('Kết quả API:', res);
      if (res.errors) {
        toast.error('Cập nhật gói khám thất bại');
      } else {
        toast.success('Cập nhật gói khám thành công');
        navigate('/packages');
        reset();
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error);
      toast.error('Lỗi xảy ra trong quá trình cập nhật');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit(handleUpdate)}>
      <div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">
            Lịch hẹn của bệnh nhân {getPatientInfo(appointment?.patient?.id || 'N/A').fullname}
          </h2>
          <div class="flex items-center gap-5 pb-4 ">
            <div class="w-20 h-20 overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src={getPatientInfo(appointment?.patient?.id || 'N/A').avatar}
                alt="User Profile"
              />
            </div>
            <p class="text-2xl font-semibold truncate">{getPatientInfo(appointment?.patient?.id || 'N/A').fullname}</p>
          </div>
          <div className="grid grid-cols-3 gap-4  pb-4">
            <Field>
              <Label className="block text-sm font-medium mb-1" htmlFor="fullname">
                Họ và tên
              </Label>
              <Input
                name="fullname"
                type="text"
                className="w-full h-[37px]  border border-gray-300 rounded-md p-2 focus:outline-none text-[#797979] text-[14px]"
                control={control}
              />
              <MessageForm error={errors.fullname?.message} />
            </Field>
            <Field>
              <Label htmlFor="dob" className="">
                Ngày sinh
                <span className="text-red-500">*</span>
              </Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={value || null}
                      onChange={newValue => onChange(newValue)}
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': {
                          padding: '0 15px',
                          height: 35,
                        },
                        '& .MuiInputBase-root': {
                          color: '#797979',
                          backgroundColor: '#f3f4f7',
                          fontSize: '14px',
                          border: '1px #dadde2 solid',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiIconButton-root': {
                          color: 'rgb(77, 182, 172)',
                        },
                        '& .css-113d811-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                          color: 'rgb(77, 182, 172)',
                        },
                        '& .css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root': {
                          fontSize: '12px',
                          transform: 'translate(14px, 10px) scale(1)',
                          color: '#797979',
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Field>
            <div>
              <Field>
                <Label className="block text-sm font-medium mb-1">Giới tính</Label>
                <div className="flex items-center space-x-4">
                  <FormControl>
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <>
                          <RadioGroup
                            defaultValue={GENDER.MALE}
                            {...field}
                            sx={{
                              flexDirection: 'row',
                              pl: '15px',
                              '& .MuiButtonBase-root': {
                                width: '38px',
                                height: '38px',
                              },
                            }}
                          >
                            <FormControlLabel
                              value={GENDER.MALE}
                              sx={{
                                '& .MuiFormControlLabel-label': {
                                  color: '#373737',
                                  fontSize: '14px',
                                },
                              }}
                              control={
                                <Radio
                                  sx={{
                                    '&.Mui-checked': {
                                      color: 'rgb(77, 182, 172)',
                                    },
                                  }}
                                />
                              }
                              label="Nam"
                            />
                            <FormControlLabel
                              value={GENDER.FEMALE}
                              sx={{
                                '& .MuiFormControlLabel-label': {
                                  color: '#373737',
                                  fontSize: '14px',
                                },
                              }}
                              control={
                                <Radio
                                  sx={{
                                    '&.Mui-checked': {
                                      color: 'rgb(77, 182, 172)',
                                    },
                                  }}
                                />
                              }
                              label="Nữ"
                            />
                          </RadioGroup>
                        </>
                      )}
                    />
                  </FormControl>
                </div>
              </Field>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4  pb-4">
            <Field>
              <Label className="block text-sm font-medium mb-1" htmlFor="phone_number">
                Số điện thoại
              </Label>
              <Input
                name="phone_number"
                type="text"
                className="w-full h-[37px]  border border-gray-300 rounded-md p-2 focus:outline-none text-[#797979] text-[14px]"
                control={control}
              />
            </Field>
            <Field>
              <Label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </Label>
              <Input
                name="email"
                type="text"
                className="w-full h-[37px]  border border-gray-300 rounded-md p-2 focus:outline-none text-[#797979] text-[14px]"
                control={control}
              />
            </Field>
            <Field>
              <Label className="block text-sm font-medium mb-1" htmlFor="email">
                Địa chỉ
              </Label>
              <Input
                name="address"
                type="text"
                className="w-full h-[37px] text-pr  border border-gray-300 rounded-md p-2 focus:outline-none text-[#797979] text-[14px]"
                control={control}
              />
            </Field>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-4 pb-4">
            <Field>
              <Label htmlFor="date" className="block text-sm font-medium mb-1">
                Thời gian hẹn khám
              </Label>
              <Controller
                name="date"
                control={control}
                defaultValue={dayjs()}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    // className="w-full h-[37px]  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <DateTimePicker
                      value={value}
                      onChange={newValue => {
                        onChange(newValue);
                      }}
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': {
                          padding: '',
                          height: '5px',
                        },
                        '& .MuiInputBase-root': {
                          color: '#797979',
                          backgroundColor: 'rgb(243 244 247)',
                          fontSize: '14px',
                          fontWeight: '500',
                          radius: '0.375rem',
                          outline: '1px solid #d1d5db',
                          offset: '2px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiIconButton-root': {
                          color: 'rgb(77, 182, 172)',
                        },
                        '& .css-113d811-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                          color: 'rgb(77, 182, 172)',
                        },
                        '& .css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root': {
                          fontSize: '12px',
                          transform: 'translate(14px, 10px) scale(1)',
                          color: '#797979',
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Field>
            <Field>
              <Label htmlFor="user_id" className="text-sm font-medium mb-1">
                Bác sĩ <span className="text-red-500">*</span>
              </Label>
              <SelectUsers
                placeholder="Danh sách bác sĩ"
                options={user}
                name="user_id"
                control={control}
                className="w-full h-[37px]  border border-gray-300 rounded-md p-2 focus:outline-none text-[#797979] text-[14px]"
              />
            </Field>
            <Field>
              <Label htmlFor="" className="text-sm font-medium mb-1">
                Chuyên khoa <span className="text-red-500">*</span>
              </Label>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="specialty_id"
                  defaultValue="0"
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        sx={{
                          '& .MuiSelect-select': {
                            padding: '8px 15px',
                            fontSize: '14px',
                            color: '#797979',
                            backgroundColor: '#f5f5f5',
                            fontWeight: '500',
                          },
                          '&:hover': {
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        }}
                        defaultValue="0"
                      >
                        <MenuItem
                          value="0"
                          disabled
                          sx={{
                            fontSize: '12px',
                          }}
                        >
                          Chuyên khoa
                        </MenuItem>
                        {specialties.length > 0 &&
                          specialties.map(item => (
                            <MenuItem
                              value={item.id}
                              key={item.id}
                              sx={{
                                fontSize: '12px',
                              }}
                            >
                              {item.description}
                            </MenuItem>
                          ))}
                      </Select>
                    </>
                  )}
                />
              </FormControl>
            </Field>
            <Field>
              <Label htmlFor="package_id" className="block text-sm font-medium mb-1">
                Gói khám<span className="text-red-500">*</span>
              </Label>
              <FormControl fullWidth sx={{}}>
                <Controller
                  control={control}
                  name="package_id"
                  defaultValue="0"
                  render={({ field }) => {
                    const selectValue: string | undefined =
                      field.value && packages && packages.map(pkg => pkg.id).includes(field.value) ? field.value : '0';

                    return (
                      <>
                        <Select
                          {...field}
                          value={selectValue}
                          sx={{
                            '& .MuiSelect-select': {
                              padding: '8px 15px',
                              fontSize: '14px',
                              color: '#797979',
                              backgroundColor: '#f5f5f5',
                            },
                            '&:hover': {
                              border: 'none',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            },
                          }}
                          defaultValue="0"
                        >
                          <MenuItem
                            value="0"
                            disabled
                            sx={{
                              fontSize: '12px',
                            }}
                          >
                            Gói khám
                          </MenuItem>
                          {packages &&
                            packages.map(item => (
                              <MenuItem
                                value={item.id}
                                key={item.id}
                                sx={{
                                  fontSize: '12px',
                                }}
                                className="!line-clamp-1"
                              >
                                {item.description}
                              </MenuItem>
                            ))}
                        </Select>
                      </>
                    );
                  }}
                />
              </FormControl>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label className="block text-sm font-medium mb-1">Notes *</label>
              <Input
                name="description"
                control={control}
                className="w-full h-24  border border-gray-300 rounded-md p-2 focus:outline-none text-[#797979] text-[14px]"
              ></Input>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          type="submit"
          className="bg-primaryAdmin text-white hover:bg-primaryAdmin/50 px-6 py-2 rounded-md transition duration-200"
        >
          {loading ? 'Đang cập nhật...' : 'Cập nhật '}
        </button>
      </div>
    </form>
  );
};

export default AppointmentDetail;
