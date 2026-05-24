import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resources from "./resources";
import { DEFAULT_LANGUAGE, normalizeLanguage, SUPPORTED_LANGUAGES } from "./routes";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
      convertDetectedLanguage: normalizeLanguage,
    },
  });

export default i18n;
