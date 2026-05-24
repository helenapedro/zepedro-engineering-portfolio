import React from 'react';
import { useTranslation } from 'react-i18next';
import useData from '../../Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './OtherDocs.module.css';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { localizeRecord } from '../../i18n/localizedValue';

const Other = () => {
    const { i18n, t } = useTranslation();
    const collectionName = 'certificates';
    const { data, loading, error } = useData(collectionName);

    const renderImagesWithTitles = (data, index) => (
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
    )

    const renderTitleOnly = (data) => (
        <div className={styles.title}>
            <p className={styles.title}>{wrapNumbersWithClass(data.title, styles.number)}</p>
        </div>
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
                        <h1>{t("education.other", "Other")}</h1>
                        <Row className={EducationStyles.row}>
                            {localizedItem.images && localizedItem.images.length > 0 ? (
                                renderImagesWithTitles(localizedItem, index)
                            ) : (
                                renderTitleOnly(localizedItem)
                            )}
                        </Row>
                    </article>
                    );
                })
            )}
        </div>
    );
};

export default Other;
