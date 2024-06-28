import React, { useEffect, useState } from 'react';
import Project from './project';

const Projects = () => {
  const [projects, setProjects] = useState([]);

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

  return (
    <div id='main'>
      <div>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <Project
              key={index}
              title={project.title}
              organization={project.organization}
              description={project.description}
              activities={project.activities}
              finalDescription={project.finalDescription}
              images={project.images}
            />
          ))
        ) : (
          <p>Loading projects...</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
