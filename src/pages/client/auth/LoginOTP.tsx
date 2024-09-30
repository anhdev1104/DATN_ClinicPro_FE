import { ArrowLeft } from '@/components/icons';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/input';
import { Button, ButtonSocial } from '@/components/button';
import Label from '@/components/label';
import Field from '@/components/field';
import PosterAuth from './components/PosterAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MessageForm from '@/components/message/MessageForm';

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Trường này là bắt buộc !')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Email không dúng định dạng !' }),
});

const LoginOTP = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleLoginOTP: SubmitHandler<{ email: string }> = async data => {
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f2f2f4]">
      <div className="flex w-full h-full border bg-white">
        <div className="w-2/4 pt-2 px-20 justify-center flex flex-col">
          <div className="size-full flex flex-col max-w-full">
            <div className="py-1 px-2 flex justify-between ">
              <Link to={'/'}>
                <img className="h-[40px] object-cover" src="/images/logo-example.webp" alt="" />
              </Link>
              <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate(-1)}>
                <ArrowLeft className="!size-[16px] !text-dark mt-[2px]" />
                <p className="text-dark text-[16px]">Quay lại</p>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col w-[65%] mt-10 mx-auto gap-2">
              <div className="flex justify-center items-center flex-col gap-2 mb-2">
                <h1 className="text-primaryText text-[25px] uppercase font-bold">Đăng nhập OTP</h1>
                <p className="text-[13px] text-third">Đăng nhập để sử dụng dịch vụ từ chúng tôi một cách tốt nhất.</p>
              </div>
              <ButtonSocial type="button" image="/images/auth/google_icon.webp">
                Đăng nhập với Google
              </ButtonSocial>
              <div className="w-full flex items-center gap-2">
                <div className="h-[1px] w-full bg-gray-200"></div>
                <h3 className="text-dark opacity-70">or</h3>
                <div className="h-[1px] w-full bg-gray-200"></div>
              </div>
              <form className="w-full mb-3" onSubmit={handleSubmit(handleLoginOTP)}>
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-primaryText"
                    placeholder="Nhập địa chỉ email ..."
                    control={control}
                  />
                  <MessageForm error={errors.email?.message} />
                </Field>
                <Button
                  type="submit"
                  className="bg-primaryText rounded-md w-full mt-3 h-[40px]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Gửi mã
                </Button>
              </form>
              <div className="flex flex-col text-center gap-1 text-[14px] text-[#141313a9]">
                <div className="flex gap-1">
                  <p>Nếu chưa có tài khoản,</p>
                  <Link className="underline text-primaryText" to="/register">
                    đăng ký
                  </Link>
                  <p>tại đây!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PosterAuth />
      </div>
    </div>
  );
};

export default LoginOTP;
