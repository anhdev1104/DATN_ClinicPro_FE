import MainLayout from '@/layouts/MainLayout';
import { Achievement, Advise } from '@/pages';
import HomePage from '@/pages/home/HomePage';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

export interface IRouter {
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
    path: '/goi-kham',
    element: Advise,
    title: 'Gói khám đa khoa',
  },
  {
    path: '/thanh-tuu',
    element: Achievement,
    title: 'Thành tựu | Tập đoàn Y khoa Hoàn Mỹ',
  },
];

export default function AppRouter() {
  const location = useLocation();

  // hàm xử lý hiển thị document title
  useEffect(() => {
    const route = clientRouter.find(route => {
      return route.path.match(location.pathname);
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
