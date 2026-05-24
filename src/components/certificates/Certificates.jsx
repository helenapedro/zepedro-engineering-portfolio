import React from 'react';
import { useTranslation } from 'react-i18next';
import useData from '../../Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './AdditionalTraining.module.css';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { localizeRecord } from '../../i18n/localizedValue';

const Certificates = () => {
  const { i18n, t } = useTranslation();
  const collectionName = 'training';
  const { data, loading, error } = useData(collectionName);

  const renderCertificates = (data, index) => (
    data.images.map((image, imgIndex) => {
      const imageUrl = `${image}`;
      return (
        <Col className='col-6' key={imgIndex}>
          <a className={EducationStyles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl} alt={`${t("education.certificate", "Certificate")} ${index + 1}`} />
          </a>
          <h4 className={styles.title}>
            {wrapNumbersWithClass(data.title[imgIndex], styles.number)}
          </h4>
        </Col>
      );
    })
  );

  return (
    <div className={EducationStyles.education}>
      {loading && <p>{t("common.loading")}</p>}
      {error && <p>{t("common.error")} loading data.</p>}
      {!error && data && Array.isArray(data) && (
        data.map((item, index) => {
          const localizedItem = localizeRecord(item, i18n.language);
          return (
          <article className={EducationStyles.panel} key={index}>
            <h1>{t("education.certificates", "Certificates")}</h1>
            <Row className={EducationStyles.row}>
              {localizedItem.images && localizedItem.images.length > 0 ? (
                renderCertificates(localizedItem, index)
              ) : (
                <p>{t("education.noCertificates", "No certificates available.")}</p>
              )}
            </Row>
          </article>
          );
        })
      )}
    </div>
  );
};

export default Certificates;
