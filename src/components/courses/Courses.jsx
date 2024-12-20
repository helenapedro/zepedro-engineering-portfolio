import React from 'react';
import useData from '../../pages/Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './METraining.module.css';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <>
                  {Array.isArray(data.title) ? (
                    // Scenario 1: Multiple titles, each with its own image
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
                    // Scenario 2: Single title with multiple images
                    <>
                      <h4 className={EducationStyles.title}>
                        {wrapNumbersWithClass(data.title, styles.number)}
                      </h4>
                      <Row>
                        {data.images.map((image, imgIndex) => {
                          const imageUrl = `${image}`;
                          return (
                            <Col xs={4} md={2} className="mb-6 mr-0 ml-0" key={imgIndex}>
                              <a 
                                className={`${EducationStyles.image}`} 
                                href={imageUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <img src={imageUrl} alt={`${data.title} ${imgIndex + 1}`} />
                              </a>
                            </Col>
                          );
                        })}
                      </Row>
                    </>
                  )}
                </>
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
