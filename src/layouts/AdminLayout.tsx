import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminLayout = () => {
  return (
    <>
      <Topbar />
      <main>
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
