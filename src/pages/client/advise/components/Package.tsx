import { Button } from '@/components/button';
import Image2 from '/images/2.webp';

export const Package = () => {
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