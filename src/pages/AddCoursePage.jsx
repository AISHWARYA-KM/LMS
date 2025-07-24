import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/addcourse.css';
import '../styles/adminDashboard.css';
import Footer from '../components/Footer';
import logo from '../assets/logo.png';

const AddCoursePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: '', category: '', level: '', price_type: '', price: '',
    old_price: '', instructor: '', description: '',
    image: null, thumbnail: null, video_file: null, youtube_url: '',
  });

  const token = localStorage.getItem('access');
  const role = localStorage.getItem('role');
  const [orgProfileId, setOrgProfileId] = useState(null);

  useEffect(() => {
    if (role === 'organization') {
      axios.get('http://127.0.0.1:8000/api/organization/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          setOrgProfileId(res.data.id);  // assuming org profile has `id` field
        })
        .catch(err => {
          console.error('Failed to fetch organization profile:', err);
        });
    }
  }, [role, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([k, v]) => {
      if (v !== null && v !== '') form.append(k, v);
    });

    if (role === 'organization' && orgProfileId) {
      form.append('organization', orgProfileId);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/admin/add-course/', form, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });

      alert('✅ Course added successfully!');
      if (role === 'admin') {
        navigate('/admin/view-courses');
      } else {
        navigate('/organization/view-courses');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add course.');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <img src={logo} alt="Logo" className="admin-logo" />
        <nav className="admin-nav">
          <Link to={`/${role}/dashboard`} className={location.pathname === `/${role}/dashboard` ? "active" : ""}>Dashboard</Link>
          <Link to="/courses/add" className={location.pathname === "/courses/add" ? "active" : ""}>Add Course</Link>
          <Link to={`/${role}/view-courses`} className={location.pathname === `/${role}/view-courses` ? "active" : ""}>View All Courses</Link>
          {role === 'admin' && (
            <>
              <Link to="/admin/assign-course" className={location.pathname === "/admin/assign-course" ? "active" : ""}>Assign Courses</Link>
              <Link to="/admin/assigned-courses" className={location.pathname === "/admin/assigned-courses" ? "active" : ""}>View Assigned Courses</Link>
              <Link to="/admin/manage-users" className={location.pathname === "/admin/manage-users" ? "active" : ""}>Manage Users</Link>
            </>
          )}
        </nav>
      </header>

      <main className="add-course-blended-layout">
        <div className="add-course-blended-left">
          <div className="quote-text">
            <h2>Empower learners with every course you create.</h2>
          </div>
        </div>

        <div className="add-course-blended-right">
          <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '20px' }}>Add New Course</h2>
            <input name="title" placeholder="Title" onChange={handleChange} required />
            <select name="category" onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              {['Manual Testing', 'Automation Testing', 'API Testing', 'Mobile Testing', 'Python Development', 'java Development', 'mern Stack', 'UI/UX'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select name="level" onChange={handleChange} required>
              <option value="">-- Select Level --</option>
              {['Beginner', 'Intermediate', 'Advance'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select name="price_type" onChange={handleChange} required>
              <option value="">-- Select Price Type --</option>
              {['Free', 'Paid'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
            <input name="old_price" type="number" placeholder="Old Price" onChange={handleChange} />
            <select name="instructor" onChange={handleChange} required>
              <option value="">-- Select Instructor --</option>
              {['Pramod', 'Mani', 'Bharat', 'Kartik'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <textarea name="description" placeholder="Description" onChange={handleChange} required />
            <input type="file" name="image" accept="image/*" onChange={handleChange} required />
            <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} />
            <input type="file" name="video_file" accept="video/*" onChange={handleChange} />
            <input name="youtube_url" placeholder="YouTube URL" onChange={handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddCoursePage;
