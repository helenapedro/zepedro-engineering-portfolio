import React from 'react';
import { useParams } from 'react-router-dom';
import useData from '../pages/Hooks/useData';
import LoadingError from './comon/LoadingError';
import styles from '../pages/projects/Project.module.css';
import Project from '../pages/projects/Project';

const ProjectDetails = () => {
  const { id } = useParams(); 
  const { data, loading, error } = useData('projects', id);

  return (
    <div className={`${styles.project} ${styles.panel}`}>
      <LoadingError loading={loading} error={error} />
      {!loading && !error && data && (
        <Project
          title={data.title}
          organization={data.organization}
          placeandyear={data.placeandyear}
          summaryHeader={data.summaryHeader}
          activities={data.activities}
          projectOutcome={data.projectOutcome}
          images={data.images}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
