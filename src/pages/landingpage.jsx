import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { FaFacebook, FaYoutube, FaTwitter, FaLinkedin, FaArrowUp, FaWhatsapp } from 'react-icons/fa';
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
    answer:
      'An LMS, or Learning Management System, is a software application designed to administer, track, and manage educational content and resources. It is commonly used in educational institutions and organizations for online learning and training.',
  },
  {
    question: 'How does an LMS work?',
    answer:
      'An LMS works by allowing instructors to create content, assign tasks, track student progress, and deliver quizzes or certifications. Learners can log in, view content, complete assessments, and interact with instructors or peers.',
  },
  {
    question: 'What are the key features of an LMS?',
    answer:
      'Key features include course management, user enrollment, progress tracking, reporting tools, content delivery (videos, documents, quizzes), and communication tools such as chat or announcements.',
  },
  {
    question: 'Who can benefit from using an LMS?',
    answer:
      'Educational institutions, corporate trainers, HR departments, coaching centers, and individual instructors can all benefit from using an LMS to manage and deliver training efficiently.',
  },
  {
    question: 'What types of content can be delivered through an LMS?',
    answer:
      'An LMS can deliver a variety of content including videos, PDFs, SCORM packages, quizzes, presentations, assignments, and live sessions (via integration with video conferencing tools).',
  },
];

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

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
        <div className="auth-buttons">
          <Link to="/login">
            <button className="landing-btn landing-btn-login">Login</button>
          </Link>
          <Link to="/signup">
            <button className="landing-btn landing-btn-signup">Sign Up</button>
          </Link>
        </div>
      </header>

      <section className="landing-hero-section">
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">
            The most trusted &amp; worthy tech skill learning Platform
          </h1>
          <p className="landing-hero-desc">
            With our interactive courses, you may explore an infinite array of learning possibilities from thought leaders and industry professionals who will help you develop new skills, and realise your full potential.
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

      {/* --- Feature Boxes Section --- */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-box">
            <span className="icon" role="img" aria-label="Graduation Cap">🎓</span>
            <h3>50K + Online Course</h3>
            <p>Enjoy lifetime access to course</p>
          </div>
          <div className="feature-box">
            <span className="icon" role="img" aria-label="Book">📘</span>
            <h3>Teacher Directory</h3>
            <p>Learn from industry experts</p>
          </div>
          <div className="feature-box">
            <span className="icon" role="img" aria-label="Shield">🛡️</span>
            <h3>Unlimited access</h3>
            <p>Learn on your schedule</p>
          </div>
        </div>
      </section>

      {/* --- Course Categories Section --- */}
      <section className="course-categories">
        <div className="category-tabs-line">
          <div className="category-tab">
            <MdDeviceHub size={24} />
            <span>3D Modeling</span>
          </div>
          <div className="category-tab">
            <MdBrush size={24} />
            <span>UI UX Design</span>
          </div>
          <div className="category-tab">
            <MdCamera size={24} />
            <span>Blender Creator</span>
          </div>
          <div className="category-tab">
            <MdViewModule size={24} />
            <span>3D Environments</span>
          </div>
          <div className="category-tab">
            <MdPhoneIphone size={24} />
            <span>Mobile Development</span>
          </div>
          <div className="category-tab">
            <MdCode size={24} />
            <span>Software Development</span>
          </div>
          <div className="category-tab">
            <MdDesignServices size={24} />
            <span>Adobe XD</span>
          </div>
          <div className="category-tab">
            <MdDashboardCustomize size={24} />
            <span>UI Design</span>
          </div>
        </div>
      </section>

      <div className="popular-courses-section">
        <div className="popular-courses-header">
          <h2>Our Popular Courses</h2>
          <Link to="/view-all">View All ↗</Link>
        </div>
        <div className="course-card-scroll-wrapper">
          <div className="course-card-row auto-scroll">
            <div className="course-card-row">
              {/* Course 1 */}
              <div className="course-card">
                <div className="course-image-wrapper">
                  <img src={blender} alt="Learn 3D in Blender" />
                </div>
                <div className="course-content">
                  <h3 className="course-title">Learn 3D In Blender Tutorial for Beginners</h3>
                  <div className="course-meta">
                    <span>⭐ 0 (0 Rating)</span>
                    <span>👤 1 Students</span>
                  </div>
                  <p className="course-description">
                    An Entire MBA in 1 Course is an award-winning course designed to provide a comprehensive...
                  </p>
                </div>
                <div className="course-footer">
                  <span className="course-price">$149.00 <span className="course-old-price">$428.00</span></span>
                  <span className="cart-icon" role="img" aria-label="Add to cart">🛒</span>
                </div>
              </div>

              {/* Course 2 */}
              <div className="course-card">
                <div className="course-image-wrapper">
                  <img src={wordpress} alt="WordPress Theme Development" />
                </div>
                <div className="course-content">
                  <h3 className="course-title">Learn WordPress Theme Development with WordPress</h3>
                  <div className="course-meta">
                    <span>⭐ 0 (0 Rating)</span>
                    <span>👤 1 Students</span>
                  </div>
                  <p className="course-description">
                    Learn 3D modeling in Blender from scratch with this beginner-friendly course. Master...
                  </p>
                </div>
                <div className="course-footer">
                  <span className="course-price">$119.00 <span className="course-old-price">$236.00</span></span>
                  <span className="cart-icon" role="img" aria-label="Add to cart">🛒</span>
                </div>
              </div>

              {/* Course 3 */}
              <div className="course-card">
                <div className="course-image-wrapper">
                  <img src={english} alt="Learn English in 30 Days" />
                </div>
                <div className="course-content">
                  <h3 className="course-title">Learn English in 30 Days</h3>
                  <div className="course-meta">
                    <span>⭐ 0 (0 Rating)</span>
                    <span>👤 1 Students</span>
                  </div>
                  <p className="course-description">
                    Learn how to create stunning 3D environments using Blender, a powerful open-source...
                  </p>
                </div>
                <div className="course-footer">
                  <span className="course-price">$190.00 <span className="course-old-price">$362.00</span></span>
                  <span className="cart-icon" role="img" aria-label="Add to cart">🛒</span>
                </div>
              </div>

              {/* Course 4 */}
              <div className="course-card">
                <div className="course-image-wrapper">
                  <img src={mern} alt="MERN Full Stack Development" />
                </div>
                <div className="course-content">
                  <h3 className="course-title">MERN – Full Stack Web Development</h3>
                  <div className="course-meta">
                    <span>⭐ 0 (0 Rating)</span>
                    <span>👤 1 Students</span>
                  </div>
                  <p className="course-description">
                    This advanced course in managerial accounting covers advanced topics such as cost behavio...
                  </p>
                </div>
                <div className="course-footer">
                  <span className="course-price">$140.00 <span className="course-old-price">$395.00</span></span>
                  <span className="cart-icon" role="img" aria-label="Add to cart">🛒</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- Feedback Section --- */}

      <div className="feedback-wrapper">
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
            <p>
              "Kissmetrics customer describes how the software helped him achieve his goals. Notice how he highlights different features that Kissmetrics offers and how they directly impacted his business."
            </p>
          </div>

          <div className="feedback-card purple">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "Working in conjunction with humanitarian aid agencies, we have supported programmes to help alleviate human suffering through."
            </p>
          </div>

          <div className="feedback-card dark">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
            </p>
          </div>
        </div>
      </div>
      {/* instructer section */}
      <div className="instructor-section">
        <h2 className="instructor-title">Popular Instructors</h2>
        <p className="instructor-subtitle">
          Making sure that our products exceed customer expectation
        </p>
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
      <section className="faq-container">
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


export default LandingPage;