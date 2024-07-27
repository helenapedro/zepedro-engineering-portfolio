import React, { useState } from 'react';
import Project from './Project';
import useProjectsData from '../Hooks/useProjectsData';
import PaginationComponent from '../../utils/PaginationComponent';
import styles from './Project.module.css';

const Projects = () => {
  
  const dataUrl = process.env.REACT_APP_PROJECTS_DATA_URL;
  const { projects, loading, error } = useProjectsData(dataUrl);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;


  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = projects.slice(startIndex, startIndex + pageSize);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.projectContainer} >{error}</div>;
  }

  return (
    <div id="main" className={styles.projectContainer}>
      <div>
        {paginatedProjects.map((project, index) => (
          <React.Fragment key={index}>
            <Project
              title={project.title}
              organization={project.organization}
              placeandyear={project.placeandyear}
              description={project.description}
              activities={project.activities}
              finalDescription={project.finalDescription}
              images={project.images}
            />
            {index !== paginatedProjects.length - 1 && <br />}
          </React.Fragment>
        ))}
        <PaginationComponent
          itemsCount={projects.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Projects;