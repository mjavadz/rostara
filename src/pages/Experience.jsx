import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Sparkles, HeartPulse, Users, Coffee, Leaf, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Experience = () => {
    const { t } = useTranslation();

    const experiences = [
        {
            icon: Sprout,
            title: 'پرورش سبز در آپارتمان',
            description: 'تجربه دلنشین بذرپاشی، جوانه‌زدن و چیدن روزانه میکروگرین‌های تازه بدون نیاز به فضای باز یا باغچه.',
        },
        {
            icon: Sparkles,
            title: 'کارگاه‌های تخمیر زنده',
            description: 'آشنایی با تخمیر خانگی کامبوچا، کیمچی و خمیرترش برای غنی‌سازی میکروبیوم و تقویت گوارش.',
        },
        {
            icon: Coffee,
            title: 'تغذیه پاک و آگاهانه',
            description: 'جایگزینی غذاهای فرآوری‌شده با سوپرفودهای ارگانیک، عصاره‌های قارچ و اسموتی‌های سرشار از کلروفیل.',
        },
        {
            icon: HeartPulse,
            title: 'ارتقای انرژی و ایمنی سلولی',
            description: 'بهبود محسوس سطح انرژی، وضوح ذهنی و کیفیت خواب با حذف سموم و تأمین ریزمغذی‌های ضروری.',
        },
        {
            icon: Users,
            title: 'باشگاه و جامعه دوست‌داران سلامت',
            description: 'تبادل تجربه، رسپی‌های تغذیه و همراهی با افرادی که برای کیفیت زندگی و سلامت ارزش قائلند.',
        },
        {
            icon: Leaf,
            title: 'همزیستی با ریتم‌های طبیعت',
            description: 'هماهنگ‌سازی ساعات بیولوژیک بدن با طبیعت، احترام به چرخه فصل‌ها و مصرف مواد مغذی تازه.',
        },
    ];

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-cream to-brown-50 dark:from-brown-900 dark:via-brown-950 dark:to-brown-950 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        سفر به دنیای تندرستی
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brown-900 dark:text-cream mb-6 leading-tight">
                        تجربه سبک زندگی سالم با رُستارا
                    </h1>
                    <p className="text-lg sm:text-xl text-brown-700 dark:text-brown-200 leading-relaxed max-w-3xl mx-auto">
                        رُستارا فراتر از یک فروشگاه، سبکی نوین از مراقبت از بدن، تغذیه آگاهانه و همزیستی با حیات گیاهی است.
                    </p>
                </div>
            </section>

            {/* Experiences Grid */}
            <section className="py-20 bg-white dark:bg-brown-900 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {experiences.map((exp, index) => {
                            const Icon = exp.icon;
                            return (
                                <div
                                    key={index}
                                    className="group p-8 bg-cream/40 dark:bg-brown-800/50 rounded-3xl border border-brown-100 dark:border-brown-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-3">
                                        {exp.title}
                                    </h3>
                                    <p className="text-brown-600 dark:text-brown-300 leading-relaxed text-sm flex-grow">
                                        {exp.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-5xl font-display font-bold mb-6">
                        سفر سلامتی خود را از امروز شروع کنید
                    </h2>
                    <p className="text-lg sm:text-xl text-primary-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                        کیت پرورش خانگی خود را انتخاب کنید یا به جمع اعضای باشگاه تندرستی رُستارا بپیوندید.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-primary-800 rounded-2xl font-bold text-lg hover:bg-cream hover:scale-105 transition-all shadow-xl"
                        >
                            <span>مشاهده محصولات و کیت‌ها</span>
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/club"
                            className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-primary-800/60 text-white rounded-2xl font-bold text-lg hover:bg-primary-900 transition-all border border-white/20"
                        >
                            عضویت در باشگاه تندرستی
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Experience;
