import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Col, Modal, CardHeader } from 'react-bootstrap';
import * as iconsfa from 'react-icons/fa';
import { wrapProjectFields } from '../../utils/wrapProjectFields';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import styles from '../../pages/projects/Project.module.css';
import numberstyles from '../../components/ui/Number.module.css';
import imagestyles from '../../components/ui/Image.module.css';
import prodetailsstyles from '../../components/ui/ProjectDetails.module.css';
import containerstyles from '../../components/ui/Container.module.css';
import cardstyles from '../../components/ui/card.module.css';

const ProjectDetails = ({
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
     }, numberstyles.proDetailsNumber);

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


     const resolveUrl = (url) => {
          const baseUrl = 'https://dh09x5tu10bt3.cloudfront.net/';
          return url.startsWith('http') ? url : `${baseUrl}${url}`;
     };

     return (
          <div className={containerstyles.cardContainer}>
               <Col className={containerstyles.panel} aria-labelledby={`project-title-${title}`}>
                    <div className={`${cardstyles.cardContainer}`}>
                         <CardHeader className={` ${cardstyles.cardHeader} text-center`}>
                              <h2 className={prodetailsstyles.title} id={`project-title-${title}`}>
                                   {wrappedProject.title}
                              </h2>
                              <Card.Subtitle className={`${prodetailsstyles.subtitle}`}>
                                   <div className={prodetailsstyles.organization}>
                                        <span className={`${prodetailsstyles.orgTitle}`}> {organization} </span>
                                   </div>

                                   <div className={`${prodetailsstyles.place}`}>
                                        <iconsfa.FaMapMarkerAlt className={prodetailsstyles.icon} /> <b>{projectPlace?.address}, {projectPlace?.province}, {projectPlace?.country}</b>

                                   </div>
                              </Card.Subtitle>
                         </CardHeader>
                         <p className={`${styles.projectdescription} number`}><b>{wrappedProject.summaryHeader}</b></p>
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
                                   <div className={imagestyles.row}>
                                        {images.map((image, imgIndex) => {
                                             const imageUrl = resolveUrl(image);
                                             return (
                                                  <div className={imagestyles.imageContainer} key={imgIndex}>
                                                       <button
                                                            className={imagestyles.imageButton}
                                                            onClick={() => handleImageClick(imageUrl)}
                                                       >
                                                            <img src={imageUrl} alt={`Project ${imgIndex}`} className={imagestyles.image} />
                                                       </button>
                                                  </div>
                                             );
                                        })}
                                   </div>
                              </section>
                         )}
                    </div>
               </Col>

               {/* Modal for displaying images */}
               <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                         <Modal.Title>Image Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <img src={currentImage} alt="Project" className={imagestyles.modalImage} />
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

ProjectDetails.propTypes = {
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

export default ProjectDetails;
