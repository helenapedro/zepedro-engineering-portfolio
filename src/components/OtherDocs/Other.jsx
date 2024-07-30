import React from 'react';
import useData from '../../pages/Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './OtherDocs.module.css';
import config from '../../config';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import LoadingError from '../comon/LoadingError';


const Other = () => {
    const dataUrl = '/data/otherData.json';
    const { data: otherData, error } = useData(dataUrl);

    return (
        <div className={EducationStyles.education}>
            <LoadingError error={error} />
            {!error && otherData && Array.isArray(otherData) && (
                otherData.map((data, index) => (
                    <article className={EducationStyles.panel} key={index}>
                        <div className={EducationStyles.row}>
                            {data.images && data.images.length > 0 ? (
                                data.images.map((image, imgIndex) => {
                                    const imageUrl = `${config.trainingUrl}${image}`;
                                    return (
                                        <div className='col-6' key={imgIndex}>
                                            <a className={EducationStyles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
                                                <img src={imageUrl} alt={`Certificate ${index + 1}`} />
                                            </a>
                                            <h4 className={styles.title}>{wrapNumbersWithClass(data.title[imgIndex], styles.number)}</h4>
                                        </div>
                                    ); 
                                })
                            ) : (
                                <div className={styles.title}>
                                    <p className={styles.title}>{data.title}</p>
                                </div>
                            )}
                        </div>
                    </article>
                ))
            )}
        </div>
    );
};

export default Other;
