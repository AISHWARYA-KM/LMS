import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/assignedcourses.css';
import '../styles/adminDashboard.css';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const AssignedCoursesPage = () => {
  const [assignedCourses, setAssignedCourses] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access');
    axios
      .get('http://localhost:8000/api/admin/list-assignments/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAssignedCourses(res.data))
      .catch((err) => console.error('Failed to fetch assigned courses', err));
  }, []);

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <img src={logo} alt="Logo" className="admin-logo" />
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className={location.pathname === "/admin/dashboard" ? "active" : ""}>Dashboard</Link>
          <Link to="/courses/add" className={location.pathname === "/courses/add" ? "active" : ""}>Add Course</Link>
          <Link to="/admin/view-courses" className={location.pathname === "/admin/view-courses" ? "active" : ""}>View All Courses</Link>
          <Link to="/admin/assign-course" className={location.pathname === "/admin/assign-course" ? "active" : ""}>Assign Courses</Link>
          <Link to="/admin/assigned-courses" className={location.pathname === "/admin/assigned-courses" ? "active" : ""}>View Assigned Courses</Link>
          <Link to="/admin/manage-users" className={location.pathname === "/admin/manage-users" ? "active" : ""}>Manage Users</Link>
        </nav>
      </header>

      <main className="assigned-courses-main">
        <h2>📚 Assigned Courses</h2>
        <div className="assigned-courses-table-wrapper">
          <table className="assigned-courses-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Course</th>
                <th>Category</th>
                <th>Level</th>
                <th>Price</th>
                <th>Instructor</th>
                <th>Thumbnail</th>
                <th>Enrolled On</th>
              </tr>
            </thead>
            <tbody>
              {assignedCourses.map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.course_title}</td>
                  <td>{item.category}</td>
                  <td>{item.level}</td>
                  <td>₹{item.price}</td>
                  <td>{item.instructor}</td>
                  <td>
                    {item.thumbnail_url ? (
                      <img src={item.thumbnail_url} alt="thumbnail" width="60" />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>{new Date(item.enrolled_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {assignedCourses.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px' }}>No assigned courses found.</p>}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AssignedCoursesPage;
