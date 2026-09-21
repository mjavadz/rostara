import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Users, Target, ShieldCheck, Heart, Sparkles, Mail, MapPin } from 'lucide-react';

const About = () => {
    const { t } = useTranslation();

    const values = [
        {
            icon: Sprout,
            title: 'غذای زنده و غنی',
            description: 'تمرکز بر میکروگرین‌ها و جوانه‌هایی که در اوج تراکم زیستی و آنزیمی هستند؛ تغذیه‌ای مستقیم از طبیعت به سلول‌های شما.'
        },
        {
            icon: ShieldCheck,
            title: 'خلوص و اصالت بذر',
            description: 'تعهد قطعی به بذور غیرتراریخته، بدون استفاده از حتی یک قطره کود شیمیایی، آفت‌کش یا علف‌کش‌های صنعتی.'
        },
        {
            icon: Sparkles,
            title: 'سلامت میکروبیوم و روده',
            description: 'باور عمیق به فرآورده‌های تخمیری زنده (کامبوچا، کیمچی، میسو) به عنوان پایهٔ ایمنی قوی و تعادل خلق‌وخو.'
        },
        {
            icon: Users,
            title: 'توانمندسازی خانگی',
            description: 'ارائه کیت‌ها و آموزش‌های گام‌به‌گام تا هر فرد بتواند در آپارتمان خود ریزسبزی‌های تازه تولید کند.'
        },
        {
            icon: Heart,
            title: 'پایداری زیست‌محیطی',
            description: 'حذف زنجیره طولانی حمل‌ونقل و استفاده از بسترهای کشت ارگانیک و سلولزی کاملاً زیست‌تخریب‌پذیر.'
        },
        {
            icon: Target,
            title: 'دانش‌محور و شفاف',
            description: 'ترویج سبک زندگی سالم بر مبنای پژوهش‌های نوین تغذیه پاک (Clean Eating) و فیزیولوژی انسانی.'
        }
    ];

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-cream to-brown-50 dark:from-brown-900 dark:via-brown-950 dark:to-brown-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        مانیفست رویش
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brown-900 dark:text-cream mb-6 leading-tight">
                        داستان رُستارا؛ رویشِ آراسته‌ی سلامت
                    </h1>
                    <p className="text-lg sm:text-xl text-brown-700 dark:text-brown-200 leading-relaxed max-w-3xl mx-auto">
                        سفری به سوی پیوند دوباره با غذای زنده، کشاورزی ارگانیک و دستیابی به نشاط پایدار سلولی در زندگی روزمره.
                    </p>
                </div>
            </section>

            {/* Story / Mission */}
            <section className="py-20 bg-white dark:bg-brown-900 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none text-brown-800 dark:text-brown-200 space-y-6 leading-relaxed">
                        <p className="text-xl font-medium text-primary-800 dark:text-primary-300">
                            رُستارا با این پرسش بنیادین متولد شد: چگونه می‌توان در دنیای پرترافیک و پراسترس امروز، سلامت واقعی و غذای زنده را به قلب خانه‌ها آورد؟
                        </p>
                        <p>
                            ما متوجه شدیم که بخش عمده‌ای از خستگی‌های مزمن، افت تمرکز و مشکلات ایمنی انسان معاصر، ریشه در مصرف مواد غذایی فوق‌فراوری‌شده و سبزیجات دورافتاده از زمان چیده‌شدن دارد. وقتی یک سبزی روزها در یخچال‌ها و زنجیره انتقال می‌ماند، بخش بزرگی از آنزیم‌ها و ویتامین‌های حساس خود را از دست می‌دهد.
                        </p>
                        <p>
                            پاسخ ما، بازگشت به اعجاز <strong>میکروگرین‌ها (ریزسبزی‌ها)</strong>، <strong>تخمیرهای زنده</strong> و <strong>کشاورزی ارگانیک آپارتمانی</strong> بود. میکروگرین‌ها تنها یک سبزی ساده نیستند؛ بلکه بسته‌های متراکمی از مواد مغذی و آنتی‌اکسیدان‌ها هستند که تا ۵۰ برابر سبزیجات معمولی ارزش غذایی دارند و در فضایی به وسعت یک سینی کوچک، روی میز آشپزخانه شما جوانه می‌زنند.
                        </p>
                        <p>
                            هدف رُستارا این است که با ارائه باکیفیت‌ترین بذور ارگانیک، کیت‌های رشد استاندارد خانگی، خوراکی‌های تخمیری زنده و دانش کاربردی، شما را به کشاورز و حامی سلامت خود و خانواده‌تان تبدیل کند.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-20 bg-cream/60 dark:bg-brown-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-brown-900 dark:text-cream mb-4">
                            اصول و باورهای ما
                        </h2>
                        <p className="text-brown-600 dark:text-brown-300 text-lg">
                            هر آنچه در رُستارا آماده می‌شود، از این شش ارزش بنیادین سرچشمه می‌گیرد.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((val, idx) => {
                            const IconComponent = val.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-8 bg-white dark:bg-brown-900 rounded-3xl border border-brown-100 dark:border-brown-800 hover:shadow-xl transition-all duration-300 flex flex-col"
                                >
                                    <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6 text-primary-600 dark:text-primary-400">
                                        <IconComponent className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-3">
                                        {val.title}
                                    </h3>
                                    <p className="text-brown-600 dark:text-brown-300 leading-relaxed text-sm flex-grow">
                                        {val.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact & Support */}
            <section className="py-20 bg-white dark:bg-brown-900 transition-colors duration-300">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-brown-900 dark:text-cream mb-4">
                        ارتباط با تیم رُستارا
                    </h2>
                    <p className="text-lg text-brown-600 dark:text-brown-300 mb-12 max-w-2xl mx-auto">
                        سوالی درباره پرورش میکروگرین‌ها، انتخاب کیت یا همکاری در زمینه محصولات ارگانیک دارید؟ با کمال میل پاسخگوی شما هستیم.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-cream/40 dark:bg-brown-800/60 rounded-3xl border border-brown-100 dark:border-brown-700 flex flex-col items-center">
                            <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
                            <h4 className="font-bold text-brown-900 dark:text-cream mb-2">ایمیل مستقیم</h4>
                            <p className="text-brown-600 dark:text-brown-300 text-sm" dir="ltr">info@rostara.ir</p>
                        </div>

                        <div className="p-8 bg-cream/40 dark:bg-brown-800/60 rounded-3xl border border-brown-100 dark:border-brown-700 flex flex-col items-center">
                            <MapPin className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
                            <h4 className="font-bold text-brown-900 dark:text-cream mb-2">خاستگاه و تولید</h4>
                            <p className="text-brown-600 dark:text-brown-300 text-sm">مزرعه و کارگاه زیستی رُستارا</p>
                        </div>

                        <div className="p-8 bg-cream/40 dark:bg-brown-800/60 rounded-3xl border border-brown-100 dark:border-brown-700 flex flex-col items-center">
                            <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
                            <h4 className="font-bold text-brown-900 dark:text-cream mb-2">همراهی و پشتیبانی</h4>
                            <p className="text-brown-600 dark:text-brown-300 text-sm">پاسخگویی در وبسایت و شبکه‌های رُستارا</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
