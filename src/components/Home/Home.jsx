import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div id="main" className={styles.mainContainer}>
      <article id="home" className={`${styles.panel} ${styles.introPanel}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>José Francisco Pedro</h1>
          <p className={styles.description}>
            <strong>
              With over 3 years of experience in Construction Management, 
              I’ve contributed to significant projects, 
              including the intervention on Cabinda province’s main airstrip 
              and the creation of an alternative route connecting to Cabassango.
            </strong>
          </p>
        </header>
        <Link to="/projects" className={`${styles.jumplink} ${styles.projectLink}`}>
          <span className={`${styles.arrow} fas fa-chevron-right`}>
            <span>See my work</span>
          </span>
          <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/me_1.jpg" alt="José Francisco Pedro" className={styles.profileImage} />
        </Link>
      </article>
    </div>
  );
}; 

export default Home;
