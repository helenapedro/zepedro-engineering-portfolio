import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Modal, CardHeader } from "react-bootstrap";
import * as iconsfa from "react-icons/fa";
import { wrapProjectFields } from "../../utils/wrapProjectFields";
import styles from "../../pages/projects/Project.module.css";
import numberstyles from "../../components/ui/Number.module.css";
import imagestyles from "../../components/ui/Image.module.css";
import prodetailsstyles from "../../components/ui/ProjectDetails.module.css";
import containerstyles from "../../components/ui/Container.module.css";
import cardstyles from "../../components/ui/card.module.css";
import ProjectMetrics from "./ProjectMetrics";
import ProjectTextSection from "./ProjectTextSection";
import ProjectMediaGallery from "./ProjectMediaGallery";
import {
  buildImageItems,
  buildProjectStats,
  flattenActivities,
  splitActivitiesByOutcome,
} from "./projectDetailsUtils";

const ProjectDetails = ({
  title,
  organization,
  placeandyear,
  description,
  activities = [],
  finalDescription = "",
  imageThumbRefs = [],
  imageRefs = [],
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const wrappedProject = wrapProjectFields(
    {
      title,
      organization,
      placeandyear,
      description,
      activities,
      finalDescription,
    },
    numberstyles.proDetailsNumber
  );

  const resolveUrl = (url) => {
    const baseUrl = process.env.REACT_APP_CDN_BASE_URL;
    return url.startsWith("http") ? url : `${baseUrl}${url}`;
  };

  const flatActivities = useMemo(() => flattenActivities(activities), [activities]);
  const stats = useMemo(
    () =>
      buildProjectStats({
        description,
        activityLines: flatActivities,
        finalDescription,
      }),
    [description, flatActivities, finalDescription]
  );
  const sectionedActivities = useMemo(
    () => splitActivitiesByOutcome(flatActivities),
    [flatActivities]
  );
  const imageItems = useMemo(
    () =>
      buildImageItems({
        imageRefs,
        imageThumbRefs,
        resolveUrl,
      }),
    [imageRefs, imageThumbRefs]
  );

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentImage("");
  };

  return (
    <div className={containerstyles.cardContainer}>
      <Col className={containerstyles.panel} aria-labelledby={`project-title-${title}`}>
        <div className={cardstyles.cardContainer}>
          <CardHeader className={`${cardstyles.cardHeader} text-center`}>
            <h2 className={prodetailsstyles.title} id={`project-title-${title}`}>
              {wrappedProject.title}
            </h2>
            <Card.Subtitle className={prodetailsstyles.subtitle}>
              <div className={prodetailsstyles.organization}>
                <span className={prodetailsstyles.orgTitle}>{organization}</span>
              </div>
              <div className={prodetailsstyles.place}>
                <iconsfa.FaMapMarkerAlt className={prodetailsstyles.icon} /> {placeandyear}
              </div>
            </Card.Subtitle>
          </CardHeader>

          <ProjectMetrics stats={stats} numberClassName={numberstyles.proDetailsNumber} />

          <section className={prodetailsstyles.contentSection}>
            <h3 className={prodetailsstyles.sectionTitle}>Context</h3>
            <p className={`${styles.projectdescription} number`}>
              <b>{wrappedProject.description}</b>
            </p>
          </section>

          <ProjectTextSection
            title="Responsibilities"
            items={sectionedActivities.responsibilities}
          />
          <ProjectTextSection title="Results" items={sectionedActivities.results} />

          {wrappedProject.finalDescription && (
            <section className={prodetailsstyles.contentSection}>
              <h3 className={prodetailsstyles.sectionTitle}>Project Outcome</h3>
              <p className={styles.projectdescription}>
                <b>{wrappedProject.finalDescription}</b>
              </p>
            </section>
          )}

          <ProjectMediaGallery imageItems={imageItems} onImageClick={handleImageClick} />
        </div>
      </Col>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={currentImage} alt="Project preview" className={imagestyles.modalImage} />
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
  placeandyear: PropTypes.string,
  description: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        header: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string),
      }),
    ])
  ),
  finalDescription: PropTypes.string,
  imageThumbRefs: PropTypes.arrayOf(PropTypes.string),
  imageRefs: PropTypes.arrayOf(PropTypes.string),
};

export default ProjectDetails;
