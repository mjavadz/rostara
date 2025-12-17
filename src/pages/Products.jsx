import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, Star, Truck, Filter, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Products = () => {
    const { t, i18n } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart } = useCart();
    const [addedToCart, setAddedToCart] = useState({});

    const categories = [
        { id: 'all', label: t('products.categories.all') },
        { id: 'fermented', label: t('products.categories.fermented') },
        { id: 'vegetables', label: t('products.categories.vegetables') },
        { id: 'microgreens', label: t('products.categories.microgreens') },
        { id: 'mushrooms', label: t('products.categories.mushrooms') },
        { id: 'probiotics', label: t('products.categories.probiotics') },
        { id: 'prebiotics', label: t('products.categories.prebiotics') },
        { id: 'grains', label: t('products.categories.grains') },
        { id: 'legumes', label: t('products.categories.legumes') },
    ];

    const allProducts = [
        {
            id: 'rice_hashemi',
            category: 'grains',
            price: 1500000,
            weight: '۵ کیلوگرم',
        },
        {
            id: 'rice_demsiah',
            category: 'grains',
            price: 1450000,
            weight: '۵ کیلوگرم',
        },
        {
            id: 'rice_brown',
            category: 'grains',
            price: 1200000,
            weight: '۵ کیلوگرم',
        },
        {
            id: 'miso',
            category: 'fermented',
            price: 850000,
            weight: '۵۰۰ گرم',
        },
        {
            id: 'kimchi',
            category: 'fermented',
            price: 600000,
            weight: '۱ کیلوگرم',
        },
        {
            id: 'kale',
            category: 'vegetables',
            price: 250000,
            weight: '۱ کیلوگرم',
        },
        {
            id: 'micro_radish',
            category: 'microgreens',
            price: 150000,
            weight: '۱۰۰ گرم',
        },
        {
            id: 'shiitake',
            category: 'mushrooms',
            price: 950000,
            weight: '۵۰۰ گرم',
        },
        {
            id: 'kombucha',
            category: 'probiotics',
            price: 180000,
            weight: '۱ لیتر',
        },
        {
            id: 'sourdough',
            category: 'prebiotics',
            price: 120000,
            weight: '۷۰۰ گرم',
        },
        {
            id: 'chickpeas',
            category: 'legumes',
            price: 180000,
            weight: '۱ کیلوگرم',
        },
        {
            id: 'natto',
            category: 'fermented',
            price: 750000,
            weight: '۳۰۰ گرم',
        },
        {
            id: 'nukazuke',
            category: 'fermented',
            price: 550000,
            weight: '۵۰۰ گرم',
        },
        {
            id: 'micro_broccoli',
            category: 'microgreens',
            price: 180000,
            weight: '۱۰۰ گرم',
        },
        {
            id: 'micro_sunflower',
            category: 'microgreens',
            price: 160000,
            weight: '۱۰۰ گرم',
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
                                    {/* Image Placeholder */}
                                    <div className="h-64 bg-gradient-to-br from-primary-100 to-brown-100 dark:from-brown-700 dark:to-brown-600 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-rice-pattern opacity-10"></div>
                                        <Package className="w-20 h-20 text-primary-600/30 dark:text-primary-400/30 group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-brown-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-700 dark:text-primary-400 shadow-sm">
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
