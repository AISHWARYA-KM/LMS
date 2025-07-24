import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/adminDashboard.css';
import logo from '../assets/logo.png';
import heroBackground from '../assets/hero-image.png';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="admin-header">
        <img src={logo} alt="Logo" className="admin-logo" />
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className={location.pathname === "/admin/dashboard" ? "active" : ""}>Dashboard</Link>
          <Link to="/courses/add" className={location.pathname === "/courses/add" ? "active" : ""}>Add Course</Link>
          <Link to="/admin/view-courses" className={location.pathname === "/admin/view-courses" ? "active" : ""}>View All Courses</Link>
          <Link to="/admin/assign-course" className={location.pathname === "/admin/assign-course" ? "active" : ""}>Assign Courses</Link>
          <Link to="/admin/assigned-courses" className={location.pathname === "/admin/assigned-courses" ? "active" : ""}>View Assigned Courses</Link>
          <Link to="/admin/manage-users" className={location.pathname === "/admin/manage-users" ? "active" : ""}>Manage Users</Link>
          <Link to="/admin/create-organization" className={location.pathname === "/admin/create-organization" ? "active" : ""}>Create Organization</Link>
          <Link to="/login" className="logout-link">Logout</Link>

        </nav>
      </header>

      {/* ✅ Hero Section with overlay */}
      <section
        className="hero-background"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="hero-overlay">
          <div className="hero-overlay-content">
            <h1>
              <span>Welcome to Admin Panel</span>
            </h1>
            <p>
              Manage courses, users, and more — all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
