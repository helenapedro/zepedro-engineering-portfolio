import React from 'react';
import styles from './Academic.module.css';
import config from '../../config';

const professionalMe = ({ professionalData }) => {
    if (!professionalData || !Array.isArray(professionalData)) {
        return <div>No data available.</div>;
    }
  
    return (
        <div className={styles.certificate}>
            {professionalData.map((data, index) => (
                <article className={styles.panel} key={index}>
                    <div className={styles.row}>
                        {data.images && data.images.length > 0 ? (
                            data.images.map((image, imgIndex) => {
                                const imageUrl = `${config.trainingUrl}${image}`;
                                return (
                                    <div className='col-4 col-6-medium col-12-small' key={imgIndex}>
                                        <a className={styles.image}>
                                            <img src={imageUrl} alt={`Certificate ${index + 1}`} />
                                        </a>
                                        <h4 className={styles.title}>{data.title[imgIndex]}</h4>
                                    </div>
                                );
                            })
                        ) : (
                            <div className='col-12-small'>
                                <p className={styles.title}>{data.title}</p> 
                            </div>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
};

export default professionalMe;
