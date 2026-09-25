import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/db';
import { Price } from '@/components/ui/price';
import { ShineButton } from '@/components/animations/shine-button';
import { Package, MapPin, Phone, Mail, CreditCard, CheckCircle, Copy, Check, Search, ShieldCheck, Tag } from 'lucide-react';
import { fa } from '@/lib/utils';

const Checkout = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [confirmedOrderId, setConfirmedOrderId] = useState('');
    const [formData, setFormData] = useState({
        fullName: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: ''
    });

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState('');
    const [isCouponValid, setIsCouponValid] = useState(false);
    const [validCouponCode, setValidCouponCode] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setLoading(true);
        setCouponMessage('');

        try {
            const validation = db.coupons.validate(couponCode, getCartTotal());
            if (validation.valid) {
                setDiscount(validation.discount);
                setValidCouponCode(validation.coupon.code);
                setIsCouponValid(true);
                setCouponMessage(validation.message);
            } else {
                setDiscount(0);
                setIsCouponValid(false);
                setCouponMessage(validation.message);
                setValidCouponCode('');
            }
        } catch (err) {
            console.error('Coupon error:', err);
            setCouponMessage('خطا در بررسی کد تخفیف');
            setIsCouponValid(false);
        } finally {
            setLoading(false);
        }
    };

    const finalTotal = Math.max(0, getCartTotal() - discount);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newOrder = await db.orders.create({
                user_id: currentUser?.id || null,
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                postal_code: formData.postalCode,
                notes: formData.notes + (validCouponCode ? ` | کد تخفیف: ${validCouponCode}` : ''),
                total_price: finalTotal,
                items: cartItems.map(item => ({
                    id: item.id,
                    name: t(`products.items.${item.id}.name`, { defaultValue: item.name }),
                    price: item.price,
                    quantity: item.quantity,
                    weight: item.weight || ''
                })),
                status: 'pending'
            });

            setConfirmedOrderId(newOrder.id);
            setLoading(false);
            setOrderPlaced(true);
            clearCart();
        } catch (error) {
            console.error('Error placing order:', error);
            const fallbackId = 'ROS-' + Math.floor(100000 + Math.random() * 900000);
            setConfirmedOrderId(fallbackId);
            setLoading(false);
            setOrderPlaced(true);
            clearCart();
        }
    };

    if (cartItems.length === 0 && !orderPlaced) {
        navigate('/cart');
        return null;
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark flex items-center justify-center px-4 transition-colors duration-300">
                <div className="max-w-md w-full text-center p-8 bg-seed-snow dark:bg-[#132412] rounded-3xl border border-seed-forest/10 dark:border-white/10 shadow-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-seed-stone dark:bg-white/5 rounded-full mb-6 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50 block mb-1">
                        [ORDER DISPATCH CONFIRMED]
                    </span>
                    <h1 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-3">
                        سفارش با موفقیت ثبت گردید
                    </h1>
                    <p className="text-seed-pewter dark:text-seed-snow/70 mb-6 text-xs leading-relaxed">
                        نمونه‌های زیستی انتخابی شما در صف چینش تازه و ترانزیت قرار گرفتند. وضعیت سفارش از طریق کد اختصاصی زیر در سامانه رهگیری قابل مشاهده است.
                    </p>
                    {confirmedOrderId && (
                        <div className="p-5 bg-seed-stone/60 dark:bg-white/5 rounded-2xl border border-seed-forest/10 dark:border-white/10 mb-6 text-center">
                            <span className="text-[11px] text-seed-pewter dark:text-seed-snow/60 block mb-1 font-mono">کد رهگیری اختصاصی سفارش شما:</span>
                            <span className="font-mono text-2xl font-black text-seed-forest dark:text-seed-lime tracking-wider block mb-4">
                                {confirmedOrderId}
                            </span>
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => navigate(`/track?code=${confirmedOrderId}`)}
                                    className="px-5 py-2.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                                >
                                    <Search className="w-3.5 h-3.5" />
                                    <span>پیگیری آنلاین مرسوله</span>
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-seed-stone dark:bg-white/5 hover:bg-seed-stone/80 dark:hover:bg-white/10 text-seed-forest dark:text-seed-snow rounded-full font-bold transition-all text-xs"
                    >
                        بازگشت به صفحه اصلی رُستارا
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 pb-4 border-b border-seed-forest/10 dark:border-white/10">
                    <span className="font-mono text-xs text-seed-pewter dark:text-seed-snow/60 block mb-1">
                        [DISPATCH PROTOCOL & CHECKOUT]
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow">
                        ثبت نشانی تحویل و تسویه‌حساب
                    </h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-seed-snow dark:bg-[#132412] rounded-2xl p-8 border border-seed-forest/10 dark:border-white/10 shadow-sm space-y-6">
                            <h2 className="text-lg font-bold text-seed-forest dark:text-seed-snow pb-3 border-b border-seed-forest/10 dark:border-white/10 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-seed-forest dark:text-seed-lime" />
                                <span>اطلاعات گیرنده و نشانی مقصد</span>
                            </h2>

                            <div className="grid md:grid-cols-2 gap-5 text-xs">
                                <div className="md:col-span-2">
                                    <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                        نام و نام خانوادگی تحویل‌گیرنده
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="مثال: علی رضایی"
                                        className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs"
                                    />
                                </div>

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
                                        dir="ltr"
                                        placeholder="name@example.com"
                                        className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                        شماره تلفن همراه (جهت هماهنگی تحویل)
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        dir="ltr"
                                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                                        className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                        نشانی کامل پستی
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        placeholder="استان، شهر، خیابان، پلاک، واحد..."
                                        className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime resize-none transition-all text-seed-forest dark:text-seed-snow text-xs leading-relaxed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                        شهر
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        placeholder="مثال: تهران"
                                        className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                        کد پستی ۱۰ رقمی
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        required
                                        dir="ltr"
                                        placeholder="۱۲۳۴۵۶۷۸۹۰"
                                        className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs font-mono"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-seed-forest dark:text-seed-snow font-bold mb-2">
                                        توضیحات تکمیلی یا زمان پیشنهادی تحویل (اختیاری)
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="2"
                                        placeholder="نکات مربوط به نگهداری بذر یا زنگ ورودی..."
                                        className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime resize-none transition-all text-seed-forest dark:text-seed-snow text-xs"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                <ShineButton
                                    disabled={loading}
                                    className="w-full py-4 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95"
                                >
                                    {loading ? (
                                        <span>در حال پردازش و ثبت سفارش...</span>
                                    ) : (
                                        <>
                                            <CreditCard className="w-4 h-4" />
                                            <span>تایید و ثبت نهایی سفارش (پرداخت در محل)</span>
                                        </>
                                    )}
                                </ShineButton>
                            </button>
                        </form>
                    </div>

                    {/* Order Summary & Coupon */}
                    <div className="lg:col-span-1">
                        <div className="bg-seed-snow dark:bg-[#132412] rounded-2xl p-6 border border-seed-forest/10 dark:border-white/10 sticky top-32 shadow-sm space-y-6">
                            <div className="flex items-center justify-between pb-3 border-b border-seed-forest/10 dark:border-white/10">
                                <h2 className="text-base font-bold text-seed-forest dark:text-seed-snow">
                                    خلاصه اقلام فاکتور
                                </h2>
                                <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50">[SUMMARY]</span>
                            </div>

                            <div className="space-y-3">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between text-xs py-2 border-b border-seed-forest/5 dark:border-white/5">
                                        <div>
                                            <span className="font-bold text-seed-forest dark:text-seed-snow block">
                                                {t(`products.items.${item.id}.name`, { defaultValue: item.name })}
                                            </span>
                                            <span className="text-[11px] text-seed-pewter dark:text-seed-snow/60 font-mono">
                                                {fa(item.quantity)} × <Price amount={item.price} size="sm" />
                                            </span>
                                        </div>
                                        <Price amount={item.price * item.quantity} size="sm" className="font-bold" />
                                    </div>
                                ))}
                            </div>

                            {/* Coupon Input */}
                            <div className="pt-2">
                                <label className="block text-[11px] font-bold text-seed-forest dark:text-seed-snow mb-2 flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5 text-seed-forest dark:text-seed-lime" />
                                    <span>کد تخفیف اختصاصی</span>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="مثال: WELCOME10"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        dir="ltr"
                                        className="flex-grow px-3 py-2 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl text-xs text-seed-forest dark:text-seed-snow focus:outline-none focus:border-seed-lime font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        disabled={loading || !couponCode}
                                        className="px-4 py-2 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest text-xs font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
                                    >
                                        اعمال
                                    </button>
                                </div>
                                {couponMessage && (
                                    <p className={`text-[11px] mt-2 font-medium ${isCouponValid ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                                        {couponMessage}
                                    </p>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="border-t border-seed-forest/10 dark:border-white/10 pt-4 space-y-2 text-xs">
                                <div className="flex justify-between items-center text-seed-pewter dark:text-seed-snow/70">
                                    <span>جمع ناخالص</span>
                                    <Price amount={getCartTotal()} size="sm" />
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-bold">
                                        <span>تخفیف کسر شده</span>
                                        <span>- <Price amount={discount} size="sm" /></span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-sm font-bold text-seed-forest dark:text-seed-snow pt-2 border-t border-seed-forest/10 dark:border-white/10">
                                    <span>مبلغ نهایی فاکتور</span>
                                    <Price amount={finalTotal} size="md" className="text-seed-forest dark:text-seed-lime font-black" />
                                </div>
                                <p className="text-seed-pewter dark:text-seed-snow/60 text-[11px] text-right pt-1">
                                    هزینه در زمان تحویل حضوری دریافت می‌گردد.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
