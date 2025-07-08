// src/pages/ResetPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/authpage.css';
import logo from '../assets/logo.png';
import signup from '../assets/signup.png';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/reset-password/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.error || "Password reset failed.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-side">
        <img src={logo} alt="Infix Logo" className="logo" />
        <h2>Reset Password</h2>

        {message && (
          <p style={{ color: message.includes("successful") ? 'green' : 'red' }}>{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="switch-text">
          <a href="/login">Back to login</a>
        </p>
      </div>

      <div className="auth-image-side">
        <h1>Welcome to Infix Learning Management System</h1>
        <img src={signup} alt="reset" style={{ maxWidth: '400px' }} />
        <div className="tagline">
          <p>Excellence</p>
          <p>Community</p>
          <p>Learning</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
