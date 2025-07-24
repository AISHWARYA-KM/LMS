import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/authpage.css';
import logo from '../assets/logo.png';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('Student'); // Default login type
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginMessage('');

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password,
      });

      const {
        is_superuser,
        access,
        refresh,
        user_id,
        username,
        role,
      } = res.data;

      // ✅ Validate login type with role (case-insensitive)
      const userRole = role ? role.toLowerCase() : '';
      if (loginType.toLowerCase() === 'admin' && !is_superuser) {
        throw new Error('No admin account found for this user.');
      } else if (loginType.toLowerCase() === 'organization' && userRole !== 'organization') {
        throw new Error('No organization account found for this user.');
      } else if (loginType.toLowerCase() === 'student' && userRole !== 'student') {
        throw new Error('No student account found for this user.');
      }

      // ✅ Save session data
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('username', username);
      localStorage.setItem('role', userRole);
      console.log("✅ Saved role as:", userRole);

      localStorage.setItem('isSuperUser', is_superuser);
      localStorage.setItem('accountType', loginType.toLowerCase());

      setLoginMessage('Login successful!');
      setTimeout(() => {
        setLoading(false);
        // ✅ Navigate to dashboard based on role
        if (is_superuser) {
          navigate('/admin/dashboard');
        } else if (userRole === 'organization') {
          navigate('/organization/dashboard');
        } else {
          navigate('/landing');
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoginMessage(err?.response?.data?.detail || err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleLogin}>
      <img src={logo} alt="Infix Logo" className="logo" />
      <h2>{loginType} Login</h2>

      {/* 🚀 Login Type Selector */}
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="loginType"
            value="Student"
            checked={loginType === 'Student'}
            onChange={(e) => setLoginType(e.target.value)}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            name="loginType"
            value="Organization"
            checked={loginType === 'Organization'}
            onChange={(e) => setLoginType(e.target.value)}
          />
          Organization
        </label>
        <label>
          <input
            type="radio"
            name="loginType"
            value="Admin"
            checked={loginType === 'Admin'}
            onChange={(e) => setLoginType(e.target.value)}
          />
          Admin
        </label>
      </div>

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
        <label>
          <input type="checkbox" /> Remember Me
        </label>
      </div>

      <button type="submit" className="auth-button" disabled={loading}>
        {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Login'}
      </button>

      <p className="switch-auth">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </form>
  );
};

export default LoginForm;
