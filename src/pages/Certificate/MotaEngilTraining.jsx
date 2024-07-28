import React from 'react';
import useData from '../Hooks/useData';
import styles from './Academic.module.css';
import config from '../../config';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import LoadingError from '../../components/comon/LoadingError';


const MotaEngilTraining = () => {
  const dataUrl = '/data/meTrainingData.json'
  const { data: meTrainingData, error } = useData(dataUrl);

  
  return (
    <div className={styles.certificate}>
      <LoadingError error={error} />
      {!error && meTrainingData && Array.isArray(meTrainingData) && (
        meTrainingData.map((data, index) => (
          <article className={styles.panel} key={index}>
            <div className={styles.row}>
              {data.images && data.images.length > 0 ? (
                data.images.map((image, imgIndex) => {
                  const imageUrl = `${config.trainingUrl}${image}`;
                  return (
                    <div className='col-6' key={imgIndex}>
                      <a className={styles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
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

export default MotaEngilTraining;
