// ✅ File: src/pages/CoursesPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/course.css';
import { FaStar, FaUser, FaShoppingCart } from 'react-icons/fa';
import Footer from '../components/Footer';
import Header from '../components/Header';

const courses = [
  {
    id: 'hacking',
    title: 'Ethical Hacking Course',
    level: 'Beginner',
    students: 1,
    rating: 0,
    image: '/images/hacking.jpg',
    price: 176,
    oldPrice: 420,
    description: 'Learn Laravel PHP framework from basics to advanced through practical projects.',
  },
  {
    id: 'webflow',
    title: 'Mastering in Webflow',
    level: 'Beginner',
    students: 1,
    rating: 0,
    image: '/images/webflow.jpg',
    price: 172,
    oldPrice: 214,
    description: 'Become a proficient Python developer from scratch with this comprehensive course.',
  },
  {
    id: 'sqa',
    title: 'Kickstart Your SQA Career',
    level: 'Intermediate',
    students: 1,
    rating: 0,
    image: '/images/sqa.jpg',
    price: 155,
    oldPrice: 321,
    description: 'Master iOS app development with Swift in this complete course for career switchers.',
  }
];

const categories = ['Laravel', 'iOS Development', 'Python', 'App Development', 'UI Design', 'Adobe XD'];
const levels = ['Pro', 'Advance', 'Intermediate'];

const CoursesPage = () => {
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
          <div className="filter-group">
            <h4>Category</h4>
            <ul>
              {categories.map((cat) => (
                <li key={cat}><input type="radio" name="category" /> {cat}</li>
              ))}
            </ul>
          </div>
          <div className="filter-group">
            <h4>Level</h4>
            <ul>
              {levels.map((level) => (
                <li key={level}><input type="radio" name="level" /> {level}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="courses-list">
          <h2>{courses.length} Courses are found</h2>
          <div className="courses-grid">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <Link to={`/courses/${course.id}`}>
                  <div className="image-container">
                    <img src={course.image} alt={course.title} />
                    <span className="level-tag">{course.level}</span>
                  </div>
                  <h3>{course.title}</h3>
                </Link>
                <div className="meta">
                  <span><FaStar /> {course.rating} (0 Rating)</span>
                  <span><FaUser /> {course.students} Students</span>
                </div>
                <p className="desc">{course.description.slice(0, 90)}...</p>
                <div className="price-row">
                  <div className="price">
                    ${course.price.toFixed(2)}{' '}
                    <span className="old-price">${course.oldPrice}</span>
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
