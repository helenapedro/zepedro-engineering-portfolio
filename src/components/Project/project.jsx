import React from 'react';
import styles from './Project.module.css';
import rowStyles from '../Global/Row.module.css';

const Project = ({ title, organization, description, activities, finalDescription, images }) => {
  return (
    <div id="main" className={styles.project}>
      <article id="projects" className={styles.panel}>
        <header>
          <h2 className={styles.quote__title}>{title}</h2>
          <i className={styles.quote__organization}>{organization}</i>
        </header>
        <p className={styles.quote__line}>
          <b>{description}</b>
        </p>
        <ul className={`${styles.list} ${styles['list--tick']}`}>
          {activities.map((activity, index) => (
            <li className={styles.list__item} key={index}>{activity}</li>
          ))}
        </ul>
        <p className={styles.quote__line}>
          <b>{finalDescription}</b>
        </p>
        <section>
          <div className='row'>
            {images.map((image, index) => (
              <div className="col-4 col-6-medium col-12-small" key={index}>
                <a className="image fit zoomed">
                  <img src={image} alt="" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default Project;
