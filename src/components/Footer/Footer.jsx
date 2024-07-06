import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import globalStyles from '../Global/global.module.css';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul className={styles.copyright}>
        <li>Engº ZéPedro</li>
        <li>
          <a href="tel:+244947462094" className={globalStyles.icon}>
            <FontAwesomeIcon icon="phone" className="fas fa-phone" />
          </a>
        </li>
        <li>
          <a 
            href="http://linkedin.com/in/josefpedro/" 
            target="_blank" 
            rel="noreferrer" 
            className={globalStyles.icon}>
            <FontAwesomeIcon icon={['fab', 'linkedin']} className="fab fa-linkedin" />
          </a>
        </li>
        <li>
          <a href="mailto:jose.pedro7@outlook.com" className={globalStyles.icon}>
            <FontAwesomeIcon icon="envelope" className="fas fa-envelope" />
          </a>
        </li>
        <li>
          <a 
            href="https://pedropublicfiles.s3.us-east-2.amazonaws.com/CV_Jose+Pedro+REV.21+Foto+ENG.pdf" 
            target="_blank"
            rel="noreferrer"
            className={globalStyles.icon}>
            <FontAwesomeIcon icon="file" className="fas fa-file" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
