import BannerImg from '/images/banner-goi-kham.webp';

import Select from '@/components/select';
import { AdvisePackage } from './components/AdvisePackage';
import { useForm } from 'react-hook-form';

const transformedData = [
  {
    label: 'Phòng khám ClinicPro Sài Gòn',
    value: 'Phòng khám ClinicPro Sài Gòn'
  },
  {
    label: 'Phòng khám ClinicPro Thủ Đức',
    value: 'Phòng khám ClinicPro Thủ Đức'
  },
  {
    label: 'Phòng khám ClinicPro Đà Nẵng',
    value: 'Phòng khám ClinicPro Đà Nẵng'
  },
  {
    label: 'Phòng khám ClinicPro Cửu Long',
    value: 'Phòng khám ClinicPro Cửu Long'
  },
  {
    label: 'Phòng khám ClinicPro Sài Gòn',
    value: 'Phòng khám ClinicPro Sài Gòn'
  },
  {
    label: 'Phòng khám ClinicPro Thủ Đức',
    value: 'Phòng khám ClinicPro Thủ Đức'
  },
  {
    label: 'Phòng khám ClinicPro Đà Nẵng',
    value: 'Phòng khám ClinicPro Đà Nẵng'
  },
  {
    label: 'Phòng khám ClinicPro Cửu Long',
    value: 'Phòng khám ClinicPro Cửu Long'
  },
  {
    label: 'Phòng khám ClinicPro Sài Gòn',
    value: 'Phòng khám ClinicPro Sài Gòn'
  },
  {
    label: 'Phòng khám ClinicPro Thủ Đức',
    value: 'Phòng khám ClinicPro Thủ Đức'
  },
  {
    label: 'Phòng khám ClinicPro Đà Nẵng',
    value: 'Phòng khám ClinicPro Đà Nẵng'
  },
  {
    label: 'Phòng khám ClinicPro Cửu Long',
    value: 'Phòng khám ClinicPro Cửu Long'
  }
];

const AdvisePage = () => {
  const { control } = useForm({ mode: 'onChange' });

  return (
    <>
      <div className="relative">
        <img className="h-[30vh] md:h-auto w-full object-cover" src={BannerImg} alt="banner" />
        <div className="container-page absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 font-semibold text-third text-lg sm:text-6xl">
          <h1>Gói Khám</h1>
        </div>
      </div>
      <div className="container-page">
        <div className="w-full flex gap-y-2 max-md:flex-col md:gap-x-2 rounded-3xl bg-white px-10 py-10 shadow-[0px_30px_40px_#00405315] -translate-y-1/4">
          <div className="min-w-[330px]">
            <Select
              name=""
              control={control}
              placeholder="Bệnh Viện hoặc Phòng Khám"
              options={transformedData}
              className=""
            />
          </div>
          <div className="flex-1">
            <Select
              name=""
              control={control}
              placeholder="Bệnh Viện hoặc Phòng Khám"
              options={transformedData}
              className=""
            />
          </div>
        </div>
      </div>
      <div>
        <AdvisePackage />
        <AdvisePackage />
        <AdvisePackage />
      </div>
    </>
  );
};
export default AdvisePage;
