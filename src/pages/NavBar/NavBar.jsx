import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaHome, FaLinkedin, FaPortrait } from 'react-icons/fa';
import styles from "./NavBar.module.css";
import iconStyles from '../../styles/Icons.module.css';
import { getLanguageFromPath, routePath, SUPPORTED_LANGUAGES, translatePath } from '../../i18n/routes';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const language = getLanguageFromPath(location.pathname);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (key) => location.pathname === routePath(key, language);
  const changeLanguage = (nextLanguage) => {
    i18n.changeLanguage(nextLanguage);
    navigate(translatePath(location.pathname, nextLanguage));
  };

  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <div className={menuOpen ? styles.active : ''} onClick={toggleMenu}></div>
      <div className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
        <Link to={routePath("home", language)} className={isActive("home") ? styles.active : ''} onClick={toggleMenu}>
          <FaHome className={iconStyles.icon} />
          <span>{t("nav.home")}</span>
        </Link>
        <Link to={routePath("education", language)} className={isActive("education") ? styles.active : ''} onClick={toggleMenu}>
          <FaGraduationCap className={iconStyles.icon} />
          <span>{t("nav.education")}</span>
        </Link>
        <Link to={routePath("about", language)} className={isActive("about") ? styles.active : ''} onClick={toggleMenu}>
          <FaPortrait className={iconStyles.icon} />
          <span>{t("nav.about")}</span>
        </Link>
        <a 
          href="https://linkedin.com/in/josefpedro/" 
          target="_blank" 
          rel="noreferrer"
          onClick={toggleMenu}>
          <FaLinkedin className={iconStyles.icon} />
          <span>{t("nav.linkedin")}</span>
        </a>
        <div className={styles.languageToggle} aria-label={t("nav.language")}>
          {SUPPORTED_LANGUAGES.map((nextLanguage) => (
            <button
              key={nextLanguage}
              type="button"
              className={nextLanguage === language ? styles.languageActive : ""}
              onClick={() => changeLanguage(nextLanguage)}
            >
              {nextLanguage.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
