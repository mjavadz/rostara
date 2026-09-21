import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    Leaf, 
    Sprout, 
    Sparkles, 
    Package, 
    CheckCircle2, 
    ShieldCheck, 
    HeartPulse,
    Droplets,
    SunMedium
} from 'lucide-react';

const Home = () => {
    const { t } = useTranslation();

    const featuredBadges = [
        {
            title: 'میکروگرین بروکلی',
            sub: '۵۰× سولفورافان بیشتر',
            icon: Sprout,
            tag: 'سوپرفود روز',
        },
        {
            title: 'کیت کشت خانگی ۷ روزه',
            sub: 'سینی ارگانیک + ۴ بذر',
            icon: Package,
            tag: 'پرفروش‌ترین',
        },
        {
            title: 'کامبوچای زنجبیل لیمو',
            sub: 'پروبیوتیک زنده روده',
            icon: Sparkles,
            tag: 'تخمیر اصیل',
        }
    ];

    const pillars = [
        {
            icon: Sprout,
            title: 'میکروگرین و جوانه‌ها',
            desc: 'ریزسبزی‌های ارگانیک سرشار از آنزیم‌های فعال، کلروفیل و سولفورافان با تراکم مواد مغذی تا ۴۰ برابر سبزیجات بالغ.'
        },
        {
            icon: Sparkles,
            title: 'تخمیری‌ها و پروبیوتیک',
            desc: 'کامبوچا، کیمچی و میسوی زنده برای احیا و تقویت میکروبیوم روده و محور حیاتی مغز-گوارش.'
        },
        {
            icon: HeartPulse,
            title: 'قارچ‌های دارویی و آداپتوژن',
            desc: 'شیتاکه، یال شیر و ریشی برای ارتقای وضوح ذهنی، تنظیم پاسخ به استرس و استحکام سیستم ایمنی.'
        },
        {
            icon: Package,
            title: 'کشاورزی ارگانیک و شهری',
            desc: 'کیت‌ها و ملزومات خانگی برای تبدیل هر خانه به یک بومِ سبز و تولید مستقل سوپرفودهای تازه.'
        }
    ];

    const microBenefits = [
        {
            stat: '۴۰×',
            title: 'تراکم ریزمغذی‌ها',
            desc: 'تحقیقات نشان می‌دهد میکروگرین‌ها حاوی مقادیر بسیار غلیظ‌تری از ویتامین‌های C، E، K و کاروتنوئیدها نسبت به برگ‌های بالغ هستند.'
        },
        {
            stat: '۷-۱۰',
            title: 'روز تا برداشت تازه',
            desc: 'چرخه رویش سریع بدون نیاز به حیاط یا باغچه؛ روی اپن آشپزخانه یا لب پنجره جوانه می‌زنند و تازه مصرف می‌شوند.'
        },
        {
            stat: '۱۰۰٪',
            title: 'ارگانیک و عاری از سموم',
            desc: 'کشت کاملاً بیودینامیک با آب زلال و بذرها غیرتراریخته، بدون قطره‌ای سموم شیمیایی و علف‌کش.'
        },
        {
            stat: '۰ کیلومتر',
            title: 'مسافت از مزرعه تا سفره',
            desc: 'حذف زنجیره تأمین طولانی و ماندگی در یخچال؛ از سینی کشت مستقیماً به بشقاب و سالاد شما می‌آید.'
        }
    ];

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-500">
            {/* Hero Section */}
            <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20">
                {/* Background with warm botanical gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-cream to-brown-100/40 dark:from-primary-950/40 dark:via-brown-950 dark:to-brown-950 transition-colors duration-500"></div>

                {/* Subtle botanical decorative ambient shapes */}
                <div className="absolute top-16 left-1/4 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-100/30 dark:bg-primary-950/30 rounded-full blur-3xl pointer-events-none"></div>

                {/* Hero Content Container */}
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Eyebrow badge */}
                    <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-primary-100/90 dark:bg-primary-900/50 text-primary-900 dark:text-primary-200 rounded-full border border-primary-300/80 dark:border-primary-700/80 shadow-sm text-xs font-bold tracking-wider">
                        <Sprout className="w-4 h-4 text-primary-700 dark:text-primary-300" />
                        <span>{t('philosophy.label')}</span>
                        <Leaf className="w-3.5 h-3.5 text-primary-700 dark:text-primary-300" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-brown-900 dark:text-cream mb-6 leading-[1.18] tracking-tight">
                        رویشِ آراسته‌ی سلامت <br />
                        <span className="text-primary-700 dark:text-primary-400 font-medium">
                            در هماهنگی با طبیعت
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p 
                        className="text-lg sm:text-xl text-brown-700 dark:text-brown-200 mb-10 max-w-3xl mx-auto leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
                    />

                    {/* CTAs (Full Pill Buttons per Starbucks & Craft Design Systems) */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
                        <Link
                            to="/products"
                            className="w-full sm:w-auto group px-9 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-lg shadow-primary-700/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <span>{t('hero.cta')}</span>
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/method"
                            className="w-full sm:w-auto px-9 py-4 bg-white/95 dark:bg-brown-900/90 border border-brown-300 dark:border-primary-800 text-brown-900 dark:text-cream rounded-full font-semibold hover:border-primary-600 dark:hover:border-primary-400 hover:text-primary-700 dark:hover:text-primary-300 active:scale-95 transition-all duration-300 text-center shadow-sm"
                        >
                            راهنمای کشت خانگی
                        </Link>
                    </div>

                    {/* Botanical Preview Showcase Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-right">
                        {featuredBadges.map((badge, idx) => {
                            const IconComponent = badge.icon;
                            return (
                                <Link
                                    key={idx}
                                    to="/products"
                                    className="p-4 bg-white dark:bg-brown-900 rounded-2xl border border-brown-200/90 dark:border-brown-800 hover:border-primary-400 dark:hover:border-primary-700 shadow-sm hover:shadow-lg transition-all flex items-center gap-4 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/80 border border-primary-200/80 dark:border-primary-800/60 flex items-center justify-center text-primary-700 dark:text-primary-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h4 className="text-sm font-bold text-brown-900 dark:text-cream truncate">
                                                {badge.title}
                                            </h4>
                                            <span className="text-[10px] font-semibold text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-950 px-2 py-0.5 rounded-full border border-primary-100 dark:border-primary-900">
                                                {badge.tag}
                                            </span>
                                        </div>
                                        <p className="text-xs text-brown-500 dark:text-brown-400 truncate">
                                            {badge.sub}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4 Core Pillars Section */}
            <section className="py-24 bg-white dark:bg-brown-900 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary-700 dark:text-primary-400 font-bold text-xs uppercase tracking-widest bg-primary-50 dark:bg-primary-950/80 px-4 py-1.5 rounded-full border border-primary-100 dark:border-primary-900">
                            چهار ستون رُستارا
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brown-900 dark:text-cream mt-4 mb-4">
                            غذای زنده برای آگاهی و تندرستی سلولی
                        </h2>
                        <p className="text-brown-600 dark:text-brown-300 text-base leading-relaxed">
                            ما چرخه‌ای کامل از رویش، فرآوری زیستی و تغذیه پاک را در دسترس شما قرار می‌دهیم.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pillars.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group p-8 bg-cream/60 dark:bg-brown-850 rounded-3xl border border-brown-100 dark:border-brown-800 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                                >
                                    <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-brown-600 dark:text-brown-300 leading-relaxed text-sm flex-grow">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Microgreens? Impact Section */}
            <section className="py-24 bg-gradient-to-b from-primary-50/40 via-cream to-brown-50 dark:from-brown-950 dark:via-brown-900 dark:to-brown-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <span className="px-4 py-1.5 bg-primary-100 dark:bg-primary-950/80 text-primary-800 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-200 dark:border-primary-800">
                                انقلاب سبز خانگی
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-brown-900 dark:text-cream mt-4 mb-6 leading-tight">
                                چرا میکروگرین‌ها غوغایی در سلامت برپا کرده‌اند؟
                            </h2>
                            <p className="text-brown-700 dark:text-brown-300 text-base leading-relaxed mb-8">
                                میکروگرین‌ها در مرحلهٔ نخستین رویش پس از جوانه زدن برداشت می‌شوند؛ درست زمانی که گیاه تمام پتانسیل ژنتیکی، آنزیم‌ها و منابع زیستی خود را برای شکوفایی بسیج کرده است.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-brown-800 dark:text-brown-200 text-sm">
                                        <strong>بمب آنتی‌اکسیدان:</strong> بروکلی میکروگرین منبع بی‌رقیب ماده ضدسرطان سولفورافان (Sulforaphane) است.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-brown-800 dark:text-brown-200 text-sm">
                                        <strong>هضم سبک و جذب فوری:</strong> فاقد ترکیبات ضدتغذیه و پر از آنزیم‌های فعال برای بهبود هضم روزانه.
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                <span>مشاهده کیت‌های کشت خانگی</span>
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                            {microBenefits.map((b, i) => (
                                <div
                                    key={i}
                                    className="p-8 bg-white dark:bg-brown-900 rounded-3xl border border-brown-100 dark:border-brown-800 shadow-sm hover:shadow-lg transition-shadow"
                                >
                                    <div className="text-4xl font-display font-extrabold text-primary-700 dark:text-primary-400 mb-2">
                                        {b.stat}
                                    </div>
                                    <h4 className="text-lg font-bold text-brown-900 dark:text-cream mb-2">
                                        {b.title}
                                    </h4>
                                    <p className="text-sm text-brown-600 dark:text-brown-300 leading-relaxed">
                                        {b.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy / Quote Banner */}
            <section className="py-24 bg-white dark:bg-brown-900 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-primary-700 dark:text-primary-400 font-bold text-xs tracking-widest uppercase">
                        {t('philosophy.label')}
                    </span>
                    <h2 
                        className="text-3xl sm:text-4xl font-display font-extrabold text-brown-900 dark:text-cream mt-3 mb-8 leading-snug"
                        dangerouslySetInnerHTML={{ __html: t('philosophy.title') }}
                    />
                    <div className="space-y-6 text-base text-brown-700 dark:text-brown-300 leading-relaxed max-w-3xl mx-auto">
                        <p>{t('philosophy.p1')}</p>
                        <p>{t('philosophy.p2')}</p>
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action */}
            <section className="py-20 bg-primary-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary-800/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl sm:text-5xl font-display font-extrabold mb-6 leading-tight">
                        آماده‌اید رویش سلامت را به خانه‌تان بیاورید؟
                    </h2>
                    <p className="text-base sm:text-lg text-primary-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        با کیت‌های خانگی رُستارا، لذت چیدن و چشیدن سبزینه‌های زنده و سوپرفودهای طبیعی را تجربه کنید.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-bold text-base hover:scale-105 transition-all shadow-xl"
                        >
                            <span>سفارش محصولات و کیت‌ها</span>
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-base transition-all border border-white/20"
                        >
                            داستان رُستارا
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
