// src/components/QuizzesSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import '../styles/landingpage.css';

import quiz1 from "../assets/quiz1.png";
import quiz2 from "../assets/quiz2.png";
import quiz3 from "../assets/quiz3.png";

const quizList = [
  {
    title: "Advance Quiz of Webflow",
    category: "Business - Quiz",
    duration: "5 Min",
    questions: "5 Questions",
    marks: "10 Marks",
    price: "$187.00",
    oldPrice: "$466.00",
    image: quiz1,
  },
  {
    title: "Basic Quiz of WordPress",
    category: "UI UX Design - Quiz",
    duration: "5 Min",
    questions: "5 Questions",
    marks: "10 Marks",
    price: "$116.00",
    oldPrice: "$302.00",
    image: quiz2,
  },
  {
    title: "Quiz About Laravel File Structure",
    category: "3D Modeling - Quiz",
    duration: "5 Min",
    questions: "5 Questions",
    marks: "10 Marks",
    price: "$142.00",
    oldPrice: "$340.00",
    image: quiz3,
  },
];

const QuizzesSection = () => {
  return (
    <section className="quiz-section">
      <div className="quiz-header-box">
        <h2 className="quiz-title">Explore popular Quizzes</h2>
        <button className="all-quiz-btn">All Quiz</button>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination]}
        className="quiz-swiper"
      >
        {quizList.map((quiz, index) => (
          <SwiperSlide key={index}>
            <div className="quiz-card">
              <img src={quiz.image} alt={quiz.title} className="quiz-image" />
              <div className="quiz-info-bar">
                <span>⏱ {quiz.duration}</span>
                <span>🧠 {quiz.questions}</span>
                <span>📝 {quiz.marks}</span>
              </div>
              <div className="quiz-content">
                <div className="quiz-category">{quiz.category}</div>
                <div className="quiz-name">{quiz.title}</div>
                <div className="quiz-footer">
                  <button className="buy-now-btn">Buy Now</button>
                  <div>
                    <div className="old-price">{quiz.oldPrice}</div>
                    <div className="new-price">{quiz.price}</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default QuizzesSection;
