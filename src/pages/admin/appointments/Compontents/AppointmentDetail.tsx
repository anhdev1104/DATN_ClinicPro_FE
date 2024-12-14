import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { getAppointmentbyId } from '@/services/appointments.service';
import { getPatient } from '@/services/patient.service';
import { getDoctors } from '@/services/user.service';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
// import convertTime from '@/helpers/convertTime';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { GENDER } from '@/constants/define';
import { IListAppointment } from '@/types/appointment.type';
import Select from '@/components/select';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
const AppointmentDetail = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<IListAppointment | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [patient, setPatient] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const convertToOptions = users =>
    users.map(user => ({
      label: user.user_info.fullname,
      value: user.id,
    }));
  const {
    control,
    setValue,
    handleSubmit,
    formState: {},
  } = useForm();
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const userRes = await getDoctors();
        const patientRes = await getPatient();
        setPatient(patientRes || []);
        setUser(convertToOptions(userRes));
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPatientName = (patientId: string) => {
    const patient = patient.find(patient => patient.id === patientId);
    return patient ? patient.patient_infor.fullname : 'Không có danh mục';
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await getAppointmentbyId(id);
        const appointmentData = response.data;
        // eslint-disable-next-line no-console
        console.log('Appointment data:', appointmentData);
        setAppointment(appointmentData);
        setValue('fullname', appointmentData?.patient?.id);
        setValue('date', appointmentData?.appointment_date ? dayjs(appointmentData.appointment_date) : null);
      } catch (err) {
        setError('Không thể tải dữ liệu cuộc hẹn');
        return err;
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, setValue]);
  const onSubmit = data => {
    // eslint-disable-next-line no-console
    console.log('Form data:', data);
    toast.success('Cập nhật thông tin thành công!');
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Patient Details</h2>
          <div class="flex items-center gap-5 pb-4 ">
            <div class="w-20 h-20 overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/my-project-29fd5.appspot.com/o/files%2F1733391783_1.jpg?alt=media"
                alt="User Profile"
              />
            </div>
            <p class="text-2xl font-semibold truncate">{appointment?.patient?.id || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-3 gap-4  pb-4">
            <div>
              <Field>
                <Label className="block text-sm font-medium mb-1" htmlFor="fullname">
                  Họ và tên
                </Label>
                <Input
                  name="fullname"
                  type="text"
                  className="w-full h-[37px]  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  control={control}
                />
              </Field>
            </div>
            <div className="min-w-[380px] w-[45%]">
              <Label htmlFor="Id">
                Danh mục người dùng<span className="text-red-500">*</span>
              </Label>

              <Select placeholder="Danh mục người dùng" options={user} name="user_id" control={control} />
            </div>
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
            <div>
              <label className="block text-sm font-medium mb-1">Số điện thoại</label>
              <input
                name="name"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Địa chỉ</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Appointment Details</h2>
          <div className="grid grid-cols-3 gap-4 pb-4">
            <div>
              <Field>
                <Label htmlFor="date" className="block text-sm font-medium mb-1">
                  Date of Appointment *
                </Label>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={dayjs()}
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      className="w-full h-[37px]  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            height: '6px',
                          },
                          '& .MuiInputBase-root': {
                            color: '#797979',
                            backgroundColor: 'white',
                            fontSize: '14px',
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
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">From *</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Consulting Doctor</label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Doctor</option>
                <option>Doctor A</option>
                <option>Doctor B</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label className="block text-sm font-medium mb-1">Treatment</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium mb-1">Notes *</label>
              <textarea
                rows={1}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AppointmentDetail;
