import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.documentElement.dir = lng === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.lang = lng;
    };

    return (
        <div className="flex items-center gap-2 text-sm font-medium">
            <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded transition-colors ${i18n.language === 'en' ? 'text-rostara-primary font-bold' : 'text-rostara-text/50 hover:text-rostara-primary'}`}
            >
                EN
            </button>
            <span className="text-rostara-text/30">|</span>
            <button
                onClick={() => changeLanguage('fa')}
                className={`px-2 py-1 rounded transition-colors font-vazir ${i18n.language === 'fa' ? 'text-rostara-primary font-bold' : 'text-rostara-text/50 hover:text-rostara-primary'}`}
            >
                فا
            </button>
        </div>
    );
};

export default LanguageSwitcher;
