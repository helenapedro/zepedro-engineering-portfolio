import React, { useState } from 'react';
import Project from './Project';
import useData from '../Hooks/useData';
import renderPagination from '../../utils/Pagination/renderPagination';
import handlePageChange from '../../utils/handlePageChange';
import LoadingError from '../../components/comon/LoadingError';
import styles from './Project.module.css';

const Projects = () => {
  const collectionName = 'projects';
  const { data, loading, error } = useData(collectionName);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const handlePageChangeWrapper = (page) => handlePageChange(page, setCurrentPage);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = data.slice(startIndex, startIndex + pageSize);

  return (
    <div id="main">
      <LoadingError loading={loading} error={error} /> 
      {!loading && !error && (
        <div>
          {renderPagination(data.length, pageSize, currentPage, handlePageChangeWrapper, styles.paginationContainer)}
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
          {renderPagination(data.length, pageSize, currentPage, handlePageChangeWrapper, styles.paginationContainer)}
        </div>
      )}
    </div>
  );
};

export default Projects;
