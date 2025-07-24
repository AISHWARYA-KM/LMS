import React, { useState } from 'react';
import axios from 'axios';

function CreateOrganizationUserPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    referral_code: '',
    organization_name: '',
  });

  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/admin/create-organization/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('✅ ' + res.data.message);
      setFormData({
        username: '',
        email: '',
        password: '',
        phone: '',
        referral_code: '',
        organization_name: '',
      });
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || 'Something went wrong.'));
    }
  };

  return (
    <div className="form-container">
      <h2>Create Organization User</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} value={formData.username} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} required />
        <input name="referral_code" placeholder="Referral Code (Optional)" onChange={handleChange} value={formData.referral_code} />
        <input name="organization_name" placeholder="Organization Name" onChange={handleChange} value={formData.organization} required />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateOrganizationUserPage;
