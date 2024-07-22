import React from 'react';
import styles from './About.module.css';
import { wrapNumbersWithClass } from './../../utils/WrapNumbers';

const About = ({ aboutmeData }) => {
    if (!aboutmeData || !Array.isArray(aboutmeData)) {
        return <div>No data available.</div>;
    }

    return (
        <div className={styles.about}>
            {aboutmeData.map((data, index) => (
                <article className={styles.panel} key={index}>
                    <div className='card border-0 mb-3'>
                        <div className='row g-0'>
                            <div className={`col-md-6 order-1 order-md-2 ${styles.image}`}>
                                <h1 className={styles.name}>{data.name}</h1>
                                {data.image && (
                                    <img src={data.image} alt={data.name}/>
                                )}
                                <h5 className={`${styles.title} card-subtitle mb-1`}>{data.title}</h5>
                                <a className={styles['title-oea']} href={data.titleLink} target="_blank" rel="noopener noreferrer">
                                    {data.titleOEA} 
                                </a>
                            </div>
                            <div className="col-md-6 order-2 order-md-1">
                                <div className='card-body'>
                                    <section className={`card-text ${styles['card-text']}`}>
                                        <p>{data.descriptionOne}</p>
                                        <p>{data.descriptionTwo}</p>
                                        <p>{wrapNumbersWithClass(data.descriptionThree, 'number')}</p>
                                        <a href={data.titleLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">OEA Card link</a>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default About;
