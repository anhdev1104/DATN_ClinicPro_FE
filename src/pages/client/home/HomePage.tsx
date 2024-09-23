import { Link } from 'react-router-dom';
import Banner from './components/Banner';
import FormSearchHome from './components/FormSearchHome';
import { ArrowRightAltIcon } from '@/components/icons';
import OurSpecialties from './components/OurSpecialties';

const HomePage = () => {
  return (
    <div className="mt-[106px]">
      <Banner />
      <FormSearchHome />
      <section className="bg-[#f5f7f7] pt-[125px] pb-[76px]">
        <div className="container-page">
          <div className="grid grid-cols-3 -mx-[15px]">
            <div className="px-[15px] flex flex-col justify-between mb-[30px]">
              <h2 className="leading-[42px] text-[32px] text-primary font-semibold">Chuyên khoa</h2>
              <p className="font-medium leading-[26px] text-dark my-3 block">
                Hoàn Mỹ cung cấp một loạt các dịch vụ và chuyên khoa lâm sàng toàn diện, kết hợp chuyên môn y khoa với
                công nghệ tiên tiến để mang lại dịch vụ chăm sóc chất lượng cao nhất cho bệnh nhân.
              </p>
              <Link to={''} className="text-sm leading-[27px] font-semibold text-primary flex gap-2">
                <span>Xem tất cả chuyên khoa</span>
                <span>
                  <ArrowRightAltIcon />
                </span>
              </Link>
            </div>
            <OurSpecialties />
          </div>
        </div>
      </section>
      <section className="py-[60px]">
        <h2 className="font-semibold text-[32px] text-center text-primary">Bác sĩ của chúng tôi</h2>
        <div className="pt-[62px]"></div>
      </section>
    </div>
  );
};

export default HomePage;
