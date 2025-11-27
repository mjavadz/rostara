import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-brown-900 text-brown-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-4">رُستارا</h3>
                        <p className="text-brown-300 text-sm leading-relaxed">
                            {t('footer.desc')}
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.explore')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="text-brown-300 hover:text-primary-400 transition-colors">{t('nav.about')}</Link></li>
                            <li><Link to="/method" className="text-brown-300 hover:text-primary-400 transition-colors">{t('nav.method')}</Link></li>
                            <li><Link to="/products" className="text-brown-300 hover:text-primary-400 transition-colors">{t('nav.products')}</Link></li>
                            <li><Link to="/experience" className="text-brown-300 hover:text-primary-400 transition-colors">{t('nav.experience')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.connect')}</h4>
                        <ul className="space-y-2 text-sm text-brown-300">
                            <li><Link to="/contact" className="hover:text-primary-400 transition-colors">{t('nav.contact')}</Link></li>
                            <li><Link to="/gallery" className="hover:text-primary-400 transition-colors">{t('nav.gallery')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-brown-800 text-center text-sm text-brown-400">
                    <p>{t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
