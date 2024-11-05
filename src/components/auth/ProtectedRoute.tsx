import { useSelector } from '@/hooks/redux';
import { Navigate } from 'react-router-dom';

interface IProtectedRoute {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const auth = useSelector(state => state.auth.data);

  return auth ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
