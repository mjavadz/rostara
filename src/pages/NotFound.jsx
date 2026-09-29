import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft } from 'lucide-react';
import { GridBackground } from '@/components/backgrounds/grid';
import { TaxonomyTag } from '@/components/ui/TaxonomyTag';

const NotFound = () => {
    const { i18n } = useTranslation();
    const isEn = i18n.language === 'en';

    return (
        <div className="relative min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 transition-colors duration-300 overflow-hidden">
            <GridBackground size={48} className="opacity-40 dark:opacity-20" />

            <div className="relative text-center max-w-md p-8 rounded-3xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 shadow-md">
                <div className="mb-2">
                    <TaxonomyTag variant="lime">
                        {isEn ? 'Error 404 • Page Not Indexed' : 'خطای ۴۰۴: صفحه یافت نشد'}
                    </TaxonomyTag>
                </div>
                <h1 className="text-8xl font-mono font-black text-seed-forest dark:text-seed-lime mb-2 tracking-tight">
                    {isEn ? '404' : '۴۰۴'}
                </h1>
                <h2 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-3">
                    {isEn ? 'Biological Pathway Not Found' : 'صفحه مورد نظر در کاتالوگ یافت نشد'}
                </h2>
                <p className="text-xs text-seed-pewter dark:text-seed-snow/70 mb-8 leading-relaxed font-normal">
                    {isEn 
                        ? 'The requested destination is not cataloged in the Rostara ecosystem or has been relocated to another bio-node.'
                        : 'نشانی وارد شده در زیست‌بوم رُستارا ثبت نشده یا به بخش دیگری منتقل شده است.'}
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full text-xs font-bold hover:opacity-95 transition-all shadow-md"
                >
                    <Home className="w-4 h-4" />
                    <span>{isEn ? 'Return to Rostara Home' : 'بازگشت به صفحه اصلی رُستارا'}</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
