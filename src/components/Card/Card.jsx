import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = () => {
  return (
    <div className={styles.mainContainer}>
      <article className={`${styles.panel} ${styles.introPanel}`}>
        <header className={styles.header}>
          <h2 className={styles.title}>José Francisco Pedro</h2>
          <p className={styles.description}>
            <strong>
              <Link to="/knowledge">Knowledge</Link> in managing and executing civil construction projects,
              roads, bridges, maritime, and aerodrome pavements.
            </strong>
          </p>
          <p className={styles.description}>
            <strong>
              <Link to="/skills">Skilled</Link> in using engineering architecture and project management 
              software to enhance project delivery and quality assurance.
            </strong>
          </p>
        </header>
        <a
          href="https://ambrosiopublicfiles.s3.us-east-2.amazonaws.com/Jose_Pedro_Engineering_Order_Card.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles['col-2']} ${styles['col-3-medium']} ${styles['col-10-small']} ${styles.image} ${styles.fit}`}
        >
          <i>Associated A3 Member of The Order of Engineers of Angola (OEA)</i>
          <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/oea.jpeg" alt="OEA"/>
        </a>
      </article>
    </div>
  );
};

export default Card;
