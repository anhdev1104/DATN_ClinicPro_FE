import { Button } from '@/components/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="py-5 fixed top-0 left-0 right-0 bg-white z-20">
      <div className="container-page flex justify-between items-center">
        <Link to={'/'} className="w-20 block">
          <img src="/images/logo-example.webp" alt="logo-clinicpro" className="w-full h-full object-cover" />
        </Link>
        <nav>
          <ul className="flex gap-10 items-center">
            <li>
              <Link to={''} className="text-primary font-medium capitalize relative menu-item">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link to={''} className="text-primary font-medium capitalize relative menu-item">
                Mạng lưới
              </Link>
            </li>
            <li>
              <Link to={''} className="text-primary font-medium capitalize relative menu-item">
                Chuyên khoa
              </Link>
            </li>
            <li>
              <Link to={'/goi-kham'} className="text-primary font-medium capitalize relative menu-item">
                Gói khám
              </Link>
            </li>
            <li>
              <Link to={'/thanh-tuu'} className="text-primary font-medium capitalize relative menu-item">
                Thành tựu
              </Link>
            </li>
            <li>
              <Link to={''} className="text-primary font-medium capitalize relative menu-item">
                Cộng đồng
              </Link>
            </li>
          </ul>
        </nav>
        <Button type="button">Đặt lịch khám</Button>
      </div>
    </header>
  );
};

export default Header;
