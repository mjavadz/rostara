import React from 'react';
import { useTranslation } from 'react-i18next';
import { Droplets, Sun, Wind, Sprout } from 'lucide-react';

const Method = () => {
    const { t } = useTranslation();

    const principles = [
        {
            icon: Droplets,
            title: 'مدیریت طبیعی آب',
            description: 'استفاده از آب باران و سیستم‌های آبیاری طبیعی',
        },
        {
            icon: Sun,
            title: 'انرژی خورشیدی',
            description: 'بهره‌گیری از نور و گرمای طبیعی خورشید',
        },
        {
            icon: Wind,
            title: 'تهویه طبیعی',
            description: 'استفاده از جریان هوای طبیعی برای سلامت محصول',
        },
        {
            icon: Sprout,
            title: 'کود ارگانیک',
            description: 'استفاده از کمپوست و کودهای طبیعی',
        },
    ];

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-brown-50 dark:from-brown-900 dark:to-brown-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                        روش کشت سنتی غرب هیرکانی
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-brown-900 dark:text-cream mt-4 mb-6">
                        هماهنگی با ریتم طبیعت
                    </h2>
                    <p className="text-lg text-brown-700 dark:text-brown-300 max-w-3xl mx-auto leading-relaxed">
                        ما باور داریم که بهترین کیفیت زمانی حاصل می‌شود که به چرخه‌های طبیعی احترام بگذاریم.
                    </p>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                        <div className="order-2 lg:order-1">
                            <div className="bg-white dark:bg-brown-900 rounded-3xl p-8 border border-brown-100 dark:border-brown-800 shadow-xl">
                                <h3 className="text-2xl font-display font-bold text-brown-900 dark:text-cream mb-4">
                                    میراث کشاورزی غرب هیرکانی
                                </h3>
                                <p className="text-brown-700 dark:text-brown-300 leading-relaxed mb-6">
                                    کشاورزی در این جلگه تنها یک شغل نیست، بلکه راه و رسمی برای زندگی است. ما با تکیه بر دانش بومی و احترام به چرخه‌های طبیعی، محصولاتی پرورش می‌دهیم که طعم واقعی زمین را دارند.
                                </p>
                                <p className="text-brown-800 dark:text-brown-100 leading-relaxed text-lg">
                                    در رُستارا، ما این میراث را در هر مرحله از تولید محصولاتمان به کار می‌بریم - از کاشت تا برداشت،
                                    همه چیز با احترام به ریتم طبیعی انجام می‌شود.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            {/* Placeholder for an image or illustration */}
                            <div className="bg-brown-100 dark:bg-brown-800 rounded-3xl h-64 flex items-center justify-center text-brown-500 dark:text-brown-400 text-xl font-display">
                                تصویر مزرعه
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="py-20 bg-white dark:bg-brown-900 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-display font-bold text-brown-900 dark:text-cream text-center mb-16">
                        اصول کشت ما
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {principles.map((principle, index) => {
                            const Icon = principle.icon;
                            return (
                                <div
                                    key={index}
                                    className="group text-center p-6 bg-gradient-to-br from-primary-50 to-white dark:from-brown-800 dark:to-brown-900 rounded-2xl border border-primary-100 dark:border-brown-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-brown-900 dark:text-cream mb-3">
                                        {principle.title}
                                    </h3>
                                    <p className="text-brown-700 dark:text-brown-300 text-sm leading-relaxed">
                                        {principle.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-display font-bold text-brown-900 dark:text-cream text-center mb-16">
                        فرآیند کشت
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: '۱', title: 'آماده‌سازی زمین', desc: 'خاک به صورت طبیعی آماده می‌شود' },
                            { step: '۲', title: 'کاشت', desc: 'بذرها در زمان مناسب کاشته می‌شوند' },
                            { step: '۳', title: 'رشد', desc: 'گیاه با ریتم طبیعی خود رشد می‌کند' },
                            { step: '۴', title: 'برداشت', desc: 'برداشت در زمان بهینه طبیعی' },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="flex items-start gap-6 p-6 bg-white dark:bg-brown-900 rounded-xl border border-brown-100 dark:border-brown-800 hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-lg">{item.step}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-brown-700 dark:text-brown-300 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Method;
