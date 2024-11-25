import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { ForgotPassword } from './ForgotPassword';
import yup from '@/helpers/locate';
import { resetPassword } from '@/services/auth.service';
import BaseInput from '@/components/base/input';
import { toast } from 'react-toastify';
import { IResetPassword, IResetPasswordError } from '@/types/auth.type';
import former from '@/providers/former';
import Form from '@/lib/Form';
import BaseButton from '@/components/base/button';
import { Text } from '@mantine/core';
import { numberRegex } from '@/constants/regex';

const resetPasswordSchema = yup.object({
  otp: yup.string().length(6).required(),
  password: yup.string().required().min(8),
});

export type ResetPassword = yup.InferType<typeof resetPasswordSchema>;
interface ResetPasswordProps {
  handleSendEmail: (data: ForgotPassword) => void;
  email: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const ResetPassword: React.FC<ResetPasswordProps> = ({ handleSendEmail, email }) => {
  const {
    reset,
    formState: { disabled },
  } = useFormContext<ResetPassword>();
  const navigate = useNavigate();
  const handleSendRequest = async (data: ResetPassword) => {
    try {
      const response = await resetPassword<IResetPassword>(data);
      toast.success(response.message);
      navigate('/login');
      reset();
    } catch (error) {
      const axiosError = error as IResetPasswordError;
      toast.error(axiosError.error);
    }
  };
  const handleResendOtp = async () => {
    if (!disabled) handleSendEmail({ email });
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
            placeholder="nhập mật khẩu mới"
            className="my-2"
          />
          <BaseButton disabled={disabled} loading={disabled} type="submit">
            Gửi
          </BaseButton>
          <Text size="sm" className="text-center select-none">
            tôi chưa nhận được mã
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
