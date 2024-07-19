import React from 'react';
import styles from './AboutContainer.module.css';
import mainStyles from '../../components/Main.module.css';


import About from './About';
import aboutmeData from '../../data/aboutmeData.json';

const AboutContainer = () => {
    return (
        <div className={mainStyles.panel}>
            <h1 className={styles['container-title']}>ABOUT</h1>
            <div>
                <About aboutmeData={aboutmeData} />
            </div>
        </div>
    ); 
};

export default AboutContainer;
