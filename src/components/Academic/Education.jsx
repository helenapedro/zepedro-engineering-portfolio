import React from 'react';
import { useTranslation } from 'react-i18next';
import useData from '../../Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './Academic.module.css';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import { localizeRecord } from '../../i18n/localizedValue';

const Education = () => {
    const { i18n, t } = useTranslation();
    const collectionName = 'education';
    const { data, loading, error } = useData(collectionName);

    const renderHeader = (data) => (
        <header className={styles.header}>
            <h1 className={styles.course}>{wrapNumbersWithClass(data.course, styles.number)}</h1>
            <b className={styles.institute}>
                <a href={data.organizationLink} target='_blank' rel='noopener noreferrer'> ({data.organization})</a>
            </b>
            <h6 className={styles.duration}>{wrapNumbersWithClass(data.duration, styles.number)}</h6>
            {data.tutorDescription && (
                <b className={styles.tutordescription}>
                    {wrapNumbersWithClass(data.tutorDescription, styles.number)}
                    <a href={data.tutorLink} target='_blank' rel='noopener noreferrer'> {data.tutorName}</a>
                </b>
            )}
        </header>
    )

    const renderImages = (data) => (
        <div className={EducationStyles.row}>
            {data.images && data.images.map((image, imgIndex) => {
                const imageUrl = `${image}`;
                return (
                    <div className={`${EducationStyles['col-4']}`} key={imgIndex}>
                        <a className={EducationStyles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
                            <img src={imageUrl} alt="graduation ceremony" />
                        </a>
                    </div>
                );
            })}
        </div>
    )

    return (
        <div className={EducationStyles.education}>
            {loading && <p>{t("common.loading")}</p>}
            {error && <p>{t("common.error")} loading data.</p>}
            {data && Array.isArray(data) && (
                data.map((item, index) => {
                    const localizedItem = localizeRecord(item, i18n.language);
                    return (
                    <article className={EducationStyles.panel} key={index}>
                        {renderHeader(localizedItem)}
                        {renderImages(localizedItem)}
                    </article>
                    );
                })
            )}
        </div>
    );
};

export default Education;
