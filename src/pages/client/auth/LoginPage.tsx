import { ArrowLeft } from '@/components/icons';
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

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Trường này là bắt buộc !')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Email không dúng định dạng !' }),
  password: yup
    .string()
    .trim()
    .required('Mật khẩu không được để trống !')
    .min(6, 'Mật khẩu ít nhất 6 ký tự trở lên !')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Mật khẩu phải chứa ít nhất một số và một ký tự đặc biệt !',
    ),
});

const LoginPage = () => {
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
    const res = await dispatch(loginAuth(dataLogin));
    if (res.payload.access_token) {
      toast.success('Đăng nhập thành công !', { position: 'top-right' });
      navigate('/');
    } else {
      toast.error(res.payload.error, { position: 'top-right' });
    }
    reset();
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
                <h1 className="text-primaryText text-[25px] uppercase font-bold">Đăng nhập tài khoản</h1>
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
              <form className="w-full mb-3" onSubmit={handleSubmit(handleLogin)}>
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
                <Field>
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    name="password"
                    type="password"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-primaryText"
                    placeholder="Mật khẩu tối thiểu 6 kí tự ..."
                    control={control}
                  />
                  <MessageForm error={errors.password?.message} />
                </Field>
                <Button
                  type="submit"
                  className="bg-primaryText rounded-md w-full mt-3 h-[40px]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Đăng nhập
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
                <div>
                  <Link className="underline text-primaryText" to="/login-otp">
                    Đăng nhập OTP?
                  </Link>
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
