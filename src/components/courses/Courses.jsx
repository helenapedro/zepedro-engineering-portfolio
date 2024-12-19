import React from 'react';
import useData from '../../pages/Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './METraining.module.css';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';

const Courses = () => {
  const collectionName = 'courses';
  const { data, loading, error } = useData(collectionName); 

  return (
    <div className={EducationStyles.education}>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data.</p>}
      {!error && data && Array.isArray(data) && (
        data.map((data, index) => (
          <article className={EducationStyles.panel} key={index}>
            <div className={EducationStyles.row}>
              {data.images && data.images.length > 0 ? (
                data.images.map((image, imgIndex) => {
                  const imageUrl = `${image}`;
                  return (
                    <div className='col-6' key={imgIndex}>
                      <a className={EducationStyles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
                        <img src={imageUrl} alt={`Certificate ${index + 1}`} />
                      </a>
                      <h4 className={styles.title}>
                        {wrapNumbersWithClass(data.title[imgIndex], styles.number)}
                      </h4>
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
        ))
      )}
    </div>
  );
};

export default Courses;
