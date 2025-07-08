import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/api/courses/${id}/`);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to load course", err);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <h2>Loading...</h2>;

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <video controls width="100%">
        <source src={course.video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{course.description}</p>
      <p><strong>Price:</strong> ${course.price}</p>
    </div>
  );
};

export default CourseDetail;
