import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();

  // You can fetch course by ID or use static data
  const courseData = {
    hacking: {
      title: 'Ethical Hacking Course',
      description: 'Learn advanced hacking with practical labs.',
      image: '/images/hacking.jpg',
      price: 176,
    },
    // Add more if needed
  };

  const course = courseData[id];

  if (!course) return <h2>Course not found</h2>;

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <img src={course.image} alt={course.title} />
      <p>{course.description}</p>
      <p><strong>Price:</strong> ${course.price}</p>
    </div>
  );
};

export default CourseDetail;
