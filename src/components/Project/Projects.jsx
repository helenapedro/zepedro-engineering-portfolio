import React, { useEffect, useState } from 'react';
import ProjectComponent from './ProjectsComponent';
import Pagination from '../comon/Pagination';
import styles from './Projects.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
        console.log('Fetched projects data:', data);
        setProjects(data);
      })
      .catch((error) => console.error('Error fetching projects data:', error));
  }, []);

  const handlePageChange = (page) => {
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(projects.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = projects.slice(startIndex, startIndex + pageSize);

  return (
    <div id="main" className={styles.projectContainer}>
      <div>
        {paginatedProjects.map((project, index) => (
          <React.Fragment key={index}>
            <ProjectComponent
              title={project.title}
              organization={project.organization}
              description={project.description}
              activities={project.activities}
              finalDescription={project.finalDescription}
              images={project.images}
            />
            {index !== paginatedProjects.length - 1 && <br />} {/* Add <br /> between projects */}
          </React.Fragment>
        ))}
        <div className={styles.paginationContainer}>
          <Pagination
            itemsCount={projects.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        <a href="#main" className={`${styles.arrowIcon} solid fa-arrow-up`} onClick={handleScrollToTop}></a>
      </div>
    </div>
  );
};

export default Projects;
