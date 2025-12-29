// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEnglish from "./locales/en/translation.json";
import translationRussian from "./locales/ru/translation.json";
import translationTajik from "./locales/tj/translation.json";

const resources = {
  en: {
    translation: {},
  },
  ru: {
    translation: {},
  },
  tj: {
    translation: {},
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
