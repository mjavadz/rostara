import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    Search, 
    Package, 
    Truck, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Phone, 
    MapPin, 
    Calendar, 
    Copy, 
    Check, 
    ArrowRight,
    Sprout,
    Sparkles
} from 'lucide-react';
import { db } from '../services/db';
import { Stepper } from '@/components/ui/stepper';
import { Price } from '@/components/ui/price';

const STATUS_STEPS = [
    { key: 'pending', label: 'ثبت سفارش', desc: 'سفارش در سیستم ثبت شد', icon: Clock },
    { key: 'processing', label: 'آماده‌سازی ارگانیک', desc: 'چینش تازه میکروگرین و بسته‌بندی زیستی', icon: Sprout },
    { key: 'shipped', label: 'ارسال با پیک/پست', desc: 'بسته تحویل ناوگان حمل‌ونقل گردید', icon: Truck },
    { key: 'delivered', label: 'تحویل داده شد', desc: 'محصول سالم به دست شما رسید', icon: CheckCircle2 },
];

const TrackOrder = () => {
    const { t, i18n } = useTranslation();
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('code') || '');
    const [order, setOrder] = useState(null);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            setQuery(code);
            performSearch(code);
        }
    }, [searchParams]);

    const performSearch = async (searchTerm) => {
        if (!searchTerm || !searchTerm.trim()) return;
        setLoading(true);
        setSearched(true);
        try {
            const result = await db.orders.getById(searchTerm.trim());
            setOrder(result);
        } catch (e) {
            console.error('Tracking search error:', e);
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        performSearch(query);
    };

    const handleCopyCode = () => {
        if (!order?.id) return;
        navigator.clipboard.writeText(order.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (isoString) => {
        if (!isoString) return 'نامشخص';
        try {
            const date = new Date(isoString);
            return new Intl.DateTimeFormat('fa-IR', {
                dateStyle: 'medium',
                timeStyle: 'short'
            }).format(date);
        } catch {
            return isoString;
        }
    };

    // Calculate active step index
    const getStepIndex = (status) => {
        switch (status) {
            case 'pending': return 0;
            case 'processing': return 1;
            case 'shipped': return 2;
            case 'delivered': return 3;
            case 'cancelled': return -1;
            default: return 0;
        }
    };

    const activeStep = order ? getStepIndex(order.status) : 0;

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark pt-28 pb-20 transition-colors duration-300">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <span className="badge-lime mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    سامانه هوشمند رهگیری مرسولات
                </span>
                <h1 className="text-3xl sm:text-5xl font-display font-black text-seed-forest dark:text-seed-snow mb-4">
                    پیگیری سفارش رُستارا
                </h1>
                <p className="text-seed-pewter dark:text-seed-snow/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
                    با وارد کردن کد پیگیری (مانند <span className="font-mono font-bold text-seed-forest dark:text-seed-lime">ROS-948122</span>) یا شماره تماس، از آخرین وضعیت آماده‌سازی و ارسال محصول خود آگاه شوید.
                </p>

                {/* Search Box */}
                <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl mx-auto">
                    <div className="relative flex items-center rounded-pill bg-white dark:bg-seed-glassDark border border-seed-forest/20 dark:border-white/20 focus-within:border-seed-forest dark:focus-within:border-seed-lime transition-all">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="کد رهگیری (مثلاً ROS-948122) یا شماره موبایل..."
                            className="w-full px-6 py-3.5 bg-transparent text-seed-forest dark:text-seed-snow placeholder-seed-pewter/60 focus:outline-none text-xs sm:text-sm text-right font-medium"
                        />
                        <button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="m-1.5 px-6 py-2.5 bg-seed-forest hover:bg-seed-forestDeep dark:bg-seed-lime dark:hover:bg-seed-limeHover text-seed-snow dark:text-seed-forest rounded-pill font-bold text-xs flex items-center gap-1.5 transition-all"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Search className="w-3.5 h-3.5" />
                                    <span>پیگیری</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Results Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {searched && !order && !loading && (
                    <div className="p-8 seed-card text-center max-w-lg mx-auto">
                        <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-seed-forest dark:text-seed-snow mb-2">
                            سفارشی با این مشخصات یافت نشد
                        </h3>
                        <p className="text-seed-pewter dark:text-seed-snow/70 text-xs mb-6 leading-relaxed">
                            لطفاً از صحت کد پیگیری ارسالی در فاکتور یا پیامک اطمینان حاصل کنید. اگر به تازگی ثبت کرده‌اید، چند دقیقه دیگر مجدداً بررسی فرمایید.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 text-seed-forest dark:text-seed-lime font-bold hover:underline text-xs"
                        >
                            <span>ارتباط با پشتیبانی رُستارا</span>
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                        </Link>
                    </div>
                )}

                {order && (
                    <div className="seed-card overflow-hidden">
                        {/* Order Header Banner */}
                        <div className="p-6 sm:p-8 bg-seed-forest text-seed-snow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-mono px-2.5 py-0.5 bg-white/10 rounded-full">
                                        شناسه سفارش
                                    </span>
                                    <h2 className="text-2xl font-mono font-black tracking-wider text-seed-lime">
                                        {order.id}
                                    </h2>
                                    <button
                                        onClick={handleCopyCode}
                                        title="کپی شناسه"
                                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-seed-lime" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-seed-snow/70 font-mono">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>ثبت شده در: {formatDate(order.created_at)}</span>
                                </div>
                            </div>

                            <div className="text-left sm:text-right">
                                <span className="text-xs text-seed-snow/70 block mb-1">مبلغ کل سفارش</span>
                                <Price amount={order.total_price} size="md" className="text-seed-lime" />
                            </div>
                        </div>

                        {/* VibeFarsi RTL Stepper */}
                        {order.status === 'cancelled' ? (
                            <div className="p-6 bg-red-50 dark:bg-red-950/40 border-b border-red-200 dark:border-red-900 text-center">
                                <span className="text-red-700 dark:text-red-400 font-bold text-xs">
                                    این سفارش به درخواست مشتری یا عدم تایید پرداخت لغو گردیده است.
                                </span>
                            </div>
                        ) : (
                            <div className="p-6 sm:p-8 border-b border-seed-forest/10 dark:border-white/10 bg-seed-stone/30 dark:bg-white/5">
                                <Stepper
                                    current={activeStep}
                                    steps={STATUS_STEPS.map(s => ({
                                        label: s.label,
                                        description: s.desc
                                    }))}
                                />
                            </div>
                        )}

                        {/* Customer & Delivery Information */}
                        <div className="p-6 sm:p-8 grid md:grid-cols-2 gap-8 border-b border-seed-forest/10 dark:border-white/10">
                            <div>
                                <h3 className="text-sm font-bold text-seed-forest dark:text-seed-snow mb-4 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-seed-forest dark:text-seed-lime" />
                                    اطلاعات تحویل‌گیرنده
                                </h3>
                                <div className="space-y-2 text-xs text-seed-pewter dark:text-seed-snow/80 bg-seed-stone/40 dark:bg-white/5 p-4 rounded-xl font-normal">
                                    <div className="flex justify-between">
                                        <span>نام و نام‌خانوادگی:</span>
                                        <span className="font-bold text-seed-forest dark:text-seed-snow">{order.full_name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>شماره تماس:</span>
                                        <span className="font-mono">{order.phone}</span>
                                    </div>
                                    {order.city && (
                                        <div className="flex justify-between">
                                            <span>شهر مقصد:</span>
                                            <span>{order.city}</span>
                                        </div>
                                    )}
                                    <div className="pt-2 border-t border-seed-forest/10 dark:border-white/10">
                                        <span className="block mb-1">نشانی پستی:</span>
                                        <span className="leading-relaxed block text-seed-forest dark:text-seed-snow">{order.address}</span>
                                    </div>
                                    {order.postal_code && (
                                        <div className="flex justify-between pt-1">
                                            <span>کد پستی:</span>
                                            <span className="font-mono">{order.postal_code}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-seed-forest dark:text-seed-snow mb-4 flex items-center gap-2">
                                    <Package className="w-4 h-4 text-seed-forest dark:text-seed-lime" />
                                    اقلام سفارش ({order.items?.length || 0} مورد)
                                </h3>
                                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                                    {order.items && order.items.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="flex items-center justify-between p-3 rounded-xl bg-seed-stone/40 dark:bg-white/5 border border-seed-forest/5 dark:border-white/5 text-xs"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-seed-stone dark:bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-seed-forest dark:text-seed-lime">
                                                    {item.quantity}×
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-seed-forest dark:text-seed-snow">
                                                        {item.name}
                                                    </h5>
                                                    {item.weight && (
                                                        <span className="text-[11px] text-seed-pewter dark:text-seed-snow/60">
                                                            {item.weight}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Price amount={item.price * item.quantity} size="sm" />
                                        </div>
                                    ))}
                                </div>
                                {order.notes && (
                                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                                        <span className="font-bold">یادداشت سفارش: </span>
                                        <span>{order.notes}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer / Support */}
                        <div className="p-6 bg-seed-stone/20 dark:bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                            <span className="text-seed-pewter dark:text-seed-snow/70">
                                نیاز به تغییر در آدرس یا زمان تحویل دارید؟
                            </span>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-seed-forest hover:bg-seed-forestDeep text-seed-snow rounded-pill font-bold transition-colors"
                            >
                                <Phone className="w-3.5 h-3.5 text-seed-lime" />
                                <span>پشتیبانی سفارشات</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
