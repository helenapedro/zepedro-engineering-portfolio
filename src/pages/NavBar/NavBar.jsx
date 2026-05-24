import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGraduationCap, FaHome, FaLinkedin, FaPortrait } from 'react-icons/fa';
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
      <div className={menuOpen ? styles.active : ''} onClick={toggleMenu}></div>
      <div className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''} onClick={toggleMenu}>
          <FaHome className={iconStyles.icon} />
          <span>Home</span>
        </Link>
        <Link to="/education" className={location.pathname === '/education' ? styles.active : ''} onClick={toggleMenu}>
          <FaGraduationCap className={iconStyles.icon} />
          <span>Education</span>
        </Link>
        <Link to="/about" className={location.pathname === '/about' ? styles.active : ''} onClick={toggleMenu}>
          <FaPortrait className={iconStyles.icon} />
          <span>About</span>
        </Link>
        <a 
          href="https://linkedin.com/in/josefpedro/" 
          target="_blank" 
          rel="noreferrer"
          onClick={toggleMenu}>
          <FaLinkedin className={iconStyles.icon} />
          <span>LinkedIn</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
