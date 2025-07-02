// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/loginform';
import illustration from '../assets/signup.png';
import '../styles/authpage.css';

const LoginPage = () => {
  return (
    <div className="signup-container">
      <div className="form-section">
        <LoginForm />
      </div>

      <div className="info-section">
        <h1>Welcome to Infix Learning Management System</h1>
        <img src={illustration} alt="Illustration" className="info-image"/>
      </div>
    </div>
  );
};

export default LoginPage;
