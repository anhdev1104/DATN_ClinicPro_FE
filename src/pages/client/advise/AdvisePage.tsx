import BannerImg from '/images/banner-goi-kham.webp';

import Select from '@/components/select';
import { AdvisePackage } from './components/AdvisePackage';
import { useForm } from 'react-hook-form';
const packageData = [
  {
    label: 'Thai sản',
    value: 'Thai sản',
  },
  {
    label: 'Khám sức khoẻ',
    value: 'Khám sức khoẻ',
  },
  {
    label: 'Khám cơ xương',
    value: 'Khám cơ xương',
  },
  {
    label: 'Nhãn khoa',
    value: 'Nhãn khoa',
  },
  {
    label: 'Tai mũi họng',
    value: 'Tai mũi họng',
  },
];

const AdvisePage = () => {
  const { control } = useForm({
    mode: 'onChange',
  });

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
          <div className="flex-1">
            <Select placeholder="Gói khám" name="packageSearch" control={control} options={packageData} />
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
