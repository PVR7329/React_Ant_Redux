import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsen from '../language/translationsEn.json'
import translationsguj from '../language/translationsGuj.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationsen },
      gn: {translation: translationsguj}
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });