import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/manageusers.css';
import '../styles/adminDashboard.css';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  const token = localStorage.getItem('access');
  const isSuperUser = localStorage.getItem('isSuperUser') === 'true';
  const location = useLocation();

  useEffect(() => {
    if (token && isSuperUser) {
      axios
        .get('http://127.0.0.1:8000/api/users/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => setUsers(res.data))
        .catch(err => console.error('❌ Error fetching users', err));
    }
  }, [token, isSuperUser]);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ User added!');
      setNewUser({ username: '', email: '', password: '' });
      window.location.reload();
    } catch (err) {
      alert('❌ Failed to add user.');
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/delete-user/${userId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('🗑️ User deleted.');
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      alert('❌ Failed to delete user.');
      console.error(err);
    }
  };

  if (!token || !isSuperUser) {
    return <p style={{ color: 'red', padding: '20px' }}>🚫 Access denied.</p>;
  }

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

      <main className="manage-users-main">
        <h2>👥 Manage Users</h2>

        <form className="add-user-form" onSubmit={handleAddUser}>
          <h3>➕ Add New User</h3>
          <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} required />
          <button type="submit">Add User</button>
        </form>

        <div className="user-list">
          <h3>📋 Registered Users</h3>
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Is Superuser</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.is_superuser ? '✅' : '❌'}</td>
                    <td>
                      {!user.is_superuser && (
                        <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <p style={{ textAlign: 'center' }}>No users found.</p>}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageUsersPage;
