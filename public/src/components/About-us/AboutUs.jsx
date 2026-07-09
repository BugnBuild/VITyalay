import React from 'react';
import './about.css';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import aboutImg from '../../assets/images/aboutUs_img.png';

const AboutUs = () => {
  return (
    <section className="about_section">
      <Container>
        <Row className="align-items-center">
          <Col lg="6" md="6">
            <div className="about_content">
              <div className="section-badge">About Us</div>
              <h2>Built for VIT Students, Powered by Faculty</h2>
              <p>
                VITyalay is an innovative platform tailored for college students
                and faculty members to foster a collaborative academic environment.
                It serves as a hub where students post academic or professional
                queries and receive expert answers from teachers.
              </p>
              <p>
                The platform integrates features that encourage transparency,
                engagement, and quality-driven responses — helping every student
                succeed.
              </p>

              <div className="about_stats">
                <div className="about_stat">
                  <span className="num">500+</span>
                  <span className="lbl">Questions</span>
                </div>
                <div className="about_stat">
                  <span className="num">50+</span>
                  <span className="lbl">Faculty</span>
                </div>
                <div className="about_stat">
                  <span className="num">1k+</span>
                  <span className="lbl">Students</span>
                </div>
              </div>

              <NavLink to="/questions" className="btn-primary-custom">
                Join the Community →
              </NavLink>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about_img_wrapper">
              <img src={aboutImg} alt="About VITyalay" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
