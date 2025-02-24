import React from 'react';
import useData from '../../Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './Academic.module.css';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';

const Education = () => {
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
                    {data.tutorDescription}
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
            {loading && <p>Loading...</p>}
            {error && <p>Error loading data.</p>}
            {data && Array.isArray(data) && (
                data.map((data, index) => (
                    <article className={EducationStyles.panel} key={index}>
                        {renderHeader(data)}
                        {renderImages(data)}
                    </article>
                ))
            )}
        </div>
    );
};

export default Education;
