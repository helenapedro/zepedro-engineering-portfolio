import React from 'react';
import useData from '../../Hooks/useData';
import styles from '../../styles/About.module.css';
import { wrapNumbersWithClass } from './../../utils/WrapNumbers';
import { Row, Col, Container } from 'react-bootstrap';
import { PROFILE } from '../../constants/profile';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  const collectionName = 'biograph';
  const { data, loading, error } = useData(collectionName);
  const resumeUrl = PROFILE.resumeUrl;
  const resumeQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(
    resumeUrl
  )}`;

  const renderPanel1 = (data, index) => (
    <Container className={styles.panel} key={index}>
      <h1>ABOUT</h1>
      <Row className='card border-0 mb-3'>
        <Col className='row g-0'>
          <div className={`col-md-6 order-1 order-md-2 ${styles.image}`}>
            {data.image && (
              <img src={data.image} alt={data.name} />
            )}
            <h1 className={styles.name}>{data.name}</h1>
            <h5 className={`${styles['subtitle']} card-subtitle mb-1`}>{data.title}</h5>
            <a
              href={data.titleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              OEA Member Card
            </a>
          </div>

          <div className="col-md-6 order-2 order-md-1">
            <div className='card-body'>
              <section className={`${styles['card-text']}`}>
                <p>{wrapNumbersWithClass(data.descriptionOne, 'number')}</p>
                <p>{wrapNumbersWithClass(data.descriptionTwo, 'number')}</p>
                <p>{wrapNumbersWithClass(data.descriptionThree, 'number')}</p>
              </section>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )

  return (
    <div className={styles.about}>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data.</p>}
      {data && Array.isArray(data) && (
        data.map((data, index) => renderPanel1(data, index))
      )}
      <Container className={styles.panel}>
        <section className={styles.resumeAccess} aria-labelledby="resume-access-title">
          <h2 id="resume-access-title" className={styles.resumeAccessTitle}>Resume Access</h2>
          <p className={styles.resumeAccessText}>Scan the QR code to open the engineer resume.</p>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.resumeQrLink}>
            <img
              src={resumeQrUrl}
              alt="QR code to open engineer resume"
              className={styles.resumeQrImage}
            />
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open Resume
          </a>
        </section>
      </Container>
    </div>
  );
};

export default About;
