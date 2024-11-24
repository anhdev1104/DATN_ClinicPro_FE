import { Link, useNavigate } from 'react-router-dom';
import PosterAuth from './components/PosterAuth';
import { motion } from 'framer-motion';
import BaseInput from '@/components/base/input';
import { Button } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import yup from '@/helpers/locate';
import { forgotPassword } from '@/services/auth.service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { IForgotPassWord, IForgotPassWordError } from '@/types/auth.type';
import ResetPassword from './ResetPassword';
import former, { OptionsWithForm } from '@/providers/former';
import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import { Form } from '@/lib/Form';
import { emailRegex } from '@/constants/regex';
import { IconArrowLeft } from '@tabler/icons-react';

const forgotPasswordSchema = yup.object({
  email: yup.string().required().matches(emailRegex, { message: 'Trường này phải là email' }),
});
export type ForgotPassword = yup.InferType<typeof forgotPasswordSchema>;

// eslint-disable-next-line react-refresh/only-export-components
const ForgotPassword = () => {
  const {
    formState: { isValid, errors, disabled },
    setError,
    getValues,
  } = useFormContext<ForgotPassword>();
  const [isSend, setIsSend] = useState(false);
  const navigate = useNavigate();
  const handleSendEmail = async (data: ForgotPassword) => {
    if (!isValid) {
      const message = errors.email?.message;
      if (message) setError('email', { message: errors.email?.message as string });
      else toast.error('lỗi không xác định');
      return;
    }
    try {
      const response = await forgotPassword<IForgotPassWord>(data);
      toast.success(response.message);
      setIsSend(true);
    } catch (error) {
      const axiosError = error as IForgotPassWordError;
      if (!isSend) setError('email', { message: axiosError.error });
      else toast.error(axiosError.error);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-[#f2f2f4]">
        <div className="flex w-full h-full border bg-white">
          <div className="flex-1 p-8">
            <Link to={'/'} className="w-20 flex flex-col items-center">
              <img src="/images/logo.webp" alt="logo-clinicpro" className="size-3/4 object-cover" />
              <h1 className="text-[#116aef] font-bold text-[18px]">ClinicPro</h1>
            </Link>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              className="my-10"
            >
              <div className="relative flex justify-center items-center gap-2 mb-2">
                <div className="absolute left-20 cursor-pointer">
                  <BaseButton.Icon
                    onClick={() => {
                      isSend === true ? setIsSend(false) : navigate('/login');
                    }}
                    variant="subtle"
                    radius="lg"
                  >
                    <BaseIcon size="lg" icon={IconArrowLeft} />
                  </BaseButton.Icon>
                </div>
                <div>
                  <h1 className="text-third text-[25px] uppercase font-bold">Quên mật khẩu</h1>
                  <p className="text-[13px] text-third">Nhập Email để lấy lại mật khẩu.</p>
                </div>
              </div>
              {!isSend ? (
                <Form onSubmit={handleSendEmail} className="w-3/4 flex flex-col mx-auto space-y-2">
                  <BaseInput.Group
                    autoComplete="email"
                    name="email"
                    className="my-2"
                    label="Email"
                    type="email"
                    placeholder="Nhập địa chỉ email ..."
                  />
                  <Button disabled={disabled} loading={disabled} type="submit">
                    Gửi
                  </Button>
                </Form>
              ) : (
                <ResetPassword handleSendEmail={handleSendEmail} email={getValues('email')} />
              )}
            </motion.div>
          </div>
          <PosterAuth />
        </div>
      </div>
    </>
  );
};

const optionsWithForm: OptionsWithForm = {
  mode: 'onChange',
};

// eslint-disable-next-line react-refresh/only-export-components
export default former(ForgotPassword, forgotPasswordSchema, optionsWithForm);
