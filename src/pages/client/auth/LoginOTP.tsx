import { ArrowLeft } from '@/components/icons';
import { Link } from 'react-router-dom';
import Input from '@/components/input';
import ButtonSocial from './components/ButtonSocial';
import { Button } from '@/components/button';

const LoginOTP = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f2f2f4]">
      <div className="flex w-full h-full border bg-white">
        <div className="w-2/4 pt-2 px-20 justify-center flex flex-col">
          <div className="size-full flex flex-col justify-between max-w-full">
            <div className="py-1 px-2 flex justify-between ">
              <Link to={'/'}>
                <img className="h-[40px] object-cover" src="/images/logo-example.webp" alt="" />
              </Link>
              <Link to={'/'} className="flex gap-2 items-center">
                <ArrowLeft className="!size-[16px] !text-dark" />
                <p className="text-dark text-[16px]">Quay lại</p>
              </Link>
            </div>

            <div className="flex justify-center items-center flex-col w-[65%] m-auto gap-5">
              <div className="flex justify-center items-start flex-col gap-3 mb-2 w-full">
                <h1 className="text-primaryText text-[20px] font-bold">Đăng nhập OTP</h1>
                <p className="text-[15px] text-third">Nhập email để nhận mã đăng nhập OTP.</p>
              </div>

              <form className="w-full">
                <div className="mb-4 flex flex-col gap-[6px]">
                  <label className="text-[15px] text-black font-medium" htmlFor="email">
                    Email:
                  </label>
                  <Input
                    name="email"
                    type="email"
                    className="h-[40px] text-[13px] !font-medium !text-black rounded-md bg-white border border-gray-300"
                    placeholder="Nhập Email ..."
                  />
                </div>

                <Button type="submit" className="bg-primaryText rounded-md w-full mt-3 h-[40px] text-[13px]">
                  Gửi mã
                </Button>
              </form>

              <div className="w-full flex items-center gap-2">
                <div className="h-[1px] w-full bg-gray-200"></div>
                <h3 className="text-dark opacity-70">or</h3>
                <div className="h-[1px] w-full bg-gray-200"></div>
              </div>

              <div className="w-full  mb-10">
                <ButtonSocial
                  type="button"
                  className="w-full mb-3 p-2 h-[40px] border-[2px] border-gray-200 rounded-md text-black font-medium"
                  image="/images/auth/google_icon.webp"
                >
                  Đăng nhập với Google
                </ButtonSocial>
              </div>

              <div className="flex flex-col w-full justify-center gap-1 text-[14px] text-[#141313a9]">
                <div className="w-full flex items-center justify-center gap-1">
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
            style={{ objectPosition: '60% 30%' }}
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
