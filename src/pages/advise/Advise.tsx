import BannerImg from '@/assets/images/banner-goi-kham.webp';
// import Image1 from '@/assets/images/1.webp';
// import Image3 from '@/assets/images/3.webp';
import Image2 from '@/assets/images/2.webp';
import { Select } from '@/components';
import { Button } from '@/components/button';
const fakeData = [
  {
    name: 'Bệnh viện Hoàn Mỹ Sài Gòn',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Thủ Đức',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Đà Nẵng',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Cửu Long',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Sài Gòn',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Thủ Đức',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Đà Nẵng',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Cửu Long',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Sài Gòn',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Thủ Đức',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Đà Nẵng',
  },
  {
    name: 'Bệnh viện Hoàn Mỹ Cửu Long',
  },
];
const Package = () => {
  return (
    <>
      <div className='rounded-md group shadow-lg overflow-hidden border-2 border-white border-solid bg-[rgb(245,_247,_247)]'>
        <div className='h-52 w-full overflow-hidden'>
          <img className='h-full object-cover w-full cursor-pointer group-hover:scale-110 duration-1000 transition-all' src={Image2} alt="image" />
        </div>
        <div className='p-4 flex flex-col justify-between'>
          <h2 className='text-third text-lg font-semibold mb-2'>Sinh Mổ</h2>
          <p className='md:line-clamp-5 text-sm mb-4'>
            Gói trọn an tâm khi chọn Sinh mổ tại bệnh viện Hoàn Mỹ. Mẹ và bé sẽ nhận được hỗ trợ chăm sóc y tế toàn diện
            từ trước, trong và sau sinh. Tất cả gói trọn trong gói dịch vụ này.
          </p>
          <div>
            <Button type="button" className='py-1 text-sm !normal-case'>Tìm hiểu thêm</Button>
          </div>
        </div>
      </div>
    </>
  );
};
const AdvisePackage = () => {
  return (
    <>
      <div className="container px-4 sm:mx-auto pb-16">
        <h1 className="sm:pb-10 my-10 sm:border-b-2 sm:border-b-[#abdfe1] sm:border-solid text-third text-2xl md:text-3xl font-semibold">
          Khám Sức Khỏe
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-14">
          <Package />
          <Package />
          <Package />
        </div>
      </div>
    </>
  );
};
const Advise = () => {
  return (
    <>
      <div className="">
        <div className="relative">
          <h1 className="absolute top-2/4 left-10 -translate-y-2/4 font-semibold text-third text-lg sm:text-4xl">
            Gói Khám
          </h1>
          <img className="h-[30vh] md:h-auto w-full object-cover" src={BannerImg} alt="banner" />
        </div>
        <div>
          <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 w-11/12 sm:w-9/12 gap-y-2 md:gap-y-0 md:gap-x-2 mx-auto rounded-3xl bg-white px-10 py-10 shadow-[0px_30px_40px_#00405315] -translate-y-1/4">
            <div>
              <Select placeholder="Bệnh Viện hoặc Phòng Khám" data={fakeData} className='' />
            </div>
            <div className='col-span-2'>
              <Select placeholder="Bệnh Viện hoặc Phòng Khám" data={fakeData} className='' />
            </div>
          </div>
        </div>
        <div >
          <AdvisePackage />
          <AdvisePackage />
          <AdvisePackage />
        </div>
      </div>
    </>
  );
};
export default Advise;
