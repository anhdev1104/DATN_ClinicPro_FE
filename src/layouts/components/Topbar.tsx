import { LogoutIcon, MenuIcon, NotificationsIcon } from '@/components/icons';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';

const Topbar = () => {
  return (
    <header
      className="px-5 py-3 fixed top-0 left-0 right-0 bg-white"
      style={{ boxShadow: '0px 0px 14px rgba(204, 204, 204, 0.25)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="flex items-center gap-3">
            <img
              src="https://preclinic.dreamstechnologies.com/html/template/assets/img/logo.png"
              alt="clinicpro-logo"
              width={35}
              height={35}
            />
            <h1 className="text-primaryAdmin text-xl">ClinicPro</h1>
          </div>
          <div className="flex items-center gap-7 ml-10">
            <MenuIcon className="text-primaryAdmin cursor-pointer" />
            <SearchAdmin />
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="cursor-pointer p-1 relative">
            <NotificationsIcon className="text-primaryAdmin" />
            <div className="flex items-center justify-center bg-red-500 rounded-full w-4 h-4 text-xs text-white absolute -right-[1px] top-0">
              1
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col text-right">
              <span className="font-bold ">Bùi Hoàng Anh</span>
              <span className="text-gray-400 text-xs mt-1">Admin</span>
            </div>
            <div className="w-10 rounded-[14px] overflow-hidden cursor-pointer">
              <img
                src="https://avatars.githubusercontent.com/u/121429011?v=4"
                alt="avartar-"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-1 ml-3" title="Đăng xuất">
              <LogoutIcon className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </header>
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
        className="text-current pl-10 border-none"
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm thông tin ..."
        control={control}
      />
    </form>
  );
}

export default Topbar;
