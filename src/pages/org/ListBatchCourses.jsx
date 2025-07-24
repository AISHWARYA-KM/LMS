import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrgSidebarLayout from '../../components/orgsidebarlayout';
import '../../styles/list-batch-courses.css'; // ✅ Make sure path is correct

const ListBatchCourses = () => {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('access');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/org/batches-with-courses/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBatches(res.data))
      .catch((err) => {
        console.error('Failed to fetch batch courses:', err?.response?.data || err.message);
        setError('Failed to load batch courses.');
      });
  }, []);

  return (
    <OrgSidebarLayout>
      <div className="batch-courses-container">
        <h2>📦 Batches with Assigned Courses</h2>

        {error && <p className="error-text">{error}</p>}

        {batches.length === 0 ? (
          <p className="empty-text">No batches available.</p>
        ) : (
          <ul className="batch-list">
            {batches.map((batch) => (
              <li className="batch-card" key={batch.id}>
                <div className="batch-header">
                  <h3 className="batch-title">🧾 {batch.name}</h3>
                </div>

                {batch.courses.length > 0 ? (
                  <ul className="course-list">
                    {batch.courses.map((course) => (
                      <li key={course.id} className="course-item">
                        {course.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-courses">No courses assigned.</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </OrgSidebarLayout>
  );
};

export default ListBatchCourses;
