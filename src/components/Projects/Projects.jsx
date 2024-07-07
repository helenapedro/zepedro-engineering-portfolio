import React, { useEffect, useState } from 'react';
import Project from './Project';
import PaginationComponent from '../comon/Pagination';
import styles from './Project.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 3;

  useEffect(() => {
    fetch('/data/projectsData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects data:', error);
        setLoading(false);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(projects.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = projects.slice(startIndex, startIndex + pageSize);

  if (loading) {
    return <div>Loading...</div>;
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
