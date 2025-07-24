import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrgSidebarLayout from '../../components/orgsidebarlayout';
import '../../styles/org-add-course.css';

const OrganizationAddCoursePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    level: '',
    price_type: '',
    price: '',
    old_price: '',
    instructor: '',
    description: '',
    image: null,
    thumbnail: null,
    video_file: null,
    youtube_url: '',
  });

  const [orgProfileId, setOrgProfileId] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/organization/profile/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setOrgProfileId(res.data.id))
      .catch(err => console.error('Failed to fetch org profile', err));
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') form.append(key, value);
    });

    if (orgProfileId) {
      form.append('organization', orgProfileId);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/org/add-course/', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Course added successfully!');
      navigate('/organization/view-courses');
    } catch (err) {
      console.error('❌ Failed to add course', err);
      alert('❌ Failed to add course');
    }
  };

  return (
    <OrgSidebarLayout>
      <div className="add-course-container">
        <h2 className="form-heading"> Add Course</h2>
        <form className="add-course-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="title" placeholder="Course Title" onChange={handleChange} required />

          <select name="category" onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            {['Manual Testing', 'Automation Testing', 'API Testing', 'Mobile Testing', 'Python Development', 'java Development', 'mern Stack', 'UI/UX'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select name="level" onChange={handleChange} required>
            <option value="">-- Select Level --</option>
            {['Beginner', 'Intermediate', 'Advance'].map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>

          <select name="price_type" onChange={handleChange} required>
            <option value="">-- Select Price Type --</option>
            {['Free', 'Paid'].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
          <input type="number" name="old_price" placeholder="Old Price (optional)" onChange={handleChange} />

          <select name="instructor" onChange={handleChange} required>
            <option value="">-- Select Instructor --</option>
            {['Pramod', 'Mani', 'Bharat', 'Kartik'].map(inst => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </select>

          <textarea name="description" placeholder="Course Description" onChange={handleChange} required />

          <label>Upload Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />

          <label>Upload Thumbnail:</label>
          <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} />

          <label>Upload Video File:</label>
          <input type="file" name="video_file" accept="video/*" onChange={handleChange} />

          <input type="text" name="youtube_url" placeholder="YouTube URL (optional)" onChange={handleChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </OrgSidebarLayout>
  );
};

export default OrganizationAddCoursePage;
