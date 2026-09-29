import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Sun, Droplets, Wind, ShieldCheck, Clock, Scissors, Sparkles, ArrowLeft, ArrowRight, CheckCircle2, Layers, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GridBackground } from '@/components/backgrounds/grid';
import { TextShimmer } from '@/components/animations/text-shimmer';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { TaxonomyTag } from '@/components/ui/TaxonomyTag';

const Method = () => {
    const { t, i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

    const principles = [
        {
            code: isEn ? 'Principle 01' : 'اصل ۱',
            icon: Sprout,
            title: isEn ? 'Authentic Non-GMO Seeds' : 'بذرهای اصیل غیرتراریخته',
            description: isEn 
                ? 'Above 99% genetic vigor, free from systemic fungicides, and completely unadulterated by laboratory genetic modification.'
                : 'خلوص ژنتیکی بالای ۹۹٪، عاری از قارچ‌کش‌های سیستمیک و بدون مداخله دستکاری ژنتیکی (کاملاً طبیعی).'
        },
        {
            code: isEn ? 'Principle 02' : 'اصل ۲',
            icon: Droplets,
            title: isEn ? 'Pure Water & Micro-Misting' : 'آب پاک و مه‌پاشی کنترل‌شده',
            description: isEn 
                ? 'Chlorine-free ultra-fine misting stabilizes relative humidity without waterlogging or root suffocation.'
                : 'آبیاری با قطرات بسیار ریز فاقد کلر، جهت تثبیت رطوبت نسبی بدون ایجاد غرقاب یا فرسودگی ریشه.'
        },
        {
            code: isEn ? 'Principle 03' : 'اصل ۳',
            icon: Sun,
            title: isEn ? 'Cool Spectrum Photosynthesis' : 'فتوسنتز ملایم و طیف نوری سرد',
            description: isEn 
                ? 'Diffused windowsill light or cool vegetative spectrums (4000K–6500K) that stimulate chlorophyll without thermal stress.'
                : 'نور غیرمستقیم پنجره یا لامپ‌های طیف رویشی (۴۰۰۰ تا ۶۵۰۰ کلوین) بدون تولید حرارت تنش‌زا.'
        },
        {
            code: isEn ? 'Principle 04' : 'اصل ۴',
            icon: Wind,
            title: isEn ? 'Aerodynamic Airflow' : 'گردش آئرودینامیک هوا',
            description: isEn 
                ? 'Continuous gentle air displacement oxygenates vascular bundles and decisively prevents fungal spore colonization.'
                : 'تهویه یکنواخت محیطی برای اکسیژن‌رسانی به آوندها و پیشگیری قطعی از تشکیل اسپورهای قارچی.'
        }
    ];

    const steps = [
        {
            step: isEn ? '01' : '۰۱',
            code: isEn ? 'Phase 1: Seed Hydration' : 'مرحلهٔ ۱: بیداری بذر',
            duration: isEn ? '12 Hours' : '۱۲ ساعت',
            title: isEn ? 'Hydration & Bio-Cellulose Mat Preparation' : 'هیدراتاسیون و آماده‌سازی بستر سلولزی',
            desc: isEn 
                ? 'Moisten the natural fiber cellulose pad in the bottom drainage tray. Larger seeds (Snow Pea, Sunflower) should soak in purified water beforehand to initiate biochemical sprouting signals.'
                : 'پد سلولزی الیاف طبیعی را در سینی زیرین مرطوب کنید. بذرهای درشت‌تر (مانند نخودفرنگی برفی و آفتابگردان) را پیش از کشت در آب زلال بخیسانید تا سیگنال بیداری بیوشیمیایی صادر شود.'
        },
        {
            step: isEn ? '02' : '۰۲',
            code: isEn ? 'Phase 2: Blackout Domination' : 'مرحلهٔ ۲: دوره تاریکی',
            duration: isEn ? 'Days 1 to 3' : 'روز ۱ تا ۳',
            title: isEn ? 'Dense Sowing & Blackout Germination' : 'پاشش متراکم و دوره تاریکی',
            desc: isEn 
                ? 'Distribute seeds evenly across the pad. Keep the tray in total darkness under gentle weighted cover for 72 hours so roots anchor deeply into the bio-matrix and stems emerge uniformly.'
                : 'بذرها را با تراکم یکنواخت روی بستر پخش کنید. سینی را به مدت ۷۲ ساعت در تاریکی کامل و تحت فشار ملایم قرار دهید تا ریشه‌ها به بستر نفوذ کرده و ساقه‌های اولیه متمرکز شوند.'
        },
        {
            step: isEn ? '03' : '۰۳',
            code: isEn ? 'Phase 3: Chlorophyll Synthesis' : 'مرحلهٔ ۳: فتوسنتز و کلروفیل',
            duration: isEn ? 'Days 4 to 6' : 'روز ۴ تا ۶',
            title: isEn ? 'Light Exposure & Sulforaphane Synthesis' : 'نورگیری، تحریک کلروفیل و سنتز سولفورافان',
            desc: isEn 
                ? 'Uncover and introduce to gentle indirect light. Within hours, pale shoots synthesize pure chlorophyll, turning deep emerald. Endogenous myrosinase enzyme concentrations reach their biological peak.'
                : 'سینی را در معرض نور ملایم قرار دهید. ظرف چند ساعت، برگ‌های زرد جوانه کلروفیل خالص تولید کرده و سبز زمردی درخشان می‌شوند. تولید آنزیم میروزیناز در این فاز به نقطه اوج می‌رسد.'
        },
        {
            step: isEn ? '04' : '۰۴',
            code: isEn ? 'Phase 4: Fresh Harvesting' : 'مرحلهٔ ۴: چیدن تازه',
            duration: isEn ? 'Days 7 to 10' : 'روز ۷ تا ۱۰',
            title: isEn ? 'Clipping & Living Cellular Consumption' : 'برداشت ساقه با قیچی و مصرف غذای زنده',
            desc: isEn 
                ? 'Clip crisp stems 0.5 cm above the mat surface with clean shears. Serve immediately on fresh salads, warm grain bowls, or breakfast eggs so active enzymes enter the digestive tract unoxidized.'
                : 'درست نیم سانتی‌متر بالاتر از سطح بستر، ساقه‌های ترد را با قیچی استریل بچینید و بلافاصله روی سالاد، غلات گرم یا اسموتی سرو کنید تا آنزیم‌ها زنده وارد دستگاه گوارش شوند.'
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
                            {isEn ? 'Standard Home Cultivation Protocol • 2026 Release' : 'پروتکل استاندارد کشت خانگی • نسخه ۱۴۰۵'}
                        </TextShimmer>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-seed-forest dark:text-seed-snow tracking-normal mb-6 leading-[1.38]">
                        <span>{isEn ? 'Organic Cultivation SOP' : 'روش‌های کشت ارگانیک'}</span>
                        <span className="block text-seed-forest/80 dark:text-seed-lime text-2xl sm:text-3xl lg:text-4xl mt-3 font-medium">
                            {isEn ? '& Urban Living Botanicals' : 'و باغبانی باطراوت شهری'}
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-seed-pewter dark:text-seed-snow/75 leading-relaxed max-w-2xl mx-auto font-normal">
                        {isEn 
                            ? 'How to harvest the freshest living superfoods right on your kitchen counter daily—without soil, chemical fertilizers, or an outdoor garden.'
                            : 'چگونه در خانه و بدون نیاز به باغچه، خاک یا کود شیمیایی، روزانه تازه‌ترین سوپرفودهای زنده را روی پیشخوان آشپزخانه برداشت کنیم؟'}
                    </p>
                </div>
            </section>

            {/* Scientific Principles */}
            <section className="py-20 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="mb-2">
                            <TaxonomyTag variant="lime">
                                {isEn ? 'Four Biological Pillars of Pure Growth' : '۴ ستون بیولوژیک رویش پاک'}
                            </TaxonomyTag>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow">
                            {isEn ? 'Rostara Principles of Organic Germination' : 'اصول رویش ارگانیک رُستارا'}
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
                                        <div className="flex justify-between items-center pb-3 mb-5 border-b border-seed-forest/10 dark:border-white/10">
                                            <TaxonomyTag variant="muted">{item.code}</TaxonomyTag>
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
                        <div className="mb-2">
                            <TaxonomyTag variant="lime">
                                {isEn ? '7-Day Growth Protocol • From Seed to Fork' : 'پروتکل رویش ۷ روزه • از بذر تا بشقاب'}
                            </TaxonomyTag>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow">
                            {isEn ? '4 Steps to Apartment Microgreen Farming' : 'مراحل ۴ گانه کشت میکروگرین در آپارتمان'}
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
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <TaxonomyTag variant="muted">{st.code}</TaxonomyTag>
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
                            <span>{isEn ? 'Order Home Kits & Pure Heirloom Seeds' : 'مشاهده کیت خانگی و بذرهای خالص رُستارا'}</span>
                            <ArrowIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Method;
