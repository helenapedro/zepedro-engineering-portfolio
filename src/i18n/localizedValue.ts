import { DEFAULT_LANGUAGE, normalizeLanguage, type SupportedLanguage } from "./routes";

type LocalizedMap<T> = Partial<Record<SupportedLanguage, T>> & Record<string, T | undefined>;

export const getLocalizedValue = <T>(
  value: T | LocalizedMap<T> | undefined | null,
  language: string,
  fallbackLanguage: SupportedLanguage = DEFAULT_LANGUAGE
): T | "" => {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value as T;
  if (typeof value !== "object") return value as T;

  const localized = value as LocalizedMap<T>;
  const lang = normalizeLanguage(language);
  return (
    localized[lang] ??
    localized[fallbackLanguage] ??
    Object.values(localized).find((item) => item !== undefined) ??
    ""
  );
};

export const localizeActivity = (activity: any, language: string): any => {
  if (typeof activity === "string") return activity;
  if (!activity || typeof activity !== "object") return activity;

  return {
    ...activity,
    header: getLocalizedValue(activity.header, language),
    items: Array.isArray(activity.items)
      ? activity.items.map((item: any) => getLocalizedValue(item, language))
      : [],
  };
};

export const localizeProject = <T extends Record<string, any>>(project: T, language: string): T => ({
  ...project,
  title: getLocalizedValue(project.title, language),
  organization: getLocalizedValue(project.organization, language),
  location: getLocalizedValue(project.location, language),
  placeandyear: getLocalizedValue(project.placeandyear, language),
  description: getLocalizedValue(project.description, language),
  finalDescription: getLocalizedValue(project.finalDescription, language),
  activities: Array.isArray(project.activities)
    ? project.activities.map((activity: any) => localizeActivity(activity, language))
    : project.activities,
  period: project.period
    ? {
        ...project.period,
        label: getLocalizedValue(project.period.label, language),
      }
    : project.period,
});

export const localizeCategory = <T extends Record<string, any>>(category: T, language: string): T => ({
  ...category,
  name: getLocalizedValue(category.name, language),
});

export const localizeOwner = <T extends Record<string, any>>(owner: T, language: string): T => ({
  ...owner,
  name: getLocalizedValue(owner.name, language),
  headline: getLocalizedValue(owner.headline, language),
  homeSummary: getLocalizedValue(owner.homeSummary, language),
});
