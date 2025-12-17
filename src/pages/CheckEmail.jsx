import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Home } from 'lucide-react';

const CheckEmail = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 py-20 transition-colors duration-300">
            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6 animate-bounce">
                    <Mail className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>

                <h1 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-4">
                    {t('auth.checkEmail.title')}
                </h1>

                <p className="text-brown-600 dark:text-brown-300 mb-8 text-lg">
                    {t('auth.checkEmail.subtitle')}
                </p>

                <div className="space-y-4">
                    <p className="text-sm text-brown-500 dark:text-brown-400 bg-white dark:bg-brown-900 p-4 rounded-xl border border-brown-100 dark:border-brown-800">
                        {t('auth.checkEmail.spamNote')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            <span>{t('auth.checkEmail.backHome')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;
