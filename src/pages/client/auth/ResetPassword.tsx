import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from '@/hooks/redux';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPassword } from './ForgotPassword';
import yup from '@/utils/locate';
import { resetPassword } from '@/services/auth.service';
import BaseInput from '@/components/base/input';
import { regexAllowTypeNumber } from '@/utils/utils';
import { Button, Text } from '@mantine/core';
import { toast } from 'react-toastify';
import { IResetPassword, IResetPasswordError } from '@/types/auth.type';

const resetPasswordSchema = yup.object({
  otp: yup.string().min(6).max(6).length(6).default('').required(),
  password: yup.string().ensure().required().min(8)
});

export type ResetPassword = yup.InferType<typeof resetPasswordSchema>;
interface ResetPasswordProps {
  handleSendEmail: (data: ForgotPassword) => void;
  email: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ handleSendEmail, email }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loading } = useSelector(state => state.global);
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    disabled: loading,
    defaultValues: resetPasswordSchema.cast({})
  });
  const handleSendRequest = async (data: ResetPassword) => {
    try {
      setIsLoading(true);
      const response = await resetPassword<IResetPassword>(data);
      toast.success(response.message);
      navigate('/login');
      reset();
    } catch (error) {
      const axiosError = error as IResetPasswordError;
      toast.error(axiosError.error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendOtp = async () => {
    if (!loading) handleSendEmail({ email });
  };
  return (
    <>
      <motion.form
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        onSubmit={handleSubmit(handleSendRequest)}
        className="w-3/4 flex flex-col mx-auto space-y-2"
      >
        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <BaseInput.Pin
                length={6}
                error={fieldState.invalid}
                type={regexAllowTypeNumber}
                inputType="tel"
                inputMode="numeric"
                oneTimeCode
                className="my-2 justify-center"
                {...field}
              />
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <BaseInput.Password
                error={fieldState.error?.message}
                placeholder="nhập mật khẩu mới"
                className="my-2"
                {...field}
              />
            );
          }}
        />
        <Button disabled={isLoading} loading={isLoading} type="submit">
          Gửi
        </Button>
        <Text size="sm" className="text-center select-none">
          tôi chưa nhận được mã
          <span onClick={handleResendOtp} className="text-blue-600 hover:underline cursor-pointer mx-1">
            gửi lại
          </span>
        </Text>
      </motion.form>
    </>
  );
};

export default memo(ResetPassword);
