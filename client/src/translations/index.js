import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUs from './en-US.json';
import esEs from './es-ES.json';
import fiFi from './fi-FI.json';

export const FALLBACK_LANG = 'en-US';

const resources = {
  'en-US': { translation: enUs },
  'es-ES': { translation: esEs },
  'fi-FI': { translation: fiFi },
};

export const getLanguages = () => [
  { id: 'en-US', name: 'English' },
  { id: 'es-ES', name: 'Spanish' },
  { id: 'fi-FI', name: 'Suomi' },
];

export function initializeTranslations() {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      detection: {
        // do not persist anything on browser
        caches: [],
      },
      fallbackLng: FALLBACK_LANG,
      resources,
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
