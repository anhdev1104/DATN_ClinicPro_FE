/* eslint-disable react-refresh/only-export-components */
import { Link, useNavigate } from 'react-router-dom';
import PosterAuth from './components/PosterAuth';
import { motion } from 'framer-motion';
import BaseInput from '@/components/base/input';
import { useFormContext } from 'react-hook-form';
import yup from '@/helpers/locate';
import { forgotPassword } from '@/services/auth.service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { IForgotPassWord, IForgotPassWordError } from '@/types/auth.type';
import ResetPassword from './ResetPassword';
import former, { OptionsWithForm } from '@/lib/former';
import Form from '@/lib/Form';
import { ArrowLeft } from '@/components/icons';
import { Button } from '@/components/button';

const forgotPasswordSchema = yup.object({
  email: yup.string().email().required(),
});
export type ForgotPassword = yup.InferType<typeof forgotPasswordSchema>;

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
      else toast.error('Lỗi không xác định!');
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
          <div className="flex-1 px-20 pt-2">
            <div className="flex justify-between mt-1 mx-2">
              <Link to={'/'} className="w-20 flex flex-col items-center">
                <img src="/images/logo.webp" alt="logo-clinicpro" className="size-3/4 object-cover" />
                <h1 className="text-[#116aef] font-bold text-[18px]">ClinicPro</h1>
              </Link>
              <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate(-1)}>
                <ArrowLeft className="!size-[16px] !text-dark mt-[2px]" />
                <p className="text-dark text-[16px]">Quay lại</p>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              className="my-10"
            >
              <div className="flex justify-center items-center mb-2">
                <div>
                  <h1 className="text-third text-[25px] uppercase font-bold mb-2">Quên mật khẩu</h1>
                  <p className="ml-3 text-[13px] text-third">Nhập Email để lấy lại mật khẩu.</p>
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
                  <Button
                    type="submit"
                    className="bg-third rounded-md w-full mt-3 h-[40px]"
                    isLoading={disabled}
                    disabled={disabled}
                  >
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

export default former(ForgotPassword, forgotPasswordSchema, optionsWithForm);
