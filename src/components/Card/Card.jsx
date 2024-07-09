import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = () => {
  return (
    <div className={`container ${styles.mainContainer}`}>
      <div className={`card ${styles.introPanel}`}>
        <div className="card-body">
          <h2 className={`card-title ${styles['card-title']}`}>José Francisco Pedro</h2>
          <p className={`card-text ${styles['card-text']}`}>
            <Link to="/knowledge" className='fst-italic'>Knowledge</Link> in managing and executing 
            civil construction projects, roads, bridges, maritime, and aerodrome pavements.
          </p>
          <p className={`card-text ${styles['card-text']}`}>
            <Link to="/skills" className='fst-italic'>Skilled</Link> in using 
            engineering architecture and project management 
            software to enhance project delivery and quality assurance.
          </p>
        </div>
        <a
          href="https://ambrosiopublicfiles.s3.us-east-2.amazonaws.com/Jose_Pedro_Engineering_Order_Card.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="d-block mx-auto mt-3"
        >
          <img 
            src="https://pedro-pi.s3.us-east-2.amazonaws.com/oea.jpeg" 
            alt="OEA" 
            className="img-fluid rounded"
          />
          <p className="text-center mt-2">Associated A3 Member of The Order of Engineers of Angola (OEA)</p>
        </a>
      </div>
    </div>
  );
};

export default Card;
