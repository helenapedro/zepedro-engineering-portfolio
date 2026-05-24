import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useData from '../../Hooks/useData';
import LoadingError from '../comon/LoadingError';
import styles from '../../pages/projects/Project.module.css';
import ProjectDetails from './ProjectDetails';
import type { Project } from '../../types/index';
import { getLanguageFromPath } from '../../i18n/routes';
import { localizeProject } from '../../i18n/localizedValue';

const ProjectCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const language = getLanguageFromPath(window.location.pathname);
  const { data, loading, error } = useData<Project>('projects', id);
  const project = data && !Array.isArray(data) ? localizeProject(data, language) : null;

  return (
    <div className={`${styles.project} ${styles.panel}`}>
      <LoadingError loading={loading} error={error} />
      {!loading && !error && project && (
        <ProjectDetails
          title={project.title}
          organization={project.organization}
          placeandyear={project.placeandyear}
          description={project.description}
          activities={project.activities}
          finalDescription={project.finalDescription}
          mainImageUrl={project.mainImageUrl}
          imageRefs={project.imageRefs}
        />
      )}
      {!loading && !error && !project && <p>{t("projects.notFound")}</p>}
    </div>
  );
};

export default ProjectCard;
