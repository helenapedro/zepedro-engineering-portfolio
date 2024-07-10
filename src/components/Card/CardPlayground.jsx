import React from 'react';
import { Link } from 'react-router-dom';

import containerStyles from '../Container/MainContainer.module.css';
import panelStyles from '../Container/Panel.module.css';
import cardStyles from '../Container/CardContainer.module.css';

const Card = () => {
  return (
    <div className={`container ${containerStyles.mainContainer}`}>
      <div className={`card ${panelStyles.introPanel}`}>
        <div className="card-body">
          <h2 className={`card-title ${cardStyles['card-title']}`}>José Francisco Pedro</h2>
          <p className={`card-text ${cardStyles['card-text']}`}>
            <Link to="/projects" className='fst-italic'>Knowledge</Link> in managing and executing 
            civil construction projects, roads, bridges, maritime, and aerodrome pavements.
          </p>
          <p className={`card-text ${cardStyles['card-text']}`}>
            <Link to="/certificate" className='fst-italic'>Skilled</Link> in using 
            engineering architecture and project management 
            software to enhance project delivery and quality assurance.
          </p>
        </div>
        <Link 
          to='https://ambrosiopublicfiles.s3.us-east-2.amazonaws.com/Jose_Pedro_Engineering_Order_Card.jpg'
          target="_blank"
          rel="noopener noreferrer"
          className="d-block mx-auto mt-3"
        >
          <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/oea.jpeg" alt="OEA" className="img-fluid rounded"/>
          <p className="text-center mt-2">Associated A3 Member of The Order of Engineers of Angola (OEA)</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
