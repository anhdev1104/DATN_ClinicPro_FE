import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IAppointment } from '@/types/appointment.type';
import { CloseIcon } from '../icons';
import { useEffect, useState } from 'react';
import { getSpecialties } from '@/services/specialties.service';
import { ISpecialties } from '@/types/specialties.type';
import { appointmentSchema } from '@/schema/appointment.schema';
import { getPackageBySpecialty } from '@/services/package.service';
import { IPackage } from '@/types/package.type';
import { Link } from 'react-router-dom';
import { Button } from '../button';
import MessageForm from '../message';
import { addAppointments } from '@/services/appointments.service';
import { GENDER } from '@/constants/define';

const ModalAppointment = ({ show, handleToggle }: { show: boolean; handleToggle: () => void }) => {
  const [specialties, setSpecialties] = useState<ISpecialties[]>([]);
  const [packages, setPackages] = useState<IPackage[]>([]);

  const {
    control,
    formState: { isSubmitting, isValid, errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    mode: 'onChange',
    defaultValues: {
      gender: GENDER.MALE,
    },
  });

  const idSpecialty = watch('specialty_id');
  const handleAppointment: SubmitHandler<IAppointment> = async data => {
    if (!isValid) return;
    const dob = data.dob && new Date(data.dob).toLocaleDateString('en-CA');
    const appointment_date = data.appointment_date && new Date(data.appointment_date).toLocaleDateString('en-CA');

    const dataAppointment = {
      ...data,
      dob,
      appointment_date,
    } as IAppointment;

    (async () => {
      try {
        await addAppointments(dataAppointment);
        // toast.success('Đăng ký lịch hẹn thành công !');
        // reset();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      const data = await getSpecialties();
      setSpecialties(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!idSpecialty) return;
      const dataPackage = await getPackageBySpecialty(idSpecialty);
      setPackages(dataPackage);
    })();
  }, [idSpecialty]);

  return (
    <Dialog
      open={show}
      onClose={handleToggle}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(handleAppointment),
        style: {
          borderRadius: '16px',
          maxWidth: '65%',
          width: '100%',
        },
      }}
    >
      <Stack
        sx={{
          width: '100%',
        }}
        direction={'row'}
      >
        <Box
          className="flex-1"
          sx={{
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
          <Box
            sx={{
              height: '480px',
              overflowY: 'auto',
              pr: '60px',
              '::-webkit-scrollbar': {
                width: '5px',
              },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: '#4db6ac',
                borderRadius: '4px',
                cursor: 'grab',
              },
            }}
          >
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
                  <>
                    <input {...field} placeholder="Họ và tên" className="appointment-input" />
                    <MessageForm error={errors.fullname?.message} className="!mt-0 !text-[10px]" />
                  </>
                )}
              />
              <Stack direction="row" spacing={1} sx={{ my: '5px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <input {...field} placeholder="Email" className="appointment-input" />}
                  />
                  <MessageForm error={errors.email?.message} className="!mt-0 !text-[10px]" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                  <Controller
                    name="phone_number"
                    control={control}
                    render={({ field }) => (
                      <input {...field} placeholder="Số điện thoại" className="appointment-input" />
                    )}
                  />
                  <MessageForm error={errors.phone_number?.message} className="!mt-0 !text-[10px]" />
                </Box>
              </Stack>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} placeholder="Địa chỉ" className="appointment-input" />
                    <MessageForm error={errors.address?.message} className="!mt-0 !text-[10px]" />
                  </>
                )}
              />
              <Stack direction="row" mt={'5px'}>
                <Box sx={{ width: '50%' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Ngày sinh"
                          sx={{
                            width: '100%',
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
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <MessageForm error={errors.dob?.message} className="!text-[10px]" />
                </Box>
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
                        <MessageForm error={errors.gender?.message} className=" !text-[10px]" />
                      </>
                    )}
                  />
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogContent sx={{ p: 0, pt: '15px' }}>
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
                            fontSize: '12px',
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
                      <MessageForm error={errors.specialty_id?.message} className="!mt-[5px] !text-[10px]" />
                    </>
                  )}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: '10px' }}>
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
                              fontSize: '12px',
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
                        <MessageForm error={errors.package_id?.message} className="!mt-[5px] !text-[10px]" />
                      </>
                    );
                  }}
                />
              </FormControl>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder="Thêm thông tin khác" className="appointment-input my-[10px]" />
                )}
              />
            </DialogContent>
            <DialogContent sx={{ pl: 0, pr: 0, pt: '15px' }}>
              <Typography
                component={'h4'}
                sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#4db6ac',
                  mb: 1,
                }}
              >
                Ngày và Giờ thích hợp
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="appointment_date"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      {...field}
                      label="Chọn ngày và giờ"
                      sx={{
                        width: '100%',
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
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <MessageForm error={errors.appointment_date?.message} className="!mt-[5px] !text-[10px]" />
              <Box
                className="appointment-input h-auto"
                sx={{ mt: '10px', fontSize: '11px', fontWeight: '300', lineHeight: '20px !important', py: '2px' }}
              >
                Bằng cách nhấn nút Đăng ký hoặc nút gửi thông tin đi, tôi xác nhận đã đọc và đồng ý với các{' '}
                <Link to="/policy-and-privacy" className="text-third">
                  Chính Sách Quyền Riêng Tư.
                </Link>
              </Box>
            </DialogContent>
          </Box>
          <Box sx={{ mt: '10px' }}>
            <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
              Đăng ký
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '450px',
            position: 'relative',
          }}
        >
          <img src="/images/form-booking.webp" alt="" className="w-full h-full object-cover" />
          <Box onClick={handleToggle}>
            <CloseIcon className="absolute top-2 right-4 text-[40px] cursor-pointer text-gray-300 transition-all ease-linear hover:text-white" />
          </Box>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default ModalAppointment;
