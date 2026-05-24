import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useData from '../../Hooks/useData';
import LoadingError from '../comon/LoadingError';
import styles from '../../pages/projects/Project.module.css';
import ProjectDetails from './ProjectDetails';
import type { Project } from '../../types/index';
import { getLanguageFromPath } from '../../i18n/routes';
import { localizeProject } from '../../i18n/localizedValue';

type NormalizedProject = Project & {
  location?: string;
  context?: string;
  projectOutcome?: string;
  responsibilities?: string[];
  results?: string[];
  period?: {
    label?: string;
  };
  media?: {
    mainImage?: string;
    images?: string[];
  };
};

const ProjectCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const language = getLanguageFromPath(window.location.pathname);
  const { data, loading, error } = useData<Project>('projects', id);
  const project = data && !Array.isArray(data) ? localizeProject(data as NormalizedProject, language) : null;
  const detailProject = project
    ? {
        title: project.title,
        organization: project.organization,
        placeandyear:
          project.placeandyear ||
          [project.location, project.period?.label].filter(Boolean).join(" | "),
        description: project.description || project.context || "",
        activities:
          project.activities ||
          [
            ...(Array.isArray(project.responsibilities) ? project.responsibilities : []),
            ...(Array.isArray(project.results) ? project.results : []),
          ],
        finalDescription: project.finalDescription || project.projectOutcome || "",
        mainImageUrl: project.mainImageUrl || project.media?.mainImage || "",
        imageRefs: project.imageRefs || project.media?.images || [],
      }
    : null;

  return (
    <div className={`${styles.project} ${styles.panel}`}>
      <LoadingError loading={loading} error={error} />
      {!loading && !error && detailProject && (
        <ProjectDetails
          title={detailProject.title}
          organization={detailProject.organization}
          placeandyear={detailProject.placeandyear}
          description={detailProject.description}
          activities={detailProject.activities}
          finalDescription={detailProject.finalDescription}
          mainImageUrl={detailProject.mainImageUrl}
          imageRefs={detailProject.imageRefs}
        />
      )}
      {!loading && !error && !detailProject && <p>{t("projects.notFound")}</p>}
    </div>
  );
};

export default ProjectCard;
