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
    <Link to="/my-courses" className="landing-nav-link">My Courses</Link>

  </nav>





</header>
     
    </header>
  );
};

export default Header;