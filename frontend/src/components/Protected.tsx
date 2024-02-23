import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext'; // Import your useAuth hook
import { useContext } from 'react';
import { AuthStatus } from '@/types';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const context = useContext(AuthContext);

  if (context.authStatus !== AuthStatus.SignedIn) {

    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
