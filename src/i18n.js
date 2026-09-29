import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import fa from './locales/fa.json';

const savedLng = typeof window !== 'undefined' ? (localStorage.getItem('i18nextLng') || 'fa') : 'fa';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fa: { translation: fa }
        },
        lng: savedLng,
        fallbackLng: 'fa',
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'i18nextLng',
            caches: ['localStorage']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
