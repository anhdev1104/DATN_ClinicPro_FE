import { ArrowLeft } from '@/components/icons';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/input';
import { Button, ButtonSocial } from '@/components/button';
import Label from '@/components/label';
import Field from '@/components/field';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAccount } from '@/types/auth.type';
import MessageForm from '@/components/message';
import { registerService } from '@/services/auth.service';
import { toast } from 'react-toastify';

const schema = yup.object({
  fullname: yup.string().trim().required('Vui lòng nhập vào họ và tên !'),
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

  password_confirm: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), undefined], 'Mật khẩu xác nhận phải khớp với mật khẩu đã nhập !'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleRegister: SubmitHandler<IAccount> = async data => {
    if (!isValid) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_confirm, ...dataRegister } = data;
    const res = await registerService(dataRegister);
    if (res.errors) {
      toast.error(res.message, { position: 'top-right' });
    } else {
      toast.success(res.message, { position: 'top-right' });
    }
    reset();
  };
  console.log('🚀 ~ RegisterPage ~ errors:', errors);
  console.log('🚀 ~ RegisterPage ~ isSubmitting:', isSubmitting);

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
                <h1 className="text-primaryText text-[25px] uppercase font-bold">Đăng ký tài khoản</h1>
                <p className="text-[13px] text-third">Đăng ký để sử dụng dịch vụ từ chúng tôi một cách tốt nhất.</p>
              </div>
              <ButtonSocial type="button" image="/images/auth/google_icon.webp">
                Đăng nhập với Google
              </ButtonSocial>

              <div className="w-full flex items-center gap-2">
                <div className="h-[1px] w-full bg-gray-200"></div>
                <h3 className="text-dark opacity-70">or</h3>
                <div className="h-[1px] w-full bg-gray-200"></div>
              </div>

              <form className="w-full mb-3" onSubmit={handleSubmit(handleRegister)}>
                <Field>
                  <Label htmlFor="fullname">Họ và tên</Label>
                  <Input
                    name="fullname"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-primaryText"
                    placeholder="Nhập họ tên đầy đủ ..."
                    control={control}
                  />
                  <MessageForm error={errors.fullname?.message} />
                </Field>
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
                <Field>
                  <Label htmlFor="password_confirm">Xác nhận mật khẩu</Label>
                  <Input
                    name="password_confirm"
                    type="password"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-primaryText"
                    placeholder="Nhập lại mật khẩu ..."
                    control={control}
                  />
                  <MessageForm error={errors.password_confirm?.message} />
                </Field>
                <Button
                  type="submit"
                  className="bg-primaryText rounded-md w-full mt-7 h-[40px]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Đăng ký
                </Button>
              </form>

              <div className="flex gap-1 text-[14px] text-[#141313a9]">
                <p>Nếu đã có tài khoản,</p>
                <Link className="underline text-primaryText" to="/login">
                  đăng nhập
                </Link>
                <p>tại đây!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/4 relative">
          <img
            className="w-full h-full object-cover"
            style={{ objectPosition: '70% 30%' }}
            src="/images/banner-goi-kham.webp"
            alt=""
          />
          <div className="w-full h-auto max-w-[90%] mx-auto bg-[#acacac82] backdrop-blur-[1px] p-6 border-[0.5px] border-gray-200 text-white absolute bottom-0 left-[50%] translate-y-[-10%] translate-x-[-50%] flex flex-col gap-3">
            <div>
              <h1 className="text-white text-[20px] leading-[35px] font-semibold">
                "Chào mừng bạn đến với ClinicPro. Chúng tôi là mạng lưới chăm sóc sức khỏe tư nhân hàng đầu tại Việt
                Nam."
              </h1>
            </div>
            <div className="h-[0.5px] bg-white w-full"></div>

            <div className="w-full h-auto flex justify-between gap-2">
              <div className="flex-[0_0_50%]">
                <h1 className="mb-2 text-[17px]">ClinicPro Hospital</h1>
                <p className="text-[11px] text-white opacity-80">
                  575 Tôn Đức Thắng, Phường Hoà Khánh Nam, Quận Liên Chiển, TP Đà Nẵng
                </p>
              </div>

              <div className="flex-[0_0_50%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
