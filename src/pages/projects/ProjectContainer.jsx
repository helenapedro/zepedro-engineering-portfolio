import React from 'react';
import mainStyles from '../../components/Main.module.css';
import styles from './ProjectContainer.module.css';
import Projects from './Projects';

const ProjectsContainer = () => {
    return (
        <div className={mainStyles.panel}>
            <div className={styles['container-title']}>
                <h1>PROJECTS</h1>
                <Projects />
            </div>
        </div> 
    );
};

export default ProjectsContainer;
