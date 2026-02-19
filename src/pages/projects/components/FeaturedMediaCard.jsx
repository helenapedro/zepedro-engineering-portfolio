import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../ProjectContainer.module.css";
import containerstyles from "../../../components/ui/Container.module.css";

const FeaturedMediaCard = ({ imageUrl, projectTitle, projectPath }) => (
  <Card className={`${containerstyles.container} ${styles.featuredMediaCard}`}>
    <Card.Body className="p-4">
      <Row className="align-items-center">
        <Col md={5} className="mb-3 mb-md-0">
          <img
            src={imageUrl}
            alt="Engineer being interviewed on live TV about a flagship construction project"
            className={styles.featuredMediaImage}
          />
        </Col>
        <Col md={7}>
          <span className={styles.featuredMediaBadge}>As Featured on Live TV</span>
          <h4 className={styles.featuredMediaTitle}>Live TV Interview</h4>
          <p className={styles.featuredMediaText}>
            Discussion of project execution and impact for <strong>{projectTitle}</strong>.
          </p>
          <Link to={projectPath}>
            <Button variant="outline-primary">View Related Project</Button>
          </Link>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

FeaturedMediaCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  projectTitle: PropTypes.string.isRequired,
  projectPath: PropTypes.string.isRequired,
};

export default FeaturedMediaCard;
