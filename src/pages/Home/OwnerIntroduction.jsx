import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaFileAlt, FaLinkedin } from 'react-icons/fa';
import { SiWhatsapp } from 'react-icons/si';
import styles from '../../styles/Home.module.css';
import config from '../../config';
import StatusBadge from './StatusBadge';

const OwnerIntroduction = ({ ownerData }) => {
    return (
        <Card className={`${styles.home} shadow-sm mb-4 border-0 rounded-4`}>
            <Card.Body className={`${styles.panel} p-4`}>
                <Row className="align-items-center">
                    {/* Profile Image */}
                    <Col md={4} className="text-center mb-0 mb-md-0">
                        {ownerData.mainImage && (
                            <img
                                src={ownerData.mainImage}
                                alt={ownerData.name}
                                className="img-fluid rounded-circle shadow-lg overflow-hidden"
                                style={{ maxWidth: '200px', border: '5px solid #ddd' }}
                            />
                        )}
                        <Card.Title as="h2" className="mt-3 text-primary fw-bold">
                            {ownerData.name}
                        </Card.Title>
                        {/* <p className="text-xl text-gray-200 mb-6">Construction Engineer</p> */}
                    </Col>

                    {/* Owner Details */}
                    <Col md={8} className="text-md-start text-center">
                        <Card.Text className={`mb-2 ${styles['home-text']}`}>
                            <strong>Hello, my name is </strong>
                            <Link to="/about" className="text-decoration-none text-primary fw-bold">
                                ZéPedro
                            </Link>
                            , an experienced Construction Engineer with over{' '}
                            <strong className={styles.year}>{ownerData.experienceYears}</strong> years in project
                            management and nearly{' '}
                            <strong className={styles.year}>{ownerData.qhseExperienceYears}</strong> year as Coordinator
                            of QHSE-Quality at{' '}
                            <Link to={ownerData.motaEngilLink} target="_blank" rel="noopener noreferrer" className="fw-bold text-primary">
                                Mota-Engil Angola
                            </Link>.
                        </Card.Text>

                        <Card.Text className="mb-2">
                            This is a showcase of my projects and abilities.
                        </Card.Text>

                        {/* Status Badge Icons */}
                        <div className="d-flex justify-content-center justify-content-md-start gap-2 overflow-auto">
                            <StatusBadge Icon={FaEnvelope} href={`mailto:jose.pedro7@outlook.com`} />
                            <StatusBadge Icon={SiWhatsapp} href={`https://wa.me/+244947462094`} />
                            <StatusBadge Icon={FaFileAlt} href={config.resumeUrl} />
                            <StatusBadge Icon={FaLinkedin} href={config.linkedInUrl} />
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OwnerIntroduction;
