import { Button } from '@/components/button';
import { HeaderNavigation } from '@/config/config';
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
            {HeaderNavigation.map((navigation, index) => (
              <li key={index}>
                <Link to={navigation.href} className="text-primary font-medium capitalize relative menu-item">
                  {navigation.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button type="button">Đặt lịch khám</Button>
      </div>
    </header>
  );
};

export default Header;
