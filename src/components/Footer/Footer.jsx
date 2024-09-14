import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
              <FontAwesomeIcon icon="phone" className="fas fa-phone" />
            </a>
          </li>
          <li>
            <a href="mailto:jose.pedro7@outlook.com" className={iconStyles.icon}>
              <FontAwesomeIcon icon="envelope" className="fas fa-envelope" />
            </a>
          </li>
          <li>
            <a 
              href={config.resumeUrl} target="_blank" rel="noreferrer" className={iconStyles.icon}>
              <FontAwesomeIcon icon="file" className="fas fa-file" />
            </a>
          </li>
          <li>
            <a 
              href={config.linkedInUrl} target="_blank" rel="noreferrer" className={iconStyles.icon}>
              <FontAwesomeIcon icon={['fab', 'linkedin']} className="fab fa-linkedin" />
            </a>
          </li>
        </ul>
    </div>
  );
}

export default Footer;
