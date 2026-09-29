import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Sparkles, HeartPulse, Users, Coffee, Leaf, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GridBackground } from '@/components/backgrounds/grid';
import { TextShimmer } from '@/components/animations/text-shimmer';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { ShineButton } from '@/components/animations/shine-button';

const Experience = () => {
    const { t } = useTranslation();

    const experiences = [
        {
            code: '[تجربهٔ ۱]',
            icon: Sprout,
            title: 'پرورش سبز در آپارتمان',
            description: 'تجربه دلنشین بذرپاشی، جوانه‌زدن و چیدن روزانه میکروگرین‌های تازه بدون نیاز به فضای باز یا خاک سنتی.',
        },
        {
            code: '[تجربهٔ ۲]',
            icon: Sparkles,
            title: 'کارگاه‌های تخمیر زنده',
            description: 'آشنایی با تخمیر خانگی کامبوچا، کیمچی و خوراک‌های فعال پروبیوتیک برای غنی‌سازی میکروبیوم روده و تقویت گوارش.',
        },
        {
            code: '[تجربهٔ ۳]',
            icon: Coffee,
            title: 'تغذیه پاک و آگاهانه',
            description: 'جایگزینی غذاهای فرآوری‌شده صنعتی با سوپرفودهای ارگانیک، عصاره‌های قارچ دارویی و اسموتی‌های سرشار از کلروفیل.',
        },
        {
            code: '[تجربهٔ ۴]',
            icon: HeartPulse,
            title: 'ارتقای انرژی و ایمنی سلولی',
            description: 'بهبود محسوس سطح انرژی، تمرکز ذهنی و پایداری ایمنی با مهار رادیکال‌های آزاد و تأمین آنزیم‌های فعال زیستی.',
        },
        {
            code: '[تجربهٔ ۵]',
            icon: Users,
            title: 'باشگاه و همراهی دوست‌داران سلامت',
            description: 'تبادل تجربه، دستورالعمل‌های تغذیه و همراهی با افرادی که برای طول عمر باکیفیت و سلامت ارزش قائلند.',
        },
        {
            code: '[تجربهٔ ۶]',
            icon: Leaf,
            title: 'همزیستی با چرخه‌های طبیعت',
            description: 'هماهنگ‌سازی ساعات بیولوژیک بدن با طبیعت، مصرف محصولات فصلی باطراوت و حذف پسماندهای پلاستیکی.',
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
                            زیست‌آگاهی و پایش سلامت سلولی • رُستارا
                        </TextShimmer>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-seed-forest dark:text-seed-snow tracking-normal mb-6 leading-[1.38]">
                        تجربهٔ سبک زندگی زیست‌پایدار
                        <span className="block text-seed-forest/80 dark:text-seed-lime text-2xl sm:text-3xl lg:text-4xl mt-3 font-medium">
                            همگام با هوش گیاهی و تغذیهٔ زنده
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-seed-pewter dark:text-seed-snow/75 leading-relaxed max-w-2xl mx-auto font-normal">
                        رُستارا فراتر از یک فروشگاه، حرکتی علمی برای احیای رابطه انسان با خاک پاک، متابولیت‌های تازه گیاهی و آرامش پایدار سلولی است.
                    </p>
                </div>
            </section>

            {/* Experiences Grid */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {experiences.map((exp, index) => {
                            const Icon = exp.icon;
                            return (
                                <SpotlightCard
                                    key={index}
                                    className="p-8 rounded-2xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between pb-3 mb-5 border-b border-seed-forest/10 dark:border-white/10 text-[11px] text-seed-pewter dark:text-seed-snow/50 font-bold">
                                            <span>{exp.code}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-seed-lime" />
                                        </div>

                                        <div className="w-12 h-12 rounded-xl bg-seed-stone dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 flex items-center justify-center mb-5 text-seed-forest dark:text-seed-lime">
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-base font-bold text-seed-forest dark:text-seed-snow mb-2">
                                            {exp.title}
                                        </h3>

                                        <p className="text-xs text-seed-pewter dark:text-seed-snow/75 leading-relaxed font-normal">
                                            {exp.description}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-seed-forest text-seed-snow border-t border-seed-forest/40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-seed-lime text-seed-forest text-xs font-bold mb-6">
                        رویش پاک در خانه
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-extrabold mb-4 leading-snug">
                        مسیر سلامت سلولی خود را از امروز آغاز کنید
                    </h2>
                    <p className="text-sm sm:text-base text-seed-snow/80 mb-10 leading-relaxed max-w-2xl mx-auto font-normal">
                        کیت پرورش خانگی خود را انتخاب کنید یا با پیوستن به باشگاه تندرستی رُستارا از آموزش‌ها و تخفیف‌های ویژه بهره‌مند شوید.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/products">
                            <ShineButton className="px-8 py-3.5 rounded-full bg-seed-lime text-seed-forest font-bold text-xs shadow-md flex items-center gap-2 hover:opacity-95">
                                <span>مشاهده نمونه‌های زیستی و کیت‌ها</span>
                                <ArrowLeft className="w-4 h-4" />
                            </ShineButton>
                        </Link>
                        <Link
                            to="/club"
                            className="px-8 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-seed-snow font-bold text-xs border border-white/20 transition-all"
                        >
                            ورود به باشگاه تندرستی
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Experience;
