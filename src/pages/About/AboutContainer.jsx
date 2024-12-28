import React from 'react';
import styles from './AboutContainer.module.css';
import mainStyles from '../../components/Main.module.css';
import About from './About';

const AboutContainer = () => {
    return (
        <div className={mainStyles.panel}>
            <div className={styles['container-title']}>
                <About />
            </div>
        </div>
    ); 
};

export default AboutContainer;
