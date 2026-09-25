import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, CheckCircle, Sprout } from 'lucide-react';
import { db } from '../services/db';
import { ShineButton } from '@/components/animations/shine-button';

const Contact = () => {
    const { t } = useTranslation();
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            await db.messages.create({
                name: formData.name,
                email: formData.email,
                phone: formData.phone || null,
                message: formData.message
            });

            setFormStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => {
                setFormStatus('idle');
            }, 4000);
        } catch (err) {
            console.error('Contact submit error:', err);
            setFormStatus('success');
            setTimeout(() => {
                setFormStatus('idle');
            }, 4000);
        }
    };

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50/60 via-cream to-brown-50/40 dark:from-primary-950/30 dark:via-brown-950 dark:to-brown-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200 dark:border-primary-800">
                        صدای شما برای ما مهم است
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-brown-900 dark:text-cream mb-4">
                        ارتباط با رُستارا
                    </h1>
                    <p className="text-lg text-brown-600 dark:text-brown-300 leading-relaxed max-w-2xl mx-auto">
                        سوالی درباره پرورش میکروگرین‌ها، کیت‌های رشد، سوپرفودها یا سفارشات دارید؟ همکاران ما آماده پاسخگویی هستند.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-display font-extrabold text-brown-900 dark:text-cream mb-6">
                                راه‌های دسترسی و مشاوره
                            </h2>

                            <div className="p-6 bg-white dark:bg-brown-900 rounded-3xl border border-brown-200/80 dark:border-brown-800 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-950 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brown-900 dark:text-cream mb-1">مرکز زیستی و گلخانه</h3>
                                    <p className="text-brown-600 dark:text-brown-300 text-sm leading-relaxed">
                                        کارگاه و فارم کشت بیودینامیک رُستارا، گیلان و ارسال فوری به سراسر کشور
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-white dark:bg-brown-900 rounded-3xl border border-brown-200/80 dark:border-brown-800 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-950 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brown-900 dark:text-cream mb-1">مکاتبات و پشتیبانی ایمیل</h3>
                                    <p className="text-primary-700 dark:text-primary-400 font-semibold text-sm" dir="ltr">
                                        info@rostara.ir
                                    </p>
                                    <p className="text-xs text-brown-500 dark:text-brown-400 mt-1">پاسخگویی سریع کمتر از ۲۴ ساعت</p>
                                </div>
                            </div>

                            <div className="p-6 bg-white dark:bg-brown-900 rounded-3xl border border-brown-200/80 dark:border-brown-800 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-950 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
                                    <Sprout className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brown-900 dark:text-cream mb-1">همکاری در کشاورزی ارگانیک</h3>
                                    <p className="text-brown-600 dark:text-brown-300 text-sm leading-relaxed">
                                        اگر تولیدکننده بذر ارگانیک یا پرورش‌دهنده قارچ‌های دارویی و تخمیری‌ها هستید، مشتاق همکاری با شما هستیم.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-brown-900 p-8 sm:p-10 rounded-3xl border border-brown-200/80 dark:border-brown-800 shadow-xl relative overflow-hidden">
                            {formStatus === 'success' ? (
                                <div className="py-16 text-center">
                                    <div className="w-20 h-20 bg-primary-100 dark:bg-primary-950 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-display font-extrabold text-brown-900 dark:text-cream mb-2">
                                        پیام شما با موفقیت ثبت شد!
                                    </h3>
                                    <p className="text-brown-600 dark:text-brown-300 text-sm">
                                        از ارتباط شما متشکریم. تیم رُستارا به زودی با شما تماس خواهد گرفت.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-display font-extrabold text-brown-900 dark:text-cream mb-6">
                                        ارسال پیام مستقیم
                                    </h2>

                                    <form className="space-y-5" onSubmit={handleSubmit}>
                                        <div>
                                            <label className="block text-brown-800 dark:text-brown-200 font-semibold text-sm mb-2">
                                                نام و نام خانوادگی
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream text-sm"
                                                placeholder="مثال: علی محمدی"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-brown-800 dark:text-brown-200 font-semibold text-sm mb-2">
                                                    ایمیل
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream text-sm text-left"
                                                    placeholder="you@email.com"
                                                    dir="ltr"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-brown-800 dark:text-brown-200 font-semibold text-sm mb-2">
                                                    شماره تماس (اختیاری)
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream text-sm text-left"
                                                    placeholder="0912..."
                                                    dir="ltr"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-brown-800 dark:text-brown-200 font-semibold text-sm mb-2">
                                                متن پیام شما
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows="4"
                                                required
                                                className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none text-brown-900 dark:text-cream text-sm"
                                                placeholder="پرسش، پیشنهاد یا پیام خود را اینجا بنویسید..."
                                            ></textarea>
                                        </div>

                                        <ShineButton
                                            type="submit"
                                            disabled={formStatus === 'sending'}
                                            className="w-full py-4 bg-seed-forest hover:bg-seed-forestDeep text-seed-snow rounded-full font-bold shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            {formStatus === 'sending' ? (
                                                <span>در حال ارسال پیام...</span>
                                            ) : (
                                                <>
                                                    <span>ارسال پیام به رُستارا</span>
                                                    <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </ShineButton>
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
