import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './hero-section.css';
import SearchIcon from '../../assets/images/search.svg';
import heroImg from '../../assets/images/hero-img1.png';
import { getQuestions } from '../../api';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      setResults([]);
      setError('');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const data = await getQuestions(searchTerm.trim());
      setResults(data);
    } catch (err) {
      setError(err.message || 'Unable to search questions right now.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero_section">
      <Container>
        <Row className="align-items-center">
          <Col lg="6" md="6">
            <div className="hero_content">
              <div className="section-badge">🎓 For VIT Students & Faculty</div>
              <h1>
                <span className="highlight">VITyalay</span> — Learning
                <br /> Beyond Classrooms
              </h1>
              <p>
                A collaborative hub where students post academic queries and
                receive expert answers from top professors.
              </p>

              <div className="hero_stats">
                <div className="stat_item">
                  <span className="stat_num">500+</span>
                  <span className="stat_label">Questions Asked</span>
                </div>
                <div className="stat_item">
                  <span className="stat_num">50+</span>
                  <span className="stat_label">Expert Faculty</span>
                </div>
                <div className="stat_item">
                  <span className="stat_num">20+</span>
                  <span className="stat_label">Subjects</span>
                </div>
              </div>

              <form className="search_bar" onSubmit={handleSearch}>
                <img src={SearchIcon} alt="search" />
                <input
                  type="text"
                  placeholder="Search questions by topic, subject…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn-search">
                  {loading ? 'Searching…' : 'Search'}
                </button>
              </form>

              {error && (
                <p className="text-danger small mt-2">{error}</p>
              )}

              {!error && !loading && results.length > 0 && (
                <div className="search_results">
                  <p className="small mb-2" style={{ color: '#6b7280', fontWeight: 600 }}>
                    {results.length} result{results.length !== 1 ? 's' : ''} for "{searchTerm}"
                  </p>
                  {results.slice(0, 4).map((q) => (
                    <div
                      key={q.id}
                      className="search_result_item"
                      onClick={() => navigate('/questions')}
                    >
                      <h6>{q.title}</h6>
                      {q.subject && (
                        <span
                          className="badge me-2"
                          style={{ background: '#f0ebff', color: '#6c47ff', fontSize: '0.72rem' }}
                        >
                          {q.subject}
                        </span>
                      )}
                      <p>{q.body.length > 80 ? `${q.body.slice(0, 80)}…` : q.body}</p>
                    </div>
                  ))}
                  {results.length > 4 && (
                    <button
                      className="btn-outline-custom mt-2"
                      style={{ fontSize: '0.82rem', padding: '7px 16px' }}
                      onClick={() => navigate('/questions')}
                    >
                      See all {results.length} results →
                    </button>
                  )}
                </div>
              )}

              {!error && !loading && results.length === 0 && searchTerm && (
                <div className="search_results">
                  <p className="small mb-0" style={{ color: '#6b7280' }}>
                    No results for "{searchTerm}".{' '}
                    <span
                      style={{ color: '#6c47ff', cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => navigate('/questions')}
                    >
                      Post this question →
                    </span>
                  </p>
                </div>
              )}
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero_img_wrapper">
              <img src={heroImg} alt="Students learning online" />
              <div className="floating_badge badge_1">
                <div className="badge_icon">🔥</div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>Trending</div>
                  <div>DBMS Questions</div>
                </div>
              </div>
              <div className="floating_badge badge_2">
                <div className="badge_icon">✅</div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>Answered</div>
                  <div>Just now</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
