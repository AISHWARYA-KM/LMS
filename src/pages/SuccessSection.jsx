import React, { useState } from "react";
import "../styles/SuccessSection.css";

const SuccessSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="success-container">
      {/* Left Side - Success Story */}
      <div className="success-left">
        <h2 className="success-title">Success Story</h2>
        <p className="success-desc">
          Here is short details about our institute. Also you can see how we work
        </p>

        <div className="video-stack">
          <img src="https://via.placeholder.com/150" alt="Bottom" className="video-img bottom" />
          <img src="https://via.placeholder.com/150" alt="Top" className="video-img top" />
          <img src="https://via.placeholder.com/150" alt="Main" className="video-img main" />
          <button className="play-button" onClick={() => setShowVideo(true)}>
            ▶
          </button>
        </div>
      </div>

      {/* Right Side - Brand Logos */}
      <div className="success-right">
        <h2 className="brand-title">Brand Who Trust Us</h2>
        <div className="brand-logos">
          {["logo1", "logo2", "logo3", "logo4", "logo5", "logo6"].map((logo, index) => (
            <div className="logo-card" key={index}>
              <img
                src={`https://via.placeholder.com/100x50?text=${logo}`}
                alt={`Brand ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Video */}
      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <video controls autoPlay className="video-player">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default SuccessSection;
