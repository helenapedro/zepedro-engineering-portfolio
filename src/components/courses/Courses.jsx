import React, { useState } from 'react';
import useData from '../../pages/Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './METraining.module.css';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import { Row, Col, Button, Modal, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Courses = () => {
  const collectionName = 'courses';
  const { data, loading, error } = useData(collectionName);
  const [showModal, setShowModal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const toggleSummary = () => setShowSummary(!showSummary);

  const renderScenario1 = (data, index) => (
    <>
      <h1>MOTA-ENGIL TRAINING</h1>
      <Row>
        {data.images.map((image, imgIndex) => {
          const imageUrl = `${image}`;
          return (
            <Col className='col-6' key={imgIndex}>
              <a className={EducationStyles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt={`Certificate ${index + 1}`} />
              </a>
              <h4 className={styles.title}>
                {wrapNumbersWithClass(data.title[imgIndex], styles.number)}
              </h4>
            </Col>
          );
        })}
      </Row>
    </>
  );

  const renderScenario2 = (data) => {
    const imagesToShow = data.images.slice(0, 4);
    return (
      <>
        <h1 className={styles.title}>
          {wrapNumbersWithClass(data.title, styles.number)}
        </h1>
        <Button onClick={toggleSummary} className="mb-2">
          {showSummary ? 'Hide Summary' : 'Show Summary'}
        </Button>
        {showSummary && (
          <b className={EducationStyles.traineeSummary}>
            {data.traineeSummary}
          </b>
        )}
        <Row>
          {imagesToShow.map((image, imgIndex) => {
            const imageUrl = `${image}`;
            return (
              <Col className='col-6' key={imgIndex}>
                <a className={EducationStyles.image} href={imageUrl} target="_blank" rel="noopener noreferrer">
                  <img src={imageUrl} alt={`${data.title} - Image ${imgIndex + 1}`} />
                </a>
              </Col>
            );
          })}
        </Row>
        {data.images.length > 6 && (
          <Button onClick={handleShowModal} className="mt-2">
            View All Images
          </Button>
        )}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>All Images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {data.images.map((image, imgIndex) => (
                <Carousel.Item key={imgIndex}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`${data.title} - Image ${imgIndex + 1}`}
                  />
                  <Carousel.Caption>
                    <h4>{wrapNumbersWithClass(data.title, styles.number)}</h4>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
        </Modal>
      </>
    );
  };

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
                    renderScenario1(data, index)
                  ) : (
                    renderScenario2(data)
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