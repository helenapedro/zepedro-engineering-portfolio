import React from 'react';
import useData from '../../pages/Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './Academic.module.css';
import config from '../../config';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';

const Education = () => {
    const collectionName = 'education';
    const { data, loading, error } = useData(collectionName); 
   
    return ( 
        <div className={EducationStyles.education}>
            {loading && <p>Loading...</p>}
            {error && <p>Error loading data.</p>}
            {data && Array.isArray(data) && (
                data.map((data, index) => (
                    <article className={EducationStyles.panel} key={index}>
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
                            <div className={EducationStyles.row}>
                                {data.images && data.images.map((image, imgIndex) => {
                                    const imageUrl = `${config.graduationImagesUrl}${image}`;
                                    return (
                                        <div className={`${EducationStyles['col-4']}`} key={imgIndex}>
                                            <a className={EducationStyles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
                                                <img src={imageUrl} alt="graduation ceremony" />
                                            </a>
                                        </div>
                                    );
                                })} 
                            </div>
                        </header>
                    </article> 
                ))

            )}
        </div>
    );
};

export default Education;
