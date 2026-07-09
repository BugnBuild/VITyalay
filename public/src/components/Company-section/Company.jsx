import React from 'react';
import './company-section.css';
import { Container } from 'reactstrap';

const Company = () => {
  return (
    <section className="company_section">
      <Container>
        <div className="company_header">
          <p>Connect with us</p>
        </div>
        <div className="social_links">
          <a
            href="https://www.facebook.com/profile.php?id=61550968324708"
            className="social_link facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-facebook-fill"></i>
            <span>Facebook</span>
          </a>
          <a
            href="https://x.com/Raghwendra531"
            className="social_link twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-twitter-fill"></i>
            <span>Twitter</span>
          </a>
          <a
            href="https://www.linkedin.com/in/raghwendra-singh-62aab3288/"
            className="social_link linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-linkedin-fill"></i>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/raghwendrasingh_531/?hl=en"
            className="social_link instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-instagram-fill"></i>
            <span>Instagram</span>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default Company;
