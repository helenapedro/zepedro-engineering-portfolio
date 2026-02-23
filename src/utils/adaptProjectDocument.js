const asArray = (value) => (Array.isArray(value) ? value : []);

const buildPlaceAndYear = (project) => {
  if (project.placeandyear) return project.placeandyear;

  const location = typeof project.location === "string" ? project.location.trim() : "";
  const periodLabel =
    project.period && typeof project.period.label === "string"
      ? project.period.label.trim()
      : "";

  if (location && periodLabel) return `${location} ~ ${periodLabel}`;
  return location || periodLabel || "";
};

const buildActivities = (project) => {
  if (Array.isArray(project.activities)) return project.activities;

  const responsibilities = asArray(project.responsibilities).filter(
    (item) => typeof item === "string" && item.trim()
  );
  const results = asArray(project.results).filter(
    (item) => typeof item === "string" && item.trim()
  );

  return [...responsibilities, ...results];
};

const buildImageRefs = (project) => {
  if (Array.isArray(project.imageRefs)) return project.imageRefs;
  return asArray(project.media?.images);
};

const buildMainImage = (project, imageRefs) => {
  if (typeof project.mainImageUrl === "string" && project.mainImageUrl.trim()) {
    return project.mainImageUrl;
  }

  if (typeof project.media?.mainImage === "string" && project.media.mainImage.trim()) {
    return project.media.mainImage;
  }

  return imageRefs[0] || "";
};

const buildDescription = (project) => {
  if (typeof project.description === "string" && project.description.trim()) {
    return project.description;
  }
  return typeof project.context === "string" ? project.context : "";
};

const buildFinalDescription = (project) => {
  if (typeof project.finalDescription === "string" && project.finalDescription.trim()) {
    return project.finalDescription;
  }
  return typeof project.projectOutcome === "string" ? project.projectOutcome : "";
};

const buildEndYear = (project) => {
  if (project.endYear !== undefined && project.endYear !== null) return project.endYear;
  if (project.period && project.period.endYear !== undefined) return project.period.endYear;
  return null;
};

export const adaptProjectDocument = (project) => {
  if (!project || typeof project !== "object") return project;

  const imageRefs = buildImageRefs(project);
  const imageThumbRefs = Array.isArray(project.imageThumbRefs)
    ? project.imageThumbRefs
    : asArray(project.media?.thumbnails);

  return {
    ...project,
    placeandyear: buildPlaceAndYear(project),
    description: buildDescription(project),
    activities: buildActivities(project),
    finalDescription: buildFinalDescription(project),
    imageRefs,
    imageThumbRefs,
    mainImageUrl: buildMainImage(project, imageRefs),
    endYear: buildEndYear(project),
  };
};

