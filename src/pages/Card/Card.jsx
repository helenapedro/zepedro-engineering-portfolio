import React from 'react';
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import iconStyles from '../../styles/Icons.module.css'
import mainStyles from '../../components/main.module.css';

const Card = () => {
  return (
    <article id='home' className={`${mainStyles.panel} ${mainStyles.intro}`}>
          <header>
            <h1>José Francisco Pedro</h1>
            <h4>Civil Engineer</h4>
            <h6>Associated A3 Member of The Order of Engineers of Angola (OEA)</h6>
            <p>
              My experience includes extensive use of engineering, architecture and project management software to enhance 
              project delivery and quality assurance.
            </p>
            <p>
            I hold a Bachelor in Construction Engineering from Instituto Superior 
            Politécnico Metropolitano de Angola (IMETRO), Angola(2021).
            </p>
          </header>
          <Link to="/projects" className={`jumplink ${mainStyles.pic}`}>
            <span className={`${iconStyles.icon} ${iconStyles.solid} ${faChevronRight} fa-chevron-right arrow`}>See my work</span>
            <img src="https://ambrosiopublicfiles.s3.us-east-2.amazonaws.com/Jose_Pedro_Engineering_Order_Card.jpg" alt="José Francisco Pedro" />
          </Link>
    </article>
  );
}

export default Card;
