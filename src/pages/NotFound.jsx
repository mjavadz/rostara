import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { GridBackground } from '@/components/backgrounds/grid';

const NotFound = () => {
    return (
        <div className="relative min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 transition-colors duration-300 overflow-hidden">
            <GridBackground size={48} className="opacity-40 dark:opacity-20" />

            <div className="relative text-center max-w-md p-8 rounded-3xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 shadow-md">
                <span className="font-mono text-xs text-seed-pewter dark:text-seed-snow/50 block mb-2">
                    [ERROR: 404_PAGE_NOT_INDEXED]
                </span>
                <h1 className="text-8xl font-mono font-black text-seed-forest dark:text-seed-lime mb-2 tracking-tight">
                    ۴۰۴
                </h1>
                <h2 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-3">
                    صفحه مورد نظر در کاتالوگ یافت نشد
                </h2>
                <p className="text-xs text-seed-pewter dark:text-seed-snow/70 mb-8 leading-relaxed">
                    نشانی وارد شده در زیست‌بوم رُستارا ثبت نشده یا به بخش دیگری منتقل شده است.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full text-xs font-bold hover:opacity-95 transition-all shadow-md"
                >
                    <Home className="w-4 h-4" />
                    <span>بازگشت به صفحه اصلی رُستارا</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
