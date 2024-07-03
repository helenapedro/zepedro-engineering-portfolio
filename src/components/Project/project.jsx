import React from 'react';
import styles from './Projects.module.css';
import config from '../../config';

const Project = ({ title, organization, description, activities, finalDescription, images }) => {
  return (
    <div className={styles.projectContainer}>
      <header className={styles.projectHeader}>
        <h2 className={styles.projectTitle}>{title}</h2>
        <i className={styles.projectOrganization}>{organization}</i>
      </header>  
      <p className={styles.projectDescription}><b>{description}</b></p>
      <ul className={styles.projectActivitiesList}>
        {activities.map((activity, index) => (
          <ul className={`${styles.ulItems} ${styles['ulItems--tick']}`}>
            <li className={styles.projectActivityItem} key={index}>{activity}</li>
          </ul>
        ))} 
      </ul>
      <p className={styles.projectDescription}><b>{finalDescription}</b></p>
      <section>
        <div className={styles.row}>
          {images && images.map((image, imgIndex) => {
            const imageUrl = `${config.projectsUrl}${image}`;
            return (
              <div className={`${styles.col-4} ${styles['col-6-medium']} ${styles['col-12-small']}`} key={imgIndex}>
                <a className={styles.projectImage}>
                  <img src={imageUrl} alt="images of the projects" />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Project;
