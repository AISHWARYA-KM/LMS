import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  FaUserPlus, FaBook, FaEye, FaPlus, FaUserCheck,
  FaChalkboardTeacher, FaUsers, FaClipboardList, FaUserMinus, FaMinusSquare
} from 'react-icons/fa';

import '../styles/sidebar.css';
import logo from '../assets/logo.png';

const OrgSidebarLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <div className="org-layout-container">
      <aside className="org-layout-sidebar">
        <div className="org-layout-logo">
          <Link to="/organization/dashboard">
            <img src={logo} alt="Organization Logo" />
          </Link>
        </div>

        <nav className="org-layout-nav">
          <ul>
            <li>
              <NavLink to="/organization/create-user" className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaUserPlus className="org-icon" /> Create Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/organization/add-course" end className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaBook className="org-icon" /> Add Course
              </NavLink>
            </li>
            <li>
              <NavLink to="/org/batches" end className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaEye className="org-icon" /> View Batches
              </NavLink>
            </li>
            <li>
              <NavLink to="/org/batches/create" className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaPlus className="org-icon" /> Create Batch
              </NavLink>
            </li>
            <li>
              <NavLink to="/org/assign-user" className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaUserCheck className="org-icon" /> Assign Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/org/assign-course" className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaChalkboardTeacher className="org-icon" /> Assign Course
              </NavLink>
            </li>
            <li>
              <NavLink to="/org/view-batch-users" className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaUsers className="org-icon" /> View Batch Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/org/batches-with-courses" className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaClipboardList className="org-icon" /> View Batch Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/org/remove-user" className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaUserMinus className="org-icon" /> Remove User
              </NavLink>
            </li>
            <li>
              <NavLink to="/org/remove-course" className={({ isActive }) => isActive ? 'org-active-link' : undefined}>
                <FaMinusSquare className="org-icon" /> Remove Course
              </NavLink>
            </li>
          </ul>

          {/* 🚪 Logout button */}
        </nav>
      </aside>

      <main className="org-layout-main">
        {children}
      </main>
    </div>
  );
};

export default OrgSidebarLayout;
