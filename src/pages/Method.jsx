import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Sun, Droplets, Wind, ShieldCheck, Clock, Scissors, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Method = () => {
    const { t } = useTranslation();

    const principles = [
        {
            icon: Sprout,
            title: 'بذور اصیل غیرتراریخته',
            description: 'استفاده از بذرهای خالص با خلوص بالای ۹۹٪ و عدم استفاده از بذور آغشته به قارچ‌کش‌ها.',
        },
        {
            icon: Droplets,
            title: 'آب پاک و مه‌پاشی ملایم',
            description: 'آبیاری با قطرات ریز و بدون کلر، برای حفظ یکنواختی رطوبت بدون غرقاب شدن ریشه‌ها.',
        },
        {
            icon: Sun,
            title: 'نور طبیعی و فوتوسنتز',
            description: 'بهره‌گیری از نور غیرمستقیم پنجره یا نورهای ال‌ای‌دی رشد (Grow Light) بدون حرارت مضر.',
        },
        {
            icon: Wind,
            title: 'گردش هوای بهداشتی',
            description: 'جلوگیری از تجمع کپک با تهویه آرام محیط در تمام دوران رشد آپارتمانی.',
        },
    ];

    const steps = [
        {
            step: '۱',
            title: 'آماده‌سازی بستر و خیساندن',
            desc: 'پد سلولزی یا لایه نازکی از کوکوپیت را مرطوب کنید. بذرهای درشت‌تر (مانند نخود و آفتابگردان) را چند ساعت در آب زلال بخیسانید.'
        },
        {
            step: '۲',
            title: 'پاشش یکنواخت و دوره تاریکی (Blackout)',
            desc: 'بذرها را متراکم و بدون همپوشانی پخش کنید. برای ۳ تا ۴ روز اول سینی را در تاریکی کامل بگذارید تا ساقه‌های اولیه بلند و قوی شوند.'
        },
        {
            step: '۳',
            title: 'انتقال به نور و آغاز فتوسنتز',
            desc: 'سینی را زیر نور ملایم قرار دهید. ظرف ۲۴ ساعت ساقه‌های زرد به برگ‌های سبز زمردی یا یاقوتی تبدیل شده و تولید کلروفیل اوج می‌گیرد.'
        },
        {
            step: '۴',
            title: 'برداشت تازه با قیچی و مصرف فوری',
            desc: 'در روز هفتم تا دهم، درست بالای سطح خاک ساقه‌ها را با قیچی تیز بچینید و روی سالاد، ساندویچ، اسموتی یا سوپ بریزید و میل کنید.'
        },
    ];

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-cream to-brown-50 dark:from-brown-900 dark:via-brown-950 dark:to-brown-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        راهنمای کاربردی
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brown-900 dark:text-cream mb-6 leading-tight">
                        روش‌های کشت ارگانیک و کشاورزی شهری
                    </h1>
                    <p className="text-lg sm:text-xl text-brown-700 dark:text-brown-200 max-w-3xl mx-auto leading-relaxed">
                        چگونه در خانه و بدون نیاز به باغچه، روزانه تازه‌ترین و غنی‌ترین سوپرفودهای زنده را برداشت کنیم؟
                    </p>
                </div>
            </section>

            {/* Principles */}
            <section className="py-20 bg-white dark:bg-brown-900 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-brown-900 dark:text-cream mb-4">
                            اصول رویش پاک
                        </h2>
                        <p className="text-brown-600 dark:text-brown-300">
                            چهار عنصری که در کنار هم تضمین‌کننده تراکم آنزیمی و سلامت کامل محصولات رُستارا هستند.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {principles.map((principle, index) => {
                            const Icon = principle.icon;
                            return (
                                <div
                                    key={index}
                                    className="group text-center p-8 bg-cream/40 dark:bg-brown-800/50 rounded-3xl border border-brown-100 dark:border-brown-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-md">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-brown-900 dark:text-cream mb-3">
                                        {principle.title}
                                    </h3>
                                    <p className="text-brown-600 dark:text-brown-300 text-sm leading-relaxed">
                                        {principle.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Step by Step Microgreens Process */}
            <section className="py-20 bg-cream/50 dark:bg-brown-950 transition-colors duration-300">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary-600 dark:text-primary-400 font-bold text-sm uppercase tracking-wider">
                            از کاشت تا چیدن در ۷ روز
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-brown-900 dark:text-cream mt-2 mb-4">
                            مراحل ۴ گانه کشت میکروگرین در آپارتمان
                        </h2>
                        <p className="text-brown-600 dark:text-brown-300">
                            روشی آسان و لذت‌بخش برای تبدیل فضای کوچک خانه به منبع ویتامین و کلروفیل تازه.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {steps.map((item) => (
                            <div
                                key={item.step}
                                className="flex flex-col sm:flex-row items-start gap-6 p-8 bg-white dark:bg-brown-900 rounded-3xl border border-brown-100 dark:border-brown-800 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 text-white font-display font-extrabold text-2xl rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                                    {item.step}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-brown-700 dark:text-brown-300 leading-relaxed text-base">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 text-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            <span>مشاهده کیت و بذرهای میکروگرین رُستارا</span>
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Method;
