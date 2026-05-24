import { useParams } from 'react-router-dom';
import useData from '../../Hooks/useData';
import LoadingError from '../comon/LoadingError';
import styles from '../../pages/projects/Project.module.css';
import ProjectDetails from './ProjectDetails';
import type { Project } from '../../types/index';

const ProjectCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useData<Project>('projects', id);

  return (
    <div className={`${styles.project} ${styles.panel}`}>
      <LoadingError loading={loading} error={error} />
      {!loading && !error && data && !Array.isArray(data) && (
        <ProjectDetails
          title={data.title}
          organization={data.organization}
          placeandyear={data.placeandyear}
          description={data.description}
          activities={data.activities}
          finalDescription={data.finalDescription}
          mainImageUrl={data.mainImageUrl}
          imageRefs={data.imageRefs}
        />
      )}
      {!loading && !error && !data && <p>Project not found.</p>}
    </div>
  );
};

export default ProjectCard;
