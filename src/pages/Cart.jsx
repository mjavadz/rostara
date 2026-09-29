import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight, Package, ShieldCheck } from 'lucide-react';
import { Price } from '@/components/ui/price';
import { fa } from '@/lib/utils';
import { ShineButton } from '@/components/animations/shine-button';
import { TaxonomyTag } from '@/components/ui/TaxonomyTag';

const Cart = () => {
    const { t, i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark flex items-center justify-center px-4 transition-colors duration-300">
                <div className="text-center max-w-md p-8 rounded-3xl bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 shadow-sm">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-seed-stone dark:bg-white/5 rounded-full mb-6 border border-seed-forest/10 dark:border-white/10 text-seed-pewter dark:text-seed-lime">
                        <ShoppingCart className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-3">
                        {isEn ? 'Your Biological Cart is Empty' : 'سبد نمونه‌های زیستی خالی است'}
                    </h2>
                    <p className="text-xs text-seed-pewter dark:text-seed-snow/70 mb-8 leading-relaxed font-normal">
                        {isEn 
                            ? 'You have not added any living cultivars or home growing units to your cart yet. Explore the biological catalog to select active species.'
                            : 'شما هنوز هیچ واریته یا کیت کشتی به سبد خود اضافه نکرده‌اید. با مراجعه به کاتالوگ، گونه‌های فعال را انتخاب کنید.'}
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full text-xs font-bold hover:opacity-95 transition-all shadow-md"
                    >
                        <span>{isEn ? 'Explore Biological Catalog' : 'مشاهده کاتالوگ گونه‌های زیستی'}</span>
                        <ArrowIcon className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 pb-4 border-b border-seed-forest/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="mb-1">
                            <TaxonomyTag variant="lime">
                                {isEn ? 'Biological Dispatch & Order Manifest' : 'سفارش و تحویل گونه‌های زیستی'}
                            </TaxonomyTag>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow">
                            {isEn ? 'Selected Biological Specimens' : 'سبد سفارشات و نمونه‌های زیستی'}
                        </h1>
                    </div>
                    <span className="text-xs font-mono text-seed-pewter dark:text-seed-snow/60">
                        {isEn ? 'Item Count: ' : 'تعداد اقلام: '}
                        <b className="font-sans text-seed-forest dark:text-seed-lime">
                            {isEn ? cartItems.length : fa(cartItems.length)}
                        </b>
                        {isEn ? ' units' : ' مورد'}
                    </span>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item, cIndex) => (
                            <div
                                key={item.id}
                                className="bg-seed-snow dark:bg-[#132412] rounded-2xl p-6 border border-seed-forest/10 dark:border-white/10 shadow-sm transition-all"
                            >
                                <div className="flex flex-col sm:flex-row gap-5">
                                    {/* Icon Box */}
                                    <div className="w-20 h-20 rounded-xl bg-seed-stone dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-seed-forest dark:text-seed-lime">
                                        <Package className="w-8 h-8" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <div>
                                                <div className="mb-1">
                                                    <TaxonomyTag variant="muted">
                                                        {isEn ? `Item ${cIndex + 1}` : `قلم ${fa(cIndex + 1)}`}
                                                    </TaxonomyTag>
                                                </div>
                                                <h3 className="text-base font-bold text-seed-forest dark:text-seed-snow">
                                                    {isEn && item.name_en ? item.name_en : item.name}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-1.5 text-seed-pewter hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                                                title={isEn ? 'Remove Item' : 'حذف از سبد'}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <p className="text-xs text-seed-pewter dark:text-seed-snow/70 mb-4 font-normal">
                                            {item.weight}
                                        </p>

                                        <div className="flex items-center justify-between flex-wrap gap-4 pt-3 border-t border-seed-forest/10 dark:border-white/10">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 bg-seed-stone/70 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-full px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-seed-snow dark:hover:bg-white/10 transition-colors text-seed-forest dark:text-seed-snow"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold text-seed-forest dark:text-seed-snow">
                                                    {isEn ? item.quantity : fa(item.quantity)}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-seed-snow dark:hover:bg-white/10 transition-colors text-seed-forest dark:text-seed-snow"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <Price amount={item.price * item.quantity} size="md" className="text-seed-forest dark:text-seed-lime font-black" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Clear Cart Button */}
                        <div className="pt-2 text-start">
                            <button
                                onClick={clearCart}
                                className="text-xs text-red-500 hover:text-red-600 transition-colors font-medium underline-offset-4 hover:underline"
                            >
                                {isEn ? 'Clear Entire Cart' : 'خالی کردن کل سبد خرید'}
                            </button>
                        </div>
                    </div>

                    {/* Order Summary Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-seed-snow dark:bg-[#132412] rounded-2xl p-6 border border-seed-forest/10 dark:border-white/10 sticky top-32 shadow-sm space-y-6">
                            <div className="flex items-center justify-between pb-3 border-b border-seed-forest/10 dark:border-white/10">
                                <h2 className="text-base font-bold text-seed-forest dark:text-seed-snow">
                                    {isEn ? 'Summary' : 'خلاصه فاکتور'}
                                </h2>
                                <TaxonomyTag variant="muted">
                                    {isEn ? 'Invoice Sheet' : 'صورت‌حساب فاکتور'}
                                </TaxonomyTag>
                            </div>

                            <div className="space-y-3 text-xs font-normal">
                                <div className="flex justify-between items-center text-seed-pewter dark:text-seed-snow/70">
                                    <span>{isEn ? 'Total Specimens' : 'تعداد کل نمونه‌ها'}</span>
                                    <span className="font-bold text-seed-forest dark:text-seed-snow">
                                        {isEn ? `${cartItems.length} items` : `${fa(cartItems.length)} قلم`}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-seed-pewter dark:text-seed-snow/70">
                                    <span>{isEn ? 'Cold-Chain Transit' : 'هزینه ترانزیت سرد'}</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                        {isEn ? 'Free (Health Initiative)' : 'رایگان (طرح سلامت)'}
                                    </span>
                                </div>
                                <div className="border-t border-seed-forest/10 dark:border-white/10 pt-4 flex justify-between items-center">
                                    <span className="text-sm font-bold text-seed-forest dark:text-seed-snow">{isEn ? 'Total Payable' : 'مبلغ قابل پرداخت'}</span>
                                    <Price amount={getCartTotal()} size="md" className="text-seed-forest dark:text-seed-lime font-black" />
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="block w-full"
                            >
                                <ShineButton className="w-full py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full text-xs font-bold text-center shadow-md">
                                    {isEn ? 'Proceed to Delivery & Dispatch' : 'ادامه جهت ثبت اطلاعات و ارسال'}
                                </ShineButton>
                            </Link>

                            <Link
                                to="/products"
                                className="block w-full py-2.5 text-center text-xs text-seed-pewter dark:text-seed-snow/70 hover:text-seed-forest dark:hover:text-seed-snow transition-colors font-medium"
                            >
                                {isEn ? 'Return to Catalog for More Species' : 'بازگشت به کاتالوگ و افزودن گونه‌های دیگر'}
                            </Link>

                            <div className="pt-4 border-t border-seed-forest/10 dark:border-white/10 flex items-center gap-2 text-[11px] text-seed-pewter dark:text-seed-snow/50 font-sans font-normal">
                                <ShieldCheck className="w-4 h-4 text-seed-forest dark:text-seed-lime flex-shrink-0" />
                                <span>{isEn ? 'Guaranteed biological freshness and seed viability on arrival.' : 'تضمین سلامت زیستی و تازگی بذرها در زمان تحویل'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
