import PageToTopUtils from '@/helpers/PageToTopUtils';
import AdminLayout from '@/layouts/AdminLayout';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/admin/dashboard/DashBoard';
import Department from '@/pages/admin/department/Department';
import DepartmentDetail from '@/pages/admin/department/DepartmentDetail';
import ListPackage from '@/pages/admin/package/Package';
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
import PackageDetail from '@/pages/admin/package/component/PackageDetail';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Prescription from '@/pages/admin/prescriptions/Prescription';
import EditPackage from '@/pages/admin/package/component/EditPackage';

export interface IRouter {
  path: string;
  element: () => JSX.Element;
  title: string;
}

const clientRouter: IRouter[] = [
  {
    path: '/parcel',
    element: AdvisePage,
    title: 'Gói khám đa khoa',
  },
  {
    path: '/awards',
    element: AchievementPage,
    title: 'Thành tựu',
  },
  {
    path: '/about-us',
    element: AboutPage,
    title: 'Giới thiệu về chúng tôi',
  },
  {
    path: '/clinic-network',
    element: BranchsPage,
    title: 'Hệ thống 16 phòng khám trên cả nước',
  },
  {
    path: '/community',
    element: CommunityPage,
    title: 'Cộng đồng',
  },
  {
    path: '/',
    element: HomePage,
    title: 'ClinicPro',
  },
];

const adminRouter: IRouter[] = [
  {
    path: '/dashboard',
    element: Dashboard,
    title: 'Trang quản lý',
  },
  {
    path: '/prescriptions',
    element: Prescription,
    title: 'Danh sách đơn thuốc',
  },
  {
    path: '/departments/:id',
    element: DepartmentDetail,
    title: 'Phòng Ban',
  },
  {
    path: '/departments',
    element: Department,
    title: 'Danh sách phòng ban',
  },
  {
    path: '/package',
    element: ListPackage,
    title: 'Danh sách gói khám',
  },
  {
    path: '/package/:id',
    element: PackageDetail,
    title: 'Danh sách gói khám',
  },
  {
    path: '/edit-package/:id',
    element: EditPackage,
    title: 'Chỉnh sửa gói khám',
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
    const allRoutes = [...adminRouter, ...authRouter, ...clientRouter];

    const route = allRoutes.find(route => {
      const routePath = route.path.replace(/:\w+/g, ''); // Loại bỏ tham số động
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
        <Route element={<AdminLayout />}>
          {adminRouter.length > 0 &&
            adminRouter.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
        </Route>
        {authRouter.length > 0 &&
          authRouter.map(route => <Route key={route.path} path={route.path} element={<route.element />}></Route>)}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}
