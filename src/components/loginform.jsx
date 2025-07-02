// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/authpage.css';
import logo from '../assets/logo.png';
import axios from 'axios';  

axios.post("http://127.0.0.1:8000/api/login/", {
  username: formData.username,
  password: formData.password,
}).then((res) => {
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
});

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ You can add real login logic here
    console.log("Logging in with", email, password);

    // ✅ Redirect to landing page
    navigate('/landing');
  };

  return (
    <form className="form-container" onSubmit={handleLogin}>
      <img src={logo} alt="Infix Logo" className="logo" />
      <h2>Welcome back. Please login to your account</h2>

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
        <Link to="/forgot-password">Forgot Password ?</Link>
      </div>

      <button type="submit" className="auth-button">Login</button>
      <p className="switch-text">
        Don’t have an account? <Link to="/signup">Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;
