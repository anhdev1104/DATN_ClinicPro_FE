import PageToTopUtils from '@/helpers/PageToTopUtils';
import AdminLayout from '@/layouts/AdminLayout';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/admin/dashboard/DashBoard';
import Department from '@/pages/admin/department/Department';
import PackagePage from '@/pages/admin/package/Package';
import NotFoundPage from '@/pages/client/404/NotFoundPage';
import AboutPage from '@/pages/client/about/AboutPage';
import AchievementPage from '@/pages/client/achievement/AchievementPage';
import AdvisePage from '@/pages/client/advise/AdvisePage';
import LoginOTP from '@/pages/client/auth/LoginOTP';
import LoginPage from '@/pages/client/auth/LoginPage';
import RegisterPage from '@/pages/client/auth/RegisterPage';
import BranchsPage from '@/pages/client/branchs/BranchsPage';
import CommunityPage from '@/pages/client/community/CommunityPage';
import HomePage from '@/pages/client/home/HomePage';
import AddPackage from '@/pages/admin/package/AddPackage';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddPrescriptios from '@/pages/admin/prescriptions/AddPrescriptions';
import Prescriptions from '@/pages/admin/prescriptions/Prescriptions';

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
    element: AdvisePage,
    title: 'Gói khám đa khoa',
  },
  {
    path: '/thanh-tuu',
    element: AchievementPage,
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
  {
    path: '/community',
    element: CommunityPage,
    title: 'ClinicPro',
  },
];

const adminRouter: IRouter[] = [
  {
    path: '/dashboard',
    element: Dashboard,
    title: 'Dashboard',
  },
  {
    path: '/add-prescriptions',
    element: AddPrescriptios,
    title: 'Thêm đơn thuốc',
  },
  {
    path: '/prescriptions',
    element: Prescriptions,
    title: 'Danh sách đơn thuốc',
  },
  {
    path: '/phong-ban',
    element: Department,
    title: 'Phòng Ban',
  },
  {
    path: '/package',
    element: PackagePage,
    title: 'Package',
  },
  {
    path: '/add-package',
    element: AddPackage,
    title: 'CreatePackage',
  },
];

const authRouter: IRouter[] = [
  {
    path: '/register',
    element: RegisterPage,
    title: 'Đăng ký tài khoản',
  },
  {
    path: '/login',
    element: LoginPage,
    title: 'Đăng nhập tài khoản',
  },
  {
    path: '/login-otp',
    element: LoginOTP,
    title: 'Đăng nhập qua OTP',
  },
];

export default function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    const route = clientRouter.find((route) => {
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
            clientRouter.map((route) => <Route key={route.path} path={route.path} element={<route.element />} />)}
        </Route>
        <Route element={<AdminLayout />}>
          {adminRouter.length > 0 &&
            adminRouter.map((route) => <Route key={route.path} path={route.path} element={<route.element />} />)}
        </Route>
        {authRouter.length > 0 &&
          authRouter.map((route) => <Route key={route.path} path={route.path} element={<route.element />}></Route>)}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}
