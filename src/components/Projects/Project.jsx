import React from 'react';
import PropTypes from 'prop-types';
import styles from './Project.module.css';

import config from '../../config';

const Project = ({
  title,
  organization,
  description,
  activities = [],
  finalDescription = '',
  images = []
}) => (
  <div className={styles.project}>
    <article className={styles.panel}> 
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <i className={styles.organization}>{organization}</i>
      </header>
      <p className={styles.projectdescription}><b>{description}</b></p>
      {Array.isArray(activities) && activities.length > 0 && (
        activities.map((activitySection, sectionIndex) => (
          <div key={sectionIndex}>
            {typeof activitySection === 'string' ? (
              <ul className={`${styles.ulItems} ${styles['ulItems--tick']}`}>
                <li className={styles.projectActivityItem}>{activitySection}</li>
              </ul>
            ) : (
              <div>
                {activitySection.header && <h3>{activitySection.header}</h3>}
                <ul className={`${styles.ulItems} ${styles['ulItems--tick']}`}>
                  {activitySection.items.map((item, itemIndex) => (
                    <li className={styles.projectActivityItem} key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
      <p className={styles.projectdescription}><b>{finalDescription}</b></p>
      {Array.isArray(images) && images.length > 0 && (
        <section>
          <div className={styles.row}>
            {images.map((image, imgIndex) => {
              const imageUrl = `${config.projectsUrl}${image}`;
              return (
                <div className={`${styles.col4} ${styles.col6Medium} ${styles.col12Small}`} key={imgIndex}>
                  <a className={styles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
                    <img src={imageUrl} alt={`Project ${imgIndex + 1}`} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </article> 
  </div>
  
);

Project.propTypes = {
  title: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        header: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ])
  ),
  finalDescription: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};

export default Project;
