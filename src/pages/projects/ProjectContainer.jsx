import React from 'react';

import mainStyles from '../../components/Main.module.css';
import styles from './ProjectContainer.module.css';
import Projects from './Projects';

const ProjectsContainer = () => {
    return (
        <div className={mainStyles.panel}>
            <h1 className={styles['container-title']}>MY PROJECTS</h1>
            <div>
                <Projects />
            </div>
        </div> 
    );
};

export default ProjectsContainer;
