import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { useEffect } from 'react';
import useToggle from '@/hooks/useToggle';

const AdminLayout = () => {
  const { show, handleToggle } = useToggle();

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.setProperty('background', 'linear-gradient(0deg, #3335480D, #3335480D), #FFFFFF');
    }
  }, []);

  return (
    <>
      <Topbar handleToggle={handleToggle} />
      <Sidebar show={show} />
      <main
        className={`${!show ? 'md:ml-[250px] transition-all duration-300 ease-linear' : 'md:ml-0 transition-all duration-300 ease-linear'} mt-[72px] px-[30px] pt-[30px] min-h-screen`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
