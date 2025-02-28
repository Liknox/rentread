import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import enTranslations from "./en/translation.json"
import uaTranslations from "./ua/translation.json"

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
      lng: "en",
      fallbackLng: "ua",
      interpolation: {
         escapeValue: false,
      },
   })

export default i18n
