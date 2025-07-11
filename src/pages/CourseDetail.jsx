import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import logo from '../assets/logo.png';
import '../styles/coursedetail.css';
import '../styles/adminDashboard.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const location = useLocation();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
  const token = localStorage.getItem('access');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/courses/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to load course", err);
      }
    };
    fetchCourse();
  }, [id]);

  const renderVideo = () => {
    if (!course?.video_url) return <p>No video available.</p>;

    if (course.video_url.includes('youtube.com') || course.video_url.includes('youtu.be')) {
      let videoId = '';
      const url = new URL(course.video_url);
      videoId = url.hostname.includes('youtu.be')
        ? url.pathname.slice(1)
        : new URLSearchParams(url.search).get('v');

      return (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <video controls width="100%">
        <source src={course.video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  if (!course) return <h2 className="loading-text">Loading Course Details...</h2>;

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="admin-header">
        <img src={logo} alt="Logo" className="admin-logo" />
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className={location.pathname === "/admin/dashboard" ? "active" : ""}>Dashboard</Link>
          <Link to="/courses/add" className={location.pathname === "/courses/add" ? "active" : ""}>Add Course</Link>
          <Link to="/admin/view-courses" className={location.pathname === "/admin/view-courses" ? "active" : ""}>View All Courses</Link>
          <Link to="/admin/manage-users" className={location.pathname === "/admin/manage-users" ? "active" : ""}>Manage Users</Link>
        </nav>
      </header>

      {/* Course Detail */}
      <main className="course-detail-container">
        <h1>{course.title}</h1>
        <div className="video-wrapper">{renderVideo()}</div>
        <div className="course-info">
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Category:</strong> {course.category}</p>
          <p><strong>Instructor:</strong> {course.instructor}</p>
          <p><strong>Level:</strong> {course.level}</p>
          <p><strong>Price:</strong> ₹{Number(course.price).toFixed(2)}</p>
          {course.old_price && (
            <p><strong>Old Price:</strong> ₹{Number(course.old_price).toFixed(2)}</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CourseDetail;
