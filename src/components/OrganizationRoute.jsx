import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const OrganizationRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isOrg, setIsOrg] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'organization') {
      setIsOrg(true);
    }
    setChecking(false);
  }, []);

  if (checking) return <div>Checking role...</div>;

  return isOrg ? children : <Navigate to="/login" />;
};

export default OrganizationRoute;
