import { DEFAULT_LANGUAGE, normalizeLanguage, type SupportedLanguage } from "./routes";
import { translateFirestoreString } from "./firestoreFallbacks";

type LocalizedMap<T> = Partial<Record<SupportedLanguage, T>> & Record<string, T | undefined>;

export const getLocalizedValue = <T>(
  value: T | LocalizedMap<T> | undefined | null,
  language: string,
  fallbackLanguage: SupportedLanguage = DEFAULT_LANGUAGE
): T | "" => {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value as T;
  if (typeof value === "string") return translateFirestoreString(value, language) as T;
  if (typeof value !== "object") return value as T;

  const localized = value as LocalizedMap<T>;
  if (!("en" in localized) && !("pt" in localized)) return value as T;

  const lang = normalizeLanguage(language);
  return (
    localized[lang] ??
    localized[fallbackLanguage] ??
    Object.values(localized).find((item) => item !== undefined) ??
    ""
  );
};

export const localizeActivity = (activity: any, language: string): any => {
  if (typeof activity === "string") return translateFirestoreString(activity, language);
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
  context: getLocalizedValue(project.context, language),
  finalDescription: getLocalizedValue(project.finalDescription, language),
  projectOutcome: getLocalizedValue(project.projectOutcome, language),
  activities: Array.isArray(project.activities)
    ? project.activities.map((activity: any) => localizeActivity(activity, language))
    : project.activities,
  responsibilities: Array.isArray(project.responsibilities)
    ? project.responsibilities.map((item: any) => getLocalizedValue(item, language))
    : project.responsibilities,
  results: Array.isArray(project.results)
    ? project.results.map((item: any) => getLocalizedValue(item, language))
    : project.results,
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

export const localizeRecord = <T extends Record<string, any>>(record: T, language: string): T => {
  const localizedEntries = Object.entries(record).map(([key, value]) => {
    if (Array.isArray(value)) {
      return [
        key,
        value.map((item) =>
          typeof item === "string" || (item && typeof item === "object")
            ? getLocalizedValue(item as any, language)
            : item
        ),
      ];
    }

    if (typeof value === "string" || (value && typeof value === "object")) {
      return [key, getLocalizedValue(value as any, language)];
    }

    return [key, value];
  });

  return Object.fromEntries(localizedEntries) as T;
};
