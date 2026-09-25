import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Gift, Copy, Sparkles, Check, Users, Award, Zap, ArrowLeft } from 'lucide-react';
import ForumList from './Forum/ForumList';
import { GridBackground } from '@/components/backgrounds/grid';
import { TextShimmer } from '@/components/animations/text-shimmer';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { Badge } from '@/components/ui/badge';

const Club = () => {
    const { t } = useTranslation();
    const [copiedCode, setCopiedCode] = useState(null);

    // Offers & Accession Vouchers
    const offers = [
        {
            id: 1,
            code: 'WELCOME10',
            discount: '۱۰٪ تخفیف',
            title: 'ورود به زیست‌بوم رُستارا',
            desc: 'هدیه عضویت ویژه اولین سفارش میکروگرین و بستر کشت.',
            tag: 'خرید نخست'
        },
        {
            id: 2,
            code: 'FREESHIP',
            discount: 'ارسال رایگان',
            title: 'ترانزیت ایمن و سرد',
            desc: 'ارسال با ناوگان کنترل دما برای بسته‌های بالای ۵۰۰ هزار تومان.',
            tag: 'سراسر کشور'
        },
        {
            id: 3,
            code: 'ROSTARA20',
            discount: '۲۰٪ هدیه',
            title: 'باشگاه تندرستی پایدار',
            desc: 'تخفیف ویژه دوره‌های کشت خانگی و اشتراک ماهانه میکروگرین.',
            tag: 'تندرستی'
        }
    ];

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 border-b border-seed-forest/10 dark:border-white/10 overflow-hidden">
                <GridBackground size={48} className="opacity-40 dark:opacity-20" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seed-stone/80 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-seed-lime animate-pulse" />
                        <TextShimmer className="text-xs font-bold text-seed-forest dark:text-seed-snow tracking-normal">
                            حلقهٔ سلامت و همراهی زیستی • رُستارا
                        </TextShimmer>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-display font-black text-seed-forest dark:text-seed-snow tracking-normal mb-4">
                        باشگاه تندرستی و پژوهش زیستی
                    </h1>

                    <p className="text-base sm:text-lg text-seed-pewter dark:text-seed-snow/75 max-w-2xl mx-auto leading-relaxed">
                        دسترسی به تخفیف‌های انحصاری بذرها، تبادل تجربه در کشت آپارتمانی و مطالعه آخرین پژوهش‌های تغذیه بالینی.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Exclusive Offers Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-seed-forest/10 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <Gift className="w-5 h-5 text-seed-forest dark:text-seed-lime" />
                            <h2 className="text-lg font-bold text-seed-forest dark:text-seed-snow">
                                کدهای تخفیف و امتیازات
                            </h2>
                        </div>
                        <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50">[VOUCHERS]</span>
                    </div>

                    <div className="space-y-4">
                        {offers.map((offer) => (
                            <SpotlightCard
                                key={offer.id}
                                className="p-6 rounded-2xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="badge-lime text-xs font-bold">
                                        {offer.discount}
                                    </span>
                                    <span className="text-[10px] font-mono text-seed-pewter dark:text-seed-snow/50">
                                        {offer.tag}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-seed-forest dark:text-seed-snow mb-1">
                                    {offer.title}
                                </h3>

                                <p className="text-xs text-seed-pewter dark:text-seed-snow/70 mb-5 leading-relaxed">
                                    {offer.desc}
                                </p>

                                <div className="flex items-center justify-between bg-seed-stone/60 dark:bg-white/5 p-3 rounded-xl border border-seed-forest/10 dark:border-white/10 border-dashed">
                                    <span className="font-mono font-bold text-xs tracking-wider text-seed-forest dark:text-seed-lime">
                                        {offer.code}
                                    </span>
                                    <button
                                        onClick={() => copyToClipboard(offer.code)}
                                        className="text-xs px-2.5 py-1 rounded-lg bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest font-bold hover:opacity-90 transition-all flex items-center gap-1"
                                    >
                                        {copiedCode === offer.code ? (
                                            <>
                                                <Check className="w-3.5 h-3.5" />
                                                <span>کپی شد</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>کپی کد</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* Community Forum Column */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between pb-2 mb-6 border-b border-seed-forest/10 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-seed-forest dark:text-seed-lime" />
                            <h2 className="text-lg font-bold text-seed-forest dark:text-seed-snow">
                                تالار گفت‌وگو و تجارب کشت خانگی
                            </h2>
                        </div>
                        <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50">[FORUM]</span>
                    </div>

                    <ForumList />
                </div>
            </div>
        </div>
    );
};

export default Club;
