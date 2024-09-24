import { ArrowLeft } from '@/components/icons';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/input';
import { Button, ButtonSocial } from '@/components/button';
import Label from '@/components/label';
import Field from '@/components/field';

const LoginOTP = () => {
  const navigate = useNavigate();
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

              <form action="" className="w-full mb-3">
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-primaryText"
                    placeholder="Nhập địa chỉ email ..."
                  />
                </Field>
                <Button type="submit" className="bg-primaryText rounded-md w-full mt-3 h-[40px]">
                  Gửi mã
                </Button>
              </form>

              <div className="flex flex-col text-center gap-1 text-[14px] text-[#141313a9]">
                <div className="flex gap-1">
                  <p>Nếu chưa có tài khoản,</p>
                  <Link className="underline text-primaryText" to="/register">
                    đăng kí
                  </Link>
                  <p>tại đây!</p>
                </div>
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
          <div className="w-full h-auto max-w-[90%] mx-auto bg-[#c6c5c582] backdrop-blur-[1px] p-6 border-[0.5px] border-gray-200 text-white absolute bottom-0 left-[50%] translate-y-[-10%] translate-x-[-50%] flex flex-col gap-3">
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
                  Tầng 11, Friendship Tower, 31 Lê Duẩn, Phường Bến Nghé, Quận 1, TP HCM
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

export default LoginOTP;
