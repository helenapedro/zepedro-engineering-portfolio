import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEnvelope, FaFileAlt } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import StatusBadge from "./StatusBadge";
import { PROFILE } from "../../constants/profile";
import { wrapNumbersWithClass } from "../../utils/WrapNumbers";
import herostyles from "../../components/ui/Hero.module.css";
import imagestyles from "../../components/ui/Image.module.css";
import containerstyles from "../../components/ui/Container.module.css";

const OwnerIntroduction = ({ ownerData }) => {
  const ownerName = ownerData.name || PROFILE.displayName;
  const resumeUrl = ownerData.resumeUrl || PROFILE.resumeUrl;
  const whatsappUrl = ownerData.whatsappUrl || PROFILE.whatsappUrl;
  const email = ownerData.email || PROFILE.email;
  const linkedInUrl = ownerData.linkedInUrl || PROFILE.linkedInUrl;
  const introName = ownerData.shortName || ownerName;
  const hasExperienceDescription = typeof ownerData.experienceDescription === "string" &&
    ownerData.experienceDescription.trim().length > 0;
  const hasShowcaseDescription = typeof ownerData.showcaseDescription === "string" &&
    ownerData.showcaseDescription.trim().length > 0;
  const hasSummary = typeof ownerData.summary === "string" && ownerData.summary.trim().length > 0;
  const headline = ownerData.headline || PROFILE.roleLabel;
  const experienceText = hasExperienceDescription
    ? ownerData.experienceDescription
    : `Hello, my name is ${introName}, an experienced Construction Engineer with ${ownerData.experienceYears}+ years in project management and ${ownerData.qhseExperienceYears} years in QHSE-Quality coordination at Mota-Engil Angola.`;
  const secondaryText = hasShowcaseDescription
    ? ownerData.showcaseDescription
    : hasSummary
      ? ownerData.summary
      : "This is a showcase of my projects and abilities.";
  const highlightClassName = `${herostyles.experienceYear} ${herostyles.colorTwo}`;

  return (
    <Card className={`${containerstyles.container} mb-4`}>
      <Card.Body className="p-4">
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            {ownerData.mainImage && (
              <img
                src={ownerData.mainImage}
                alt={ownerName}
                className={imagestyles.heroImage}
              />
            )}
            <Card.Title as="h2" className={`${herostyles.fullName} fw-bold`}>
              {ownerName}
            </Card.Title>
            <Card.Text className="mb-2">
              {wrapNumbersWithClass(headline, highlightClassName)}
            </Card.Text>

            <div className="d-flex justify-content-center justify-content-md-center gap-2 overflow-auto">
              <StatusBadge Icon={FaEnvelope} href={`mailto:${email}`} />
              <StatusBadge Icon={SiWhatsapp} href={whatsappUrl} />
              <StatusBadge Icon={FaFileAlt} href={resumeUrl} />
            </div>
          </Col>

          <Col md={8} className={herostyles.text}>
            <Card.Text>
              {hasExperienceDescription ? (
                wrapNumbersWithClass(experienceText, highlightClassName)
              ) : (
                <>
                  <strong>Hello, my name is </strong>
                  <Link to="/about" className={herostyles.name}>
                    {introName}
                  </Link>
                  , an experienced Construction Engineer with{" "}
                  <strong className={`${herostyles.experienceYear} ${herostyles.colorTwo}`}>
                    {ownerData.experienceYears}+
                  </strong>{" "}
                  years in project management and{" "}
                  <strong className={`${herostyles.experienceYear} ${herostyles.colorTwo}`}>
                    {ownerData.qhseExperienceYears}
                  </strong>{" "}
                  years in QHSE-Quality coordination at{" "}
                  <a
                    href={ownerData.motaEngilLink || linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={herostyles.colorTwo}
                  >
                    Mota-Engil Angola
                  </a>
                  .
                </>
              )}
            </Card.Text>

            <Card.Text className="mb-2">
              {wrapNumbersWithClass(secondaryText, highlightClassName)}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OwnerIntroduction;
