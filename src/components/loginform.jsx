import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/authpage.css';
import logo from '../assets/logo.png';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginMessage('');

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });


      const isSuperUser = res.data.is_superuser === true;
      const accountType = isSuperUser ? 'admin' : 'student';
      localStorage.setItem("accountType", accountType);
      localStorage.setItem("isSuperuser", isSuperUser);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem('isSuperUser', res.data.is_superuser); 

      setLoginMessage("Login successful!");
      setTimeout(() => {
        setLoading(false);
        navigate(isSuperUser ? '/admin-dashboard' : '/landing');
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoginMessage("Login failed. Check your credentials.");
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleLogin}>
      <img src={logo} alt="Infix Logo" className="logo" />
      <h2>{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>

      {loginMessage && (
        <p className="login-message" style={{ color: loginMessage.includes('successful') ? 'green' : 'red' }}>
          {loginMessage}
        </p>
      )}

      <div className="input-group">
        <span className="icon">📧</span>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <span className="icon">🔒</span>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="remember-forgot">
        <label><input type="checkbox" /> Remember Me</label>
        <Link to="/reset-password">Forgot Password?</Link>
      </div>

      <button type="submit" className="auth-button" disabled={loading}>
        {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Login'}
      </button>

      {!isAdminLogin && (
        <p className="switch-text">
          Don’t have an account? <Link to="/signup">Register</Link>
        </p>
      )}

      <p className="switch-text">
        {isAdminLogin ? (
          <span onClick={() => setIsAdminLogin(false)} style={{ cursor: 'pointer', color: '#007bff' }}>
            Switch to User Login
          </span>
        ) : (
          <span onClick={() => setIsAdminLogin(true)} style={{ cursor: 'pointer', color: '#007bff' }}>
            Login as Admin
          </span>
        )}
      </p>
    </form>
  );
};

export default LoginForm;
