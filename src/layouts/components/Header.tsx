import { Button } from '@/components/button';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import HeaderInfo from './HeaderInfo';
import { ModalAppointment } from '@/components/modal';
import useToggle from '@/hooks/useToggle';

const menuList = [
  {
    id: 1,
    title: 'Về chúng tôi',
    path: '/about-us',
  },
  {
    id: 2,
    title: 'Mạng lưới',
    path: '/clinic-network',
  },
  {
    id: 3,
    title: 'Chuyên khoa',
    path: '',
  },
  {
    id: 4,
    title: 'Gói khám',
    path: '/parcel',
  },
  {
    id: 5,
    title: 'Thành tựu',
    path: '/awards',
  },
  {
    id: 6,
    title: 'Cộng đồng',
    path: '/community',
  },
];

const Header = () => {
  const auth = useSelector((state: RootState) => state.auth.data);
  const location = useLocation();
  const { show, handleToggle } = useToggle();

  return (
    <>
      <header className="py-4 fixed top-0 left-0 right-0 bg-white z-20">
        <div className="container-page flex justify-between items-center">
          <Link to={'/'} className="w-20 flex flex-col items-center">
            <img src="/images/logo.webp" alt="logo-clinicpro" className="w-full max-w-[3.4rem] h-full object-cover" />
            <h1 className="text-primary font-bold text-[18px]">ClinicPro</h1>
          </Link>
          <nav>
            <ul className="flex gap-10 items-center">
              {menuList.length > 0 &&
                menuList.map(nav => (
                  <li key={nav.id}>
                    <Link
                      to={nav.path}
                      className={`text-primary font-medium capitalize relative menu-item ${location.pathname === nav.path && 'before:w-full'}`}
                    >
                      {nav.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div className="flex gap-5 items-center">
            <Button type="button" className="capitalize" onClick={handleToggle}>
              Đặt lịch khám
            </Button>
            {auth?.access_token ? <HeaderInfo /> : <Link to={'/login'}>Đăng nhập</Link>}
          </div>
        </div>
      </header>
      <ModalAppointment show={show} handleToggle={handleToggle} />
    </>
  );
};

export default Header;
