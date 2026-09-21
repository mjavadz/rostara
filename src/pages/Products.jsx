import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, Star, Truck, Filter, ShoppingCart, Check, Sprout, Sparkles, HeartPulse, Leaf } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Products = () => {
    const { t, i18n } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart } = useCart();
    const [addedToCart, setAddedToCart] = useState({});

    const categories = [
        { id: 'all', label: t('products.categories.all') },
        { id: 'microgreens', label: t('products.categories.microgreens') },
        { id: 'growing_kits', label: t('products.categories.growing_kits') },
        { id: 'fermented', label: t('products.categories.fermented') },
        { id: 'mushrooms', label: t('products.categories.mushrooms') },
        { id: 'superfoods', label: t('products.categories.superfoods') },
        { id: 'grains_seeds', label: t('products.categories.grains_seeds') },
    ];

    const allProducts = [
        {
            id: 'micro_kit_starter',
            category: 'growing_kits',
            price: 680000,
            weight: 'پک کامل با ۴ بذر',
        },
        {
            id: 'micro_broccoli',
            category: 'microgreens',
            price: 180000,
            weight: '۱۰۰ گرم',
        },
        {
            id: 'micro_radish',
            category: 'microgreens',
            price: 150000,
            weight: '۱۰۰ گرم',
        },
        {
            id: 'micro_sunflower',
            category: 'microgreens',
            price: 160000,
            weight: '۱۰۰ گرم',
        },
        {
            id: 'micro_pea',
            category: 'microgreens',
            price: 170000,
            weight: '۱۰۰ گرم',
        },
        {
            id: 'micro_seeds_pack',
            category: 'growing_kits',
            price: 240000,
            weight: '۴ بسته بذر ارگانیک',
        },
        {
            id: 'growing_medium_coco',
            category: 'growing_kits',
            price: 190000,
            weight: 'بسته ۵ لیتری',
        },
        {
            id: 'kombucha',
            category: 'fermented',
            price: 185000,
            weight: '۱ لیتر',
        },
        {
            id: 'kimchi',
            category: 'fermented',
            price: 490000,
            weight: '۸۰۰ گرم',
        },
        {
            id: 'miso',
            category: 'fermented',
            price: 650000,
            weight: '۴۰۰ گرم',
        },
        {
            id: 'sourdough',
            category: 'fermented',
            price: 160000,
            weight: '۷۵۰ گرم',
        },
        {
            id: 'lions_mane',
            category: 'mushrooms',
            price: 890000,
            weight: '۱۵۰ گرم عصاره',
        },
        {
            id: 'shiitake',
            category: 'mushrooms',
            price: 520000,
            weight: '۳۰۰ گرم',
        },
        {
            id: 'reishi_extract',
            category: 'mushrooms',
            price: 780000,
            weight: '۱۰۰ گرم عصاره',
        },
        {
            id: 'wheatgrass_shot',
            category: 'superfoods',
            price: 340000,
            weight: '۲۰۰ گرم پودر خالص',
        },
        {
            id: 'kale',
            category: 'superfoods',
            price: 140000,
            weight: '۵۰۰ گرم تازه',
        },
    ];

    const filteredProducts = selectedCategory === 'all'
        ? allProducts
        : allProducts.filter(p => p.category === selectedCategory);

    const formatPrice = (price) => {
        if (i18n.language === 'en') {
            return new Intl.NumberFormat('en-US').format(price) + ' Toman';
        }
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedToCart({ ...addedToCart, [product.id]: true });
        setTimeout(() => {
            setAddedToCart({ ...addedToCart, [product.id]: false });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50/50 via-cream to-brown-50/40 dark:from-primary-950/30 dark:via-brown-950 dark:to-brown-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200 dark:border-primary-800">
                        فروشگاه ارگانیک رُستارا
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-brown-900 dark:text-cream mb-4">
                        {t('products.title')}
                    </h1>
                    <p className="text-lg text-brown-600 dark:text-brown-300 leading-relaxed max-w-2xl mx-auto">
                        {t('products.subtitle')}
                    </p>
                </div>
            </section>

            {/* Filter & Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex items-center gap-2 px-2">
                            <Filter className="w-5 h-5 text-brown-500 dark:text-brown-400 ml-2 flex-shrink-0" />
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-semibold text-sm ${selectedCategory === cat.id
                                        ? 'bg-primary-600 text-white shadow-md scale-105'
                                        : 'bg-white dark:bg-brown-900 text-brown-700 dark:text-brown-300 hover:bg-primary-50 dark:hover:bg-brown-800 hover:text-primary-700 dark:hover:text-primary-400 border border-brown-200 dark:border-brown-800'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => {
                            const features = t(`products.items.${product.id}.features`, { returnObjects: true });

                            return (
                                <div
                                    key={product.id}
                                    className="group bg-white dark:bg-brown-900 rounded-3xl overflow-hidden border border-brown-200/80 dark:border-brown-800 hover:border-primary-400 dark:hover:border-primary-600 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                                >
                                    {/* Visual Header */}
                                    <div className="h-56 bg-gradient-to-br from-primary-50/80 via-cream to-primary-100/50 dark:from-brown-850 dark:via-brown-900 dark:to-brown-850 flex items-center justify-center relative overflow-hidden transition-colors">
                                        <div className="w-20 h-20 rounded-2xl bg-white dark:bg-brown-800 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 border border-primary-100 dark:border-brown-700">
                                            {product.category === 'microgreens' && <Sprout className="w-10 h-10 text-primary-600 dark:text-primary-400" />}
                                            {product.category === 'growing_kits' && <Package className="w-10 h-10 text-primary-600 dark:text-primary-400" />}
                                            {product.category === 'fermented' && <Sparkles className="w-10 h-10 text-amber-600 dark:text-amber-400" />}
                                            {product.category === 'mushrooms' && <HeartPulse className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />}
                                            {product.category === 'superfoods' && <Leaf className="w-10 h-10 text-primary-600 dark:text-primary-400" />}
                                            {product.category === 'grains_seeds' && <Sprout className="w-10 h-10 text-amber-600 dark:text-amber-400" />}
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/95 dark:bg-brown-950/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-700 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-brown-800">
                                            {categories.find(c => c.id === product.category)?.label}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                                            {t(`products.items.${product.id}.name`)}
                                        </h3>
                                        <p className="text-brown-600 dark:text-brown-300 mb-4 leading-relaxed text-sm flex-grow">
                                            {t(`products.items.${product.id}.desc`)}
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-2 mb-6">
                                            {Array.isArray(features) && features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Star className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 fill-primary-600 dark:fill-primary-400" />
                                                    <span className="text-xs text-brown-700 dark:text-brown-200">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Price & Weight */}
                                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-brown-100 dark:border-brown-800 mt-auto">
                                            <div>
                                                <p className="text-xs text-brown-500 dark:text-brown-400 mb-1">{t('products.labels.weight')}</p>
                                                <p className="font-bold text-brown-900 dark:text-cream">{product.weight}</p>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs text-brown-500 dark:text-brown-400 mb-1">{t('products.labels.price')}</p>
                                                <p className="text-xl font-extrabold text-primary-700 dark:text-primary-400">{formatPrice(product.price)}</p>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={addedToCart[product.id]}
                                            className={`w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 ${addedToCart[product.id] ? 'bg-emerald-600 hover:bg-emerald-600' : ''
                                                }`}
                                        >
                                            {addedToCart[product.id] ? (
                                                <>
                                                    <Check className="w-5 h-5" />
                                                    <span>{t('products.labels.added')}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-5 h-5" />
                                                    <span>{t('products.labels.addToCart')}</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Shipping Info */}
            <section className="py-16 bg-white dark:bg-brown-900 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-4 p-6 bg-primary-50 dark:bg-brown-800 rounded-2xl border border-primary-100 dark:border-brown-700">
                        <Truck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                        <p className="text-brown-600 dark:text-brown-300">
                            ارسال رایگان برای سفارش‌های بالای ۹۰۰,۰۰۰ تومان
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
