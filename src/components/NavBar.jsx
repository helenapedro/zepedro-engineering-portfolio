import React from 'react';

const NavBar = () => {
  return (
    <nav id="nav">
      <a href="#" class="icon solid fa-home"><span>Principal</span></a>
      <a href="#projects" className="icon solid fa-building"><span>Projectos</span></a>
      <a href="#card" className="icon solid fa-id-card"><span>Cartão</span></a>
      <a href="#certificate" className="icon solid fa-certificate"><span>Formações</span></a>
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
