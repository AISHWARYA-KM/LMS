import React from 'react';
import '../styles/landingpage.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
      <header className="landing-header">
  <div>
    <img src={logo} alt="INFIX Logo" className="landing-logo" />
  </div>
  <nav className="landing-nav">
    <Link to="/landing" className="landing-nav-link">Homepage</Link>
    <Link to="../courses" className="landing-nav-link">Courses</Link>
    <Link to="/quiz" className="landing-nav-link">Quiz</Link>
    <Link to="/classes" className="landing-nav-link">Classes</Link>
    <Link to="/others" className="landing-nav-link">Others</Link>
    <Link to="/addons" className="landing-nav-link">Addons</Link>
  </nav>
  <div className="auth-buttons">
    <Link to="/login">
      <button className="landing-btn landing-btn-login">Login</button>
    </Link>
    <Link to="/signup">
      <button className="landing-btn landing-btn-signup">Sign Up</button>
    </Link>
  </div>
</header>
     
    </header>
  );
};

export default Header;