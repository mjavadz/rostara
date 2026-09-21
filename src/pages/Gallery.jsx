import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Sparkles, HeartPulse, Package, Leaf } from 'lucide-react';

const Gallery = () => {
    const { t } = useTranslation();

    const items = [
        {
            id: 1,
            title: 'رویش جوانه‌های بروکلی در سینی خانگی',
            category: 'میکروگرین',
            icon: Sprout,
        },
        {
            id: 2,
            title: 'تخمیر سنتی کامبوچا با اسکوبی ارگانیک',
            category: 'تخمیری‌ها',
            icon: Sparkles,
        },
        {
            id: 3,
            title: 'کاشت و مه‌پاشی بستر ارگانیک کوکوپیت',
            category: 'کشاورزی شهری',
            icon: Package,
        },
        {
            id: 4,
            title: 'قارچ‌های دارویی شیتاکه روی چوب بلوط',
            category: 'قارچ‌ها',
            icon: HeartPulse,
        },
        {
            id: 5,
            title: 'پیچک‌های سبز و ترد نخودفرنگی برفی',
            category: 'میکروگرین',
            icon: Sprout,
        },
        {
            id: 6,
            title: 'نان ساوردو با خمیرترش وحشی ۴۸ ساعته',
            category: 'سلامت روده',
            icon: Sparkles,
        },
        {
            id: 7,
            title: 'برداشت روزانه میکروگرین تربچه بنفش',
            category: 'میکروگرین',
            icon: Sprout,
        },
        {
            id: 8,
            title: 'اسموتی سبز سوپرفود با پودر علف گندم',
            category: 'سبک زندگی سالم',
            icon: Leaf,
        },
        {
            id: 9,
            title: 'کیت جامع کشت آپارتمانی رُستارا',
            category: 'تجهیزات خانگی',
            icon: Package,
        },
    ];

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-cream to-brown-50 dark:from-brown-900 dark:via-brown-950 dark:to-brown-950 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        تصویر رویش
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brown-900 dark:text-cream mb-6 leading-tight">
                        گالری رویش رُستارا
                    </h1>
                    <p className="text-lg sm:text-xl text-brown-700 dark:text-brown-200 leading-relaxed max-w-2xl mx-auto">
                        نگاهی به جهان زنده میکروگرین‌ها، فرآورده‌های تخمیری و کشاورزی ارگانیک خانگی.
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="group relative h-80 bg-gradient-to-br from-primary-100/70 via-cream to-primary-50 dark:from-brown-800 dark:via-brown-850 dark:to-brown-800 rounded-3xl overflow-hidden border border-brown-100 dark:border-brown-700/80 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-8"
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="px-3.5 py-1.5 bg-white/90 dark:bg-brown-900/90 backdrop-blur-md rounded-full text-xs font-bold text-primary-700 dark:text-primary-300 shadow-sm border border-primary-100 dark:border-brown-700">
                                            {item.category}
                                        </span>
                                        <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-brown-700/60 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                            <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6">
                                        <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
