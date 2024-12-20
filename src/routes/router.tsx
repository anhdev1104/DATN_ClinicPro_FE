import React, { useEffect } from 'react';
import { Route, RouteProps, Routes, useLocation } from 'react-router-dom';
import PageToTopUtils from '@/helpers/PageToTopUtils';
import AdminLayout from '@/layouts/AdminLayout';
import MainLayout from '@/layouts/MainLayout';
import ProtectedRoute from '@/components/auth';

const Permissions = React.lazy(() => import('@/pages/admin/access_rules/permissions/Permissions'));
const Roles = React.lazy(() => import('@/pages/admin/access_rules/roles/Roles'));
const Action = React.lazy(() => import('@/pages/admin/access_rules/action/Action'));
const Appointment = React.lazy(() => import('@/pages/admin/appointments/Appointment'));
const DetailAppointment = React.lazy(() => import('@/pages/admin/appointments/Compontents/DetailAppointment'));
const EditAppointment = React.lazy(() => import('@/pages/admin/appointments/Compontents/EditAppointment'));
const ServicesPage = React.lazy(() => import('@/pages/admin/services/Services'));
const Dashboard = React.lazy(() => import('@/pages/admin/dashboard/DashBoard'));
const Department = React.lazy(() => import('@/pages/admin/department/Department'));
const GetDepartment = React.lazy(() => import('@/pages/admin/department/GetDepartment'));
const UpdateDepartment = React.lazy(() => import('@/pages/admin/department/UpdateDepartment'));
const NotFoundPage = React.lazy(() => import('@/pages/client/404/NotFoundPage'));
const AboutPage = React.lazy(() => import('@/pages/client/about/AboutPage'));
const AchievementPage = React.lazy(() => import('@/pages/client/achievement/AchievementPage'));
const AdvisePage = React.lazy(() => import('@/pages/client/advise/AdvisePage'));
const LoginPage = React.lazy(() => import('@/pages/client/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('@/pages/client/auth/RegisterPage'));
const BranchsPage = React.lazy(() => import('@/pages/client/branchs/BranchsPage'));
const CommunityPage = React.lazy(() => import('@/pages/client/community/CommunityPage'));
const HomePage = React.lazy(() => import('@/pages/client/home/HomePage'));
const Prescription = React.lazy(() => import('@/pages/admin/prescriptions/Prescription'));
const ProfilePage = React.lazy(() => import('@/pages/client/profile/ProfilePage'));
const ChangePassword = React.lazy(() => import('@/pages/client/auth/ChangePassword'));
const ForgotPassword = React.lazy(() => import('@/pages/client/auth/ForgotPassword'));
const AppointmentPage = React.lazy(() => import('@/pages/client/appointment/AppointmentPage'));
const MedicalHistoriesPage = React.lazy(() => import('@/pages/client/medical_histories/MedicalHistoriesPage'));
const EditMedicalHistories = React.lazy(
  () => import('@/pages/admin/medical_histories/components/EditMedicalHistories'),
);
const EditPackage = React.lazy(() => import('@/pages/admin/package/component/EditPackage'));
const Package = React.lazy(() => import('@/pages/admin/package/Package'));
const User = React.lazy(() => import('@/pages/admin/users/Users'));
const GetUser = React.lazy(() => import('@/pages/admin/users/GetUser'));
const UpdateUser = React.lazy(() => import('@/pages/admin/users/UpdateUser'));
const MedicalHistories = React.lazy(() => import('@/pages/admin/medical_histories/MedicalHistories'));
const PrivacyPage = React.lazy(() => import('@/pages/client/privacy/privacyPage'));
const Specialties = React.lazy(() => import('@/pages/admin/specialties/Specialties'));
const Patients = React.lazy(() => import('@/pages/admin/patient/Patients'));
const DetailPatient = React.lazy(() => import('@/pages/admin/patient/components/DetailPatient'));
const AddPatient = React.lazy(() => import('@/pages/admin/patient/components/AddPatient'));
const ChatBoxPage = React.lazy(() => import('@/pages/client/chatbox/ChatBoxPage'));

type IRouter = RouteProps & {
  title: string;
};

const clientRouter: IRouter[] = [
  {
    path: '/parcel',
    element: <AdvisePage />,
    title: 'Gói khám đa khoa',
  },
  {
    path: '/awards',
    element: <AchievementPage />,
    title: 'Thành tựu',
  },
  {
    path: '/about-us',
    element: <AboutPage />,
    title: 'Giới thiệu về chúng tôi',
  },
  {
    path: '/clinic-network',
    element: <BranchsPage />,
    title: 'Hệ thống 16 phòng khám trên cả nước',
  },
  {
    path: '/community',
    element: <CommunityPage />,
    title: 'Cộng đồng',
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPage />,
    title: 'Chính sách bảo mật',
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
    title: 'Thông tin cá nhân',
  },
  {
    path: '/medical-histories',
    element: <MedicalHistoriesPage />,
    title: 'Lịch sử khám bệnh',
  },
  {
    path: '/appoint-patient',
    element: <AppointmentPage />,
    title: 'Lịch hẹn khám',
  },
  {
    path: '/change-password',
    element: (
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    ),
    title: 'Thay đổi mật khẩu',
  },
  {
    path: '/chat-ai',
    element: <ChatBoxPage />,
    title: 'ClinicPro AI',
  },
  {
    path: '/',
    element: <HomePage />,
    title: 'ClinicPro',
  },
];

const adminRouter: IRouter[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    title: 'Trang quản lý',
  },
  {
    path: '/appointments',
    element: <Appointment />,
    title: 'Danh sách lịch hẹn',
  },
  {
    path: '/appointments/send/:id',
    element: <DetailAppointment />,
    title: 'Lịch hẹn chi tiết',
  },
  {
    path: '/appointments/:id',
    element: <EditAppointment />,
    title: 'Chỉnh sửa lịch hẹn ',
  },
  {
    path: '/medical-record',
    element: <MedicalHistories />,
    title: 'Danh sách bệnh án',
  },
  {
    path: '/dashboard/medical-histories/:id',
    element: <EditMedicalHistories />,
    title: 'Chỉnh sửa bệnh án',
  },
  {
    path: '/prescriptions',
    element: <Prescription />,
    title: 'Danh sách đơn thuốc',
  },
  {
    path: '/departments',
    element: <Department />,
    title: 'Danh sách phòng ban',
  },
  {
    path: '/departments/:id',
    element: <GetDepartment />,
    title: 'Phòng Ban',
  },
  {
    path: '/departments/:id/edit',
    element: <UpdateDepartment />,
    title: 'Phòng Ban',
  },
  {
    path: '/packages',
    element: <Package />,
    title: 'Danh sách gói khám',
  },
  {
    path: '/edit-package/:id',
    element: <EditPackage />,
    title: 'Chỉnh sửa gói khám',
  },
  {
    path: '/users',
    element: <User />,
    title: 'Danh Sách Người Dùng',
  },
  {
    path: '/users/:userId',
    element: <GetUser />,
    title: 'Chi Tiết Người Dùng',
  },
  {
    path: '/users/:userId/edit',
    element: <UpdateUser />,
    title: 'Danh Sách Người Dùng',
  },
  {
    path: '/services',
    element: <ServicesPage />,
    title: 'Dịch Vụ',
  },
  {
    path: '/specialties',
    element: <Specialties />,
    title: 'Quản lý chuyên khoa',
  },
  {
    path: '/patient',
    element: <Patients />,
    title: 'Quản lý bệnh nhân',
  },
  {
    path: '/patient/:id',
    element: <DetailPatient />,
    title: 'Chi tiết bệnh nhân',
  },
  {
    path: '/add-patient',
    element: <AddPatient />,
    title: 'Thêm bệnh nhân',
  },
  {
    path: '/action',
    element: <Action />,
    title: 'Quản lý hành động',
  },
  {
    path: '/permission',
    element: <Permissions />,
    title: 'Quản lý quyền',
  },
  {
    path: '/roles',
    element: <Roles />,
    title: 'Quản lý roles',
  },
];

const authRouter: IRouter[] = [
  {
    path: '/register',
    element: <RegisterPage />,
    title: 'Đăng ký tài khoản',
  },
  {
    path: '/login',
    element: <LoginPage />,
    title: 'Đăng nhập tài khoản',
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    title: 'Quên mật khẩu',
  },
];

export default function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    const allRoutes = [...adminRouter, ...authRouter, ...clientRouter];

    const route = allRoutes.find(route => {
      const routePath = (route.path as string).replace(/:\w+/g, ''); // Loại bỏ tham số động
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
            clientRouter.map(route => <Route key={route.path} path={route.path} element={route.element} />)}
        </Route>
        <Route element={<AdminLayout />}>
          {adminRouter.length > 0 &&
            adminRouter.map(route => <Route key={route.path} path={route.path} element={route.element} />)}
        </Route>
        {authRouter.length > 0 &&
          authRouter.map(route => <Route key={route.path} path={route.path} element={route.element} />)}
        <Route
          path="*"
          element={<NotFoundPage title="Oops!! Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm !" />}
        />
      </Routes>
    </>
  );
}
