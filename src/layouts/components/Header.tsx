import { Button } from '@/components/button';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import HeaderInfo from './HeaderInfo';

const menuList = [
  {
    id: 1,
    title: 'Về chúng tôi',
    path: '/about-us'
  },
  {
    id: 2,
    title: 'Mạng lưới',
    path: '/clinic-network'
  },
  {
    id: 3,
    title: 'Chuyên khoa',
    path: ''
  },
  {
    id: 4,
    title: 'Gói khám',
    path: '/parcel'
  },
  {
    id: 5,
    title: 'Thành tựu',
    path: '/awards'
  },
  {
    id: 6,
    title: 'Cộng đồng',
    path: '/community'
  }
];

const Header = () => {
  const auth = useSelector((state: RootState) => state.auth.data);
  const location = useLocation();

  return (
    <header className="py-5 fixed top-0 left-0 right-0 bg-white z-20">
      <div className="container-page flex justify-between items-center">
        <Link to={'/'} className="w-20 block">
          <img src="/images/logo-example.webp" alt="logo-clinicpro" className="w-full h-full object-cover" />
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
          <Button type="button" className="capitalize">
            Đặt lịch khám
          </Button>
          {auth?.access_token ? <HeaderInfo /> : <Link to={'/login'}>Đăng nhập</Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;
