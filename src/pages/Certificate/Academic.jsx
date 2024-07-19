import React from 'react';
import styles from './Academic.module.css';
import config from '../../config';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';

const Academic = ({ academicData }) => {
    if (!academicData || !Array.isArray(academicData)) {
        return <div>No academic data available.</div>;
    }
  
    return ( 
        <div className={styles.certificate}>
            {academicData.map((data, index) => (
                <article className={styles.panel} key={index}>
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
                        <div className={styles.row}>
                            {data.images && data.images.map((image, imgIndex) => {
                                const imageUrl = `${config.baseUrl}${image}`;
                                return (
                                    <div className={`${styles['col-4']} ${styles['col-6-medium']} ${styles['col-12-small']}`} key={imgIndex}>
                                        <a className={styles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={imageUrl} alt="graduation ceremony" />
                                        </a>
                                    </div>
                                );
                            })} 
                        </div>
                    </header>
                </article> 
            ))}
        </div>
    );
};

export default Academic;
