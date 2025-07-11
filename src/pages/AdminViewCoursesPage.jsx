import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/adminviewcourses.css';
import { Link , useLocation} from 'react-router-dom';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

const categories = ['Manual Testing', 'Automation Testing', 'API Testing', 'Mobile Testing', 'Python Development', 'java Development', 'UI/UX', 'mern Stack'];
const levels = ['Beginner', 'Intermediate', 'Advance'];
const prices = ['Free', 'Paid'];
const instructors = ['Pramod', 'Mani', 'Bharat', 'Kartik'];

const AdminViewCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const [filters, setFilters] = useState({
    category:[],
    level:[],
    price_type:[],
    instructor:[],
  });

  const token = localStorage.getItem('access');

  const fetchCourses = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        value.forEach((val) => {
          queryParams.append(key, val);
        });
      });

      const res = await axios.get(`http://127.0.0.1:8000/api/admin/view-courses/?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value) // remove if already selected
        : [...prev[key], value];              // add if not selected
      return { ...prev, [key]: updated };
    });
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

    <main className="admin-course-wrapper">
      <div className="sidebar">
        <h3>Filter Courses</h3>

        <div className="filter-group">
          <h4>Category</h4>
          {categories.map(cat => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => handleFilterChange('category', cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>Level</h4>
          {levels.map(level => (
            <label key={level}>
              <input
                type="checkbox"
                checked={filters.level.includes(level)}
                onChange={() => handleFilterChange('level', level)}
              />
              {level}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>Price</h4>
          {prices.map(price => (
            <label key={price}>
              <input
                type="checkbox"
                checked={filters.price_type.includes(price)}
                name="price"
                onChange={() => handleFilterChange('price_type', price)}
              />
              {price}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>Instructor</h4>
          {instructors.map(instructor => (
            <label key={instructor}>
              <input
                type="checkbox"
                checked={filters.instructor.includes(instructor)}
                onChange={() => handleFilterChange('instructor', instructor)}
              />
              {instructor}
            </label>
          ))}
        </div>
      </div>

      <div className="course-display">
        <h2>📚 All Courses (Admin)</h2>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div className="course-grid">
            {courses.map(course => (
              <Link key={course.id} to={`/courses/${course.id}`} className="course-card">
                <img src={course.thumbnail_url} alt={course.title} />
                <h3>{course.title}</h3>
                <p>{course.description.slice(0, 90)}...</p>
                <p><b>Instructor:</b> {course.instructor}</p>
                <p><b>Level:</b> {course.level}</p>
                <p><b>Price:</b> ₹{course.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>

    <Footer />
  </div>
);
}
export default AdminViewCoursesPage;
