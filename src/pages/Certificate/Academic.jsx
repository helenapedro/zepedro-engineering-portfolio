import React from 'react';
import styles from './Academic.module.css';
import config from '../../config';
import useAcademicData from '../Hooks/useAcademicData';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';

const Academic = () => {
    const { academic, error } = useAcademicData();

    if (error) {
        return <div className={styles.certificate}>{error}</div>
    } 
   
    return ( 
        <div className={styles.certificate}>
            {academic.map((data, index) => (
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
                                    <div className={`${styles['col-4']}`} key={imgIndex}>
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
