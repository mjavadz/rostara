import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Sparkles, HeartPulse, Package, Leaf, Camera } from 'lucide-react';
import { GridBackground } from '@/components/backgrounds/grid';
import { TextShimmer } from '@/components/animations/text-shimmer';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { TaxonomyTag } from '@/components/ui/TaxonomyTag';

const Gallery = () => {
    const { t } = useTranslation();

    const items = [
        {
            id: 1,
            title: 'رویش جوانه‌های بروکلی در سینی خانگی',
            category: 'میکروگرین‌ها',
            icon: Sprout,
            code: '[تصویر ۰۱]'
        },
        {
            id: 2,
            title: 'تخمیر سنتی کامبوچا با اسکوبی ارگانیک',
            category: 'تخمیری‌ها',
            icon: Sparkles,
            code: '[تصویر ۰۲]'
        },
        {
            id: 3,
            title: 'کاشت و مه‌پاشی بستر ارگانیک کوکوپیت',
            category: 'کشاورزی شهری',
            icon: Package,
            code: '[تصویر ۰۳]'
        },
        {
            id: 4,
            title: 'قارچ‌های دارویی شیتاکه روی چوب بلوط',
            category: 'قارچ‌های دارویی',
            icon: HeartPulse,
            code: '[تصویر ۰۴]'
        },
        {
            id: 5,
            title: 'پیچک‌های سبز و ترد نخودفرنگی برفی',
            category: 'میکروگرین‌ها',
            icon: Sprout,
            code: '[تصویر ۰۵]'
        },
        {
            id: 6,
            title: 'نان ساوردو با خمیرترش وحشی ۴۸ ساعته',
            category: 'سلامت میکروبیوم',
            icon: Sparkles,
            code: '[تصویر ۰۶]'
        },
        {
            id: 7,
            title: 'برداشت روزانه میکروگرین تربچه بنفش',
            category: 'میکروگرین‌ها',
            icon: Sprout,
            code: '[تصویر ۰۷]'
        },
        {
            id: 8,
            title: 'نوشیدنی سوپرفود با پودر علف گندم ارگانیک',
            category: 'سوپرفودها',
            icon: Leaf,
            code: '[تصویر ۰۸]'
        },
        {
            id: 9,
            title: 'کیت کامل کشت آپارتمانی رُستارا',
            category: 'تجهیزات کشت',
            icon: Package,
            code: '[تصویر ۰۹]'
        },
    ];

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow transition-colors duration-300">
            {/* Hero */}
            <section className="relative pt-32 pb-20 border-b border-seed-forest/10 dark:border-white/10 overflow-hidden">
                <GridBackground size={48} className="opacity-40 dark:opacity-30" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-seed-stone/80 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-seed-lime animate-pulse" />
                        <TextShimmer className="text-xs font-bold text-seed-forest dark:text-seed-snow tracking-normal">
                            مستندات بصری و آزمایشگاه رویش • رُستارا
                        </TextShimmer>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-seed-forest dark:text-seed-snow tracking-normal mb-6 leading-[1.38]">
                        نگارخانهٔ حیات زیستی
                        <span className="block text-seed-forest/80 dark:text-seed-lime text-2xl sm:text-3xl lg:text-4xl mt-3 font-medium">
                            جلوه‌های رویش میکروگرین‌ها و کشاورزی شهری
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-seed-pewter dark:text-seed-snow/75 leading-relaxed max-w-2xl mx-auto font-normal">
                        مستندسازی مراحل جوانه‌زنی، فرآیندهای تخمیر و تجربهٔ همراهان رُستارا در تولید خانگی غذای زنده.
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <SpotlightCard
                                    key={item.id}
                                    className="p-8 rounded-2xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 flex flex-col justify-between min-h-[260px]"
                                >
                                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-seed-forest/10 dark:border-white/10">
                                        <TaxonomyTag variant="muted">{item.code}</TaxonomyTag>
                                        <span className="badge-lime text-[11px]">
                                            {item.category}
                                        </span>
                                    </div>

                                    <div className="my-auto py-4 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-2xl bg-seed-stone dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 flex items-center justify-center text-seed-forest dark:text-seed-lime shadow-sm">
                                            <IconComponent className="w-8 h-8" />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-seed-forest/10 dark:border-white/10">
                                        <h3 className="text-sm font-bold text-seed-forest dark:text-seed-snow leading-snug">
                                            {item.title}
                                        </h3>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
