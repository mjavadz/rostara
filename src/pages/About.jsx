import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, ShieldCheck, Sparkles, Users, Heart, Target, ArrowLeft, Dna, Leaf, Zap, Microscope, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GridBackground } from '@/components/backgrounds/grid';
import { TextShimmer } from '@/components/animations/text-shimmer';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { Stat } from '@/components/ui/stat';
import { Badge } from '@/components/ui/badge';

const About = () => {
    const { t } = useTranslation();

    const values = [
        {
            code: '[VAL-01]',
            icon: Sprout,
            title: 'غذای زنده و تراکم آنزیمی',
            description: 'تمرکز بر میکروگرین‌ها و جوانه‌هایی که در اوج پتانسیل سلولی و بیولوژیک قرار دارند؛ تغذیه‌ای مستقیم از طبیعت به سلول‌های بدن بدون فوت وقت.'
        },
        {
            code: '[VAL-02]',
            icon: ShieldCheck,
            title: 'خلوص ژنتیکی و بذرهای دیم',
            description: 'تعهد قطعی به بذرهای غیرتراریخته و باستانی دیم، بدون استفاده از حتی یک قطره کود شیمیایی، قارچ‌کش‌های صنعتی یا علف‌کش.'
        },
        {
            code: '[VAL-03]',
            icon: Sparkles,
            title: 'سلامت میکروبیوم و محور روده-مغز',
            description: 'باور علمی به غذاهای تخمیری زنده و فعال (کامبوچا، کیمچی و میسو) به عنوان شالودهٔ تقویت ایمنی ذاتی و پایداری خلق‌وخو.'
        },
        {
            code: '[VAL-04]',
            icon: Users,
            title: 'خودکفایی زیستی و کشاورزی آپارتمانی',
            description: 'طراحی سینی‌های دوسطحی و پروتکل‌های کشت آسان تا هر خانواده بتواند تازه‌ترین سوپرفود سبز را روی پیشخوان خانه برداشت کند.'
        },
        {
            code: '[VAL-05]',
            icon: Heart,
            title: 'پایداری بوم‌شناختی و صفر پسماند',
            description: 'حذف زنجیره طولانی حمل‌ونقل و استفاده از پدهای سلولزی زیست‌تخریب‌پذیر که پس از برداشت مستقیماً به چرخه طبیعت بازمی‌گردند.'
        },
        {
            code: '[VAL-06]',
            icon: Microscope,
            title: 'تغذیه بالینی و مبتنی بر شواهد',
            description: 'ترویج سبک زندگی بر مبنای پژوهش‌های نوین بیوشیمی، رادیکال‌زدایی با سولفورافان و فعال‌سازی مسیر Nrf2 در فیزیولوژی انسانی.'
        }
    ];

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow transition-colors duration-300">
            {/* Hero Section with Technical Grid */}
            <section className="relative pt-32 pb-20 border-b border-seed-forest/10 dark:border-white/10 overflow-hidden">
                <GridBackground size={48} className="opacity-40 dark:opacity-30" />
                
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seed-stone/80 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-seed-lime animate-pulse" />
                        <TextShimmer className="text-xs font-bold text-seed-forest dark:text-seed-snow tracking-normal">
                            منشور رویش زیست‌پایدار • رُستارا ۲۰۲۶
                        </TextShimmer>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-seed-forest dark:text-seed-snow tracking-normal mb-6 leading-[1.38]">
                        داستان رُستارا؛
                        <span className="block text-seed-forest/80 dark:text-seed-lime text-2xl sm:text-3xl lg:text-4xl mt-3 font-medium">
                            رویشِ آراسته‌ی سلامت سلولی
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-seed-pewter dark:text-seed-snow/75 leading-relaxed max-w-2xl mx-auto font-normal">
                        پیوند دوبارهٔ انسان مدرن با زیست‌شناسی پاک خاک، متابولیت‌های فعال گیاهی و کشاورزی باطراوت در دل فضاهای شهری.
                    </p>
                </div>
            </section>

            {/* Empirical Metrics Ticker */}
            <section className="py-8 bg-seed-stone/50 dark:bg-seed-forest/20 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="border-e border-seed-forest/20 dark:border-white/20 last:border-e-0 pe-4">
                            <div className="text-3xl lg:text-4xl font-mono font-black text-seed-forest dark:text-seed-lime">۵۰×</div>
                            <div className="text-xs text-seed-pewter dark:text-seed-snow/80 mt-1 font-medium">تراکم مواد زیست‌فعال نسبت به سبزیجات بالغ</div>
                        </div>
                        <div className="border-e border-seed-forest/20 dark:border-white/20 last:border-e-0 pe-4">
                            <div className="text-3xl lg:text-4xl font-mono font-black text-seed-forest dark:text-seed-lime">۱۰۰٪</div>
                            <div className="text-xs text-seed-pewter dark:text-seed-snow/80 mt-1 font-medium">بذرهای دیم اصیل غیرتراریخته (Non-GMO)</div>
                        </div>
                        <div className="border-e border-seed-forest/20 dark:border-white/20 last:border-e-0 pe-4">
                            <div className="text-3xl lg:text-4xl font-mono font-black text-seed-forest dark:text-seed-lime">۷ روز</div>
                            <div className="text-xs text-seed-pewter dark:text-seed-snow/80 mt-1 font-medium">چرخه کامل جوانه تا چیدن تازه در آپارتمان</div>
                        </div>
                        <div>
                            <div className="text-3xl lg:text-4xl font-mono font-black text-seed-forest dark:text-seed-lime">۰</div>
                            <div className="text-xs text-seed-pewter dark:text-seed-snow/80 mt-1 font-medium">آفت‌کش، علف‌کش و نگهدارنده شیمیایی</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scientific Narrative & Manifesto */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8 text-seed-forest/90 dark:text-seed-snow/85 leading-relaxed text-base sm:text-lg font-normal">
                        <div className="p-8 rounded-2xl bg-seed-stone/60 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10">
                            <h2 className="text-xl sm:text-2xl font-bold text-seed-forest dark:text-seed-snow mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-seed-lime" />
                                چرا رُستارا پدید آمد؟
                            </h2>
                            <p className="text-seed-forest/80 dark:text-seed-snow/80 leading-relaxed">
                                رُستارا با این پرسش بنیادین متولد شد: چگونه می‌توان در دنیای پرترافیک و فرسایندهٔ امروز، سلامت واقعی و غذای زنده را مستقیماً به قلب خانه‌ها آورد؟ وقتی سبزیجات روزها در زنجیره‌های ترانزیت، انبارها و قفسه‌های فروشگاهی می‌مانند، بیش از ۷۰ درصد از آنزیم‌های فعال و ویتامین‌های حساس به اکسیداسیون خود را پیش از مصرف از دست می‌دهند.
                            </p>
                        </div>

                        <p>
                            پاسخ علمی ما، بازگشت به اعجاز <strong>میکروگرین‌ها (ریزسبزی‌های غنی‌شده)</strong>، <strong>تخمیرهای زندهٔ پروبیوتیک</strong> و <strong>کشاورزی ارگانیک خانگی</strong> است. گیاهچه در روز هفتم رشد خود، در بالاترین تراکم متابولیت‌های ثانویه قرار دارد؛ جایی که فیتوکمیکال‌ها، کلروفیل، ویتامین C و ترکیبات مهارکنندهٔ استرس اکسیداتیو در حداکثر توان بیولوژیک خود هستند.
                        </p>

                        <p>
                            در رُستارا، ما صرفاً بذر یا محصول نمی‌فروشیم؛ بلکه یک اکوسیستم استاندارد و متکی به علم فراهم ساخته‌ایم تا هر شخص بدون نیاز به مهارت باغبانی یا فضای باز، در سینی‌های بدون خاک و خودآبیار، منبع زندهٔ آنزیم و سلامت سلولی خانواده خود باشد.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values / Specimen Grid */}
            <section className="py-20 bg-seed-stone/40 dark:bg-seed-forest/10 border-t border-seed-forest/10 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="font-mono text-xs font-bold text-seed-forest/60 dark:text-seed-lime uppercase tracking-widest block mb-2">
                            [ شش رکن زیست‌پزشکی و اخلاق کشت ]
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow">
                            اصول و باورهای بنیادین رُستارا
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((val, idx) => {
                            const IconComponent = val.icon;
                            return (
                                <SpotlightCard
                                    key={idx}
                                    className="p-8 rounded-2xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between pb-3 mb-6 border-b border-seed-forest/10 dark:border-white/10 font-mono text-[11px] text-seed-pewter dark:text-seed-snow/50">
                                            <span>{val.code}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-seed-lime" />
                                        </div>

                                        <div className="w-12 h-12 rounded-xl bg-seed-stone dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 flex items-center justify-center mb-5 text-seed-forest dark:text-seed-lime">
                                            <IconComponent className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-lg font-bold text-seed-forest dark:text-seed-snow mb-3">
                                            {val.title}
                                        </h3>

                                        <p className="text-xs text-seed-pewter dark:text-seed-snow/70 leading-relaxed">
                                            {val.description}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>

                    {/* CTA to Products */}
                    <div className="mt-16 text-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md"
                        >
                            <span>مشاهده کاتالوگ گونه‌های زیستی و کیت‌ها</span>
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
