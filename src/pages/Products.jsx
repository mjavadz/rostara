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
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-brown-50 dark:from-brown-900 dark:to-brown-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-brown-900 dark:text-cream mb-6">
                        {t('products.title')}
                    </h1>
                    <p className="text-xl text-brown-700 dark:text-brown-200 leading-relaxed">
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
                            <Filter className="w-5 h-5 text-brown-500 dark:text-brown-400 ml-2" />
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-medium ${selectedCategory === cat.id
                                        ? 'bg-primary-600 text-white shadow-lg scale-105'
                                        : 'bg-white dark:bg-brown-800 text-brown-600 dark:text-brown-300 hover:bg-primary-50 dark:hover:bg-brown-700 hover:text-primary-700 dark:hover:text-primary-400 border border-brown-100 dark:border-brown-700'
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
                                    className="group bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-brown-100 dark:border-brown-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                                >
                                    {/* Visual Header */}
                                    <div className="h-60 bg-gradient-to-br from-primary-50 via-cream to-primary-100 dark:from-brown-800 dark:via-brown-900 dark:to-brown-800 flex items-center justify-center relative overflow-hidden group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-brown-750 dark:group-hover:to-brown-800 transition-colors">
                                        <div className="w-24 h-24 rounded-3xl bg-white/70 dark:bg-brown-700/60 backdrop-blur-sm flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                                            {product.category === 'microgreens' && <Sprout className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
                                            {product.category === 'growing_kits' && <Package className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
                                            {product.category === 'fermented' && <Sparkles className="w-12 h-12 text-amber-600 dark:text-amber-400" />}
                                            {product.category === 'mushrooms' && <HeartPulse className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />}
                                            {product.category === 'superfoods' && <Leaf className="w-12 h-12 text-primary-600 dark:text-primary-400" />}
                                            {product.category === 'grains_seeds' && <Sprout className="w-12 h-12 text-amber-600 dark:text-amber-400" />}
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/95 dark:bg-brown-900/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-700 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-brown-700">
                                            {categories.find(c => c.id === product.category)?.label}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-2xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                                            {t(`products.items.${product.id}.name`)}
                                        </h3>
                                        <p className="text-brown-600 dark:text-brown-300 mb-4 leading-relaxed text-sm flex-grow">
                                            {t(`products.items.${product.id}.desc`)}
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-2 mb-6">
                                            {Array.isArray(features) && features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-primary-600 dark:text-primary-400 fill-primary-600 dark:fill-primary-400" />
                                                    <span className="text-sm text-brown-700 dark:text-brown-200">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Price & Weight */}
                                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-brown-100 dark:border-brown-700 mt-auto">
                                            <div>
                                                <p className="text-xs text-brown-500 dark:text-brown-400 mb-1">{t('products.labels.weight')}</p>
                                                <p className="font-bold text-brown-900 dark:text-cream">{product.weight}</p>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs text-brown-500 dark:text-brown-400 mb-1">{t('products.labels.price')}</p>
                                                <p className="text-xl font-bold text-primary-700 dark:text-primary-400">{formatPrice(product.price)}</p>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={addedToCart[product.id]}
                                            className={`w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group-hover:from-primary-700 group-hover:to-primary-800 ${addedToCart[product.id] ? 'bg-green-600 from-green-600 to-green-700' : ''
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
