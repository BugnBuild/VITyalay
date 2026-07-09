import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './offer.css';
import offerImg from '../../assets/images/offer.png';

const features = [
  {
    icon: '💬',
    title: 'Q&A System',
    desc: 'Post questions and get answers from expert faculty',
  },
  {
    icon: '👍',
    title: 'Voting & Ranking',
    desc: 'Community votes surface the best answers first',
  },
  {
    icon: '📋',
    title: 'Bullet Summaries',
    desc: 'Concise key-point summaries for every answer',
  },
  {
    icon: '⭐',
    title: 'Feedback System',
    desc: 'Rate answers to improve overall quality',
  },
];

const Offer = () => {
  return (
    <section className="offer_section">
      <Container>
        <Row className="align-items-center">
          <Col lg="6" md="6">
            <div className="offer_img_wrapper">
              <img src={offerImg} alt="Platform features" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="offer_content">
              <div className="section-badge">Why VITyalay?</div>
              <h2>Elevate Your Academic Experience</h2>
              <p>
                Resolve all your academic questions effortlessly. Our platform
                connects students with the best faculty minds at VIT.
              </p>

              <div className="offer_features">
                {features.map((f) => (
                  <div className="offer_feature_card" key={f.title}>
                    <span className="offer_feature_icon">{f.icon}</span>
                    <h6>{f.title}</h6>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>

              <NavLink to="/questions" className="btn-primary-custom">
                Explore VITyalay →
              </NavLink>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Offer;
