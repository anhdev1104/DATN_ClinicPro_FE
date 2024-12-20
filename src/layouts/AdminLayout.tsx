import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { useEffect, useState } from 'react';
import useToggle from '@/hooks/useToggle';
import ProtectedRoute from '@/components/auth';
import { http } from '@/helpers/http';

const AdminLayout = () => {
  const { show, handleToggle } = useToggle();
  const [auth, setAuthRole] = useState<any>();
  console.log('🚀 ~ AdminLayout ~ auth:', auth);

  useEffect(() => {
    (async () => {
      const { data } = await http.get('https://sugar.id.vn/api/v1/auth/profile-permission');

      setAuthRole(data.role.permissions);
    })();
  }, []);
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.setProperty('background', 'linear-gradient(0deg, #3335480D, #3335480D), #FFFFFF');
    }
  }, []);

  return (
    <ProtectedRoute>
      <Topbar handleToggle={handleToggle} />
      <Sidebar show={show} auth={auth} />
      <main
        className={`${!show ? 'ml-[250px] transition-all duration-300 ease-linear' : 'ml-0 transition-all duration-300 ease-linear'} mt-[72px] px-[30px] py-[30px] min-h-screen box-border min-w-fit max-w-full`}
      >
        <Outlet />
      </main>
    </ProtectedRoute>
  );
};

export default AdminLayout;
