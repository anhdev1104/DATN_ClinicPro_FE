import useToggle from '@/hooks/useToggle';
import { Box, Dialog, DialogTitle, Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IAppointment } from '@/types/appointment.type';

const schema = yup.object({});

const ModalAppointment = () => {
  const { show, handleToggle } = useToggle();
  const {
    control,
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
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
        onSubmit: handleSubmit(handleAppointment)
      }}
    >
      <Stack>
        <Box className="pr-[60px] pl-10 py-[30px]">
          <DialogTitle className="text-2xl text-primary">Đặt Lịch Hẹn</DialogTitle>
        </Box>
        <Box>
          <img src="" alt="" />
        </Box>
      </Stack>
    </Dialog>
  );
};

export default ModalAppointment;
