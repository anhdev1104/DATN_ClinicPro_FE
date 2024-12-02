import { useSelector } from '@/hooks/redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IProtectedRoute {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const auth = useSelector(state => state.auth.data?.access_token);

  useEffect(() => {
    if (!auth) {
      toast.info('Hết phiên đăng nhập, vui lòng đăng nhập lại !');
    }
  }, [auth]);

  return auth ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
