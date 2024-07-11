import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.css';
import iconStyles from '../../styles/Icons.module.css'

const Footer = () => {
  return (
    <div id='footer' className={styles.footer}>
     <ul className={styles.copyright}>
          <li>&copy; <a href="http://linkedin.com/in/josefpedro/">Engº ZéPedro</a></li>
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
              href="https://pedropublicfiles.s3.us-east-2.amazonaws.com/CV_Jose+Pedro+REV.21+Foto+ENG.pdf" 
              target="_blank" rel="noreferrer" className={iconStyles.icon}>
              <FontAwesomeIcon icon="file" className="fas fa-file" />
          </a>
        </li>
          <li>
            <a 
              href="http://linkedin.com/in/josefpedro/" target="_blank" rel="noreferrer" className={iconStyles.icon}>
              <FontAwesomeIcon icon={['fab', 'linkedin']} className="fab fa-linkedin" />
            </a>
          </li>
     </ul>
    </div>
  );
}

export default Footer;
