import React from 'react';
import { FaEnvelope, FaFileAlt, FaLinkedin, FaPhone } from 'react-icons/fa';
import styles from './Footer.module.css';
import iconStyles from '../../styles/Icons.module.css'
import config from '../../config';

const Footer = () => {
  return (
    <div id='footer' className={styles.footer}>
        <ul className={styles.copyright}>
          <li>&copy; <a href={config.linkedInUrl}>Engº ZéPedro</a></li>
          <li>
            <a href="tel:+244947462094" className={iconStyles.icon}>
              <FaPhone />
            </a>
          </li>
          <li>
            <a href="mailto:jose.pedro7@outlook.com" className={iconStyles.icon}>
              <FaEnvelope />
            </a>
          </li>
          <li>
            <a 
              href={config.resumeUrl} target="_blank" rel="noreferrer" className={iconStyles.icon}>
              <FaFileAlt />
            </a>
          </li>
          <li>
            <a 
              href={config.linkedInUrl} target="_blank" rel="noreferrer" className={iconStyles.icon}>
              <FaLinkedin />
            </a>
          </li>
        </ul>
    </div>
  );
}

export default Footer;
