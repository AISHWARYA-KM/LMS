import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrgSidebarLayout from '../../components/orgsidebarlayout';
import '../../styles/AssignCourseToBatch.css';

const AssignCourseToBatch = () => {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const token = localStorage.getItem('access');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/org/view-courses/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setCourses(res.data)).catch(console.error);

    axios.get('http://127.0.0.1:8000/api/org/batches/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setBatches(res.data)).catch(console.error);
  }, [token]);

  const handleAssign = () => {
    if (!selectedBatch || !selectedCourse) {
      return alert("Please select both course and batch.");
    }

    axios.post(`http://127.0.0.1:8000/api/org/batches/${selectedBatch}/assign-course/`, {
      course_id: selectedCourse,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      alert("Course assigned successfully!");
      navigate('/org/batches');
    }).catch(err => {
      console.error(err);
      alert("Failed to assign course.");
    });
  };

  return (
    <OrgSidebarLayout>
    <div className="assign-course-container">
      <h2>Assign Course to Batch</h2>

      <label>Select Batch:</label>
      <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
        <option value="">-- Choose Batch --</option>
        {batches.map(batch => (
          <option key={batch.id} value={batch.id}>{batch.name}</option>
        ))}
      </select>

      <label>Select Course:</label>
      <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">-- Choose Course --</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.title}</option>
        ))}
      </select>

      <button onClick={handleAssign}>Assign</button>
    </div>
    </OrgSidebarLayout>
  );
};

export default AssignCourseToBatch;
