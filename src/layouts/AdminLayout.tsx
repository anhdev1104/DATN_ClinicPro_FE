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
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
