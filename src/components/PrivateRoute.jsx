import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return now > expiry;
  } catch (e) {
    return true;
  }
};

const PrivateRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token && !isTokenExpired(token)) {
      setValid(true);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return <div>Loading...</div>; // Or a spinner
  }

  return valid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
