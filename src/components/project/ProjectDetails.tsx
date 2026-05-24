import React, { useState } from 'react';
import { Card, Button, Col, Modal, CardHeader } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as iconsfa from 'react-icons/fa';
import { wrapProjectFields } from '../../utils/wrapProjectFields';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import styles from '../../pages/projects/Project.module.css';
import numberstyles from '../../components/ui/Number.module.css';
import imagestyles from '../../components/ui/Image.module.css';
import prodetailsstyles from '../../components/ui/ProjectDetails.module.css';
import containerstyles from '../../components/ui/Container.module.css';
import cardstyles from '../../components/ui/card.module.css';

export interface ProjectDetailsProps {
    title: string;
    organization: string;
    placeandyear: string;
    description: string;
    activities: (string | { header: string; items: string[] })[];
    finalDescription: string;
    mainImageUrl: string;
    imageRefs: string[];
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    title,
    organization,
    placeandyear,
    description,
    activities = [],
    finalDescription = '',
    mainImageUrl,
    imageRefs = [],
}) => {
    const { t } = useTranslation();
    const wrappedProject = wrapProjectFields(
        {
            title,
            placeandyear,
            description,
            activities,
            finalDescription,
        },
        numberstyles.proDetailsNumber
    );

    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const handleImageClick = (imageUrl: string) => {
        setCurrentImage(imageUrl);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentImage('');
    };

    const resolveUrl = (imageRef: string) => {
        const STORAGE_BASE_URL = process.env.REACT_APP_FIREBASE_STORAGE_BASE_URL;

        if (!STORAGE_BASE_URL) {
          console.error("REACT_APP_FIREBASE_STORAGE_BASE_URL is not defined. Images may not load correctly.");
          return imageRef;
        }

        const encodedImageRef = encodeURIComponent(imageRef);

        return `${STORAGE_BASE_URL}projects%2F${encodedImageRef}?alt=media`;
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
                                <iconsfa.FaMapMarkerAlt className={prodetailsstyles.icon} />{' '}
                                <b>{placeandyear}</b>
                            </div>
                        </Card.Subtitle>
                    </CardHeader>
                    <p className={`${styles.projectdescription} number`}>
                        <b>{wrappedProject.description}</b>
                    </p>
                    {Array.isArray(activities) &&
                        activities.length > 0 &&
                        activities.map((activitySection, sectionIndex) => (
                            <div key={sectionIndex}>
                                {typeof activitySection === 'string' ? (
                                    <ul className={`${styles.ulItems} ${styles['ulItems--tick']}`}>
                                        <li className={styles.projectActivityItem}>
                                            {wrapNumbersWithClass(activitySection, 'number')}
                                        </li>
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
                        ))}
                    <p className={styles.projectdescription}>
                        <b>{wrappedProject.finalDescription}</b>
                    </p>
                    {mainImageUrl && (
                      <div className={imagestyles.mainImageContainer}>
                        <img src={resolveUrl(mainImageUrl)} alt={`${title} main`} className={imagestyles.mainImage} />
                      </div>
                    )}

                    {Array.isArray(imageRefs) && imageRefs.length > 0 && (
                        <section aria-label={t("projects.imagesLabel")}>
                            <div className={imagestyles.row}>
                                {imageRefs.map((imageRef, imgIndex) => {
                                    const imageUrl = resolveUrl(imageRef);
                                    return (
                                        <div className={imagestyles.imageContainer} key={imgIndex}>
                                            <button
                                                className={imagestyles.imageButton}
                                                onClick={() => handleImageClick(imageUrl)}
                                            >
                                                <img src={imageUrl} alt={`${t("common.projectImage")} ${imgIndex + 1}`} className={imagestyles.image} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </Col>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t("common.imagePreview")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={currentImage} alt={t("common.projectImage")} className={imagestyles.modalImage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        {t("common.close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProjectDetails;
