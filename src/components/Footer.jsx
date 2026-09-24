import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-primary-950 text-cream border-t border-primary-900/60 pt-16 pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                    {/* Brand column */}
                    <div className="md:col-span-6 space-y-4">
                        <Link to="/" className="inline-flex items-center gap-3 group">
                            <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                                <img src="/logo.svg" alt="Rostara Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-display font-extrabold text-white tracking-tight">
                                رُستارا
                            </span>
                        </Link>
                        <p className="text-primary-200/80 text-sm leading-relaxed max-w-md">
                            {t('footer.desc')}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-primary-300/70 pt-2">
                            <span className="flex items-center gap-1.5">
                                <Sprout className="w-4 h-4 text-primary-400" />
                                بذرها ۱۰۰٪ غیرتراریخته
                            </span>
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-primary-400" />
                                بدون مواد شیمیایی
                            </span>
                        </div>
                    </div>

                    {/* Navigation links */}
                    <div className="md:col-span-3">
                        <h4 className="font-display font-bold text-white text-base mb-4 tracking-wide">
                            {t('footer.explore')}
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/products" className="text-primary-200/70 hover:text-white transition-colors">{t('nav.products')}</Link></li>
                            <li><Link to="/method" className="text-primary-200/70 hover:text-white transition-colors">{t('nav.method')}</Link></li>
                            <li><Link to="/track" className="text-primary-200/70 hover:text-white transition-colors">پیگیری سفارش</Link></li>
                            <li><Link to="/experience" className="text-primary-200/70 hover:text-white transition-colors">{t('nav.experience')}</Link></li>
                            <li><Link to="/gallery" className="text-primary-200/70 hover:text-white transition-colors">{t('nav.gallery')}</Link></li>
                        </ul>
                    </div>

                    {/* About & Club */}
                    <div className="md:col-span-3">
                        <h4 className="font-display font-bold text-white text-base mb-4 tracking-wide">
                            همراهی
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/about" className="text-primary-200/70 hover:text-white transition-colors">{t('nav.about')}</Link></li>
                            <li><Link to="/club" className="text-primary-200/70 hover:text-white transition-colors">{t('nav.club')}</Link></li>
                            <li><Link to="/contact" className="text-primary-200/70 hover:text-white transition-colors">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-primary-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-400/80">
                    <p>{t('footer.rights')}</p>
                    <p className="flex items-center gap-1">
                        رویشِ آراسته‌ی طبیعی • طراحی شده با الهام از طبیعت و سلامت پایدار
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
