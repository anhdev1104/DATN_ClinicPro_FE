import { ArrowLeft, ArrowRight, Star } from '@/components/icons';
import { Link } from 'react-router-dom';
import Input from '@/components/input';
import ButtonSocial from './components/ButtonSocial';
import { Button } from '@/components/button';

const RegisterPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f2f2f4]">
      <div className="flex  w-[100%] gap-[20%] h-full border bg-white">
        {/* Left */}
        <div className="flex-[0_0_40%] py-2 px-3 justify-center flex flex-col">
          <div className="size-full flex flex-col justify-between max-w-full">
            <div className="py-1 px-2 flex justify-between ">
              <img className="h-[40px] object-cover" src="/images/logo-example.webp" alt="" />

              <Link to={'/'} className="flex gap-2 items-center">
                <ArrowLeft className="!size-[15px] !text-dark" />
                <p className="text-dark text-[14px]">Quay Lại</p>
              </Link>
            </div>
            <div className="flex justify-center items-center flex-col w-[70%] m-auto gap-5">
              <div className="flex justify-center items-center flex-col gap-2">
                <h1 className="text-primaryText text-[20px] uppercase font-bold">Đăng kí tài khoản</h1>
                <p className="text-[10px] text-third">Đăng kí để sử dụng dịch vụ từ chúng tôi 1 cách tốt nhất.</p>
              </div>

              <div className="w-full">
                <ButtonSocial
                  className="w-full p-1 border-[2px] border-gray-200 rounded-md text-black font-medium"
                  image="/images/auth/google.jpg"
                >
                  Đăng nhập với Google
                </ButtonSocial>
                <ButtonSocial
                  className="w-full p-1 border-[2px] border-gray-200 rounded-md text-black font-medium"
                  image="/images/auth/facebook.jpg"
                >
                  Đăng nhập với Facebook
                </ButtonSocial>
              </div>

              <div className="w-full flex items-center gap-2">
                <div className="h-[1px] w-full bg-gray-200"></div>
                <h3 className="text-dark opacity-70">or</h3>
                <div className="h-[1px] w-full bg-gray-200"></div>
              </div>

              <form action="" className="w-full">
                <div className="mb-2 flex flex-col gap-1">
                  <label className="text-[12px] text-black font-medium" htmlFor="email">
                    Email:
                  </label>
                  <Input
                    identifier="email"
                    type="email"
                    className="h-[35px] text-[12px] !font-medium !text-black rounded-md bg-white border border-gray-300"
                    placeholder="Nhập Email ..."
                  />
                </div>
                <div className="mb-2 flex flex-col gap-1">
                  <label className="text-[12px] text-black font-medium" htmlFor="fullName">
                    Họ và tên:
                  </label>
                  <Input
                    identifier="fullName"
                    type="text"
                    className="h-[35px] text-[12px] !font-medium !text-black rounded-md bg-white border border-gray-300"
                    placeholder="Nhập họ và tên ..."
                  />
                </div>
                <div className="mb-2 flex flex-col gap-1">
                  <label className="text-[12px] text-black font-medium" htmlFor="password">
                    Mật khẩu:
                  </label>
                  <Input
                    identifier="password"
                    type="password"
                    className="h-[35px] text-[12px] !font-medium !text-black rounded-md bg-white border border-gray-300"
                    placeholder="Nhập mật khẩu ..."
                  />
                </div>

                <Button type="submit" className="bg-primaryText rounded-md w-full mt-3">
                  Đăng kí
                </Button>
              </form>

              <div className="flex gap-1 text-[12px] text-[#141313a9]">
                <p>Nếu đã có tài khoản,</p>
                <Link className="underline text-primaryText" to="/login">
                  đăng nhập
                </Link>
                <p>tại đây!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-[0_0_40%] relative">
          <img
            className="w-full h-full object-cover"
            style={{ objectPosition: '60% 30%' }}
            src="/images/auth/banner.jpg"
            alt=""
          />
          <div className="w-full h-auto max-w-[90%] mx-auto bg-[#c6c5c582] backdrop-blur-[1px] p-6 border-[0.5px] border-gray-200 text-white absolute bottom-0 left-[50%] translate-y-[-10%] translate-x-[-50%] flex flex-col gap-3">
            <div>
              <h1 className="text-white text-[18px] leading-[35px] font-semibold">
                "Chào mừng bạn đến với ClinicPro. Chúng tôi là mạng lưới chăm sóc sức khỏe tư nhân hàng đầu tại Việt
                Nam."
              </h1>
            </div>
            <div className="h-[0.5px] bg-white w-full"></div>

            <div className="w-full h-auto flex justify-between gap-2">
              <div className="flex-[0_0_50%]">
                <h1 className="mb-2">ClinicPro Hospital</h1>
                <p className="text-[9px] text-white opacity-80">
                  Tầng 11, Friendship Tower, 31 Lê Duẩn, Phường Bến Nghé, Quận 1, TP HCM
                </p>
              </div>

              <div className="flex-[0_0_50%]">
                <div className="flex justify-end mb-3">
                  <Star className="!size-[15px]" />
                  <Star className="!size-[15px]" />
                  <Star className="!size-[15px]" />
                  <Star className="!size-[15px]" />
                  <Star className="!size-[15px]" />
                </div>
                <div className="flex justify-end gap-3 items-center w-full">
                  <button className="relative text-white border-2 border-transparent rounded-full size-[40px] p-2 flex justify-center items-center cursor-pointer overflow-hidden">
                    <ArrowLeft className="!size-[25px]" />
                    <span className="clip-path-border absolute inset-0 border-2 border-white rounded-full animate-spin opacity-100 transition-opacity duration-300"></span>
                  </button>
                  <button className=" relative text-white border-2 border-transparent rounded-full size-[40px] p-2 flex justify-center items-center cursor-pointer overflow-hidden">
                    <ArrowRight className="!size-[25px]" />
                    <span className="clip-path-border absolute inset-0 border-2 border-white rounded-full animate-spin opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
