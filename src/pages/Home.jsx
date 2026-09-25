import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    Leaf, 
    Sprout, 
    Sparkles, 
    Package, 
    ShieldCheck, 
    HeartPulse,
    Search,
    Award,
    CheckCircle2
} from 'lucide-react';

const Home = () => {
    const { t } = useTranslation();

    const featuredBadges = [
        {
            title: 'میکروگرین بروکلی تازه',
            sub: 'غنی‌ترین منبع طبیعی سولفورافان (تا ۵۰ برابر بروکلی بالغ) برای سم‌زدایی سلولی و تقویت سیستم ایمنی.',
            icon: Sprout,
            tag: 'سوپرفود فعال',
            id: 'micro_broccoli'
        },
        {
            title: 'کیت کشت خانگی ۷ روزه',
            sub: 'سینی دو‌طبقه با زهکشی خودکار، پدهای سلولزی ارگانیک و ۴ بسته بذر خالص غیرتراریخته برای رویش در آپارتمان.',
            icon: Package,
            tag: 'کشت آسان در خانه',
            id: 'micro_kit_starter'
        },
        {
            title: 'کامبوچای تخمیری زنجبیل و لیمو',
            sub: 'نوشیدنی زنده تخمیر سنتی با پروبیوتیک‌های فعال برای احیای میکروبیوم و هضم سبک غذا.',
            icon: Sparkles,
            tag: 'پروبیوتیک زنده',
            id: 'kombucha'
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
            desc: 'میکروگرین‌ها غلظت خیره‌کننده‌ای از ویتامین‌های C، E، K و کاروتنوئیدهای ضدالتهاب نسبت به برگ‌های بالغ دارند.'
        },
        {
            stat: '۷-۱۰',
            title: 'روز تا چیدن تازه',
            desc: 'چرخه رویش فوق‌سریع در خانه؛ بدون نیاز به باغچه، روی پیشخوان آشپزخانه جوانه می‌زنند و تازه مصرف می‌شوند.'
        },
        {
            stat: '۱۰۰٪',
            title: 'ارگانیک و عاری از سموم',
            desc: 'کشت کاملاً پاک با آب زلال و بذرهای دیم اصلاح‌نشده، بدون استفاده از حتی یک قطره سم یا کود شیمیایی.'
        },
        {
            stat: '۰ کیلومتر',
            title: 'فاصله مزرعه تا بشقاب',
            desc: 'حذف کامل حمل‌ونقل و افت تازگی در انبارها؛ سوپرفود زنده مستقیماً از بستر کشت خانگی به سالاد شما می‌آید.'
        }
    ];

    return (
        <div className="min-h-screen bg-canvas-light dark:bg-canvas-dark text-brown-900 dark:text-cream transition-colors duration-500">
            {/* HERO SECTION */}
            <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
                {/* Ambient Soft Mesh Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-primary-600/10 via-primary-400/5 to-amber-500/5 dark:from-primary-600/15 dark:via-primary-950/20 dark:to-transparent rounded-full blur-[110px] pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Eyebrow Pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 dark:bg-primary-400/10 text-primary-800 dark:text-primary-300 border border-primary-500/20 dark:border-primary-400/20 text-xs font-bold tracking-wider mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>پلتفرم زیست‌پایدار رُستارا</span>
                        <span className="text-primary-400/60 dark:text-primary-500/60">•</span>
                        <span>غذای زنده و کشاورزی شهری</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-brown-900 dark:text-cream mb-6 tracking-tight leading-[1.14]">
                        رویشِ آراسته‌ی سلامت <br />
                        <span className="text-primary-700 dark:text-primary-400 font-medium">
                            در هماهنگی با طبیعت
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg lg:text-xl text-brown-700 dark:text-brown-300/90 mb-10 max-w-3xl mx-auto leading-relaxed font-normal">
                        تجربهٔ کاشت و برداشت تازه‌ترین میکروگرین‌ها، نوشیدنی‌های تخمیری زنده و سوپرفودهای فعال بدون سموم شیمیایی؛ برای انرژی پایدار سلولی و پیوند دوباره با خاک.
                    </p>

                    {/* Primary & Secondary CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mb-16">
                        <Link
                            to="/products"
                            className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-lift shadow-primary-700/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 text-sm sm:text-base"
                        >
                            <span>کاوش محصولات ارگانیک</span>
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/method"
                            className="w-full sm:w-auto px-8 py-4 bg-white/70 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.12] text-brown-900 dark:text-cream rounded-full font-bold text-sm sm:text-base backdrop-blur-md transition-all active:scale-[0.98]"
                        >
                            راهنمای کشت خانگی
                        </Link>
                    </div>

                    {/* 3 HERO SHOWCASE CARDS (Quiet Luxury Bento Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-right">
                        {featuredBadges.map((badge, idx) => {
                            const IconComponent = badge.icon;
                            return (
                                <Link
                                    key={idx}
                                    to="/products"
                                    className="p-6 bg-white/80 dark:bg-surface-dark/85 backdrop-blur-xl rounded-3xl border border-black/[0.06] dark:border-white/[0.08] hover:border-primary-500/40 dark:hover:border-primary-400/40 hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <div className="w-11 h-11 rounded-2xl bg-primary-50 dark:bg-primary-950/60 border border-primary-100 dark:border-primary-900/60 flex items-center justify-center text-primary-700 dark:text-primary-400 group-hover:scale-105 transition-transform flex-shrink-0">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <span className="text-[11px] font-bold text-primary-800 dark:text-primary-300 bg-primary-50/80 dark:bg-primary-950/60 px-3 py-1 rounded-full border border-primary-200/60 dark:border-primary-800/60">
                                                {badge.tag}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-display font-bold text-brown-900 dark:text-cream mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                                            {badge.title}
                                        </h3>
                                        <p className="text-xs text-brown-600 dark:text-brown-300/80 leading-relaxed">
                                            {badge.sub}
                                        </p>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs font-bold text-primary-700 dark:text-primary-400">
                                        <span>مشاهده محصول</span>
                                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4 CORE PILLARS SECTION */}
            <section className="py-24 bg-surface-light dark:bg-surface-dark border-y border-black/[0.04] dark:border-white/[0.06] transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary-700 dark:text-primary-400 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200/60 dark:border-primary-800/60">
                            ستون‌های فلسفی رُستارا
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brown-900 dark:text-cream mt-4 mb-4">
                            غذای زنده برای آگاهی و تندرستی سلولی
                        </h2>
                        <p className="text-brown-600 dark:text-brown-300/80 text-sm sm:text-base leading-relaxed">
                            ما چرخه‌ای کامل از رویش خانگی، فرآوری سنتی زیستی و تغذیه پاک را در دسترس شما قرار می‌دهیم.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-7 bg-canvas-light/60 dark:bg-canvas-dark/60 rounded-3xl border border-black/[0.05] dark:border-white/[0.07] hover:border-primary-400/40 dark:hover:border-primary-500/40 hover:shadow-whisper transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-sm">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-display font-bold text-brown-900 dark:text-cream mb-2.5">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-brown-600 dark:text-brown-300/80 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* IMPACT / WHY MICROGREENS */}
            <section className="py-24 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary-700 dark:text-primary-400 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200/60 dark:border-primary-800/60">
                                انقلاب سبز خانگی
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brown-900 dark:text-cream mt-4 mb-6 leading-tight">
                                چرا میکروگرین‌ها تحولی در تغذیه مدرن هستند؟
                            </h2>
                            <p className="text-brown-700 dark:text-brown-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                                میکروگرین‌ها در مرحلهٔ نخستین رویش پس از جوانه زدن برداشت می‌شوند؛ درست زمانی که گیاه تمام پتانسیل ژنتیکی، آنزیم‌ها و منابع زیستی خود را برای شکوفایی متمرکز کرده است.
                            </p>

                            <div className="space-y-3.5 mb-8">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-brown-800 dark:text-brown-200 text-xs sm:text-sm">
                                        <strong>بمب آنتی‌اکسیدان:</strong> بروکلی میکروگرین منبع بی‌رقیب ماده ضدسرطان سولفورافان (Sulforaphane) است.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-brown-800 dark:text-brown-200 text-xs sm:text-sm">
                                        <strong>هضم سبک و جذب فوری:</strong> فاقد ترکیبات ضدتغذیه و پر از آنزیم‌های فعال برای بهبود هضم روزانه.
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                            >
                                <span>مشاهده کیت‌های کشت خانگی</span>
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                            {microBenefits.map((b, i) => (
                                <div
                                    key={i}
                                    className="p-7 bg-white dark:bg-surface-dark rounded-3xl border border-black/[0.05] dark:border-white/[0.07] shadow-whisper"
                                >
                                    <div className="text-3xl sm:text-4xl font-display font-extrabold text-primary-700 dark:text-primary-400 mb-2 font-mono">
                                        {b.stat}
                                    </div>
                                    <h4 className="text-base font-bold text-brown-900 dark:text-cream mb-2">
                                        {b.title}
                                    </h4>
                                    <p className="text-xs text-brown-600 dark:text-brown-300/80 leading-relaxed">
                                        {b.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SUSTAINABLE CHARTER / EDITORIAL BANNER */}
            <section className="py-24 bg-surface-light dark:bg-surface-dark border-t border-black/[0.04] dark:border-white/[0.06] transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-[11px] font-extrabold tracking-widest uppercase text-primary-700 dark:text-primary-400 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200/60 dark:border-primary-800/60">
                        منشور زیست‌پایدار رُستارا
                    </span>
                    <h2 
                        className="text-3xl sm:text-4xl font-display font-extrabold text-brown-900 dark:text-cream mt-4 mb-8 leading-snug"
                        dangerouslySetInnerHTML={{ __html: t('philosophy.title') }}
                    />
                    <div className="space-y-6 text-sm sm:text-base text-brown-700 dark:text-brown-300/90 leading-relaxed max-w-3xl mx-auto font-normal">
                        <p>{t('philosophy.p1')}</p>
                        <p>{t('philosophy.p2')}</p>
                    </div>
                </div>
            </section>

            {/* EDITORIAL BOTTOM CTA */}
            <section className="py-20 bg-primary-800 dark:bg-surface-dark text-white relative overflow-hidden border-t border-primary-700/40">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold mb-6 backdrop-blur">
                        <Award className="w-3.5 h-3.5 text-gold-500" />
                        <span>تضمین اصالت و خلوص ۱۰۰٪ بذرها</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-display font-extrabold mb-6 leading-tight">
                        آماده‌اید رویش سلامت را به خانه‌تان بیاورید؟
                    </h2>
                    <p className="text-sm sm:text-base text-primary-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        با کیت‌های خانگی رُستارا، لذت چیدن و چشیدن سبزینه‌های زنده و سوپرفودهای طبیعی را در زندگی روزمره تجربه کنید.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-bold text-sm shadow-lift transition-all"
                        >
                            <span>سفارش محصولات و کیت‌ها</span>
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-sm transition-all border border-white/15"
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
