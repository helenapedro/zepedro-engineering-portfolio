import { useParams } from 'react-router-dom';
import styles from '../../pages/projects/Project.module.css';
import ProjectDetails from './ProjectDetails';
import useData from '../../Hooks/useData';
import LoadingError from './../comon/LoadingError';

const ProjectDetailsCard = () => {
  const { id } = useParams();
  const { data, loading, error } = useData('projects', id);

  return (
    <div className={`${styles.project} ${styles.panel}`}>
      <LoadingError loading={loading} error={error} />
      {!loading && !error && data && (
        <ProjectDetails
          title={data.title}
          organization={data.organization}
          placeandyear={data.placeandyear}
          description={data.description}
          activities={data.activities}
          finalDescription={data.finalDescription}
          imageRefs={data.imageRefs}
        />
      )}
    </div>
  );
};

export default ProjectDetailsCard;
