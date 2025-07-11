import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/assigncourse.css';
import '../styles/adminDashboard.css';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const AssignCoursePage = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const token = localStorage.getItem('access');
  const isAdmin = localStorage.getItem('isSuperuser') === 'true';
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(`${API_BASE_URL}/api/users/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const students = usersResponse.data.filter(user => !user.is_superuser);
        setUsers(students);

        const courseResponse = await axios.get(`${API_BASE_URL}/api/admin/view-courses/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(courseResponse.data);
      } catch (error) {
        console.error("Failed to load users or courses", error);
      }
    };

    fetchData();
  }, [API_BASE_URL, token]);

  const handleAssign = async () => {
    if (!selectedUser || !selectedCourse) {
      setMessage('❗ Please select both user and course');
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE_URL}/api/admin/assign-course/`,
        { user: selectedUser, course: selectedCourse },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('✅ Course assigned successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to assign course.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return <p style={{ color: 'red' }}>🚫 Only admins can access this page.</p>;

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

      <main className="assign-course-layout">
        <div className="assign-course-box">
          <h2>Assign Course to User</h2>

          <div className="form-group">
            <label>User:</label>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Course:</label>
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>

          <button onClick={handleAssign} disabled={loading}>
            {loading ? 'Assigning...' : 'Assign Course'}
          </button>

          {message && <p className="message">{message}</p>}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AssignCoursePage;
