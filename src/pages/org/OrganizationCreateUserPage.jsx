import React, { useState } from 'react';
import axios from 'axios';
import OrgSidebarLayout from '../../components/orgsidebarlayout.jsx';
import '../../styles/orgcrtuse.css';

const OrganizationCreateUserPage = () => {
  const token = localStorage.getItem('access');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/org/create-user/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ User created!');
      setFormData({ username: '', email: '', password: '', role: 'student' });
    } catch (err) {
      console.error('Error creating user:', err);
      alert('❌ Failed to create user');
    }
  };

  return (
    <OrgSidebarLayout>
      <div className="org-user-form-container">
        <h2 className="org-user-form-title">👤 Create User</h2>
        <form className="org-user-form" onSubmit={handleSubmit}>
          <input
            className="org-input"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="org-input"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="org-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Create User</button>
        </form>
      </div>
    </OrgSidebarLayout>
  );
};

export default OrganizationCreateUserPage;
