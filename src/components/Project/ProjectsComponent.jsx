import React from 'react';
import PropTypes from 'prop-types';
import styles from './Projects.module.css';
import config from '../../config';

const ProjectComponent = ({ title, organization, description, activities, finalDescription, images }) => {
  return (
    <div className={styles.projectContainer}>
      <header className={styles.projectHeader}>
        <h2 className={styles.projectTitle}>{title}</h2>
        <i className={styles.projectOrganization}>{organization}</i>
      </header>
      <p className={styles.projectDescription}><b>{description}</b></p>
      <ul className={`${styles.ulItems} ${styles['ulItems--tick']}`}>
        {activities.map((activity, index) => (
          <li className={styles.projectActivityItem} key={index}>{activity}</li>
        ))}
      </ul>
      <p className={styles.projectDescription}><b>{finalDescription}</b></p>
      <section>
        <div className={styles.row}>
          {images && images.map((image, imgIndex) => {
            const imageUrl = `${config.projectsUrl}${image}`;
            return (
              <div className={`${styles.col4} ${styles.col6Medium} ${styles.col12Small}`} key={imgIndex}>
                <a className={styles.projectImage}>
                  <img src={imageUrl} alt="project" />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

ProjectComponent.propTypes = {
  title: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(PropTypes.string).isRequired,
  finalDescription: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string)
};

export default ProjectComponent;
