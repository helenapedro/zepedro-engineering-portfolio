import React from 'react';
import styles from './Card.module.css';

const Card = () => {
  return (
    <div id='main' className={styles.card}>
      <article className={`${styles.panel} ${styles.intro}`}>
        <header>
          <h1>José Francisco Pedro</h1>
          <p>
            Associated A3 Member of The Order of Engineers of Angola (OEA) <br />
            <b>
              Interested Area: Construction Management.
            </b>
          </p>
        </header>
        <a className={`${styles.image} ${styles.fit} col-2 col-3-medium col-10-small` }
          > <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/oea.jpeg" alt="Cartão de Membro" />
        </a>
      </article>
    </div>
  );
};

export default Card;
