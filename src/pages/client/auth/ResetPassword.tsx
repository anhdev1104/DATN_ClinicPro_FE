import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { ForgotPassword } from './ForgotPassword';
import yup from '@/helpers/locate';
import { resetPassword } from '@/services/auth.service';
import BaseInput from '@/components/base/input';
import former from '@/lib/former';
import Form from '@/lib/Form';
import { Text } from '@mantine/core';
import { numberRegex } from '@/constants/regex';
import { Button } from '@/components/button';
import { resolveErrorResponse } from '@/helpers/utils';
import toast from 'react-hot-toast';

const resetPasswordSchema = yup.object({
  otp: yup.string().length(6).required(),
  password: yup.string().required().min(8),
});

export type ResetPassword = yup.InferType<typeof resetPasswordSchema>;
interface ResetPasswordProps {
  handleSendEmail: (data: ForgotPassword) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const ResetPassword: React.FC<ResetPasswordProps> = ({ handleSendEmail }) => {
  const {
    reset,
    formState: { disabled },
    setError,
  } = useFormContext<ResetPassword>();
  const navigate = useNavigate();

  const handleSendRequest = async (data: ResetPassword) => {
    try {
      const response = await resetPassword<{ message: string }>(data);
      toast.success(response.message);
      navigate('/login');
      reset();
    } catch (error) {
      resolveErrorResponse(error as ErrorResponse, setError);
    }
  };
  const handleResendOtp = async () => {
    if (!disabled) {
      handleSendEmail({ email: localStorage.getItem('email-reset') as string });
      localStorage.removeItem('email-reset');
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
      >
        <Form onSubmit={handleSendRequest} className="w-3/4 flex flex-col mx-auto space-y-2">
          <BaseInput.Pin
            name="otp"
            autoComplete="otp"
            length={6}
            type={numberRegex}
            inputType="tel"
            inputMode="numeric"
            oneTimeCode
            className="my-2 justify-center"
          />
          <BaseInput.Password
            autoComplete="password"
            name="password"
            placeholder="Nhập mật khẩu mới"
            className="my-2"
          />
          <Button
            type="submit"
            className="bg-third rounded-md w-full mt-3 h-[40px]"
            isLoading={disabled}
            disabled={disabled}
          >
            Đặt lại mật khẩu
          </Button>
          <Text size="sm" className="text-center select-none">
            Bạn muốn gửi lại mã OTP?
            <span onClick={handleResendOtp} className="text-blue-600 hover:underline cursor-pointer mx-1">
              gửi lại
            </span>
          </Text>
        </Form>
      </motion.div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default former(ResetPassword, resetPasswordSchema);
