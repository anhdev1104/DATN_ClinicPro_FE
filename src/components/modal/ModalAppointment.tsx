import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useToggle from '@/hooks/useToggle';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IAppointment } from '@/types/appointment.type';

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
  dob: yup.string().required('Vui lòng điền thông tin.'),
  specialty_id: yup.string().required('Vui lòng điền thông tin.'),
  appointment_date: yup.string().required('Vui lòng điền thông tin.'),
});

const ModalAppointment = () => {
  const { show, handleToggle } = useToggle();

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
        sx={
          {
            // maxWidth: '1000px',
          }
        }
      >
        <Box
          className="pr-[60px] pl-10 py-[30px]"
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
              fontSize: '28px',
              fontWeight: 600,
            }}
          >
            Đặt Lịch Hẹn
          </DialogTitle>
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
              Thông tin bệnh nhân
            </Typography>
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => <input {...field} placeholder="Họ và tên" className="appointment-input" />}
            />
            <Stack direction="row" spacing={1} sx={{ mb: '5px' }}>
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
              render={({ field }) => <input {...field} placeholder="Địa chỉ" className="appointment-input" />}
            />
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller name="dob" control={control} render={({ field }) => <DatePicker {...field} />} />
              </LocalizationProvider>
            </Stack>
          </DialogContent>
        </Box>
        <Box>
          <img src="" alt="" />
        </Box>
      </Stack>
    </Dialog>
  );
};

export default ModalAppointment;
