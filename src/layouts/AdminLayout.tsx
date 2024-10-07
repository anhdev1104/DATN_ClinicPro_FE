import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { useEffect } from 'react';

const AdminLayout = () => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.setProperty('background', 'linear-gradient(0deg, #3335480D, #3335480D), #FFFFFF');
    }
  }, []);
  return (
    <>
      <Topbar />
      <Sidebar />
      <main className="ml-[250px] mt-[72px] px-[30px] pt-[30px] min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
