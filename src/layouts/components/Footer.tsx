import Field from '@/components/field';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary pt-[186px] pb-[139px] text-white !font-light">
      <div className="container-page !px-[15px]">
        <div className="grid grid-cols-[1fr_400px_1fr] -mx-[10px]">
          <div className="px-[15px]">
            <div className="w-max block bg-white px-5 py-2 rounded-md">
              <Link to={'/'} className="w-20 flex flex-col items-center">
                <img src="/images/logo.webp" alt="logo-clinicpro" className="w-full h-full object-cover" />
                <h1 className="text-[#116aef] font-bold text-[18px]">ClinicPro</h1>
              </Link>
            </div>
            <div className="my-6 leading-7">
              575 Tôn Đức Thắng, Phường Hoà Khánh Nam, <br /> Quận Liên Chiển, TP Đà Nẵng
            </div>
            <p>Tel: 0395 787 557</p>
          </div>
          <div className="grid grid-cols-2">
            <div className="pr-[15px]">
              <ul className="flex flex-col gap-5">
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={'/ve-chung-toi'} className="capitalize transition-all duration-300 ease-linear">
                    Về chúng tôi
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Mạng lưới
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Bác sĩ
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Tuyển dụng
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Cộng đồng
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Đào tạo & huấn luyện
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pr-[15px]">
              <ul className="flex flex-col gap-5">
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Nghiên cứu & cải tiến
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Tin tức
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Trung tâm xét nghiệm
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Chính sách quà tặng
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Chính sách quyền riêng tư
                  </Link>
                </li>
                <li className=" transition-all duration-300 ease-linear hover:translate-x-[5px]">
                  <Link to={''} className="capitalize transition-all duration-300 ease-linear">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-[15px] flex flex-col justify-between">
            <h2 className="text-xl font-medium">#tantamchamsoc</h2>
            <div>
              <span className="block mb-4">Theo dõi bản tin của chúng tôi</span>
              <form>
                <Field className="border border-white rounded-[100rem] justify-between items-center flex">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="bg-transparent text-white placeholder:text-white outline-none py-2 pl-6 flex-1 pr-4"
                  />
                  <button
                    type="submit"
                    className="bg-white text-dark px-4 py-2 rounded-[100rem] font-bold hover:scale-110 transition-all ease-linear duration-300"
                  >
                    Đăng ký
                  </button>
                </Field>
              </form>
            </div>
          </div>
        </div>
        <div className="h-[0.5px] bg-white my-10"></div>
        <div className="flex items-center gap-5 justify-between">
          <span className="block">Quản lý Cookies | Copyright 2024 © Future Coders Teams</span>
          <div className="flex items-center gap-5 justify-between">
            <span>Kết nối với chúng tôi</span>
            <div className="flex gap-5 items-center justify-between">
              <Link to={''} className="hover:scale-110 transition-all">
                <img src="/images/fb-icon.svg" alt="icon-fb" className="w-5" />
              </Link>
              <Link to={''} className="hover:scale-110 transition-all">
                <img src="/images/youtube-icon.svg" alt="icon-fb" className="w-[31px]" />
              </Link>
              <Link to={''} className="hover:scale-110 transition-all">
                <img src="/images/linkedin-icon-18-256.png" alt="icon-fb" className="w-[22px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
