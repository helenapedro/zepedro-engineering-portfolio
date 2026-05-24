import React from 'react';
import { useTranslation } from 'react-i18next';
import useData from '../../Hooks/useData';
import styles from '../../styles/About.module.css';
import { wrapNumbersWithClass } from './../../utils/WrapNumbers';
import { Row, Col, Container } from 'react-bootstrap';
import { PROFILE } from '../../constants/profile';
import { localizeRecord } from '../../i18n/localizedValue';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  const { i18n, t } = useTranslation();
  const collectionName = 'biograph';
  const { data, loading, error } = useData(collectionName);
  const resumeUrl = PROFILE.resumeUrl;
  const resumeQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(
    resumeUrl
  )}`;

  const renderPanel1 = (data, index) => (
    <Container className={styles.panel} key={index}>
      <h1>{t("about.title", "ABOUT")}</h1>
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
              {t("about.oeaMemberCard", "OEA Member Card")}
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
      {loading && <p>{t("common.loading")}</p>}
      {error && <p>{t("common.error")} loading data.</p>}
      {data && Array.isArray(data) && (
        data.map((item, index) => renderPanel1(localizeRecord(item, i18n.language), index))
      )}
      <Container className={styles.panel}>
        <section className={styles.resumeAccess} aria-labelledby="resume-access-title">
          <h2 id="resume-access-title" className={styles.resumeAccessTitle}>
            {t("about.resumeAccess", "Resume Access")}
          </h2>
          <p className={styles.resumeAccessText}>
            {t("about.resumeQrText", "Scan the QR code to open the engineer resume.")}
          </p>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.resumeQrLink}>
            <img
              src={resumeQrUrl}
              alt={t("about.resumeQrAlt", "QR code to open engineer resume")}
              className={styles.resumeQrImage}
            />
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {t("about.openResume", "Open Resume")}
          </a>
        </section>
      </Container>
    </div>
  );
};

export default About;
