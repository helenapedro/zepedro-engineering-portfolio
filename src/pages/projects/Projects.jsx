import React, { useState } from 'react';
import Project from './Project';
import useData from '../Hooks/useData';
import PaginationComponent from '../../utils/PaginationComponent';
import handlePageChange from '../../utils/handlePageChange';
import LoadingError from '../../components/comon/LoadingError';
import styles from './Project.module.css';

const Projects = () => {
  const dataUrl = `${process.env.REACT_APP_BASE_URL}data/projectsData.json`;
  //const dataUrlDev = '/data/projectsData.json';
  const { data, loading, error } = useData(dataUrl);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const handlePageChangeWrapper = (page) => handlePageChange(page, setCurrentPage);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = data.slice(startIndex, startIndex + pageSize);

  return (
    <div id="main" className={styles.projectContainer}>
      <LoadingError loading={loading} error={error} /> 
      {!loading && !error && (
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
            itemsCount={data.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChangeWrapper}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
