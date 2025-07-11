import React, { useEffect, useState, useRef } from 'react';
import '../styles/landingpage.css';
import heroBackground from '../assets/hero-image.png';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import mern from '../assets/mern.png';
import blender from '../assets/blender.png';
import wordpress from '../assets/wordpress.png';
import english from '../assets/english.png';
import fullstack  from '../assets/fullstack.png';
import testing from '../assets/testing.png';
import Auto from '../assets/auto.png';
import cyber from '../assets/cyber.png';
import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';
import  QuizzesSection  from "./quiz";
import SuccessSection from './SuccessSection';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

import {
  FaBookOpen,
  FaUserFriends,
  FaGlobe,
  FaHeart,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaChartBar,
  FaPalette,
  FaProjectDiagram
} from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const LandingHero = () => {
  const [stats, setStats] = useState({ courses: 0, students: 0, countries: 0, feedback: 0 });
  const [ref, inView] = useInView({ triggerOnce: true });
  const navigate = useNavigate();

  // Redirect admin users to admin dashboard
  useEffect(() => {
    const accountType = localStorage.getItem('accountType');
    if (accountType === 'admin') {
      navigate('/admin-dashboard');
    }
  }, []);

  // Fetch stats for landing
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch stats', err));
  }, []);


  const categories = [
    { name: 'Laravel', courses: 1, icon: <FaChartBar /> },
    { name: 'Accounting', courses: 1, icon: <FaChartBar /> },
    { name: 'MBA', courses: 1, icon: <FaChartBar /> },
    { name: 'Business', courses: 2, icon: <FaPalette /> },
    { name: '3D Modeling', courses: 2, icon: <FaProjectDiagram /> },
    { name: 'UI UX Design', courses: 2, icon: <FaPalette /> },
    { name: 'Blender', courses: 1, icon: <FaChartBar /> },
  ];

  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const courses = [
    {
      id: 1,
      title: 'Mern stack development',
      image: mern,
      author: 'Super Admin',
      category: 'Software Development',
      rating: 0,
    },
    {
      id: 2,
      title: 'Blender 3D Modeling',
      image: blender,
      author: 'Super Admin',
      category: 'Software Development',
      rating: 0,
    },
    {
      id: 3,
      title: 'WordPress Development',
      image: wordpress,
      author: 'Super Admin',
      category: 'Software Development',
      rating: 0,
    },
    {
      id: 4,
      title: 'Learn English Language',
      image: english,
      author: 'Super Admin',
      category: 'Language',
      rating: 0,
    },
    { id: 5,
      title: 'fullstack web development',
      image: fullstack,
      author: 'Super Admin',
      category: 'Software Development',
      rating: 0,
    },
    {
      id: 6,
      title: 'Manual  Testing',
      image: testing,
      author:' Super Admin',
      category:'Testing',
      rating :5,
    },
    {      id: 7,
      title: 'Automation Testing',
      image: Auto, 
      author: 'Super Admin',
      category: 'Testing',
      rating: 0,

    },
    {
      id: 8,
      title: 'cyber security',
      image: cyber,
      author: 'Super Admin',
      category: 'cyber security',
      rating: 0,
    }


  ];  

  const feedbacks = [
    {
      rating: 4,
      title: 'Course Quality',
      feedback:
        'The Ethical Hacking course helped me gain a solid understanding of cybersecurity principles. It was beginner-friendly and very well structured.',
      name: 'Aishwarya',
      role: 'Developer',
      avatar: avatar1,
    },
    {
      rating: 5,
      title: 'Course Quality',
      feedback:
        'Webflow course was an eye-opener. It covered all design principles and hands-on practice. Highly recommend it for front-end learners.',
      name: 'Tejas',
      role: 'ui/ux designer',
      avatar: avatar2,
    },
    {
      rating: 5,
      title: 'Course Quality',
      feedback:
        'I really enjoyed learning about SQA. The instructor was clear, and the examples were industry-relevant.',
      name:'Raj',
      role: 'Tester',
      avatar: avatar3,
    },
    {
      rating: 5,
      title: 'Course Quality',
      feedback:
        'The course content was engaging and practical. It helped me build real projects with MERN stack easily.',
      name: 'Amulya',
      role: 'Developer',
      avatar: avatar4,
    },
  ];

  return (
    <div className="landing-root">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-logo-wrapper">
          <img src={logo} alt="INFIX Logo" className="landing-logo" />
        </div>
        <nav className="landing-nav">
          <Link to="/landing" className="landing-nav-link">Homepage</Link>
          <Link to="/courses" className="landing-nav-link">Courses</Link>
          <Link to="/quiz" className="landing-nav-link">Quiz</Link>
          <Link to="/classes" className="landing-nav-link">Classes</Link>
          <Link to="/others" className="landing-nav-link">Others</Link>
          <Link to="/my-courses" className="landing-nav-link">MyCourses</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="hero-background" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="hero-overlay">
          <div className="hero-overlay-content">
            <h1>
              For every student,<br />
              every classroom.<br />
              <span>Real results.</span>
            </h1>
            <p>
              Build skills with courses, certificates, and degrees online from
              world-class universities and companies.
            </p>
            <div className="hero-buttons">
              <button className="btn blue">View All Courses</button>
              <button className="btn white">View All Quizzes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="circle-background" />
          <div className="stats-cards" ref={ref}>
            <div className="stat-card">
              <div className="icon orange"><FaBookOpen /></div>
              <h3>{inView && <CountUp end={stats.courses} duration={2} />}+</h3>
              <p>Online Courses</p>
            </div>
            <div className="stat-card">
              <div className="icon blue"><FaUserFriends /></div>
              <h3>{inView && <CountUp end={stats.students} duration={2} />}+</h3>
              <p>Student Enrolled</p>
            </div>
            <div className="stat-card">
              <div className="icon sky"><FaGlobe /></div>
              <h3>{inView && <CountUp end={stats.countries} duration={2} />}+</h3>
              <p>Countries Student</p>
            </div>
            <div className="stat-card">
              <div className="icon green"><FaHeart /></div>
              <h3>{inView && <CountUp end={stats.feedback} duration={2} />}+</h3>
              <p>Positive Feedback</p>
            </div>
          </div>

          <div className="stats-content">
            <h2>We Are Best Corporate<br />Learning Institute</h2>
            <p>
              Since the year of 2008 and now at in 2019 "Spondon It" most popular in UI & UX,
              Web App Development, Digital Marketing and Graphic Design related service provide
              both Local (Bangladesh) and global too!
            </p>
            <p>
              At a time we are also doing our best for our clients by giving our service. This 
              in popularity in this Digital Tech World.
            </p>

            <ul className="benefits">
              <li><FaCheckCircle className="check-icon" /> Explore the wide-range of online courses</li>
              <li><FaCheckCircle className="check-icon" /> Popular online course in the world</li>
            </ul>

            <button className="know-more-btn">Know More</button>
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="top-categories-section">
        <h2 className="section-title">Top Categories</h2>
        <p className="section-subtitle">
          Amet minim non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat
        </p>
        <div className="carousel-wrapper">
          <button className="carousel-btn left" onClick={() => scroll('left')}>
            <FaArrowLeft />
          </button>
          <div className="carousel-container" ref={scrollRef}>
            {categories.map((cat, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">{cat.icon}</div>
                <h4>{cat.name}</h4>
                <p>{cat.courses} Courses</p>
              </div>
            ))}
          </div>
          <button className="carousel-btn right" onClick={() => scroll('right')}>
            <FaArrowRight />
          </button>
        </div>
      </section>
      {/* Popular Courses Section */}
      <section className="top-courses-section">
      <div className="top-courses-header">
        <h2 className="top-courses-title">Top Online Courses</h2>
        <Link to="/courses" className="all-courses-btn">All Course</Link>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-meta">
              <p className="course-category">in: {course.category}</p>
              <p className="course-author">
                <img src="/images/admin-avatar.jpg" alt="Admin" className="author-avatar" />
                {course.author}
                <span className="stars">★★★★★</span>
              </p>
              <h3 className="course-title">{course.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
      {/* Feedback Section */}
      <section className="course-feedback-section">
      <div className="feedback-container">
        {feedbacks.map((item, index) => (
          <div key={index} className="feedback-card">
            <div className="rating-badge">
              {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
              <span>{item.title}</span>
            </div>
            <p className="feedback-text">“{item.feedback}”</p>
            <div className="student-info">
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} className="avatar" />
              ) : (
                <div className="avatar-fallback">{item.initials}</div>
              )}
              <div className="student-meta">
                <p className="student-role">{item.role}</p>
                <p className="student-name">{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    <QuizzesSection />
      <SuccessSection />
      <Footer />
    </div>
  );
};

export default LandingHero;

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /* import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import heroimage from '../assets/hero-image.png';
import blender from '../assets/blender.png';
import wordpress from '../assets/wordpress.png';
import english from '../assets/english.png';
import mern from '../assets/mern.png';
import '../styles/landingpage.css';
import instructor1 from '../assets/instructor1.png';
import instructor2 from '../assets/instructor2.png';
import instructor3 from '../assets/instructor3.png';
import instructor4 from '../assets/instructor4.png';
import { FaFacebook, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Footer from '../components/Footer';

import {
  MdDeviceHub,
  MdBrush,
  MdCamera,
  MdViewModule,
  MdPhoneIphone,
  MdCode,
  MdDesignServices,
  MdDashboardCustomize
} from 'react-icons/md';

const instructors = [
  { name: 'Alice Johnson', image: instructor1, role: 'Lead Instructor' },
  { name: 'Bob Williams', image: instructor2, role: 'Design Expert' },
  { name: 'Michael Brown', image: instructor3, role: 'Development Guru' },
  { name: 'Emily Davis', image: instructor4, role: 'Marketing Specialist' },
];

const faqItems = [
  {
    question: 'What is an LMS?',
    answer: 'An LMS, or Learning Management System, is a software application designed to administer, track, and manage educational content and resources.',
  },
  {
    question: 'How does an LMS work?',
    answer: 'An LMS works by allowing instructors to create content, assign tasks, track student progress, and deliver quizzes or certifications.',
  },
  {
    question: 'What are the key features of an LMS?',
    answer: 'Key features include course management, user enrollment, progress tracking, reporting tools, content delivery (videos, documents, quizzes), and communication tools.',
  },
  {
    question: 'Who can benefit from using an LMS?',
    answer: 'Educational institutions, corporate trainers, HR departments, coaching centers, and individual instructors can all benefit from using an LMS.',
  },
  {
    question: 'What types of content can be delivered through an LMS?',
    answer: 'An LMS can deliver a variety of content including videos, PDFs, SCORM packages, quizzes, presentations, assignments, and live sessions.',
  },
];

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="landing-root">
      <header className="landing-header">
        <div>
          <img src={logo} alt="INFIX Logo" className="landing-logo" />
        </div>
        <nav className="landing-nav">
          <Link to="/landing" className="landing-nav-link">Homepage</Link>
          <Link to="../courses" className="landing-nav-link">Courses</Link>
          <Link to="/quiz" className="landing-nav-link">Quiz</Link>
          <Link to="/classes" className="landing-nav-link">Classes</Link>
          <Link to="/others" className="landing-nav-link">Others</Link>
          <Link to="/addons" className="landing-nav-link">Addons</Link>
        </nav>
      </header>

      <section className="landing-hero-section">
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">
            The most trusted &amp; worthy tech skill learning Platform
          </h1>
          <p className="landing-hero-desc">
            With our interactive courses, you may explore an infinite array of learning possibilities from thought leaders and industry professionals.
          </p>
          <Link to="/signup">
            <button className="landing-btn landing-btn-getstarted">Get Started</button>
          </Link>
          <Link to="/signup">
            <button className="landing-btn landing-btn-joinnow">Join Now</button>
          </Link>
        </div>
        <div className="landing-hero-image-container">
          <img src={heroimage} alt="Learning Illustration" className="landing-hero-image" />
        </div>
      </section>

     /* <section className="features-section">
        <div className="features-container">
          <div className="feature-box">
            <span className="icon">🎓</span>
            <h3>50K + Online Course</h3>
            <p>Enjoy lifetime access to course</p>
          </div>
          <div className="feature-box">
            <span className="icon">📘</span>
            <h3>Teacher Directory</h3>
            <p>Learn from industry experts</p>
          </div>
          <div className="feature-box">
            <span className="icon">🛡️</span>
            <h3>Unlimited access</h3>
            <p>Learn on your schedule</p>
          </div>
        </div>
      </section>

      {/* Course Categories */
     /* <section className="course-categories">
        <div className="category-tabs-line">
          <div className="category-tab"><MdDeviceHub size={24} /><span>3D Modeling</span></div>
          <div className="category-tab"><MdBrush size={24} /><span>UI UX Design</span></div>
          <div className="category-tab"><MdCamera size={24} /><span>Blender Creator</span></div>
          <div className="category-tab"><MdViewModule size={24} /><span>3D Environments</span></div>
          <div className="category-tab"><MdPhoneIphone size={24} /><span>Mobile Development</span></div>
          <div className="category-tab"><MdCode size={24} /><span>Software Development</span></div>
          <div className="category-tab"><MdDesignServices size={24} /><span>Adobe XD</span></div>
          <div className="category-tab"><MdDashboardCustomize size={24} /><span>UI Design</span></div>
        </div>
      </section>

      {/* Popular Courses */
      /*<div className="popular-courses-section">
        <div className="popular-courses-header">
          <h2>Our Popular Courses</h2>
          <Link to="/view-all">View All ↗</Link>
        </div>
        <div className="course-card-scroll-wrapper">
          <div className="course-card-row auto-scroll">
            <div className="course-card-row">
              <div className="course-card">
                <img src={blender} alt="Blender Course" className="course-image" />
                <h3 className="course-title">Blender 3D Modeling</h3>
                <p className="course-description">Learn the fundamentals of 3D modeling with Blender.</p>
                <Link to="/courses/blender" className="course-link">View Course</Link>
              </div>
              <div className="course-card">
                <img src={wordpress} alt="WordPress Course" className="course-image" />
                <h3 className="course-title">WordPress Development</h3>
                <p className="course-description">Build stunning websites using WordPress.</p>
                <Link to="/courses/wordpress" className="course-link">View Course</Link>
              </div>
              <div className="course-card">
                <img src={english} alt="English Course" className="course-image" />
                <h3 className="course-title">English Language Mastery</h3>
                <p className="course-description">Enhance your English speaking and writing skills.</p>
                <Link to="/courses/english" className="course-link">View Course</Link>
              </div>
              <div className="course-card">
                <img src={mern} alt="MERN Stack Course" className="course-image" />
                <h3 className="course-title">MERN Stack Development</h3>
                <p className="course-description">Master full-stack development with MongoDB, Express, React, and Node.js.</p>
                <Link to="/courses/mern" className="course-link">View Course</Link>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */
      /*<div className="feedback-wrapper">
        <p className="user-count">Over <span className="highlight">6,000</span> users worldwide place their trust in us</p>
        <div className="logo-strip">
          <img src="/logos/logo1.png" alt="Logo 1" />
          <img src="/logos/logo2.png" alt="Logo 2" />
          <img src="/logos/logo3.png" alt="Logo 3" />
          <img src="/logos/logo4.png" alt="Logo 4" />
          <img src="/logos/logo5.png" alt="Logo 5" />
          <img src="/logos/logo6.png" alt="Logo 6" />
        </div>
        <h2 className="feedback-heading">Our Client Feedback</h2>
        <div className="feedback-container">
          <div className="feedback-card dark">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Kissmetrics customer describes how the software helped him achieve his goals."</p>
          </div>
          <div className="feedback-card purple">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Working in conjunction with humanitarian aid agencies, we have supported programmes."</p>
          </div>
          <div className="feedback-card dark">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry."</p>
          </div>
        </div>
      </div>

      {/* Instructors Section */
      /*<div className="instructor-section">
        <h2 className="instructor-title">Popular Instructors</h2>
        <p className="instructor-subtitle">Making sure that our products exceed customer expectation</p>
        <div className="instructor-cards">
          {instructors.map((instructor, index) => (
            <div key={index} className="instructor-card">
              <div className="instructor-img-wrapper">
                <img src={instructor.image} alt={instructor.name} />
                <div className="social-icons">
                  <a href="#"><FaFacebook /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaLinkedin /></a>
                  <a href="#"><FaYoutube /></a>
                </div>
              </div>
              <p className="instructor-name">{instructor.name}</p>
              <p className="instructor-role">{instructor.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */
      /*<section className="faq-container">
        <h2 className="faq-title">FAQ</h2>
        <p className="faq-subtitle">Some common question & answer</p>
        <div className="faq-box">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{item.question}</h3>
                <span>{activeIndex === index ? '−' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;*/
