import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Home } from 'lucide-react';
import { ShineButton } from '@/components/animations/shine-button';

const CheckEmail = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 py-20 transition-colors duration-300">
            <div className="max-w-md w-full text-center p-8 bg-seed-snow dark:bg-[#132412] rounded-3xl border border-seed-forest/10 dark:border-white/10 shadow-md">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-seed-stone dark:bg-white/5 rounded-full mb-6 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10 shadow-sm animate-pulse">
                    <Mail className="w-8 h-8" />
                </div>

                <span className="text-[11px] font-bold text-seed-pewter dark:text-seed-snow/50 block mb-1">
                    [تایید نشانی ایمیل]
                </span>
                <h1 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-3">
                    ایمیل فعال‌سازی حساب ارسال شد
                </h1>

                <p className="text-xs text-seed-pewter dark:text-seed-snow/75 mb-6 leading-relaxed">
                    یک پیوند تایید برای شما فرستاده شد. لطفاً صندوق ورودی خود را بررسی کرده و روی پیوند تایید کلیک فرمایید.
                </p>

                <div className="p-4 rounded-2xl bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 text-xs text-seed-pewter dark:text-seed-snow/70 text-start space-y-2 mb-6 leading-relaxed">
                    <p>• در صورت عدم مشاهده، پوشه هرزنامه (Spam) یا تبلیغات را بررسی کنید.</p>
                    <p>• پس از تایید، به تمامی امکانات باشگاه و سفارشات دسترسی خواهید داشت.</p>
                </div>

                <Link to="/">
                    <ShineButton className="w-full py-3 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95">
                        <Home className="w-4 h-4" />
                        <span>بازگشت به صفحه اصلی رُستارا</span>
                    </ShineButton>
                </Link>
            </div>
        </div>
    );
};

export default CheckEmail;
