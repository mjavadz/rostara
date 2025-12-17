import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Bike, Camera, Coffee, Users, Palette, Leaf } from 'lucide-react';

const Experience = () => {
    const { t } = useTranslation();

    const experiences = [
        {
            icon: Home,
            title: 'اقامت بوم‌گردی',
            description: 'در خانه‌های سنتی شمالی اقامت کنید و زندگی روستایی را تجربه کنید',
        },
        {
            icon: Leaf,
            title: 'سبک زندگی طبیعی',
            description: 'تجربه سبک زندگی همگام با المان‌های طبیعی و ریتم فصل‌ها',
        },
        {
            icon: Coffee,
            title: 'خوراک فصلی و بومی',
            description: 'از طعم‌های اصیل و غذاهای محلی تهیه شده با محصولات ارگانیک لذت ببرید',
        },
        {
            icon: Users,
            title: 'پویش‌های اجتماعی',
            description: 'مشارکت در فعالیت‌های گروهی و پویش‌های اجتماعی برای حفظ محیط زیست',
        },
        {
            icon: Palette,
            title: 'خلاقیت فردی',
            description: 'فضایی برای تجلی خلاقیت‌های فردی در دل طبیعت',
        },
        {
            icon: Bike,
            title: 'گردش در طبیعت',
            description: 'با دوچرخه یا پیاده در مزارع برنج و جنگل‌های هیرکانی گردش کنید',
        },
    ];

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-brown-50 dark:from-brown-900 dark:to-brown-950 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-brown-900 dark:text-cream mb-6">
                        تجربه رُستارا
                    </h1>
                    <p className="text-xl text-brown-700 dark:text-brown-200 leading-relaxed">
                        فراتر از خرید محصول، یک تجربه به یادماندنی
                    </p>
                </div>
            </section>

            {/* Experiences */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {experiences.map((exp, index) => {
                            const Icon = exp.icon;
                            return (
                                <div
                                    key={index}
                                    className="group p-8 bg-white dark:bg-brown-900 rounded-2xl border border-brown-100 dark:border-brown-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className="w-8 h-8 text-white" />
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

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        آماده برای یک تجربه منحصر به فرد؟
                    </h2>
                    <p className="text-xl text-primary-100 mb-10 leading-relaxed">
                        با ما تماس بگیرید و سفر خود را رزرو کنید
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-10 py-5 bg-white text-primary-700 rounded-xl font-bold text-lg hover:bg-cream hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        رزرو تجربه
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Experience;
