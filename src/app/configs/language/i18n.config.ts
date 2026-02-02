import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import enTranslations from "../../providers/locales/en/translation.json"
import uaTranslations from "../../providers/locales/ua/translation.json"

export const savedLanguage = localStorage.getItem("i18nextLng") || "en"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ua: {
        translation: uaTranslations,
      },
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
