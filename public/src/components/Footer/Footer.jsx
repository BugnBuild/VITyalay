import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="6" className="footer_col mb-4">
            <div className="footer_brand">
              <h2>VITyalay</h2>
              <p>
                A collaborative Q&A platform for VIT students and faculty.
                Learning beyond classrooms, together.
              </p>
            </div>
            <div className="footer_social mt-4">
              <a href="https://www.facebook.com/profile.php?id=61550968324708" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="https://x.com/Raghwendra531" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="ri-twitter-fill"></i>
              </a>
              <a href="https://www.linkedin.com/in/raghwendra-singh-62aab3288/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="ri-linkedin-fill"></i>
              </a>
              <a href="https://www.instagram.com/raghwendrasingh_531/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="ri-instagram-fill"></i>
              </a>
            </div>
          </Col>

          <Col lg="2" md="3" className="footer_col mb-4">
            <h5>Platform</h5>
            <ul className="footer_links">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/questions">Question Bank</NavLink></li>
              <li><NavLink to="/questions">Post a Question</NavLink></li>
            </ul>
          </Col>

          <Col lg="3" md="3" className="footer_col mb-4">
            <h5>Subjects</h5>
            <ul className="footer_links">
              <li><NavLink to="/questions?subject=Python">Python</NavLink></li>
              <li><NavLink to="/questions?subject=DBMS">DBMS</NavLink></li>
              <li><NavLink to="/questions?subject=Calculus">Calculus</NavLink></li>
              <li><NavLink to="/questions?subject=JavaScript">JavaScript</NavLink></li>
              <li><NavLink to="/questions?subject=Machine+Learning">Machine Learning</NavLink></li>
            </ul>
          </Col>

          <Col lg="3" md="6" className="footer_col mb-4">
            <h5>Contact</h5>
            <ul className="footer_links">
              <li>
                <a href="mailto:contact@vityalay.in">contact@vityalay.in</a>
              </li>
              <li>
                <a href="https://vit.ac.in" target="_blank" rel="noopener noreferrer">
                  VIT University
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="footer_divider" />

        <div className="footer_bottom">
          <p>© {year} VITyalay. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
