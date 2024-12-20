import { LogoutIcon, MenuIcon } from '@/components/icons';
import Input from '@/components/input';
import { authLogout } from '@/redux/auth/authSlice';
import { RootState } from '@/redux/store';
import { logoutService } from '@/services/auth.service';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const hoverIcon: string =
  'p-2 transition-all duration-300 ease-linear rounded-full hover:bg-primaryAdmin/5 cursor-pointer';

const Topbar: FC<{ handleToggle: () => void }> = ({ handleToggle }) => {
  return (
    <header
      className="px-5 py-3 fixed top-0 left-0 right-0 bg-white z-50"
      style={{ boxShadow: '0px 0px 14px rgba(204, 204, 204, 0.25)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="clinicpro-logo" width={35} height={35} />
            <h1 className="text-primaryAdmin text-xl font-semibold">ClinicPro</h1>
          </Link>
          <div className="flex items-center gap-7 ml-[55px]">
            <div className={hoverIcon} onClick={handleToggle}>
              <MenuIcon className="text-primaryAdmin " />
            </div>
            <SearchAdmin />
          </div>
        </div>
        <AccountManagement />
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
        className="text-primaryAdmin border-none"
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm thông tin ..."
        control={control}
      />
    </form>
  );
}

function AccountManagement() {
  const auth = useSelector((state: RootState) => state.auth.data);
  const dispatch = useDispatch();

  const handleLogoutUser = async () => {
    await logoutService();
    dispatch(authLogout());
  };

  return (
    <div className="flex items-center gap-10">
      {/* <div className={`cursor-pointer p-1 relative ${hoverIcon}`}>
        <NotificationsIcon className="text-primaryAdmin" />
        <div className="flex items-center justify-center bg-red-500 rounded-full w-4 h-4 text-xs text-white absolute right-[2px] top-1">
          1
        </div>
      </div> */}
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 cursor-pointer">
          <div className="flex flex-col text-right">
            <span className="font-bold ">{auth?.data.user_info.fullname}</span>
            <span className="text-gray-400 text-xs mt-1">{auth?.data.role.description}</span>
          </div>
          <div className="w-10 rounded-[14px] overflow-hidden">
            <img src={auth?.data.user_info.avatar} alt="avartar-" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="p-1 ml-3" title="Đăng xuất" onClick={handleLogoutUser}>
          <LogoutIcon className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
