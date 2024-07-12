import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import mainStyles from '../../components/Main.module.css'; 

const Card = () => {
  return (
    <article id='home' className={`${mainStyles.panel} ${mainStyles.intro} ${styles.card}`}>
      <header>
        <h1 className={styles['card-title']}>José Francisco Pedro</h1>
        <h6 className={styles['card-text']}>
          <b>
            I have a deep passion for engineering, and I participated in the execution 
            of many kinds of Civil Engineering projects, including Civil Construction, 
            bridges, maritime, and aerodrome pavements (Rehabilitation).
          </b>
        </h6>
        <h6 className={styles['card-text']}>
          <b>
            My experience includes extensive use of engineering, architecture, and project management software to enhance 
            project delivery and quality assurance.
          </b>
        </h6>
      </header>
      <Link  
        className={`${mainStyles.pic} ${styles.link} row col-1 col-3-medium col-6-small`}>
        <img 
          src="https://ambrosiopublicfiles.s3.us-east-2.amazonaws.com/Jose_Pedro_Engineering_Order_Card.jpg" 
          alt="José Francisco Pedro" 
        />
      </Link>
    </article>
  );
}

export default Card;
