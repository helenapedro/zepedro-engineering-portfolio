import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div id="main" className={styles.main}>
      <article id="home" className={`${styles.panel} ${styles.intro}`}>
        <header>
          <h1>José Francisco Pedro</h1>
          <p className="aln-left">
            <strong>
              With over 3 years of experience in Construction Management, 
              I’ve contributed to significant projects, 
              including the intervention on Cabinda province’s main airstrip 
              and the creation of an alternative route connecting to Cabassango.
              {/* My passion lies in designing and optimizing urban infrastructure, 
              and I thrive on collaborative efforts that strengthen operational ties. 
              Let’s connect and explore exciting opportunities together! */}
            </strong>
          </p>
        </header>
        <Link to="/projects" className={`${styles.jumplink} ${styles.pic}`}>
          <span className={`${styles.arrow} icon solid fa-chevron-right`}>
            <span>See my work</span>
          </span>
          <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/me_1.jpg" alt="José Francisco Pedro" />
        </Link>
      </article>
    </div>
  );
};

export default Home;
