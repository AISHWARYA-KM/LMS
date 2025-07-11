// ✅ File: src/pages/CoursesPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/course.css';
import { FaStar, FaUser, FaShoppingCart } from 'react-icons/fa';
import Footer from '../components/Footer';
import Header from '../components/Header';

const categories = ['Manual Testing', 'Automation Testing', 'API Testing', 'Mobile Testing', 'Python Development', 'java Development','UI/UX','mern Stack'];
const levels = ['Beginner', 'Intermediate','Advance'];
const prices = ['Free', 'Paid'];
const instructors = ['Pramod', 'Mani', 'Bharat', 'Kartik'];

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    level: [],
    price_type: [],
    instructor: [],
  });

  // ✅ Fetch courses from backend whenever filters change
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          value.forEach((val) => {
            queryParams.append(key, val);
          });
    });
    const token = localStorage.getItem('access');
    const response = await axios.get(`${API_BASE_URL}/api/courses/?${queryParams}`,{
      headers: { Authorization: `Bearer ${token}` 
    },
  });

const processedCourses = response.data.map(course => ({
  ...course,
  price: Number(course.price),
  old_price: Number(course.old_price),
}));
setCourses(processedCourses)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [filters]);

  // ✅ Update filter state when radio changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: updated };
    });
  };  

  return (
    <div className="landing-root">
      <div className="course-header">
        <Header />
      </div>

      <div className="banner-section">
        <div className="container">
          <h1>Join the Millions for better learning experience</h1>
          <p>Home / Courses</p>
        </div>
      </div>

      <div className="container courses-container">
        <div className="filters">
          {/* Category Filter */}
          <div className="filter-group">
            <h4>Category</h4>
            <ul>
              {categories.map((cat) => (
                <li key={cat}>
                  <input
                    type="checkbox"
                    checked={filters.category.includes(cat)}
                    onChange={() => handleFilterChange('category', cat)}
                  />{' '}
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Level Filter */}
          <div className="filter-group">
            <h4>Level</h4>
            <ul>
              {levels.map((level) => (
                <li key={level}>
                  <input
                    type="checkbox"
                    checked={filters.level.includes(level)}
                    onChange={() => handleFilterChange('level', level)}
                  />{' '}
                  {level}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <h4>Price</h4>
            <ul>
              {prices.map((price) => (
                <li key={price}>
                  <input
                    type="checkbox"
                    checked={filters.price_type.includes(price)}
                    onChange={() => handleFilterChange('price_type', price)}
                  />{' '}
                  {price}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructors Filter */}
          <div className="filter-group">
            <h4>Instructors</h4>
            <ul>
              {instructors.map((instructor) => (
                <li key={instructor}>
                  <input
                    type="checkbox"
                    checked={filters.instructor.includes(instructor)}
                    onChange={() => handleFilterChange('instructor', instructor)}
                  />{' '}
                  {instructor}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="courses-list">
          <h2>{courses.length} Course{courses.length !== 1 ? 's' : ''} found</h2>
          {localStorage.getItem("accountType") === "organization" && (
    <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
      <Link to="/courses/add" className="btn btn-primary">➕ Add New Course</Link>
    </div>
  )}

          <div className="courses-grid">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <Link to={`/courses/${course.id}`}>
                <div className="image-container">
  {/* ✅ Render thumbnail image */}
  <Link to={`/courses/${course.id}`}>
  <div className="image-container">
  <img
    className="course-image"
    src={course.thumbnail_url}
    alt={course.title}
    onError={(e) => {
      // Prevent infinite loop by removing onError after first failure
      e.target.onerror = null;
      e.target.src = '/default-thumbnail.jpg'; // Use a working fallback from public folder
    }}
  />

  <span className={`level-tag ${course.level.toLowerCase()}`}>
    {course.level}
  </span>
</div>
</Link>
  {/* ✅ Course Level Tag */}
  <span className={`level-tag ${course.level.toLowerCase()}`}>{course.level}</span>
</div>

                
          
          
                  <h3>{course.title}</h3>
                </Link>

                <div className="meta">
                  <span>
                    <FaStar /> {course.rating} (0 Rating)
                  </span>
                  <span>
                    <FaUser /> {course.students} Students
                  </span>
                </div>

                <p className="desc">{course.description.slice(0, 90)}...</p>
                <div className="price-row">
  <div className="price">
    ${Number(course.price).toFixed(2)}{' '}
    <span className="old-price">${Number(course.old_price).toFixed(2)}</span>
  </div>
  <FaShoppingCart className="cart-icon" />
</div>

              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
