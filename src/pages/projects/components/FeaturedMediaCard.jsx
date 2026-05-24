import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { wrapNumbersWithClass } from "../../../utils/WrapNumbers";
import styles from "../ProjectContainer.module.css";
import containerstyles from "../../../components/ui/Container.module.css";

const FeaturedMediaCard = ({ projectTitle, projectPath, videoUrl, embedUrl }) => {
  const { t } = useTranslation();

  return (
    <Card className={`${containerstyles.container} ${styles.featuredMediaCard}`}>
      <Card.Body className="p-4">
        <Row className="align-items-center">
          <Col md={5} className="mb-3 mb-md-0">
            <div className={styles.featuredMediaVideoWrapper}>
              <iframe
                src={embedUrl}
                title={t("featured.videoTitle")}
                className={styles.featuredMediaVideo}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              <div className={styles.featuredMediaPopoutMask} aria-hidden="true" />
            </div>
          </Col>
          <Col md={7}>
            <span className={styles.featuredMediaBadge}>{t("featured.badge")}</span>
            <h4 className={styles.featuredMediaTitle}>
              {wrapNumbersWithClass(t("featured.title"), styles.featuredMediaNumber)}
            </h4>
            <p className={styles.featuredMediaText}>
              {wrapNumbersWithClass(t("featured.text"), styles.featuredMediaNumber)}
            </p>

            <p className={styles.featuredMediaQuoteLabel}>
              {wrapNumbersWithClass(t("featured.quoteLabel"), styles.featuredMediaNumber)}
            </p>
            <blockquote className={styles.featuredMediaQuote}>
              <em className={styles.featuredMediaQuoteText}>
                {wrapNumbersWithClass(t("featured.quote"), styles.featuredMediaNumber)}
              </em>
            </blockquote>

            <div className={styles.featuredMediaActions}>
              <Button as="a" href={videoUrl} target="_blank" rel="noopener noreferrer" variant="outline-primary">
                {t("featured.watch")}
              </Button>
              <Button as={Link} to={projectPath} variant="primary" aria-label={`${t("featured.related")}: ${projectTitle}`}>
                {t("featured.related")}
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

FeaturedMediaCard.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  projectPath: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
};

export default FeaturedMediaCard;
