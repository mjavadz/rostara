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
        <div className="min-h-screen bg-cream">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-brown-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-brown-900 mb-6">
                        روش کشت شیزن
                    </h1>
                    <p className="text-xl text-brown-700 leading-relaxed">
                        کشاورزی به سبک طبیعت، بدون دخالت مصنوعی
                    </p>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-10 rounded-2xl border border-brown-100 shadow-lg">
                        <h2 className="text-3xl font-display font-bold text-brown-900 mb-6">
                            فلسفه شیزن
                        </h2>
                        <p className="text-brown-800 leading-relaxed text-lg mb-4">
                            <span className="font-bold text-primary-700">شیزن</span> (自然) به معنای "طبیعی بودن"
                            یا "خودبودن" است. این فلسفه ژاپنی بر این باور است که بهترین نتایج زمانی حاصل می‌شوند
                            که ما اجازه دهیم طبیعت مسیر خود را طی کند.
                        </p>
                        <p className="text-brown-800 leading-relaxed text-lg">
                            در روستارا، ما این فلسفه را در هر مرحله از کشت برنج به کار می‌بریم - از کاشت تا برداشت،
                            همه چیز با احترام به ریتم طبیعی انجام می‌شود.
                        </p>
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-display font-bold text-brown-900 text-center mb-16">
                        اصول کشت ما
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {principles.map((principle, index) => {
                            const Icon = principle.icon;
                            return (
                                <div
                                    key={index}
                                    className="group text-center p-6 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-brown-900 mb-3">
                                        {principle.title}
                                    </h3>
                                    <p className="text-brown-700 text-sm leading-relaxed">
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
                    <h2 className="text-4xl font-display font-bold text-brown-900 text-center mb-16">
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
                                className="flex items-start gap-6 p-6 bg-white rounded-xl border border-brown-100 hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-lg">{item.step}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-brown-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-brown-700 leading-relaxed">
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
