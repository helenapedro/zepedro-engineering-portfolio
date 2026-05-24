export const SUPPORTED_LANGUAGES = ["en", "pt"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const localizedSegments = {
  en: {
    home: "",
    projects: "projects",
    map: "map",
    education: "education",
    about: "about",
  },
  pt: {
    home: "",
    projects: "projetos",
    map: "mapa",
    education: "formacao",
    about: "sobre",
  },
};

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export const isSupportedLanguage = (value?: string): value is SupportedLanguage =>
  SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);

export const normalizeLanguage = (value?: string): SupportedLanguage => {
  const lang = value?.split("-")[0]?.toLowerCase();
  return isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
};

export const getLanguageFromPath = (pathname: string): SupportedLanguage => {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isSupportedLanguage(segment) ? segment : DEFAULT_LANGUAGE;
};

const prefix = (lang: SupportedLanguage) => (lang === DEFAULT_LANGUAGE ? "" : `/${lang}`);

export const routePath = (
  key: keyof typeof localizedSegments.en,
  lang: SupportedLanguage,
  params: { id?: string } = {}
) => {
  const segment = localizedSegments[lang][key];
  const base = `${prefix(lang)}${segment ? `/${segment}` : ""}` || "/";
  if (key === "projects" && params.id) return `${base}/${params.id}`;
  return base;
};

export const translatePath = (pathname: string, nextLanguage: SupportedLanguage) => {
  const parts = pathname.split("/").filter(Boolean);
  const currentLanguage = isSupportedLanguage(parts[0]) ? (parts.shift() as SupportedLanguage) : DEFAULT_LANGUAGE;
  const [section, id] = parts;
  const currentRoutes = localizedSegments[currentLanguage];
  const routeKey =
    (Object.keys(currentRoutes) as Array<keyof typeof currentRoutes>).find(
      (key) => currentRoutes[key] === (section || "")
    ) || "home";

  return routePath(routeKey, nextLanguage, id ? { id } : {});
};
