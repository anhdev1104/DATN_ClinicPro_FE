import { ChevronRightIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';

const Prescriptions = () => {
  return (
    <div>
      <div className="text-primaryAdmin flex items-center text-base mb-10">
        <h2>Quản lý đơn thuốc</h2>
        <ChevronRightIcon fontSize="small" className="mx-2" />
        <span className="text-primaryAdmin">Đơn thuốc</span>
      </div>
      <div className="flex bg-white size-full p-[20px] rounded-[26px]">
        <div>
          <div className="mb-6 flex items-center justify-center gap-3">
            <div>
              <h1 className="text-[18px] text-black font-medium">Danh sách đơn thuốc</h1>
            </div>
            <SearchAdmin />
            <Link
              to={'/add-prescriptions'}
              className="text-[18px] text-black font-medium gap-3 border-borderColor border p-3 rounded-lg bg-[#f3f4f7]"
            >
              <img
                src="https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/plus.svg"
                alt="Add Department"
                className="text-cyan-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function SearchAdmin() {
  const { control } = useForm({
    mode: 'onChange',
  });
  return (
    <form className="w-[300px]">
      <Input
        name="searchadmin"
        className="text-primaryAdmin pl-10 border-none"
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm thông tin ..."
        control={control}
      />
    </form>
  );
}

export default Prescriptions;
