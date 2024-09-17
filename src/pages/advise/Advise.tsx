import BannerImg from '/images/banner-goi-kham.webp';

import Select from '@/components/select';
import { AdvisePackage } from './components/AdvisePackage';
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
