import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useData from "../../Hooks/useData";
import { getLanguageFromPath, routePath } from "../../i18n/routes";
import { getLocalizedValue } from "../../i18n/localizedValue";
import mainStyles from "../../components/Main.module.css";
import styles from "./ProjectMap.module.css";

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

const ProjectMap = () => {
  const { t } = useTranslation();
  const language = getLanguageFromPath(window.location.pathname);
  const { data, loading, error } = useData("projects");
  const mapElementRef = useRef(null);
  const mapInstanceRef = useRef(null);

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

  useEffect(() => {
    if (!mapElementRef.current || !mappedProjects.length) return undefined;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapElementRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([-11.2, 17.8], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;
    const markerLayer = L.layerGroup().addTo(map);
    const bounds = [];

    mappedProjects.forEach((project, index) => {
      const { lat, lng } = project.location.coordinates;
      bounds.push([lat, lng]);

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: styles.leafletMarker,
          html: `<span>${index + 1}</span>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        }),
      }).addTo(markerLayer);

      marker.bindPopup(`
        <strong>${project.title}</strong>
        <br />
        <span>${project.location.text || t("map.unknownLocation")}</span>
      `);
    });

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [36, 36], maxZoom: 9 });
    }

    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      markerLayer.remove();
    };
  }, [mappedProjects, t]);

  useEffect(() => () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  }, []);

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
        <div className={styles.mapSurface} aria-label={t("map.mapLabel")}>
          {mappedProjects.length ? (
            <div ref={mapElementRef} className={styles.leafletMap} />
          ) : (
            <div className={styles.emptyMapState}>
              <p>{t("map.pendingText")}</p>
            </div>
          )}
        </div>

        <aside className={styles.sidePanel}>
          {mappedProjects.length > 0 && (
            <>
              <h2>{t("map.mappedTitle")}</h2>
              <ul className={styles.pendingList}>
                {mappedProjects.map((project, index) => (
                  <li key={project.id} className={styles.pendingItem}>
                    <strong className={styles.projectTitle}>{index + 1}. {project.title}</strong>
                    <span className={styles.projectMeta}>
                      {project.location.text || t("map.unknownLocation")}
                    </span>
                    <Link to={routePath("projects", language, { id: project.id })} className={styles.projectLink}>
                      {t("map.openProject")}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <h2>{t("map.pendingTitle")}</h2>
          <p>{t("map.pendingText")}</p>
          <ul className={styles.pendingList}>
            {pendingProjects.map((project) => (
              <li key={project.id} className={styles.pendingItem}>
                <strong className={styles.projectTitle}>{project.title}</strong>
                <span className={styles.projectMeta}>
                  {project.location.text || t("map.unknownLocation")} - {t("map.noCoordinates")}
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
