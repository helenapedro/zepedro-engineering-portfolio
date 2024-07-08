import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = () => {
  return (
    <div className={styles.mainContainer}>
      <article className={`${styles.panel} ${styles.introPanel}`}>
      <header className={styles.header}>
          <h1 className={styles.title}>José Francisco Pedro</h1>
          <p className={styles.description}>
            <b>Associated A3 Member of The Order of Engineers of Angola (OEA)</b>
          </p>
          <p className={styles.description}>
            <i className={styles.b}>Interested Area:</i>
            <b> Construction Management.</b>
          </p>
        </header>
        <a
            href="https://ambrosiopublicfiles.s3.us-east-2.amazonaws.com/Jose_Pedro_Engineering_Order_Card.jpg"
            target="_blank"
            className={`${styles['col-2']} ${styles['col-3-medium']} ${styles['col-10-small']} ${styles.image} ${styles.fit}`}>
            <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/oea.jpeg" alt=""/>
          </a>
      </article>
    </div>
  );
}; 

export default Card;
