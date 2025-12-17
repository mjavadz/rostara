import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
    const { t } = useTranslation();
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');

        // Simulate sending
        setTimeout(() => {
            setFormStatus('success');
            // Reset form after 3 seconds
            setTimeout(() => {
                setFormStatus('idle');
                e.target.reset();
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-brown-50 dark:from-brown-900 dark:to-brown-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-brown-900 dark:text-cream mb-6">
                        تماس با ما
                    </h1>
                    <p className="text-xl text-brown-700 dark:text-brown-200 leading-relaxed">
                        ما همیشه خوشحال می‌شویم که از شما بشنویم
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-8">
                                اطلاعات تماس
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-6 bg-white dark:bg-brown-900 rounded-xl border border-brown-100 dark:border-brown-800">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brown-900 dark:text-cream mb-2">آدرس</h3>
                                        <p className="text-brown-700 dark:text-brown-300 leading-relaxed">
                                            شمال کشور، سیاهکل، روستای گوکه
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white dark:bg-brown-900 rounded-xl border border-brown-100 dark:border-brown-800">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-brown-900 dark:text-cream mb-2">تلفن‌های تماس</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center border-b border-brown-50 dark:border-brown-800 pb-2">
                                                <span className="text-brown-600 dark:text-brown-400 text-sm">آقای زمانی</span>
                                                <span className="text-brown-800 dark:text-brown-200 font-medium" dir="ltr">0911 123 4567</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-1">
                                                <span className="text-brown-600 dark:text-brown-400 text-sm">آقای عطایی</span>
                                                <span className="text-brown-800 dark:text-brown-200 font-medium" dir="ltr">0911 987 6543</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white dark:bg-brown-900 rounded-xl border border-brown-100 dark:border-brown-800">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brown-900 dark:text-cream mb-2">ایمیل</h3>
                                        <p className="text-brown-700 dark:text-brown-300 leading-relaxed" dir="ltr">
                                            info@rostara.ir
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-brown-900 p-8 rounded-2xl border border-brown-100 dark:border-brown-800 shadow-lg relative overflow-hidden">
                            {formStatus === 'success' ? (
                                <div className="absolute inset-0 bg-white dark:bg-brown-900 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-brown-900 dark:text-cream mb-2">پیام شما دریافت شد!</h3>
                                    <p className="text-brown-600 dark:text-brown-300">به زودی با شما تماس خواهیم گرفت.</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-8">
                                        پیام خود را ارسال کنید
                                    </h2>

                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">نام و نام خانوادگی</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                                placeholder="نام خود را وارد کنید"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">ایمیل</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                                placeholder="example@email.com"
                                                dir="ltr"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">پیام</label>
                                            <textarea
                                                rows="5"
                                                required
                                                className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none text-brown-900 dark:text-cream"
                                                placeholder="پیام خود را بنویسید..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formStatus === 'sending'}
                                            className={`w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 ${formStatus === 'sending' ? 'opacity-75 cursor-wait' : ''
                                                }`}
                                        >
                                            {formStatus === 'sending' ? (
                                                <span>در حال ارسال...</span>
                                            ) : (
                                                <>
                                                    <span>ارسال پیام</span>
                                                    <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
