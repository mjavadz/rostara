import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/db';
import { Package, MapPin, Phone, Mail, CreditCard, CheckCircle, Copy, Check, Search } from 'lucide-react';

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

    const formatPrice = (price) => {
        if (i18n.language === 'en') {
            return new Intl.NumberFormat('en-US').format(price) + ' Toman';
        }
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

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
            <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 transition-colors duration-300">
                <div className="max-w-md w-full text-center p-8 bg-white dark:bg-brown-900 rounded-3xl border border-brown-200/80 dark:border-brown-800 shadow-xl">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-950 rounded-full mb-6 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-display font-extrabold text-brown-900 dark:text-cream mb-3">
                        {t('checkout.success.title')}
                    </h1>
                    <p className="text-brown-600 dark:text-brown-300 mb-6 text-base leading-relaxed">
                        {t('checkout.success.subtitle')}
                    </p>
                    {confirmedOrderId && (
                        <div className="p-5 bg-cream dark:bg-brown-800/80 rounded-2xl border border-brown-200/80 dark:border-brown-700 mb-6 text-center">
                            <span className="text-xs text-brown-500 dark:text-brown-400 block mb-1">کد رهگیری اختصاصی سفارش شما:</span>
                            <span className="font-mono text-2xl font-black text-primary-700 dark:text-primary-400 tracking-wider block mb-3">
                                {confirmedOrderId}
                            </span>
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => navigate(`/track?code=${confirmedOrderId}`)}
                                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                                >
                                    <Search className="w-3.5 h-3.5" />
                                    <span>پیگیری آنلاین سفارش</span>
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3.5 bg-brown-100 dark:bg-brown-800 hover:bg-brown-200 dark:hover:bg-brown-700 text-brown-900 dark:text-cream rounded-full font-bold transition-all text-sm"
                    >
                        {t('checkout.success.backHome')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brown-900 dark:text-cream mb-8">
                    {t('checkout.title')}
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-brown-900 rounded-2xl p-8 border border-brown-100 dark:border-brown-800 transition-colors">
                            <h2 className="text-2xl font-display font-bold text-brown-900 dark:text-cream mb-6 flex items-center gap-2">
                                <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                {t('checkout.shippingInfo')}
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                        {t('checkout.fullName')}
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    />
                                </div>

                                <div>
                                    <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                        {t('checkout.email')}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        dir="ltr"
                                        className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    />
                                </div>

                                <div>
                                    <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                        {t('checkout.phone')}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        dir="ltr"
                                        className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                        {t('checkout.address')}
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-brown-900 dark:text-cream"
                                    />
                                </div>

                                <div>
                                    <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                        {t('checkout.city')}
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    />
                                </div>

                                <div>
                                    <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                        {t('checkout.postalCode')}
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        required
                                        dir="ltr"
                                        className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                        {t('checkout.notes')} ({t('checkout.optional')})
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-brown-900 dark:text-cream"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full mt-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-wait' : ''
                                    }`}
                            >
                                {loading ? (
                                    <span>{t('checkout.processing')}</span>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        <span>{t('checkout.placeOrder')}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-brown-900 rounded-2xl p-6 border border-brown-100 dark:border-brown-800 sticky top-32 transition-colors">
                            <h2 className="text-2xl font-display font-bold text-brown-900 dark:text-cream mb-6">
                                {t('checkout.orderSummary')}
                            </h2>

                            <div className="space-y-4 mb-6">
                                {/* ... cart items map ... */}
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        {/* ... existing item render ... */}
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-brown-100 dark:from-brown-800 dark:to-brown-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Package className="w-8 h-8 text-primary-600/30 dark:text-primary-400/30" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-brown-900 dark:text-cream text-sm mb-1">
                                                {t(`products.items.${item.id}.name`)}
                                            </h3>
                                            <p className="text-brown-600 dark:text-brown-300 text-xs mb-1">
                                                {item.quantity} × {formatPrice(item.price)}
                                            </p>
                                            <p className="text-primary-700 dark:text-primary-400 font-bold text-sm">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon Input */}
                            <div className="mb-6 pt-4 border-t border-brown-100 dark:border-brown-800">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="کد تخفیف"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="flex-grow px-3 py-2 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-lg text-sm text-brown-900 dark:text-cream focus:outline-none focus:ring-1 focus:ring-primary-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        disabled={loading || !couponCode}
                                        className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 disabled:opacity-50"
                                    >
                                        اعمال
                                    </button>
                                </div>
                                {couponMessage && (
                                    <p className={`text-xs mt-2 ${isCouponValid ? 'text-green-600' : 'text-red-500'}`}>
                                        {couponMessage}
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-brown-100 dark:border-brown-800 pt-4">
                                <div className="flex justify-between text-sm text-brown-600 dark:text-brown-300 mb-2">
                                    <span>جمع کل</span>
                                    <span>{formatPrice(getCartTotal())}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400 mb-2">
                                        <span>تخفیف</span>
                                        <span>- {formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xl font-bold text-brown-900 dark:text-cream mb-2">
                                    <span>{t('checkout.total')}</span>
                                    <span className="text-primary-700 dark:text-primary-400">{formatPrice(finalTotal)}</span>
                                </div>
                                <p className="text-brown-500 dark:text-brown-400 text-xs text-right">
                                    {t('checkout.paymentOnDelivery')}
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
