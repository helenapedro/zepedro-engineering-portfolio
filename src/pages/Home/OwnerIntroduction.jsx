import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'

const OwnerIntroduction = ({ ownerData }) => {
    return (
        <Card className={`${styles.home} shadow-sm mb-2`}>
            <Card.Body className={styles.panel}>
                <Row> 
                    {/* Profile Image */}
                    <Col md={4} className={`${styles.image} text-center mb-3 mb-md-0`}>
                        {ownerData.mainImage && (
                        <img
                            src={ownerData.mainImage}
                            alt={ownerData.name}
                            className="img-fluid rounded-circle shadow"
                            style={{ maxWidth: '200px' }}
                        />
                        )}
                        <Card.Title as="h2" className={`mb-3 text-primary ${styles['home-title']}`}>
                            {ownerData.name}
                        </Card.Title>
                    </Col>

                    {/* Owner Details */}
                    <Col md={8}>
                        <Card.Text className={`mb-3 ${styles['home-text']}`}>
                            <strong>Hello, my name is </strong>
                            <Link to="/about">ZéPedro</Link>, an experienced Construction Engineer with over{' '}
                            <strong className={styles.year}>{ownerData.experienceYears}</strong> years in project management and nearly{' '}
                            <strong className={styles.year}>{ownerData.qhseExperienceYears}</strong> year as Coordinator of QHSE-Quality at{' '}
                            <Link to={ownerData.motaEngilLink} target="_blank" rel="noopener noreferrer">
                                Mota-Engil Angola
                            </Link>.
                        </Card.Text>
                        <Card.Text className={`mb-3 ${styles['home-text']}`}>
                            This is a showcase of my projects and{' '} abilities.
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OwnerIntroduction;
