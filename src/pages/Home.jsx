import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    Leaf, 
    Heart, 
    Sprout, 
    Sparkles, 
    Package, 
    CheckCircle2, 
    ShieldCheck, 
    Flame, 
    HeartPulse, 
    Apple 
} from 'lucide-react';

const Home = () => {
    const { t } = useTranslation();

    const pillars = [
        {
            icon: Sprout,
            color: 'primary',
            title: 'میکروگرین و جوانه‌ها',
            desc: 'ریزسبزی‌های سرشار از آنزیم‌های زنده و سولفورافان با تراکم مواد مغذی تا ۴۰ برابر سبزیجات بالغ.'
        },
        {
            icon: Sparkles,
            color: 'amber',
            title: 'تخمیری‌ها و پروبیوتیک',
            desc: 'کامبوچا، کیمچی و میسوی زنده برای احیا و تقویت میکروبیوم روده و محور حیاتی مغز-گوارش.'
        },
        {
            icon: HeartPulse,
            color: 'emerald',
            title: 'قارچ‌های دارویی و آداپتوژن',
            desc: 'شیتاکه، یال شیر و ریشی برای ارتقای وضوح ذهنی، تنظیم پاسخ به استرس و استحکام سیستم ایمنی.'
        },
        {
            icon: Package,
            color: 'primary',
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
            desc: 'کشت کاملاً بیودینامیک با آب زلال و بذور غیرتراریخته، بدون قطره‌ای سموم شیمیایی و علف‌کش.'
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
            <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-cream to-brown-50/50 dark:from-brown-950 dark:via-brown-900/60 dark:to-brown-950 transition-colors duration-500"></div>

                {/* Decorative glowing orbs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-primary-300/25 dark:bg-primary-900/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-white/90 dark:bg-brown-800/90 backdrop-blur-md rounded-full border border-primary-200/80 dark:border-brown-700 shadow-sm">
                        <Sprout className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span className="text-sm font-semibold text-brown-800 dark:text-cream">
                            {t('philosophy.label')}
                        </span>
                        <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-brown-900 dark:text-cream mb-6 leading-tight tracking-tight">
                        رویشِ آراسته‌ی سلامت <br />
                        <span className="text-primary-700 dark:text-primary-400 font-light italic">
                            در هماهنگی با طبیعت
                        </span>
                    </h1>

                    <p 
                        className="text-lg sm:text-xl text-brown-700 dark:text-brown-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/products"
                            className="w-full sm:w-auto group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-bold shadow-lg shadow-primary-600/20 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <span>{t('hero.cta')}</span>
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/method"
                            className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-brown-800/80 backdrop-blur border-2 border-brown-200 dark:border-brown-700 text-brown-800 dark:text-brown-200 rounded-2xl font-semibold hover:bg-brown-50 dark:hover:bg-brown-700 hover:border-primary-400 transition-all duration-300 text-center"
                        >
                            راهنمای کشت خانگی
                        </Link>
                    </div>

                    {/* Highlights tags */}
                    <div className="mt-14 pt-8 border-t border-brown-200/50 dark:border-brown-800 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-sm font-medium text-brown-600 dark:text-brown-300">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            میکروگرین‌های غنی از سولفورافان
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            فرآورده‌های زنده و پروبیوتیک
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            کیت‌های کشت آپارتمانی
                        </span>
                    </div>
                </div>
            </section>

            {/* 4 Core Pillars Section */}
            <section className="py-24 bg-white dark:bg-brown-900 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary-600 dark:text-primary-400 font-bold text-sm uppercase tracking-widest">
                            چهار ستون رُستارا
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-brown-900 dark:text-cream mt-3 mb-5">
                            غذای زنده برای آگاهی و تندرستی سلولی
                        </h2>
                        <p className="text-brown-600 dark:text-brown-300 text-lg leading-relaxed">
                            ما چرخه‌ای کامل از رویش، فرآوری زیستی و تغذیه پاک را در دسترس شما قرار می‌دهیم.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pillars.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group p-8 bg-cream/50 dark:bg-brown-800/60 rounded-3xl border border-brown-100 dark:border-brown-700 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-md">
                                        <IconComponent className="w-8 h-8 text-white" />
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
            <section className="py-24 bg-gradient-to-br from-primary-50/60 via-cream to-brown-50 dark:from-brown-950 dark:via-brown-900 dark:to-brown-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <span className="px-4 py-1.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider">
                                انقلاب سبز خانگی
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-display font-bold text-brown-900 dark:text-cream mt-4 mb-6 leading-tight">
                                چرا میکروگرین‌ها غوغایی در سلامت برپا کرده‌اند؟
                            </h2>
                            <p className="text-brown-700 dark:text-brown-300 text-lg leading-relaxed mb-8">
                                میکروگرین‌ها در مرحلهٔ نخستین رویش پس از جوانه زدن برداشت می‌شوند؛ درست زمانی که گیاه تمام پتانسیل ژنتیکی، آنزیم‌ها و منابع زیستی خود را برای شکوفایی بسیج کرده است.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                                    <p className="text-brown-800 dark:text-brown-200">
                                        <strong>بمب آنتی‌اکسیدان:</strong> بروکلی میکروگرین منبع بی‌رقیب ماده ضدسرطان سولفورافان (Sulforaphane) است.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                                    <p className="text-brown-800 dark:text-brown-200">
                                        <strong>هضم سبک و جذب فوری:</strong> فاقد ترکیبات ضدتغذیه و پر از آنزیم‌های فعال برای بهبود هضم روزانه.
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                <span>مشاهده کیت‌های کشت خانگی</span>
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                            {microBenefits.map((b, i) => (
                                <div
                                    key={i}
                                    className="p-8 bg-white dark:bg-brown-900 rounded-3xl border border-brown-100 dark:border-brown-800 shadow-sm hover:shadow-xl transition-shadow"
                                >
                                    <div className="text-4xl font-display font-extrabold text-primary-600 dark:text-primary-400 mb-2">
                                        {b.stat}
                                    </div>
                                    <h4 className="text-lg font-bold text-brown-900 dark:text-cream mb-3">
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
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-sm tracking-widest uppercase">
                        {t('philosophy.label')}
                    </span>
                    <h2 
                        className="text-3xl sm:text-5xl font-display font-bold text-brown-900 dark:text-cream mt-4 mb-8 leading-snug"
                        dangerouslySetInnerHTML={{ __html: t('philosophy.title') }}
                    />
                    <div className="space-y-6 text-lg text-brown-700 dark:text-brown-300 leading-relaxed max-w-3xl mx-auto">
                        <p>{t('philosophy.p1')}</p>
                        <p>{t('philosophy.p2')}</p>
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action */}
            <section className="py-20 bg-gradient-to-br from-brown-900 via-brown-850 to-brown-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl sm:text-5xl font-display font-bold mb-6 leading-tight">
                        آماده‌اید رویش سلامت را به خانه‌تان بیاورید؟
                    </h2>
                    <p className="text-lg sm:text-xl text-brown-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        با کیت‌های خانگی رُستارا، لذت چیدن و چشیدن سبزینه‌های زنده و سوپرفودهای طبیعی را تجربه کنید.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-500 hover:scale-105 transition-all shadow-xl"
                        >
                            <span>سفارش محصولات و کیت‌ها</span>
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
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
