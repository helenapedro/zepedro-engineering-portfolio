import React from 'react';
import Certificate from './Certificate';

const NavBar = () => {
  return (
    <nav id="nav">
      <a href="#" class="icon solid fa-home"><span>Home</span></a>
      <a href="#work" className="icon solid fa-building"><span>Projects</span></a>
      <a href="#card" className="icon solid fa-id-card"><span>Card</span></a>
      <a href="#certificate" className="icon solid fa-certificate"><span>Certificate</span></a>
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
