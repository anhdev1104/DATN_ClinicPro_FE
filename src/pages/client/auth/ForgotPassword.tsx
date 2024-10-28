import { Link, useNavigate } from 'react-router-dom';
import PosterAuth from './components/PosterAuth';
import { motion } from 'framer-motion';
import BaseInput from '@/components/base/input';
import { Button } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '@/utils/locate';
import { useSelector } from '@/hooks/redux';
import { isEmailRegex } from '@/utils/utils';
import { forgotPassword } from '@/services/auth.service';
import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { IForgotPassWord, IForgotPassWordError } from '@/types/auth.type';
import ResetPassword from './ResetPassword';

const forgotPasswordSchema = yup.object({
  email: yup.string().required().ensure().matches(isEmailRegex, { message: 'Trường này phải là email' })
});
export type ForgotPassword = yup.InferType<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { loading } = useSelector(state => state.global);
  const [isSend, setIsSend] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit, setError, getValues } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onChange',
    disabled: loading,
    defaultValues: forgotPasswordSchema.cast({})
  });

  const handleSendEmail = useCallback(async (data: ForgotPassword) => {
    try {
      setIsLoading(true);
      const response = await forgotPassword<IForgotPassWord>(data);
      toast.success(response.message);
      setIsSend(true);
    } catch (error) {
      const axiosError = error as IForgotPassWordError;
      setError('email', { message: axiosError.error });
    } finally {
      setIsLoading(false);
    }
  }, []);

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
                opacity: 1
              }}
              className="my-10"
            >
              <div className="relative flex justify-center items-center gap-2 mb-2">
                <div
                  onClick={() => {
                    isSend === true ? setIsSend(false) : navigate(-1);
                  }}
                  className="absolute left-20 cursor-pointer"
                >
                  <ArrowLeft />
                </div>
                <div>
                  <h1 className="text-third text-[25px] uppercase font-bold">Quên mật khẩu</h1>
                  <p className="text-[13px] text-third">Nhập Email để lấy lại mật khẩu.</p>
                </div>
              </div>
              {!isSend ? (
                <form onSubmit={handleSubmit(handleSendEmail)} className="w-3/4 flex flex-col mx-auto space-y-2">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <BaseInput.Group
                          error={fieldState.error?.message}
                          className="my-2"
                          label="Email"
                          type="email"
                          placeholder="Nhập địa chỉ email ..."
                          {...field}
                        />
                      );
                    }}
                  />
                  <Button disabled={isLoading} loading={isLoading} type="submit">
                    Gửi
                  </Button>
                </form>
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
export default ForgotPassword;
