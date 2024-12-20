import { ArrowLeft, VisibilityIcon, VisibilityOffIcon } from '@/components/icons';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/input';
import { Button, ButtonSocial } from '@/components/button';
import Label from '@/components/label';
import Field from '@/components/field';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IAccount } from '@/types/auth.type';
import MessageForm from '@/components/message/MessageForm';
import { AppDispatch } from '@/redux/store';
import { loginAuth } from '@/redux/auth/authThunk';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PosterAuth from './components/PosterAuth';
import useToggle from '@/hooks/useToggle';
import { emailRegex, passwordRegex } from '@/constants/regex';

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Trường này là bắt buộc !')
    .matches(emailRegex, { message: 'Email không đúng định dạng !' }),
  password: yup
    .string()
    .trim()
    .required('Mật khẩu không được để trống !')
    .min(8, 'Mật khẩu ít nhất 8 ký tự trở lên !')
    .matches(passwordRegex, { message: 'Mật khẩu ít nhất 1 chữ cái viết hoa và 1 ký tự đặt biệt!' }),
});

const LoginPage = () => {
  const { show, handleToggle } = useToggle();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const dispatch = useDispatch<AppDispatch>();
  const handleLogin: SubmitHandler<IAccount> = async dataLogin => {
    if (!isValid) return;
    const { payload } = await dispatch(loginAuth(dataLogin));
    if (payload.access_token) {
      toast.success('Đăng nhập thành công !', { position: 'top-right' });
      if (payload.data.role.name === 'patient') {
        navigate('/');
      } else {
        navigate('/dashboard');
      }
      reset();
    } else {
      toast.error(payload.response.data.message, { position: 'top-right' });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f2f2f4]">
      <div className="flex w-full h-full border bg-white">
        <div className="w-2/4 pt-2 px-20 justify-center flex flex-col">
          <div className="size-full flex flex-col max-w-full">
            <div className="py-1 px-2 flex justify-between ">
              <Link to={'/'} className="w-20 flex flex-col items-center">
                <img src="/images/logo.webp" alt="logo-clinicpro" className="size-3/4 object-cover" />
                <h1 className="text-[#116aef] font-bold text-[18px]">ClinicPro</h1>
              </Link>
              <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate(-1)}>
                <ArrowLeft className="!size-[16px] !text-dark mt-[2px]" />
                <p className="text-dark text-[16px]">Quay lại</p>
              </div>
            </div>

            <div className="flex justify-center items-center flex-col w-[65%] mt-10 mx-auto gap-2">
              <div className="flex justify-center items-center flex-col gap-2 mb-2">
                <h1 className="text-third text-[25px] uppercase font-bold">Đăng nhập tài khoản</h1>
                <p className="text-[13px] text-third">Đăng nhập để sử dụng dịch vụ từ chúng tôi một cách tốt nhất.</p>
              </div>
              <ButtonSocial type="button" image="/images/auth/google_icon.webp">
                Đăng nhập với Google
              </ButtonSocial>
              <div className="w-full flex items-center gap-2">
                <div className="h-[1px] w-full bg-gray-200"></div>
                <h3 className="text-dark opacity-70">hoặc</h3>
                <div className="h-[1px] w-full bg-gray-200"></div>
              </div>
              <form className="w-full mb-3 flex flex-col" autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Nhập địa chỉ email ..."
                    control={control}
                  />
                  <MessageForm error={errors.email?.message} />
                </Field>
                <Field className="relative">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    name="password"
                    type={show ? 'text' : 'password'}
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                    placeholder="Mật khẩu tối thiểu 8 kí tự ..."
                    control={control}
                  />
                  <div className="text-gray-400 top-8 right-4 cursor-pointer absolute" onClick={handleToggle}>
                    {!show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                  <MessageForm error={errors.password?.message} />
                </Field>
                <Link to="/forgot-password" className="text-end hover:text-third hover:underline">
                  Quên mật khẩu
                </Link>
                <Button
                  type="submit"
                  className="bg-third rounded-md w-full mt-3 h-[40px]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Đăng nhập
                </Button>
              </form>
              <div className="flex flex-col text-center gap-1 text-[14px] text-[#141313a9]">
                <div className="flex gap-1">
                  <p>Nếu chưa có tài khoản,</p>
                  <Link className="underline text-third" to="/register">
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

export default LoginPage;
