import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from '../Education/Academic.module.css';
import config from '../../config';

const Academic = ({ aboutmeData }) => {
    if (!aboutmeData || !Array.isArray(aboutmeData)) {
        return <div>No academic data available.</div>;
    }
  
    return ( 
        <div className={styles.certificate}>
            {aboutmeData.map((data, index) => (
                <article className={styles.panel} key={index}>
                    <header className={styles.header}>
                        <h2 className={styles.course}>{data.name}</h2>
                        <h1 className={styles.institute}>{data.title}</h1>
                        <b className={styles.title}>
                            <Link to={data.titleLink} target='_blank' rel='noopener noreferrer'
                            > ({data.titleOEA})
                            </Link>
                        </b>
                        <p className={styles.tutordescription}>{data.descriptionTwo}</p>
                        <p className={styles.tutordescription}>{data.descriptionThree}</p>
                        <div className={styles.row}>
                            {data.images && data.images.map((image, imgIndex) => {
                                const imageUrl = `${config.baseUrl}${image}`;
                                return (
                                    <div className={`${styles['col-4']} ${styles['col-6-medium']} ${styles['col-12-small']}`} key={imgIndex}>
                                        <a className={styles.image}>
                                            <img src={imageUrl} alt="images from the graduation ceremony" />
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
