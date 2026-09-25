import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Sun, Droplets, Wind, ShieldCheck, Clock, Scissors, Sparkles, ArrowLeft, CheckCircle2, Layers, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GridBackground } from '@/components/backgrounds/grid';
import { TextShimmer } from '@/components/animations/text-shimmer';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { Badge } from '@/components/ui/badge';

const Method = () => {
    const { t } = useTranslation();

    const principles = [
        {
            code: '[PRIN-01]',
            icon: Sprout,
            title: 'بذرهای اصیل غیرتراریخته',
            description: 'خلوص ژنتیکی بالای ۹۹٪، عاری از قارچ‌کش‌های سیستمیک و بدون مداخله دستکاری ژنتیکی (Non-GMO).'
        },
        {
            code: '[PRIN-02]',
            icon: Droplets,
            title: 'آب پاک و مه‌پاشی کنترل‌شده',
            description: 'آبیاری با قطرات اولترافاین فاقد کلر، جهت تثبیت رطوبت نسبی بدون ایجاد غرقاب یا فرسودگی ریشه.'
        },
        {
            code: '[PRIN-03]',
            icon: Sun,
            title: 'فتوسنتز ملایم و طیف نوری سرد',
            description: 'نور غیرمستقیم پنجره یا ال‌ای‌دی‌های طیف رویشی (۴۰۰۰ تا ۶۵۰۰ کلوین) بدون تولید حرارت تنش‌زا.'
        },
        {
            code: '[PRIN-04]',
            icon: Wind,
            title: 'گردش آئرودینامیک هوا',
            description: 'تهویه یکنواخت محیطی برای اکسیژن‌رسانی به آوندها و پیشگیری قطعی از تشکیل اسپورهای قارچی.'
        }
    ];

    const steps = [
        {
            step: '۰۱',
            code: '[STAGE-HYDRATE]',
            duration: '۱۲ ساعت',
            title: 'هیدراتاسیون و آماده‌سازی بستر سلولزی',
            desc: 'پد سلولزی الیاف طبیعی را در سینی زیرین خیس کنید. بذرهای درشت‌تر (مانند نخودفرنگی برفی و آفتابگردان) را پیش از کشت در آب زلال بخیسانید تا سیگنال بیداری بیوشیمیایی صادر شود.'
        },
        {
            step: '۰۲',
            code: '[STAGE-BLACKOUT]',
            duration: 'روز ۱ تا ۳',
            title: 'پاشش متراکم و دوره تاریکی (Blackout)',
            desc: 'بذرها را با تراکم یکنواخت روی بستر پخش کنید. سینی را به مدت ۷۲ ساعت در تاریکی کامل و تحت فشار ملایم قرار دهید تا ریشه‌ها به بستر نفوذ کرده و ساقه‌های اولیه متمرکز شوند.'
        },
        {
            step: '۰۳',
            code: '[STAGE-PHOTOSYNTHESIS]',
            duration: 'روز ۴ تا ۶',
            title: 'نورگیری، تحریک کلروفیل و سنتز سولفورافان',
            desc: 'سینی را در معرض نور ملایم قرار دهید. ظرف چند ساعت، برگ‌های زرد جوانه کلروفیل خالص تولید کرده و سبز زمردی درخشان می‌شوند. تولید آنزیم میروزیناز در این فاز به نقطه اوج می‌رسد.'
        },
        {
            step: '۰۴',
            code: '[STAGE-HARVEST]',
            duration: 'روز ۷ تا ۱۰',
            title: 'برداشت ساقه با قیچی و مصرف غذای زنده',
            desc: 'درست نیم سانتی‌متر بالاتر از سطح بستر، ساقه‌های ترد را با قیچی استریل بچینید و بلافاصله روی سالاد، غلات گرم یا اسموتی سرو کنید تا آنزیم‌ها زنده وارد دستگاه گوارش شوند.'
        }
    ];

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow transition-colors duration-300">
            {/* Hero Header */}
            <section className="relative pt-32 pb-20 border-b border-seed-forest/10 dark:border-white/10 overflow-hidden">
                <GridBackground size={48} className="opacity-40 dark:opacity-30" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seed-stone/80 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-seed-lime animate-pulse" />
                        <TextShimmer className="text-xs font-bold text-seed-forest dark:text-seed-snow tracking-normal">
                            پروتکل استاندارد کشت خانگی • نسخه ۲۰۲۶
                        </TextShimmer>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-seed-forest dark:text-seed-snow tracking-normal mb-6 leading-[1.38]">
                        روش‌های کشت ارگانیک
                        <span className="block text-seed-forest/80 dark:text-seed-lime text-2xl sm:text-3xl lg:text-4xl mt-3 font-medium">
                            و باغبانی باطراوت شهری
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-seed-pewter dark:text-seed-snow/75 leading-relaxed max-w-2xl mx-auto font-normal">
                        چگونه در خانه و بدون نیاز به باغچه، خاک یا کود شیمیایی، روزانه تازه‌ترین سوپرفودهای زنده را روی پیشخوان آشپزخانه برداشت کنیم؟
                    </p>
                </div>
            </section>

            {/* Scientific Principles */}
            <section className="py-20 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-mono text-xs font-bold text-seed-forest/60 dark:text-seed-lime uppercase tracking-widest block mb-2">
                            [ ۴ ستون بیولوژیک رویش پاک ]
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow">
                            اصول رویش ارگانیک رُستارا
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {principles.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <SpotlightCard
                                    key={idx}
                                    className="p-6 rounded-2xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-center pb-3 mb-5 border-b border-seed-forest/10 dark:border-white/10 font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50">
                                            <span>{item.code}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-seed-lime" />
                                        </div>

                                        <div className="w-12 h-12 rounded-xl bg-seed-stone dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 flex items-center justify-center mb-4 text-seed-forest dark:text-seed-lime">
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-base font-bold text-seed-forest dark:text-seed-snow mb-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-xs text-seed-pewter dark:text-seed-snow/85 leading-relaxed font-normal">
                                            {item.description}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Protocol Timeline Steps */}
            <section className="py-20 bg-seed-stone/40 dark:bg-seed-forest/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-mono text-xs font-bold text-seed-forest/60 dark:text-seed-lime uppercase tracking-widest block mb-2">
                            [ پروتکل رویش ۷ روزه • از بذر تا بشقاب ]
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow">
                            مراحل ۴ گانه کشت میکروگرین در آپارتمان
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {steps.map((st) => (
                            <div
                                key={st.step}
                                className="p-8 rounded-2xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 flex flex-col md:flex-row items-start gap-6 hover:border-seed-lime/50 transition-all"
                            >
                                <div className="flex items-center gap-4 md:flex-col md:items-center flex-shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest flex items-center justify-center font-mono font-black text-xl shadow-sm">
                                        {st.step}
                                    </div>
                                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-seed-stone dark:bg-white/10 text-seed-pewter dark:text-seed-snow/70">
                                        {st.duration}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50">
                                        <span>{st.code}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-seed-forest dark:text-seed-snow mb-2">
                                        {st.title}
                                    </h3>
                                    <p className="text-xs text-seed-pewter dark:text-seed-snow/75 leading-relaxed font-normal">
                                        {st.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="mt-16 text-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md"
                        >
                            <span>مشاهده کیت خانگی و بذرهای خالص رُستارا</span>
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Method;
