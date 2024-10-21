import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import mainStyles from '../../components/Main.module.css'; 

const Home = () => {
  return (
    <article id='home' className={`${mainStyles.panel} ${mainStyles.intro} ${styles.home}`}>
          <header>
            <h1 className={`card-title ${styles['home-title']}`}>José Francisco Pedro</h1>
            <p className={`card-text ${styles['home-text']}`}>
              <b> Hello, my name is <Link to="/about">ZéPedro</Link> and I'm an experienced Construction Engineer,
              with over <i className={styles.year}>4</i> years in
              project management and nearly <i>1</i> year
              as Coordinator of QHSE-Quality at <Link to='https://www.linkedin.com/company/mota-engil-angola/' target='_blank' rel='noopener noreferrer'>Mota-Engil Angola</Link>.</b>
            </p>
            <p className={`card-text ${styles['home-text']}`}>
              <b>This is a showcase of my 
              <Link to="/projects" className='fst-italic'>projects</Link> and <Link to="/education" className='fst-italic'>abilities</Link>.</b>
            </p>
          </header>
          <Link to="/projects" className={`${mainStyles.pic}`}>
            <span className={ `${mainStyles.arrow}` }>
              <span>See my projects</span>
            </span>
            <img src="https://dh09x5tu10bt3.cloudfront.net/120-Apart-BZ-hero.jpg" alt="José Francisco Pedro" /> 
          </Link>
    </article> 
  );
}

export default Home;
