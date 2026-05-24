import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useData from "../../Hooks/useData";
import { getLanguageFromPath, routePath } from "../../i18n/routes";
import { getLocalizedValue } from "../../i18n/localizedValue";
import mainStyles from "../../components/Main.module.css";
import styles from "./ProjectMap.module.css";

const ANGOLA_BOUNDS = {
  north: -4.25,
  south: -18.1,
  west: 11.3,
  east: 24.2,
};

const toNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeCoordinates = (value) => {
  if (!value || typeof value !== "object") return null;

  const lat = toNumber(value.lat ?? value.latitude);
  const lng = toNumber(value.lng ?? value.lon ?? value.long ?? value.longitude);

  if (lat === null || lng === null) return null;
  return { lat, lng };
};

const parseLocationText = (locationText = "") => {
  const parts = String(locationText)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    municipality: parts[0] || "",
    province: parts.length > 1 ? parts[1] : parts[0] || "",
    country: parts[parts.length - 1] || "",
  };
};

const resolveLocation = (project, language) => {
  const rawLocation = project.location;
  const locationObject = rawLocation && typeof rawLocation === "object" && !Array.isArray(rawLocation)
    ? rawLocation
    : null;
  const localizedText = locationObject
    ? getLocalizedValue(locationObject.label ?? locationObject.name ?? "", language)
    : getLocalizedValue(rawLocation, language);
  const parsed = parseLocationText(localizedText);

  const coordinates = normalizeCoordinates(
    locationObject?.coordinates ??
    locationObject?.geo ??
    project.coordinates ??
    project.geo
  );

  return {
    text: localizedText || "",
    municipality: getLocalizedValue(locationObject?.municipality, language) || parsed.municipality,
    province: getLocalizedValue(locationObject?.province, language) || parsed.province,
    country: getLocalizedValue(locationObject?.country, language) || parsed.country,
    coordinates,
  };
};

const getMarkerPosition = ({ lat, lng }) => {
  const left = ((lng - ANGOLA_BOUNDS.west) / (ANGOLA_BOUNDS.east - ANGOLA_BOUNDS.west)) * 100;
  const top = ((ANGOLA_BOUNDS.north - lat) / (ANGOLA_BOUNDS.north - ANGOLA_BOUNDS.south)) * 100;

  return {
    left: `${Math.min(96, Math.max(4, left))}%`,
    top: `${Math.min(96, Math.max(4, top))}%`,
  };
};

const ProjectMap = () => {
  const { t } = useTranslation();
  const language = getLanguageFromPath(window.location.pathname);
  const { data, loading, error } = useData("projects");

  const projects = useMemo(() => {
    const records = Array.isArray(data) ? data : [];

    return records
      .filter((project) => project.isVisible !== false)
      .map((project) => {
        const location = resolveLocation(project, language);
        return {
          id: project.id,
          title: getLocalizedValue(project.title, language),
          location,
        };
      })
      .sort((a, b) => String(a.title).localeCompare(String(b.title)));
  }, [data, language]);

  const mappedProjects = projects.filter((project) => project.location.coordinates);
  const pendingProjects = projects.filter((project) => !project.location.coordinates);

  if (loading) return <p>{t("common.loading")}</p>;
  if (error) return <p>{t("common.error")}: {error.message}</p>;

  return (
    <section className={`${mainStyles.panel} ${styles.panel}`} aria-labelledby="project-map-title">
      <header className={styles.header}>
        <h1 id="project-map-title" className={styles.title}>{t("map.title")}</h1>
        <p className={styles.subtitle}>{t("map.subtitle")}</p>
        <div className={styles.summary} aria-label={t("map.mapLabel")}>
          <span className={styles.summaryBadge}>{t("map.readyCount", { count: mappedProjects.length })}</span>
          <span className={styles.summaryBadge}>{t("map.pendingCount", { count: pendingProjects.length })}</span>
        </div>
      </header>

      <div className={styles.mapLayout}>
        <div className={styles.mapSurface} role="img" aria-label={t("map.mapLabel")}>
          <div className={styles.mapGrid} aria-hidden="true" />
          <div className={styles.angolaShape} aria-hidden="true">
            <svg viewBox="0 0 320 420" focusable="false">
              <path
                d="M92 24 227 30 236 86 284 88 278 159 250 184 260 268 221 318 212 389 139 397 119 341 80 314 94 256 54 215 77 164 63 99Z"
                fill="rgba(31, 95, 255, 0.10)"
                stroke="#7b93bd"
                strokeWidth="3"
              />
            </svg>
          </div>

          {mappedProjects.length ? (
            mappedProjects.map((project, index) => (
              <Link
                key={project.id}
                to={routePath("projects", language, { id: project.id })}
                className={styles.marker}
                style={getMarkerPosition(project.location.coordinates)}
                aria-label={`${project.title}: ${project.location.text}`}
                title={`${project.title} - ${project.location.text}`}
              >
                {index + 1}
              </Link>
            ))
          ) : (
            <div className={styles.emptyMapState}>
              <p>{t("map.pendingText")}</p>
            </div>
          )}
        </div>

        <aside className={styles.sidePanel}>
          <h2>{t("map.pendingTitle")}</h2>
          <p>{t("map.pendingText")}</p>
          <ul className={styles.pendingList}>
            {pendingProjects.map((project) => (
              <li key={project.id} className={styles.pendingItem}>
                <strong className={styles.projectTitle}>{project.title}</strong>
                <span className={styles.projectMeta}>
                  {project.location.text || t("map.unknownLocation")} · {t("map.noCoordinates")}
                </span>
                <Link to={routePath("projects", language, { id: project.id })} className={styles.projectLink}>
                  {t("map.openProject")}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default ProjectMap;
