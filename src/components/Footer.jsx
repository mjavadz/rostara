import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Dna, Activity } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-seed-forestDeep text-seed-snow border-t border-seed-forest/40 pt-16 pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                    {/* Brand column */}
                    <div className="md:col-span-6 space-y-4">
                        <Link to="/" className="inline-flex items-center gap-2.5 group">
                            <div className="w-8 h-8 flex items-center justify-center">
                                <img src="/logo.svg" alt="Rostara Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-display font-black text-seed-snow tracking-tight">
                                رُستارا
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-seed-lime" />
                        </Link>
                        
                        <p className="text-seed-snow/70 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
                            پلتفرم جامع سبک زندگی سالم، باغبانی علمی شهری و سوپرفودهای فعال زیستی. بازتولید رابطه انسان مدرن با زیست‌شناسی پاک خاک و گیاه.
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-seed-snow/60 pt-2 font-mono">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-seed-lime" />
                                بذرهای ۱۰۰٪ دیم غیرتراریخته
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-seed-lime" />
                                بدون آفت‌کش و نگهدارنده شیمیایی
                            </span>
                        </div>
                    </div>

                    {/* Scientific Navigation Links */}
                    <div className="md:col-span-3">
                        <h4 className="font-mono text-xs font-bold text-seed-lime uppercase tracking-widest mb-4">
                            [ اکوسیستم زیستی ]
                        </h4>
                        <ul className="space-y-2.5 text-xs font-medium text-seed-snow/70">
                            <li><Link to="/products" className="hover:text-seed-snow transition-colors">میکروگرین‌های تازه</Link></li>
                            <li><Link to="/products" className="hover:text-seed-snow transition-colors">کیت‌های کشت خانگی ۷ روزه</Link></li>
                            <li><Link to="/products" className="hover:text-seed-snow transition-colors">خوراک‌های تخمیری زنده</Link></li>
                            <li><Link to="/method" className="hover:text-seed-snow transition-colors">متدولوژی و راهنمای کشت</Link></li>
                            <li><Link to="/track" className="hover:text-seed-snow transition-colors">رهگیری مرسولات ارگانیک</Link></li>
                        </ul>
                    </div>

                    {/* About & Foundation */}
                    <div className="md:col-span-3">
                        <h4 className="font-mono text-xs font-bold text-seed-lime uppercase tracking-widest mb-4">
                            [ منشور و ارتباط ]
                        </h4>
                        <ul className="space-y-2.5 text-xs font-medium text-seed-snow/70">
                            <li><Link to="/about" className="hover:text-seed-snow transition-colors">درباره رُستارا و چشم‌انداز</Link></li>
                            <li><Link to="/club" className="hover:text-seed-snow transition-colors">باشگاه تندرستی و امتیازات</Link></li>
                            <li><Link to="/contact" className="hover:text-seed-snow transition-colors">ارتباط با کارشناسان کشت</Link></li>
                            <li><Link to="/admin" className="hover:text-seed-snow transition-colors">ورود مدیریت فروشگاه</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-seed-snow/50 font-mono">
                    <p>© ۱۴۰۵ رُستارا. تمامی حقوق محفوظ است.</p>
                    <p className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-seed-lime animate-pulse" />
                        طراحی شده با استاندارد بیولوژیک و کشاورزی پایدار • rostara.ir
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
