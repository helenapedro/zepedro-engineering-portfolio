import React from 'react';
import useData from '../../Hooks/useData';
import EducationStyles from '../Education.module.css';
import styles from './OtherDocs.module.css';
import { wrapNumbersWithClass } from '../../utils/WrapNumbers';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Other = () => {
    const collectionName = 'certificates';
    const { data, loading, error } = useData(collectionName);

    const renderImagesWithTitles = (data, index) => (
        data.images.map((image, imgIndex) => {
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
        })
    )

    const renderTitleOnly = (data) => (
        <div className={styles.title}>
            <p className={styles.title}>{data.title}</p>
        </div>
    );

    return (
        <div className={EducationStyles.education}>
            {loading && <p>Loading...</p>}
            {error && <p>Error loading data.</p>}
            {!error && data && Array.isArray(data) && (
                data.map((data, index) => (
                    <article className={EducationStyles.panel} key={index}>
                        <h1>Other</h1>
                        <Row className={EducationStyles.row}>
                            {data.images && data.images.length > 0 ? (
                                renderImagesWithTitles(data, index)
                            ) : (
                                renderTitleOnly(data)
                            )}
                        </Row>
                    </article>
                ))
            )}
        </div>
    );
};

export default Other;
