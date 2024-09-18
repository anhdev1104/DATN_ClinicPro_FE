import PageToTopUtils from '@/helpers/PageToTopUtils';
import MainLayout from '@/layouts/MainLayout';
import Achievement from '@/pages/achievement/Achievement';
import Advise from '@/pages/advise/Advise';
import HomePage from '@/pages/home/HomePage';
import AboutPage from '@/pages/about/AboutPage';
import BranchsPage from '@/pages/branchs/BranchsPage';
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
  {
    path: '/ve-chung-toi',
    element: AboutPage,
    title: 'Giới thiệu về chúng tôi | Tập đoàn y khoa Hoàn Mỹ',
  },
  {
    path: '/mang-luoi',
    element: BranchsPage,
    title: 'Hệ thồng 16 phòng khám Hoàn Mỹ trên cả nước',
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
    <>
      <PageToTopUtils />
      <Routes>
        <Route element={<MainLayout />}>
          {clientRouter.length > 0 &&
            clientRouter.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
        </Route>
      </Routes>
    </>
  );
}
