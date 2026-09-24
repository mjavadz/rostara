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

const STATUS_STEPS = [
    { key: 'pending', label: 'ثبت سفارش', desc: 'سفارش شما در سیستم ثبت شد', icon: Clock },
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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
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
        <div className="min-h-screen bg-cream dark:bg-brown-950 pt-28 pb-20 transition-colors duration-300">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200 dark:border-primary-800">
                    <Sparkles className="w-3.5 h-3.5" />
                    سامانه هوشمند رهگیری مرسولات
                </span>
                <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-brown-900 dark:text-cream mb-4">
                    پیگیری سفارش رُستارا
                </h1>
                <p className="text-brown-600 dark:text-brown-300 text-base max-w-xl mx-auto leading-relaxed">
                    با وارد کردن کد پیگیری (مانند <span className="font-mono font-bold text-primary-700 dark:text-primary-400">ROS-948122</span>) یا شماره تماس، از آخرین وضعیت آماده‌سازی و ارسال محصول خود آگاه شوید.
                </p>

                {/* Search Box */}
                <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl mx-auto">
                    <div className="relative flex items-center shadow-lg rounded-full overflow-hidden border-2 border-primary-300 dark:border-primary-700/60 bg-white dark:bg-brown-900 focus-within:border-primary-600 transition-all">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="کد رهگیری (مثلاً ROS-948122) یا شماره موبایل..."
                            className="w-full px-6 py-4 bg-transparent text-brown-900 dark:text-cream placeholder-brown-400 dark:placeholder-brown-500 focus:outline-none text-base text-right font-medium"
                        />
                        <button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="m-1.5 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-full font-bold flex items-center gap-2 transition-all"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Search className="w-4 h-4" />
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
                    <div className="p-8 bg-white dark:bg-brown-900 rounded-3xl border border-amber-200 dark:border-amber-900/40 text-center shadow-sm max-w-lg mx-auto">
                        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                            سفارشی با این مشخصات یافت نشد
                        </h3>
                        <p className="text-brown-600 dark:text-brown-300 text-sm mb-6 leading-relaxed">
                            لطفاً از صحت کد پیگیری ارسالی در فاکتور یا پیامک اطمینان حاصل کنید. اگر به تازگی ثبت کرده‌اید، چند دقیقه دیگر مجدداً بررسی فرمایید.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold hover:underline text-sm"
                        >
                            <span>ارتباط با پشتیبانی رُستارا</span>
                            <ArrowRight className="w-4 h-4 rotate-180" />
                        </Link>
                    </div>
                )}

                {order && (
                    <div className="bg-white dark:bg-brown-900 rounded-3xl border border-brown-200/80 dark:border-brown-800 shadow-xl overflow-hidden transition-colors">
                        {/* Order Header Banner */}
                        <div className="p-6 sm:p-8 bg-gradient-to-r from-primary-700 via-primary-600 to-emerald-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-semibold px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                                        شناسه سفارش
                                    </span>
                                    <h2 className="text-2xl font-mono font-bold tracking-wider">
                                        {order.id}
                                    </h2>
                                    <button
                                        onClick={handleCopyCode}
                                        title="کپی شناسه"
                                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white/80">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>ثبت شده در: {formatDate(order.created_at)}</span>
                                </div>
                            </div>

                            <div className="text-left sm:text-right">
                                <span className="text-xs text-white/80 block mb-1">مبلغ نهایی پرداخت شده</span>
                                <span className="text-2xl font-bold font-sans">
                                    {formatPrice(order.total_price)}
                                </span>
                            </div>
                        </div>

                        {/* Status Stepper */}
                        {order.status === 'cancelled' ? (
                            <div className="p-6 bg-red-50 dark:bg-red-950/40 border-b border-red-200 dark:border-red-900 text-center">
                                <span className="text-red-700 dark:text-red-400 font-bold">
                                    این سفارش به درخواست مشتری یا عدم تایید پرداخت لغو گردیده است.
                                </span>
                            </div>
                        ) : (
                            <div className="p-6 sm:p-8 border-b border-brown-100 dark:border-brown-800 bg-cream/30 dark:bg-brown-950/30">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                                    {STATUS_STEPS.map((step, idx) => {
                                        const StepIcon = step.icon;
                                        const isCompleted = activeStep >= idx;
                                        const isCurrent = activeStep === idx;

                                        return (
                                            <div key={step.key} className="flex flex-col items-center text-center relative z-10">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all ${
                                                    isCompleted 
                                                        ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30 scale-105' 
                                                        : 'bg-brown-100 dark:bg-brown-800 text-brown-400 dark:text-brown-500'
                                                } ${isCurrent ? 'ring-4 ring-primary-300 dark:ring-primary-900/60 animate-pulse' : ''}`}>
                                                    <StepIcon className="w-6 h-6" />
                                                </div>
                                                <h4 className={`text-sm font-bold mb-1 ${
                                                    isCompleted ? 'text-brown-900 dark:text-cream' : 'text-brown-400 dark:text-brown-500'
                                                }`}>
                                                    {step.label}
                                                </h4>
                                                <p className="text-xs text-brown-500 dark:text-brown-400 max-w-[140px] leading-tight hidden sm:block">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Customer & Delivery Information */}
                        <div className="p-6 sm:p-8 grid md:grid-cols-2 gap-8 border-b border-brown-100 dark:border-brown-800">
                            <div>
                                <h3 className="text-base font-bold text-brown-900 dark:text-cream mb-4 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                    اطلاعات تحویل‌گیرنده
                                </h3>
                                <div className="space-y-2 text-sm text-brown-700 dark:text-brown-300 bg-cream dark:bg-brown-800/50 p-4 rounded-2xl">
                                    <div className="flex justify-between">
                                        <span className="text-brown-500 dark:text-brown-400">نام و نام‌خانوادگی:</span>
                                        <span className="font-bold">{order.full_name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-brown-500 dark:text-brown-400">شماره تماس:</span>
                                        <span className="font-mono">{order.phone}</span>
                                    </div>
                                    {order.city && (
                                        <div className="flex justify-between">
                                            <span className="text-brown-500 dark:text-brown-400">شهر مقصد:</span>
                                            <span>{order.city}</span>
                                        </div>
                                    )}
                                    <div className="pt-2 border-t border-brown-200/60 dark:border-brown-700/60">
                                        <span className="text-brown-500 dark:text-brown-400 block mb-1">نشانی پستی:</span>
                                        <span className="leading-relaxed block">{order.address}</span>
                                    </div>
                                    {order.postal_code && (
                                        <div className="flex justify-between pt-1">
                                            <span className="text-brown-500 dark:text-brown-400">کد پستی:</span>
                                            <span className="font-mono">{order.postal_code}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-brown-900 dark:text-cream mb-4 flex items-center gap-2">
                                    <Package className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                    اقلام سفارش ({order.items?.length || 0} مورد)
                                </h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                    {order.items && order.items.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="flex items-center justify-between p-3 rounded-xl bg-cream dark:bg-brown-800/40 border border-brown-100 dark:border-brown-800"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-xs">
                                                    {item.quantity}×
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-bold text-brown-900 dark:text-cream">
                                                        {item.name}
                                                    </h5>
                                                    {item.weight && (
                                                        <span className="text-xs text-brown-500 dark:text-brown-400">
                                                            {item.weight}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-primary-700 dark:text-primary-400">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
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
                        <div className="p-6 bg-cream/50 dark:bg-brown-950/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                            <span className="text-brown-600 dark:text-brown-300">
                                نیاز به تغییر در آدرس یا زمان تحویل دارید؟
                            </span>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brown-900 dark:bg-brown-800 hover:bg-brown-800 dark:hover:bg-brown-700 text-white rounded-full font-bold transition-colors"
                            >
                                <Phone className="w-4 h-4" />
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
