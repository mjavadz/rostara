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

            {/* Contact Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-brown-900 dark:text-cream mb-6">
                            تماس با ما
                        </h2>
                        <p className="text-xl text-brown-700 dark:text-brown-200 leading-relaxed">
                            ما همیشه خوشحال می‌شویم که از شما بشنویم
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-brown-900 rounded-xl border border-brown-100 dark:border-brown-800">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-brown-900 dark:text-cream mb-2">آدرس</h3>
                            <p className="text-brown-700 dark:text-brown-300 leading-relaxed">
                                شمال کشور، سیاهکل، روستای گوکه
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-brown-900 rounded-xl border border-brown-100 dark:border-brown-800">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-brown-900 dark:text-cream mb-2">تلفن‌های تماس</h3>
                            <div className="space-y-1 text-brown-700 dark:text-brown-300">
                                <p className="text-sm">آقای زمانی: <span dir="ltr">0911 123 4567</span></p>
                                <p className="text-sm">آقای عطایی: <span dir="ltr">0911 987 6543</span></p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-brown-900 rounded-xl border border-brown-100 dark:border-brown-800">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-brown-900 dark:text-cream mb-2">ایمیل</h3>
                            <p className="text-brown-700 dark:text-brown-300 leading-relaxed" dir="ltr">
                                info@rostara.ir
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
