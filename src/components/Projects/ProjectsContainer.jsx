import React from 'react';
import styles from './Container.module.css';
import Projects from '../Projects/Projects';

const ProjectsContainer = () => {
    return (
        <div className={styles.container}>
            <div>
                <Projects />
            </div>
        </div> 
    );
};

export default ProjectsContainer;
