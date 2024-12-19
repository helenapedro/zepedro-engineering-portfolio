import React from 'react';
import { Link } from 'react-router-dom';
import homeData from '../Hooks/homeData';
import styles from './Home.module.css';
import mainStyles from '../../components/Main.module.css';

const Home = () => {
  const collectionName = 'home';
  const docName = 'homeInfo';
  const { data, loading, error } = homeData(collectionName, docName);

  return (
    <div className={`${mainStyles.panel}`}>
      <article id='home' className={styles.container}>
        <header>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading data.</p>}
          {data && (
            <>
              <h1 className={`card-title ${styles['home-title']}`}>{data.name}</h1>
              <p className={`card-text ${styles['home-text']}`}>
                <b> Hello, my name is <Link to="/about">ZéPedro</Link> and I'm an experienced Construction Engineer, 
                with over <i className={styles.year}>4</i> years in project management and nearly <i>1</i> year as Coordinator of QHSE-Quality at 
                <Link to={data.motaEngilLink} target='_blank' rel='noopener noreferrer'>Mota-Engil Angola</Link>.</b>
              </p>
              <p className={`card-text ${styles['home-text']}`}>
                <b>This is a showcase of my 
                <Link to="/projects" className='fst-italic'>projects</Link> and <Link to="/education" className='fst-italic'>abilities</Link>.</b>
              </p>
            </>
          )}
        </header>
        {/* {data && (
          <Link to="/projects" className={`${mainStyles.pic}`}>
            <span className={`${mainStyles.arrow}`}>
              <span>See my projects</span>
            </span>
            <img src={data.mainImage} alt={data.name} />
          </Link>
        )} */}
      </article>
    </div>
  );
};

export default Home;
