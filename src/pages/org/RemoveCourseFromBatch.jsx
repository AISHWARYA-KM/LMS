import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrgSidebarLayout from '../../components/orgsidebarlayout';
import '../../styles/RemoveCourseFromBatch.css'; // Link your CSS

function RemoveCourseFromBatch() {
  const [batchCourses, setBatchCourses] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('access');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchBatchCourses = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/org/batch-courses/',
        config
      );
      setBatchCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch batch courses:', error);
      setMessage('Failed to load data.');
    }
  };

  const handleRemove = async (batchId, courseTitle) => {
    try {
      await axios.delete(
        'http://127.0.0.1:8000/api/org/remove-course-by-name/',
        {
          headers: config.headers,
          data: { batch_id: batchId, course_title: courseTitle }
        }
      );
      setMessage('Course removed successfully.');
      fetchBatchCourses();
    } catch (error) {
      console.error('Error removing course:', error);
      setMessage('Failed to remove course.');
    }
  };

  useEffect(() => {
    fetchBatchCourses();
  }, []);

  return (
    <OrgSidebarLayout>
      <div className="remove-course-container">
        <h2 className="remove-course-title">Remove Courses from Batches</h2>
        {message && <p className="remove-course-message">{message}</p>}

        {batchCourses.length > 0 ? (
          <ul className="remove-course-list">
            {batchCourses.map((item, index) => (
              <li key={index} className="remove-course-item">
                <span>
                  <strong>Batch:</strong> {item.batch_name} | <strong>Course:</strong> {item.course_title}
                </span>
                <button
                  onClick={() => handleRemove(item.batch_id, item.course_title)}
                  className="remove-course-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="remove-course-empty">No assigned courses found.</p>
        )}
      </div>
    </OrgSidebarLayout>
  );
}

export default RemoveCourseFromBatch;
