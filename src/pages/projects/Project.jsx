import React from 'react';
import PropTypes from 'prop-types';
import styles from './Project.module.css';
import config from '../../config';
import { wrapProjectFields } from '../../utils/wrapProjectFields';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';

const Project = ({
  title,
  organization,
  placeandyear,
  description,
  activities = [],
  finalDescription = '',
  images = []
}) => {
  const wrappedProject = wrapProjectFields({ title, placeandyear, description, activities, finalDescription }, styles.number);

  return (
    <div className={styles.project}>
      <article className={styles.panel} aria-labelledby={`project-title-${title}`}>
        <header className={styles.header}> 
          <h2 className={styles.title} id={`project-title-${title}`}>{wrappedProject.title}</h2>
          <i className={`${styles.organization} number`}>{organization}</i>
          <i className={`${styles.placeandyear} number`}>{wrappedProject.placeandyear}</i>
        </header>
        <p className={styles.projectdescription}><b>{wrappedProject.description}</b></p>
        {Array.isArray(activities) && activities.length > 0 && (
          activities.map((activitySection, sectionIndex) => (
            <div key={sectionIndex}>
              {typeof activitySection === 'string' ? (
                <ul className={`${styles.ulItems} ${styles['ulItems--tick']}`}>
                  <li className={styles.projectActivityItem}>{wrapNumbersWithClass(activitySection, 'number')}</li>
                </ul>
              ) : (
                <div>
                  {activitySection.header && <h3>{activitySection.header}</h3>}
                  {Array.isArray(activitySection.items) && activitySection.items.length > 0 && (
                    <ul className={`${styles.ulItems} ${styles['ulItems--tick']}`}>
                      {activitySection.items.map((item, itemIndex) => (
                        <li className={styles.projectActivityItem} key={itemIndex}>{wrapNumbersWithClass(item, styles.number)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))
        )}
        <p className={styles.projectdescription}><b>{wrappedProject.finalDescription}</b></p>
        {Array.isArray(images) && images.length > 0 && (
          <section aria-label="Project images">
            <div className={styles.row}>
              {images.map((image, imgIndex) => {
                const imageUrl = `${config.projectsUrl}${image}`;
                return (
                  <div className={`${styles['col-4']} ${styles['col-6-medium']} ${styles['col-12-small']}`} key={imgIndex}>
                    <a className={styles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
                      <img src={imageUrl} alt='' />
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
};

Project.propTypes = {
  title: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  placeandyear: PropTypes.string,
  description: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        header: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string)
      })
    ])
  ),
  finalDescription: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string)
};

export default Project;
