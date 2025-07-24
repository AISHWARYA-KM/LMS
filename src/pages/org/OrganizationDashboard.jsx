import React from 'react';
import OrgSidebar from '../../components/orgsidebarlayout.jsx'; // import the new sidebar component
import '../../styles/orgdashboard.css';
import hero from '../../assets/orgdash.png';

const OrgSidebarLayout = ({ children }) => (
  <div className="org-dashboard-container">
    <OrgSidebar />
    <main className="org-main-content">
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="typing-line1">For every student,</h1>
          <h1 className="typing-line2">every classroom.</h1>
          <p className="hero-subtext">
            Build skills with courses, certificates, <br />
            and degrees online from world-class universities and companies.
          </p>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Background Illustration" />
        </div>
      </div>
      {children}
    </main>
  </div>
);

export default OrgSidebarLayout;
