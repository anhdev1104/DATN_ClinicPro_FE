/* eslint-disable react-refresh/only-export-components */
import { Link, useNavigate } from 'react-router-dom';
import PosterAuth from './components/PosterAuth';
import { motion } from 'framer-motion';
import BaseInput from '@/components/base/input';
import { useFormContext } from 'react-hook-form';
import yup from '@/helpers/locate';
import { forgotPassword } from '@/services/auth.service';
import { useState } from 'react';
import { Form, former } from '@/lib/form';
import { ArrowLeft } from '@/components/icons';
import { Button } from '@/components/button';
import { resolveErrorResponse } from '@/helpers/utils';
import toast from 'react-hot-toast';
import ResetPassword from './ResetPassword';

const forgotPasswordSchema = yup.object({
  email: yup.string().email().required(),
});
export type ForgotPassword = yup.InferType<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const {
    formState: { isSubmitting },
    setError,
    reset,
    getValues,
  } = useFormContext<ForgotPassword>();
  const [isSend, setIsSend] = useState(false);
  const navigate = useNavigate();
  const handleSendEmail = async ({ email }: ForgotPassword) => {
    try {
      const response = await forgotPassword<{ message: string }>({ email });
      reset({ email });
      toast.success(response.message);
      setIsSend(true);
    } catch (errors) {
      resolveErrorResponse(errors as ErrorResponse, setError);
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
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => (isSend ? setIsSend(false) : navigate(-1))}
              >
                <ArrowLeft className="!size-[16px] !text-dark mt-[2px]" />
                <p className="text-dark text-[16px]">Quay lại</p>
              </div>
            </div>
            {!isSend ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0.7 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                className="my-10"
              >
                <div className="relative flex justify-center items-center gap-2 mb-2">
                  <div className="text-center">
                    <h1 className="text-third text-[25px] uppercase font-bold mb-2">Quên Mật khẩu</h1>
                    <p className="ml-3 text-[13px] text-third">Nhập Email để lấy lại mật khẩu</p>
                  </div>
                </div>

                <Form withAutoValidate onSubmit={handleSendEmail} className="w-3/4 flex flex-col mx-auto space-y-2">
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
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Gửi
                  </Button>
                </Form>
              </motion.div>
            ) : (
              <ResetPassword handleSendEmail={handleSendEmail} email={getValues('email')} />
            )}
          </div>
          <PosterAuth />
        </div>
      </div>
    </>
  );
};
export default former(ForgotPassword, forgotPasswordSchema, {
  mode: 'onChange',
});
