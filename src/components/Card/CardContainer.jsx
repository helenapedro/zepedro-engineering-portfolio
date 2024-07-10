import React, { useEffect } from 'react';
import styles from '../Certificate/Certificate.module.css';

import Card from '../Card/Card';
import aboutmeData from '../../data/aboutmeData.json';

const CardContainer = () => {
    return (
        <div className={styles.certificate}>
            <h1 className={styles['certificate-title']}>CARD</h1>
            <div>
                <Card aboutmeData={aboutmeData} />
            </div>
        </div>
    );
};

export default CardContainer;
