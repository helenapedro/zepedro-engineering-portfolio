import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./NavBar.module.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </div>
      <div className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
        <Link to="/" className={`${styles.icon} ${location.pathname === '/' ? styles.active : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon="house" className="fas fa-house" />
          <span>Home</span>
        </Link> 
        <Link to="/projects" className={`${styles.icon} ${location.pathname === '/projects' ? styles.active : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon="building" className="fas fa-building" />
          <span>Projects</span>
        </Link>
        <Link to="/card" className={`${styles.icon} ${location.pathname === '/card' ? styles.active : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon="id-card" className="fas fa-id-card" />
          <span>Card</span>
        </Link>
        <Link to="/certificate" className={`${styles.icon} ${location.pathname === '/certificate' ? styles.active : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon="certificate" className="fas fa-certificate" />
          <span>Certificate</span>
        </Link>
        <a 
          href="https://linkedin.com/in/josefpedro/" 
          target="_blank" 
          rel="noreferrer"
          className={styles.icon} onClick={toggleMenu}>
          <FontAwesomeIcon icon={['fab', 'linkedin']} className="fab fa-linkedin" />
          <span>LinkedIn</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
