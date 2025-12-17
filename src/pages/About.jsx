import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Users, Target } from 'lucide-react';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-brown-50 dark:from-brown-900 dark:to-brown-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-brown-900 dark:text-cream mb-6">
                        داستان ما
                    </h1>
                    <p className="text-xl text-brown-700 dark:text-brown-200 leading-relaxed">
                        سفری از حکمت باستانی به زمین‌های حاصلخیز شمال
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-brown-800 dark:text-brown-100 leading-relaxed text-lg mb-6">
                            رُستارا از دل جنگل‌های هیرکانی و بیجارهای سرسبز شمال متولد شده است. ما میراث‌دار کشاورزانی هستیم که قرن‌ها با احترام به زمین، بهترین محصول دنیا را تولید کرده‌اند. ما معتقدیم که کیفیت واقعی نه از اجبار زمین، بلکه از همزیستی با آن حاصل می‌شود.
                        </p>
                        <p className="text-brown-800 dark:text-brown-100 leading-relaxed text-lg mb-6">
                            در دشت‌های سرسبز شمال، ما محصولات را به روشی کاملاً طبیعی کشت می‌کنیم - بدون سموم شیمیایی،
                            بلکه با استفاده از زنبورهای تریکوگراما برای مبارزه با آفات و اردک‌هایی که در بیجارها آزادانه می‌چرخند
                            و خاک را غنی می‌کنند.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-white dark:bg-brown-900 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-display font-bold text-brown-900 dark:text-cream text-center mb-16">
                        ارزش‌های ما
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <MapPin className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-4">محلی و اصیل</h3>
                            <p className="text-brown-700 dark:text-brown-300 leading-relaxed">
                                ریشه در خاک شمال، با افتخار به میراث کشاورزی ایران
                            </p>
                        </div>

                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-brown-100 dark:bg-brown-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-brown-600 dark:text-brown-300" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-4">جامعه‌محور</h3>
                            <p className="text-brown-700 dark:text-brown-300 leading-relaxed">
                                حمایت از کشاورزان محلی و ایجاد اشتغال پایدار
                            </p>
                        </div>

                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Target className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-4">کیفیت بی‌نظیر</h3>
                            <p className="text-brown-700 dark:text-brown-300 leading-relaxed">
                                تعهد به بالاترین استانداردهای کیفیت و سلامت
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
