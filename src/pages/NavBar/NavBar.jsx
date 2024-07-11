import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./NavBar.module.css";
import iconStyles from '../../styles/Icons.module.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={menuOpen ? styles.active : ''} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </div>
      <div className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''} onClick={toggleMenu}>
          <FontAwesomeIcon icon="house" className={`${iconStyles.icon} ${iconStyles.solid} fas fa-house`} />
         <span>Home</span>
        </Link>  
        <Link to="/projects" className={location.pathname === '/projects' ? styles.active : ''} onClick={toggleMenu}>
          <FontAwesomeIcon icon="building" className={`${iconStyles.icon} ${iconStyles.solid} fas fa-building`} />
          <span>Projects</span>
        </Link>
        <Link to="/card" className={location.pathname === '/card' ? styles.active : ''} onClick={toggleMenu}>
          <FontAwesomeIcon icon="id-card" className={`${iconStyles.icon} ${iconStyles.solid} fas fa-id-card`} />
          <span>Card</span>
        </Link>
        <Link to="/certificate" className={location.pathname === '/certificate' ? styles.active : ''} onClick={toggleMenu}>
          <FontAwesomeIcon icon="certificate" className={`${iconStyles.icon} ${iconStyles.solid} fas fa-certificate`} />
          <span>Certificate</span>
        </Link>
        <a 
          href="https://linkedin.com/in/josefpedro/" 
          target="_blank" 
          rel="noreferrer"
          onClick={toggleMenu}>
          <FontAwesomeIcon icon={['fab', 'linkedin']} className={`${iconStyles.icon} ${iconStyles.brands} fab fa-linkedin`} />
          <span>LinkedIn</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
