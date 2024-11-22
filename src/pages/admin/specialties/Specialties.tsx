import DirectRoute from '@/components/direct';
import { AddIcon } from '@/components/icons';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import Select from '@/components/select';

const SearchOptions = [
  {
    label: 'Theo mã ',
    value: 'Theo mã ',
  },
  {
    label: 'Theo mã người bệnh',
    value: 'Theo mã người bệnh',
  },
];

const Specialtie = () => {
  return (
    <>
      <DirectRoute nav="Quản lý chuyên khoa" subnav="Chuyên khoa" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 w-full flex items-center justify-between gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Danh sách bệnh án</h1>
          </div>
          <div className="flex justify-center items-center gap-3">
            <button
              // onClick={navigate}
              className="text-[18px] font-medium gap-3 border-borderColor border p-2 rounded-lg bg-[#f3f4f7]"
            >
              <AddIcon className="text-primaryAdmin" />
            </button>
            <SpecialtiesSearch />
          </div>
        </div>
      </div>
    </>
  );
};

function SpecialtiesSearch() {
  const { control } = useForm({
    mode: 'onChange',
  });
  return (
    <form className="relative flex gap-5 items-center">
      <Input
        name="searchadmin"
        className="!text-[unset] border-none !h-10 !font-light"
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm chuyên khoa ..."
        control={control}
      />
      <Select name="searchPrescription" placeholder="Bộ lọc chuyên khoa" options={SearchOptions} control={control} />
    </form>
  );
}

export default Specialtie;
