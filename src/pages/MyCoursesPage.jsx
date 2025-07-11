// src/pages/MyCoursesPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/course.css'; // reuse course styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('access');
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/my-courses/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch assigned courses", err);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="landing-root">
            <div className="course-header">
        <Header />
      </div>
      <div className="banner-section">
        <div className="container">
          <h1>📚 My Courses</h1>
          <p>These are the courses assigned to you.</p>
        </div>
      </div>

      <div className="container">
        {courses.length === 0 ? (
          <p>No courses assigned to you yet.</p>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <Link to={`/courses/${course.id}`} className="course-card" key={course.id}>
                <img
                  className="course-image"
                  src={course.thumbnail_url}
                  alt={course.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-thumbnail.jpg';
                  }}
                />
                <h3>{course.title}</h3>
                <p>{course.description.slice(0, 100)}...</p>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Level:</strong> {course.level}</p>
                <p><strong>Price:</strong> ₹{Number(course.price).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyCoursesPage;
