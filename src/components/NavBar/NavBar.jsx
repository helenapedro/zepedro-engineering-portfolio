import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
          <Link to="/" className="icon solid fa-home"><span>Home</span></Link>
          <Link to="/projects" className="icon solid fa-building"><span>Projects</span></Link>
          <Link to="/card" className="icon solid fa-id-card"><span>Card</span></Link>
          <Link to="/certificate" className="icon solid fa-certificate"><span>Certificate</span></Link>
          <a 
            href="https://linkedin.com/in/josefpedro/" 
            target="_blank" 
            rel="noreferrer"
            className="icon brands fa-linkedin">
              <span>LinkedIn</span>
          </a>
        </nav>
  );
};
  
export default NavBar;
