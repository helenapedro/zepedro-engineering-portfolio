import React from 'react';
import styles from './Container.module.css';
import Projects from '../Projects/Projects';

const ProjectsContainer = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles['container-title']}>MY PROJECTS</h1>
            <div>
                <Projects />
            </div>
        </div> 
    );
};

export default ProjectsContainer;
