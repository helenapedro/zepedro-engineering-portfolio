import React, { useEffect, useState } from 'react';
import Project from './project';
import Pagination from './comon/Pagination';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Number of projects per page

  useEffect(() => {
    fetch('/data/projectsData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects data:', error));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the projects to display for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = projects.slice(startIndex, startIndex + pageSize);

  return (
    <div id="main">
      <div>
        {projects.length > 0 ? (
          <>
            {paginatedProjects.map((project, index) => (
              <Project
                key={index}
                title={project.title}
                organization={project.organization}
                description={project.description}
                activities={project.activities}
                finalDescription={project.finalDescription}
                images={project.images}
              />
            ))}
            <Pagination
              itemsCount={projects.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <a href="#main" className="arrow icon solid fa-arrow-up"></a> 
          </>
        ) : (
          <p>Loading projects...</p>
        )}
      </div>
    </div>
  );
};

export default Projects;