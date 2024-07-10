import React, { useEffect } from 'react';
import styles from './About.module.css'

import AboutMe from '../About/AboutMe';
import aboutmeData from '../../data/aboutmeData.json';

const AboutMeContainer = () => {
    return (
        <div className={styles.main}>
            <div>
                <AboutMe aboutmeData={aboutmeData} />
            </div>
        </div>
    );
};

export default AboutMeContainer;
