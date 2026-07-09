import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Question Bank', path: '/questions' },
];

const Header = () => {
  const menuRef = useRef();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuToggle = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('active_menu');
    }
  };

  const closeMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.remove('active_menu');
    }
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <h2>VITyalay</h2>
          </div>

          <div className="nav d-flex align-items-center gap-4">
            <div className="nav_menu" ref={menuRef} onClick={closeMenu}>
              <ul className="nav_list" onClick={(e) => e.stopPropagation()}>
                {navLinks.map((item) => (
                  <li key={item.path} className="nav_item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'}
                      end={item.path === '/'}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_right">
              <NavLink to="/questions" className="btn-sign_in">
                + Ask a Question
              </NavLink>
            </div>
          </div>

          <div className="mobile_menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle} />
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
