import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./NavBar.module.css";
import globalStyles from '../Global/global.module.css';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={globalStyles.icon}>
        <FontAwesomeIcon icon="house" className="fas fa-house" />
        <span>Home</span>
      </Link> 
      <Link to="/projects" className={globalStyles.icon}>
        <FontAwesomeIcon icon="building" className="fas fa-building" />
        <span>Projects</span>
      </Link>
      <Link to="/card" className={globalStyles.icon}>
        <FontAwesomeIcon icon="id-card" className="fas fa-id-card" />
        <span>Card</span>
      </Link>
      <Link to="/certificate" className={globalStyles.icon}>
        <FontAwesomeIcon icon="certificate" className="fas fa-certificate" />
        <span>Certificate</span>
      </Link>
      <a 
        href="https://linkedin.com/in/josefpedro/" 
        target="_blank" 
        rel="noreferrer"
        className={globalStyles.icon}>
        <FontAwesomeIcon icon={['fab', 'linkedin']} className="fab fa-linkedin" />
        <span>LinkedIn</span>
      </a>
    </nav>
  );
};

export default NavBar;
