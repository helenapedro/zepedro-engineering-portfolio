import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import styles from './Project.module.css';
import config from '../../config';
import { wrapProjectFields } from '../../utils/wrapProjectFields';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';

const Project = ({
  title,
  organization,
  endYear,
  projectPlace,
  summaryHeader,
  activities = [],
  projectOutcome = '',
  images = []
}) => {
  const wrappedProject = wrapProjectFields({
    title,
    endYear,
    summaryHeader,
    activities,
    projectOutcome
  }, styles.number);

  // State for modal visibility and selected image
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  // Open modal and set selected image
  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentImage('');
  };

  return (
    <div className={styles.project}>
      <article className={styles.panel} aria-labelledby={`project-title-${title}`}>
        <header className={styles.header}>
          <h2 className={styles.title} id={`project-title-${title}`}>{wrappedProject.title}</h2>
          <i className={`${styles.organization} number`}>{organization}, {endYear}</i>
          <i className={`${styles.placeandyear} number`}>
            {projectPlace.address}, {projectPlace.province}, {projectPlace.country}
          </i>
        </header>
        <p className={styles.projectdescription}><b>{wrappedProject.summaryHeader}</b></p>
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
                        <li className={styles.projectActivityItem} key={itemIndex}>
                          {wrapNumbersWithClass(item, styles.number)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))
        )}
        <p className={styles.projectdescription}>
          <b>{wrappedProject.projectOutcome}</b>
        </p>
        {Array.isArray(images) && images.length > 0 && (
          <section aria-label="Project images">
            <div className={styles.row}>
              {images.map((image, imgIndex) => {
                const imageUrl = `${config.projectsUrl}${image}`;
                return (
                  <div className={styles.imageContainer} key={imgIndex}>
                    <button
                      className={styles.imageButton}
                      onClick={() => handleImageClick(imageUrl)}
                    >
                      <img src={imageUrl} alt="" className={styles.image} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>        
        )}
      </article>

      {/* Modal for displaying images */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={currentImage} alt="Project" className={styles.modalImage} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Project.propTypes = {
  title: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  endYear: PropTypes.number,
  projectPlace: PropTypes.shape({
    address: PropTypes.string,
    province: PropTypes.string,
    country: PropTypes.string
  }),
  summaryHeader: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        header: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string)
      })
    ])
  ),
  projectOutcome: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string)
};

export default Project;
