import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('access');
  const accountType = localStorage.getItem('accountType'); // 'admin' for superuser

  return token && accountType === 'admin'
    ? children
    : <Navigate to="/login" replace />;
};

export default AdminRoute;
