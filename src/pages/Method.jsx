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
                            <img
                                src="/images/farm.jpg"
                                alt="مزرعه رستارا"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl"
                            />
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

            {/* Experience Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-brown-50 dark:from-brown-900 dark:to-brown-950 transition-colors duration-500">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-brown-900 dark:text-cream mb-6">
                            تجربه رُستارا
                        </h2>
                        <p className="text-xl text-brown-700 dark:text-brown-200 leading-relaxed">
                            فراتر از خرید محصول، یک تجربه به یادماندنی
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: 'Home',
                                title: 'اقامت بوم‌گردی',
                                description: 'در خانه‌های سنتی شمالی اقامت کنید و زندگی روستایی را تجربه کنید',
                            },
                            {
                                icon: 'Leaf',
                                title: 'سبک زندگی طبیعی',
                                description: 'تجربه سبک زندگی همگام با المان‌های طبیعی و ریتم فصل‌ها',
                            },
                            {
                                icon: 'Coffee',
                                title: 'خوراک فصلی و بومی',
                                description: 'از طعم‌های اصیل و غذاهای محلی تهیه شده با محصولات ارگانیک لذت ببرید',
                            },
                            {
                                icon: 'Users',
                                title: 'پویش‌های اجتماعی',
                                description: 'مشارکت در فعالیت‌های گروهی و پویش‌های اجتماعی برای حفظ محیط زیست',
                            },
                            {
                                icon: 'Palette',
                                title: 'خلاقیت فردی',
                                description: 'فضایی برای تجلی خلاقیت‌های فردی در دل طبیعت',
                            },
                            {
                                icon: 'Bike',
                                title: 'گردش در طبیعت',
                                description: 'با دوچرخه یا پیاده در مزارع و جنگل‌های هیرکانی گردش کنید',
                            },
                        ].map((exp, index) => {
                            const iconMap = {
                                'Home': () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
                                'Leaf': () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
                                'Coffee': () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>,
                                'Users': () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                                'Palette': () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
                                'Bike': () => <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                            };
                            const IconComponent = iconMap[exp.icon];
                            return (
                                <div
                                    key={index}
                                    className="group p-8 bg-white dark:bg-brown-900 rounded-2xl border border-brown-100 dark:border-brown-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <IconComponent />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-brown-900 dark:text-cream mb-4">
                                        {exp.title}
                                    </h3>
                                    <p className="text-brown-700 dark:text-brown-300 leading-relaxed text-lg">
                                        {exp.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Method;
