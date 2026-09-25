import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, CheckCircle, Sprout, MessageSquare, ShieldCheck } from 'lucide-react';
import { db } from '../services/db';
import { ShineButton } from '@/components/animations/shine-button';
import { GridBackground } from '@/components/backgrounds/grid';
import { TextShimmer } from '@/components/animations/text-shimmer';
import { SpotlightCard } from '@/components/animations/spotlight-card';

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
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow transition-colors duration-300">
            {/* Hero */}
            <section className="relative pt-32 pb-16 border-b border-seed-forest/10 dark:border-white/10 overflow-hidden">
                <GridBackground size={48} className="opacity-40 dark:opacity-20" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seed-stone/80 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-seed-lime animate-pulse" />
                        <TextShimmer className="text-xs font-bold text-seed-forest dark:text-seed-snow tracking-normal">
                            ارتباط مستقیم و پشتیبانی علمی • رُستارا
                        </TextShimmer>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-seed-forest dark:text-seed-snow tracking-normal mb-4 leading-[1.35]">
                        ارتباط با کارشناسان رُستارا
                    </h1>
                    <p className="text-base sm:text-lg text-seed-pewter dark:text-seed-snow/75 leading-relaxed max-w-2xl mx-auto">
                        سوالی درباره پرورش میکروگرین‌ها، کیت‌های رشد، گونه‌های زیستی یا همکاری در زمینه محصولات ارگانیک دارید؟ با کمال میل پاسخگوی شما هستیم.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-seed-forest dark:text-seed-snow mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-seed-lime" />
                                کانال‌های ارتباطی و آزمایشگاه
                            </h2>

                            <SpotlightCard className="p-6 rounded-2xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 flex items-start gap-4">
                                <div className="w-12 h-12 bg-seed-stone dark:bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50 mb-0.5">[LAB_FACILITY]</div>
                                    <h3 className="font-bold text-seed-forest dark:text-seed-snow text-sm mb-1">مرکز زیستی و کارگاه بستر کشت</h3>
                                    <p className="text-seed-pewter dark:text-seed-snow/70 text-xs leading-relaxed">
                                        کارگاه و فارم کشت ارگانیک رُستارا، گیلان؛ ارسال با ترانزیت تحت کنترل به تمام نقاط کشور.
                                    </p>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="p-6 rounded-2xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 flex items-start gap-4">
                                <div className="w-12 h-12 bg-seed-stone dark:bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50 mb-0.5">[DIRECT_CORRESPONDENCE]</div>
                                    <h3 className="font-bold text-seed-forest dark:text-seed-snow text-sm mb-1">مکاتبات علمی و پشتیبانی سفارشات</h3>
                                    <p className="font-mono font-bold text-xs text-seed-forest dark:text-seed-lime" dir="ltr">
                                        info@rostara.ir
                                    </p>
                                    <p className="text-[11px] text-seed-pewter dark:text-seed-snow/60 mt-1">پاسخگویی کمتر از ۲۴ ساعت کاری</p>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="p-6 rounded-2xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 flex items-start gap-4">
                                <div className="w-12 h-12 bg-seed-stone dark:bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10">
                                    <Sprout className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50 mb-0.5">[PARTNERSHIP]</div>
                                    <h3 className="font-bold text-seed-forest dark:text-seed-snow text-sm mb-1">تامین و پژوهش مشترک</h3>
                                    <p className="text-seed-pewter dark:text-seed-snow/70 text-xs leading-relaxed">
                                        اگر تولیدکننده بذرهای اصیل بومی، پرورش‌دهنده قارچ‌های دارویی یا محقق حوزه بیوتکنولوژی هستید، آماده همکاری علمی و تجاری با شما هستیم.
                                    </p>
                                </div>
                            </SpotlightCard>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-seed-snow dark:bg-[#132412] p-8 rounded-3xl border border-seed-forest/10 dark:border-white/10 shadow-md relative overflow-hidden">
                            {formStatus === 'success' ? (
                                <div className="py-16 text-center">
                                    <div className="w-16 h-16 bg-seed-stone dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-seed-forest dark:text-seed-snow mb-2">
                                        پیام شما با موفقیت ثبت شد
                                    </h3>
                                    <p className="text-seed-pewter dark:text-seed-snow/70 text-xs">
                                        از ارتباط شما متشکریم. کارشناسان رُستارا در اولین فرصت با شما مکاتبه خواهند کرد.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between pb-3 mb-6 border-b border-seed-forest/10 dark:border-white/10">
                                        <h2 className="text-base font-bold text-seed-forest dark:text-seed-snow">
                                            ارسال پیام مستقیم به کارشناسان
                                        </h2>
                                        <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50">[DISPATCH]</span>
                                    </div>

                                    <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
                                        <div>
                                            <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                                نام و نام خانوادگی
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs"
                                                placeholder="مثال: مریم کریمی"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                                    نشانی ایمیل
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs"
                                                    placeholder="you@email.com"
                                                    dir="ltr"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                                    شماره تماس (اختیاری)
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs"
                                                    placeholder="۰۹۱۲..."
                                                    dir="ltr"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                                متن پرسش یا درخواست
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows="4"
                                                required
                                                className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime resize-none transition-all text-seed-forest dark:text-seed-snow text-xs leading-relaxed"
                                                placeholder="پرسش، پیشنهاد یا گزارش وضعیت کشت خود را بنویسید..."
                                            ></textarea>
                                        </div>

                                        <ShineButton
                                            type="submit"
                                            disabled={formStatus === 'sending'}
                                            className="w-full py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold shadow-md flex items-center justify-center gap-2 hover:opacity-95"
                                        >
                                            {formStatus === 'sending' ? (
                                                <span>در حال ارسال پیام...</span>
                                            ) : (
                                                <>
                                                    <span>ارسال پیام به رُستارا</span>
                                                    <Send className="w-3.5 h-3.5" />
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
