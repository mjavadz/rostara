import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Users, Target } from 'lucide-react';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-brown-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-brown-900 mb-6">
                        داستان ما
                    </h1>
                    <p className="text-xl text-brown-700 leading-relaxed">
                        سفری از حکمت باستانی به زمین‌های حاصلخیز گیلان
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-brown-800 leading-relaxed text-lg mb-6">
                            روستارا از ترکیب عمیق فلسفه <span className="font-bold text-primary-700">شیزن</span> (自然) ژاپنی
                            با سنت‌های غنی کشاورزی ایران متولد شد. ما معتقدیم که بهترین غذا زمانی حاصل می‌شود که
                            به جای اجبار طبیعت، با آن همکاری کنیم.
                        </p>
                        <p className="text-brown-800 leading-relaxed text-lg mb-6">
                            در دشت‌های سرسبز گیلان، ما برنج را به روشی کاملاً طبیعی کشت می‌کنیم - بدون سموم شیمیایی،
                            بدون کودهای مصنوعی، فقط با احترام به ریتم طبیعت.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-display font-bold text-brown-900 text-center mb-16">
                        ارزش‌های ما
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <MapPin className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-brown-900 mb-4">محلی و اصیل</h3>
                            <p className="text-brown-700 leading-relaxed">
                                ریشه در خاک گیلان، با افتخار به میراث کشاورزی ایران
                            </p>
                        </div>

                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-brown-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-brown-600" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-brown-900 mb-4">جامعه‌محور</h3>
                            <p className="text-brown-700 leading-relaxed">
                                حمایت از کشاورزان محلی و ایجاد اشتغال پایدار
                            </p>
                        </div>

                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Target className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-brown-900 mb-4">کیفیت بی‌نظیر</h3>
                            <p className="text-brown-700 leading-relaxed">
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
