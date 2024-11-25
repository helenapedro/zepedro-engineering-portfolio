import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          {renderPagination(
            data.length, 
            pageSize, 
            currentPage, 
            handlePageChangeWrapper, 
            styles.paginationContainer
          )}
          {paginatedProjects.map((project) => (
            <div key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <Project
                  title={project.title}
                  organization={project.organization}
                  placeandyear={project.placeandyear}
                  summaryHeader={project.summaryHeader}
                  activities={project.activities}
                  projectOutcome={project.projectOutcome}
                  images={project.images}
                />
              </Link>
              <br />
            </div>
          ))}
          {renderPagination(
            data.length, 
            pageSize, 
            currentPage, 
            handlePageChangeWrapper, 
            styles.paginationContainer
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
