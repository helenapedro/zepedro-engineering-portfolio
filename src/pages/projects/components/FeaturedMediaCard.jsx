import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { wrapNumbersWithClass } from "../../../utils/WrapNumbers";
import styles from "../ProjectContainer.module.css";
import containerstyles from "../../../components/ui/Container.module.css";

const FeaturedMediaCard = ({ projectTitle, projectPath, videoUrl, embedUrl }) => (
  <Card className={`${containerstyles.container} ${styles.featuredMediaCard}`}>
    <Card.Body className="p-4">
      <Row className="align-items-center">
        <Col md={5} className="mb-3 mb-md-0">
          <div className={styles.featuredMediaVideoWrapper}>
            <iframe
              src={embedUrl}
              title="Live TV interview clip"
              className={styles.featuredMediaVideo}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
            <div className={styles.featuredMediaPopoutMask} aria-hidden="true" />
          </div>
        </Col>
        <Col md={7}>
          <span className={styles.featuredMediaBadge}>As Featured on Live TV</span>
          <h4 className={styles.featuredMediaTitle}>
            {wrapNumbersWithClass(
              "Cabinda - Construction of 120 Apartments, Funded by PIIM Reaches 70% Completion",
              styles.featuredMediaNumber
            )}
          </h4>
          <p className={styles.featuredMediaText}>
            {wrapNumbersWithClass(
              "Reporter context: In Buco-Zau, lawmakers visited ongoing social projects, including 300 social houses and the construction of 120 apartments under PIIM (Integrated Municipal Intervention Plan), with physical progress already at 70%.",
              styles.featuredMediaNumber
            )}
          </p>

          <p className={styles.featuredMediaQuoteLabel}>
            {wrapNumbersWithClass("Interview excerpt (Engineer Jose Pedro)", styles.featuredMediaNumber)}
          </p>
          <blockquote className={styles.featuredMediaQuote}>
            <em className={styles.featuredMediaQuoteText}>
              {wrapNumbersWithClass(
                '"The project includes external infrastructure works such as asphalt paving, as well as electricity, hydraulics, and water drainage systems."',
                styles.featuredMediaNumber
              )}
            </em>
          </blockquote>

          <div className={styles.featuredMediaActions}>
            <Button as="a" href={videoUrl} target="_blank" rel="noopener noreferrer" variant="outline-primary">
              Watch Interview Clip
            </Button>
            <Button as={Link} to={projectPath} variant="primary">
              View Related Project
            </Button>
          </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

FeaturedMediaCard.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  projectPath: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
};

export default FeaturedMediaCard;
