import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';

const Cart = () => {
    const { t, i18n } = useTranslation();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const formatPrice = (price) => {
        if (i18n.language === 'en') {
            return new Intl.NumberFormat('en-US').format(price) + ' Toman';
        }
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 transition-colors duration-300">
                <div className="text-center max-w-md">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-brown-100 dark:bg-brown-800 rounded-full mb-6">
                        <ShoppingCart className="w-12 h-12 text-brown-400 dark:text-brown-500" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-4">
                        {t('cart.empty.title')}
                    </h2>
                    <p className="text-brown-600 dark:text-brown-300 mb-8">
                        {t('cart.empty.subtitle')}
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                        <span>{t('cart.empty.shopNow')}</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                        {t('cart.title')}
                    </h1>
                    <p className="text-brown-600 dark:text-brown-300">
                        {t('cart.subtitle', { count: cartItems.length })}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-brown-900 rounded-2xl p-6 border border-brown-100 dark:border-brown-800 hover:shadow-lg transition-all"
                            >
                                <div className="flex gap-6">
                                    {/* Product Image Placeholder */}
                                    <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-brown-100 dark:from-brown-800 dark:to-brown-700 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Package className="w-10 h-10 text-primary-600/30 dark:text-primary-400/30" />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                                            {t(`products.items.${item.id}.name`)}
                                        </h3>
                                        <p className="text-brown-600 dark:text-brown-300 text-sm mb-4">
                                            {item.weight}
                                        </p>

                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 bg-cream dark:bg-brown-800 rounded-xl p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-brown-700 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4 text-brown-700 dark:text-brown-200" />
                                                </button>
                                                <span className="w-12 text-center font-bold text-brown-900 dark:text-cream">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-brown-700 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4 text-brown-700 dark:text-brown-200" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-left">
                                                <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                                            >
                                                <Trash2 className="w-5 h-5 text-brown-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Clear Cart Button */}
                        <button
                            onClick={clearCart}
                            className="w-full py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium transition-colors"
                        >
                            {t('cart.clearCart')}
                        </button>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-brown-900 rounded-2xl p-6 border border-brown-100 dark:border-brown-800 sticky top-32 transition-colors">
                            <h2 className="text-2xl font-display font-bold text-brown-900 dark:text-cream mb-6">
                                {t('cart.summary.title')}
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-brown-700 dark:text-brown-300">
                                    <span>{t('cart.summary.items')}</span>
                                    <span>{cartItems.length}</span>
                                </div>
                                <div className="flex justify-between text-brown-700 dark:text-brown-300">
                                    <span>{t('cart.summary.subtotal')}</span>
                                    <span>{formatPrice(getCartTotal())}</span>
                                </div>
                                <div className="border-t border-brown-100 dark:border-brown-800 pt-4">
                                    <div className="flex justify-between text-xl font-bold text-brown-900 dark:text-cream">
                                        <span>{t('cart.summary.total')}</span>
                                        <span className="text-primary-700 dark:text-primary-400">{formatPrice(getCartTotal())}</span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="block w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                {t('cart.checkout')}
                            </Link>

                            <Link
                                to="/products"
                                className="block w-full mt-4 py-3 text-center text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl font-medium transition-colors"
                            >
                                {t('cart.continueShopping')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
