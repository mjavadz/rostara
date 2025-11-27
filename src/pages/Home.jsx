import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Heart, Sprout } from 'lucide-react';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-cream to-brown-50"></div>

                {/* Decorative circles */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-brown-200/30 rounded-full blur-3xl"></div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200">
                        <Leaf className="w-4 h-4 text-primary-600" />
                        <span className="text-sm font-medium text-brown-800">کشاورزی طبیعی شیزن</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold text-brown-900 mb-4 leading-tight">
                        رُستارا
                    </h1>
                    <p className="text-2xl md:text-3xl font-display text-primary-700 mb-8">
                        رویشِ آراسته‌ی طبیعی
                    </p>

                    <p className="text-lg md:text-xl text-brown-700 mb-12 max-w-2xl mx-auto leading-relaxed">
                        جایی که حکمت باستانی شیزن با روح حاصلخیز گیلان دیدار می‌کند
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/products"
                            className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <span>کاوش محصولات</span>
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/about"
                            className="px-8 py-4 bg-white border-2 border-brown-300 text-brown-800 rounded-xl font-semibold hover:bg-brown-50 hover:border-brown-400 transition-all duration-300"
                        >
                            درباره ما
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-brown-400 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-brown-400 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">فلسفه ما</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-brown-900 mt-4 mb-6">
                            طبیعت شتاب نمی‌کند،
                            <br />
                            <span className="text-primary-700">با این حال همه چیز انجام می‌شود</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group p-8 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Leaf className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-brown-900 mb-4">طبیعی و خالص</h3>
                            <p className="text-brown-700 leading-relaxed">
                                بدون مواد شیمیایی، بدون تظاهر. فقط طبیعت در بهترین حالت خود.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group p-8 bg-gradient-to-br from-brown-50 to-white rounded-2xl border border-brown-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-14 h-14 bg-brown-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Heart className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-brown-900 mb-4">با عشق پرورش یافته</h3>
                            <p className="text-brown-700 leading-relaxed">
                                هر دانه برنج با توجه و احترام به زمین کشت می‌شود.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group p-8 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Sprout className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-brown-900 mb-4">ریشه در سنت</h3>
                            <p className="text-brown-700 leading-relaxed">
                                ترکیبی از حکمت ژاپنی شیزن و فرهنگ غنی کشاورزی ایرانی.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        آماده تجربه تفاوت هستید؟
                    </h2>
                    <p className="text-xl text-brown-200 mb-10 leading-relaxed">
                        محصولات ما را کشف کنید و طعم واقعی طبیعت را بچشید
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-brown-900 rounded-xl font-bold text-lg hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        <span>مشاهده محصولات</span>
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
