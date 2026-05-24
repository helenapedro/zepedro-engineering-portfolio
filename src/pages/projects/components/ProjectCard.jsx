import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as iconsfa from "react-icons/fa";
import ProjectCarousel from "../../../components/Project/ProjectCarousel";
import { wrapNumbersWithClass } from "../../../utils/WrapNumbers";
import styles from "../ProjectContainer.module.css";
import prodetailsstyles from "../../../components/ui/ProjectDetails.module.css";

const ProjectCard = ({ project, categoryName, onOpenImage }) => (
  <Col md={6} style={{ marginBottom: "1rem" }}>
    <Card className={`${styles.cardContainer} shadow-sm`}>
      <Card.Header className={`${styles.cardHeader} text-center`}>
        <h5 className={`${prodetailsstyles.title} number mb-0`}>{project.title}</h5>
        <Card.Subtitle className={prodetailsstyles.subtitle}>
          <div className={prodetailsstyles.organization}>
            <iconsfa.FaBuilding className={prodetailsstyles.icon} /> {project.organization}{" "}
            <span className={`${prodetailsstyles.year} number`}>
              <iconsfa.FaCalendarAlt className={prodetailsstyles.icon} /> {project.period?.label || ""}
            </span>
          </div>
          <div className={prodetailsstyles.place}>
            <iconsfa.FaMapMarkerAlt className={prodetailsstyles.icon} />{" "}
            {wrapNumbersWithClass(project.location || "", "number")}
          </div>
          <div className={prodetailsstyles.category}>
            <iconsfa.FaTags className={prodetailsstyles.icon} /> {categoryName}
          </div>
        </Card.Subtitle>
      </Card.Header>

      {project.media?.images && project.media.images.length > 0 && (
        <ProjectCarousel
          images={project.media.images}
          title={project.title}
          onImageClick={onOpenImage}
        />
      )}

      <Card.Body>
        <div className="text-center">
          <Link to={`/projects/${project.id}`}>
            <Button variant="primary">View Details</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    organization: PropTypes.string,
    location: PropTypes.string,
    period: PropTypes.shape({
      label: PropTypes.string,
    }),
    media: PropTypes.shape({
      images: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  categoryName: PropTypes.string.isRequired,
  onOpenImage: PropTypes.func.isRequired,
};

export default ProjectCard;
