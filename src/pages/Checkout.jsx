import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Package, MapPin, Phone, Mail, CreditCard, CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        fullName: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: ''
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate order processing
        setTimeout(() => {
            // In production, this would save to Firebase/Database
            const order = {
                id: Date.now().toString(),
                items: cartItems,
                total: getCartTotal(),
                customerInfo: formData,
                createdAt: new Date().toISOString(),
                status: 'pending'
            };

            // Store order in localStorage for now
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            setLoading(false);
            setOrderPlaced(true);
            clearCart();
        }, 2000);
    };

    if (cartItems.length === 0 && !orderPlaced) {
        navigate('/cart');
        return null;
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                        <CheckCircle className="w-16 h-16 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-brown-900 mb-4">
                        {t('checkout.success.title')}
                    </h1>
                    <p className="text-brown-600 mb-8 text-lg">
                        {t('checkout.success.subtitle')}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg"
                    >
                        {t('checkout.success.backHome')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brown-900 mb-8">
                    {t('checkout.title')}
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-brown-100">
                            <h2 className="text-2xl font-display font-bold text-brown-900 mb-6 flex items-center gap-2">
                                <MapPin className="w-6 h-6 text-primary-600" />
                                {t('checkout.shippingInfo')}
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-brown-800 font-medium mb-2">
                                        {t('checkout.fullName')}
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-cream border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-brown-800 font-medium mb-2">
                                        {t('checkout.email')}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        dir="ltr"
                                        className="w-full px-4 py-3 bg-cream border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-brown-800 font-medium mb-2">
                                        {t('checkout.phone')}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        dir="ltr"
                                        className="w-full px-4 py-3 bg-cream border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-brown-800 font-medium mb-2">
                                        {t('checkout.address')}
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        className="w-full px-4 py-3 bg-cream border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-brown-800 font-medium mb-2">
                                        {t('checkout.city')}
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-cream border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-brown-800 font-medium mb-2">
                                        {t('checkout.postalCode')}
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        required
                                        dir="ltr"
                                        className="w-full px-4 py-3 bg-cream border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-brown-800 font-medium mb-2">
                                        {t('checkout.notes')} ({t('checkout.optional')})
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-3 bg-cream border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
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
                        <div className="bg-white rounded-2xl p-6 border border-brown-100 sticky top-32">
                            <h2 className="text-2xl font-display font-bold text-brown-900 mb-6">
                                {t('checkout.orderSummary')}
                            </h2>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-brown-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Package className="w-8 h-8 text-primary-600/30" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-brown-900 text-sm mb-1">
                                                {t(`products.items.${item.id}.name`)}
                                            </h3>
                                            <p className="text-brown-600 text-xs mb-1">
                                                {item.quantity} × {formatPrice(item.price)}
                                            </p>
                                            <p className="text-primary-700 font-bold text-sm">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-brown-100 pt-4">
                                <div className="flex justify-between text-xl font-bold text-brown-900 mb-2">
                                    <span>{t('checkout.total')}</span>
                                    <span className="text-primary-700">{formatPrice(getCartTotal())}</span>
                                </div>
                                <p className="text-brown-500 text-xs">
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
