import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/home/HomePage';
import CommunityPage from '@/pages/community/CommunityPage';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

interface IRouter {
  path: string;
  element: () => JSX.Element;
  title: string;
}

const clientRouter: IRouter[] = [
  {
    path: '/',
    element: HomePage,
    title: 'ClinicPro',
  },
  {
    path: '/Community',
    element: CommunityPage,
    title: 'ClinicPro',
  },
];

export default function AppRouter() {
  const location = useLocation();

  // hàm xử lý hiển thị document title
  useEffect(() => {
    const route = clientRouter.find(route => {
      const routePath = route.path.replace(/:\w+/g, '');
      return location.pathname.startsWith(routePath);
    });
    if (route && route.title) {
      document.title = route.title;
    }
  }, [location]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {clientRouter.length > 0 &&
          clientRouter.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
      </Route>
    </Routes>
  );
}
