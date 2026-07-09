import React, { useState } from 'react';
import './updates.css';
import { Container, Row, Col } from 'reactstrap';
import updateImg from '../../assets/images/getUpdates_img.png';
import { subscribeToUpdates } from '../../api';

const Updates = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setMessage('Please enter your email address.');
      setStatus('error');
      return;
    }
    try {
      setStatus('loading');
      setMessage('');
      const result = await subscribeToUpdates(email.trim());
      setStatus('success');
      setMessage(result.message || 'Subscribed successfully! 🎉');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Unable to subscribe right now.');
    }
  };

  return (
    <section className="updates_section">
      <Container>
        <Row className="align-items-center">
          <Col lg="6" md="6">
            <div className="update_content">
              <div className="update_badge">Newsletter</div>
              <h2 className="update_title">Stay in the Loop</h2>
              <p className="update_p">
                Get notified when new questions are answered, new subjects go live,
                and when VITyalay launches new features.
              </p>

              <form className="subscribe_form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn-subscribe"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>

              {message && (
                <p
                  className="mt-3 small"
                  style={{
                    color: status === 'error' ? '#f87171' : '#86efac',
                    fontWeight: 500,
                  }}
                >
                  {message}
                </p>
              )}
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="update_img_wrapper">
              <img src={updateImg} alt="Stay updated" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Updates;
