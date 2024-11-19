import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IAppointment } from '@/types/appointment.type';
import { CloseIcon } from '../icons';
import { useEffect, useState } from 'react';
import { getSpecialties } from '@/services/specialties.service';
import { ISpecialties } from '@/types/specialties.type';

const schema = yup.object({
  fullname: yup.string().trim().required('Vui lòng điền họ tên hợp lệ.'),
  email: yup
    .string()
    .trim()
    .required('Vui lòng điền email hợp lệ !')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Email không dúng định dạng !' }),
  phone_number: yup
    .string()
    .trim()
    .required('Vui lòng nhập số điện thoại.')
    .matches(/^\d+$/, 'Số điện thoại chỉ được chứa ký tự số.')
    .length(10, 'Số điện thoại phải gồm 10 chữ số.'),
  address: yup.string().trim().required('Vui lòng điền thông tin.'),
  gender: yup.string().required('Vui lòng điền thông tin.'),
  description: yup.string(),
  dob: yup.string().required('Vui lòng điền thông tin.'),
  specialty_id: yup.string().required('Vui lòng điền thông tin.'),
  appointment_date: yup.string().required('Vui lòng điền thông tin.'),
});

const ModalAppointment = ({ show, handleToggle }: { show: boolean; handleToggle: () => void }) => {
  const [specialties, setSpecialties] = useState<ISpecialties[]>([]);
  console.log('🚀 ~ ModalAppointment ~ specialties:', specialties);
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleAppointment: SubmitHandler<IAppointment> = async data => {
    if (!isValid) return;
    console.log(data);
  };

  useEffect(() => {
    (async () => {
      const data = await getSpecialties();
      setSpecialties(data);
    })();
  }, []);

  return (
    <Dialog
      open={show}
      onClose={handleToggle}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(handleAppointment),
        style: {
          borderRadius: '16px',
          maxWidth: '60%',
          width: '100%',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '1000px',
          width: '100%',
        }}
        direction={'row'}
      >
        <Box
          className="pr-[60px] pl-10 py-[30px] flex-1"
          sx={{
            pr: '60px',
            pl: '40px',
            py: '30px',
          }}
        >
          <DialogTitle
            sx={{
              color: '#4db6ac',
              p: 0,
              fontSize: '26px',
              fontWeight: 600,
            }}
          >
            Đặt Lịch Hẹn
          </DialogTitle>
          <DialogContent sx={{ p: 0, mt: '15px', overflow: 'hidden' }}>
            <Typography
              component={'h4'}
              sx={{
                fontWeight: 600,
                fontSize: '16px',
                color: '#4db6ac',
                mb: 1,
              }}
            >
              Thông tin bệnh nhân
            </Typography>
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <input {...field} placeholder="Họ và tên" className="appointment-input mb-[10px]" />
              )}
            />
            <Stack direction="row" spacing={1} sx={{ mb: '10px' }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <input {...field} placeholder="Email" className="appointment-input" />}
              />
              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => <input {...field} placeholder="Số điện thoại" className="appointment-input" />}
              />
            </Stack>
            <Controller
              name="address"
              control={control}
              render={({ field }) => <input {...field} placeholder="Địa chỉ" className="appointment-input mb-[10px]" />}
            />
            <Stack direction="row">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Ngày sinh"
                      sx={{
                        width: '50%',
                        '& .MuiInputBase-input': {
                          padding: '0 15px',
                          height: 38,
                        },
                        '& .MuiInputBase-root': {
                          color: '#797979',
                          backgroundColor: '#f3f4f7',
                          fontSize: '14px',
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
                        pr: '5px',
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormControl>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <RadioGroup
                      defaultValue="male"
                      {...field}
                      sx={{
                        flexDirection: 'row',
                        pl: '15px',
                      }}
                    >
                      <FormControlLabel
                        value="male"
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
                        value="female"
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
                  )}
                />
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogContent sx={{ p: 0, mt: '15px' }}>
            <Typography
              component={'h4'}
              sx={{
                fontWeight: 600,
                fontSize: '16px',
                color: '#4db6ac',
                mb: 1,
              }}
            >
              Chọn chuyên khoa
            </Typography>
          </DialogContent>
        </Box>
        <Box
          sx={{
            width: '400px',
            position: 'relative',
          }}
        >
          <img src="/images/form-booking.webp" alt="" className="w-full h-full object-contain" />
          <Box onClick={handleToggle}>
            <CloseIcon className="absolute top-2 right-4 text-[40px] cursor-pointer text-gray-300 transition-all ease-linear hover:text-white" />
          </Box>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default ModalAppointment;
