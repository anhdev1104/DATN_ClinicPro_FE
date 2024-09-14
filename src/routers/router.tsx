import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/home/HomePage';
import { Route, Routes } from 'react-router-dom';

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
];

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {clientRouter.length > 0 &&
          clientRouter.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
      </Route>
    </Routes>
  );
}
