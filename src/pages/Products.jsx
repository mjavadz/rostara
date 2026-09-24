import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Package, 
    Star, 
    Truck, 
    Filter, 
    ShoppingCart, 
    Check, 
    Sprout, 
    Sparkles, 
    HeartPulse, 
    Leaf,
    Search,
    X,
    Plus,
    Minus,
    CheckCircle2,
    ShieldCheck,
    Info,
    MessageSquare,
    Eye
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { db } from '../services/db';

const Products = () => {
    const { t, i18n } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState({});
    
    // Quick View Modal State
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalQuantity, setModalQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [newReviewAuthor, setNewReviewAuthor] = useState('');
    const [newReviewComment, setNewReviewComment] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(5);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const { addToCart } = useCart();

    const categories = [
        { id: 'all', label: 'همه محصولات' },
        { id: 'microgreens', label: 'میکروگرین‌ها' },
        { id: 'growing_kits', label: 'کیت‌ها و بستر کشت' },
        { id: 'fermented', label: 'خوراک‌های تخمیری' },
        { id: 'mushrooms', label: 'قارچ‌های دارویی' },
        { id: 'superfoods', label: 'سوپرفودها' },
    ];

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const items = await db.products.getAll();
                setProductsList(items);
            } catch (e) {
                console.error('Failed to load products:', e);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Load reviews when a product is opened in modal
    useEffect(() => {
        if (selectedProduct) {
            setModalQuantity(1);
            setReviewSubmitted(false);
            const pReviews = db.reviews.getByProduct(selectedProduct.id);
            setReviews(pReviews);
        }
    }, [selectedProduct]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    const handleAddToCart = (product, quantity = 1) => {
        addToCart(product, quantity);
        setAddedToCart(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedToCart(prev => ({ ...prev, [product.id]: false }));
        }, 2000);
    };

    const handleAddReviewSubmit = (e) => {
        e.preventDefault();
        if (!newReviewAuthor.trim() || !newReviewComment.trim() || !selectedProduct) return;

        const newRev = db.reviews.add(selectedProduct.id, {
            author: newReviewAuthor.trim(),
            rating: newReviewRating,
            comment: newReviewComment.trim()
        });

        setReviews(prev => [newRev, ...prev]);
        setNewReviewAuthor('');
        setNewReviewComment('');
        setReviewSubmitted(true);
        setTimeout(() => setReviewSubmitted(false), 4000);
    };

    // Filtered & Searched Products
    const filteredProducts = useMemo(() => {
        return productsList.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const query = searchQuery.trim().toLowerCase();
            if (!query) return matchesCategory;

            const name = (product.name || '').toLowerCase();
            const nameEn = (product.name_en || '').toLowerCase();
            const benefits = (product.benefits || '').toLowerCase();
            const features = (product.features || []).join(' ').toLowerCase();

            const matchesQuery = name.includes(query) || nameEn.includes(query) || benefits.includes(query) || features.includes(query);
            return matchesCategory && matchesQuery;
        });
    }, [productsList, selectedCategory, searchQuery]);

    // Category count badges
    const categoryCounts = useMemo(() => {
        const counts = { all: productsList.length };
        productsList.forEach(p => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, [productsList]);

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'microgreens': return <Sprout className="w-8 h-8 text-primary-600 dark:text-primary-400" />;
            case 'growing_kits': return <Package className="w-8 h-8 text-primary-600 dark:text-primary-400" />;
            case 'fermented': return <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400" />;
            case 'mushrooms': return <HeartPulse className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
            case 'superfoods': return <Leaf className="w-8 h-8 text-primary-600 dark:text-primary-400" />;
            default: return <Sprout className="w-8 h-8 text-primary-600 dark:text-primary-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 transition-colors duration-300">
            {/* Hero Header */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50/50 via-cream to-brown-50/40 dark:from-primary-950/30 dark:via-brown-950 dark:to-brown-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200 dark:border-primary-800">
                        فروشگاه تخصصی ارگانیک رُستارا
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-brown-900 dark:text-cream mb-4">
                        میکروگرین‌ها و سوپرفودهای زیست‌پایدار
                    </h1>
                    <p className="text-lg text-brown-600 dark:text-brown-300 leading-relaxed max-w-2xl mx-auto">
                        برداشت روز و بستر کشت ارگانیک عاری از سموم و کودهای شیمیایی، سرشار از آنزیم‌های فعال، سولفورافان و پروبیوتیک‌های زنده برای ارتقای سلامت سلولی.
                    </p>

                    {/* Live Search Input */}
                    <div className="mt-8 max-w-xl mx-auto relative">
                        <div className="relative flex items-center shadow-md rounded-full overflow-hidden border border-brown-200 dark:border-brown-800 bg-white dark:bg-brown-900 focus-within:border-primary-600 dark:focus-within:border-primary-500 transition-all">
                            <Search className="w-5 h-5 text-brown-400 mr-5 ml-1 flex-shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="جستجوی نام، خواص (مانند سولفورافان، کیت، کامبوچا)..."
                                className="w-full py-3.5 pr-2 pl-6 bg-transparent text-brown-900 dark:text-cream placeholder-brown-400 dark:placeholder-brown-500 focus:outline-none text-sm font-medium"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="p-2 ml-3 text-brown-400 hover:text-brown-600 dark:hover:text-brown-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter & Grid */}
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filter Pills with Badges */}
                    <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex items-center gap-2 px-1">
                            <Filter className="w-5 h-5 text-brown-500 dark:text-brown-400 ml-2 flex-shrink-0" />
                            {categories.map((cat) => {
                                const count = categoryCounts[cat.id] || 0;
                                const isSelected = selectedCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-semibold text-sm flex items-center gap-2 ${
                                            isSelected
                                                ? 'bg-primary-600 text-white shadow-md scale-105'
                                                : 'bg-white dark:bg-brown-900 text-brown-700 dark:text-brown-300 hover:bg-primary-50 dark:hover:bg-brown-800 hover:text-primary-700 dark:hover:text-primary-400 border border-brown-200 dark:border-brown-800'
                                        }`}
                                    >
                                        <span>{cat.label}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                            isSelected 
                                                ? 'bg-white/20 text-white' 
                                                : 'bg-brown-100 dark:bg-brown-800 text-brown-600 dark:text-brown-400'
                                        }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="py-20 text-center">
                            <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-brown-600 dark:text-brown-400 font-medium">در حال فراخوانی محصولات ارگانیک رُستارا...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="py-16 text-center bg-white dark:bg-brown-900 rounded-3xl border border-brown-200/80 dark:border-brown-800 p-8 max-w-md mx-auto">
                            <Leaf className="w-12 h-12 text-brown-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-2">محصولی یافت نشد</h3>
                            <p className="text-brown-600 dark:text-brown-400 text-sm mb-6">
                                با عبارت جستجوی «{searchQuery}» موردی پیدا نشد. جستجوی خود را پاک کنید.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                className="px-6 py-2.5 bg-primary-600 text-white rounded-full text-sm font-bold"
                            >
                                مشاهده همه محصولات
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => {
                                const isAdded = addedToCart[product.id];
                                return (
                                    <div
                                        key={product.id}
                                        className="group bg-white dark:bg-brown-900 rounded-3xl overflow-hidden border border-brown-200/80 dark:border-brown-800 hover:border-primary-400 dark:hover:border-primary-600 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                                    >
                                        {/* Visual Header */}
                                        <div 
                                            onClick={() => setSelectedProduct(product)}
                                            className="h-56 bg-gradient-to-br from-primary-50/80 via-cream to-primary-100/50 dark:from-brown-850 dark:via-brown-900 dark:to-brown-850 flex items-center justify-center relative overflow-hidden transition-colors cursor-pointer"
                                        >
                                            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-brown-800 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 border border-primary-100 dark:border-brown-700">
                                                {getCategoryIcon(product.category)}
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white/95 dark:bg-brown-950/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-700 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-brown-800">
                                                {categories.find(c => c.id === product.category)?.label}
                                            </div>

                                            {/* Quick View Pill */}
                                            <div className="absolute bottom-4 inset-x-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brown-900/90 text-white rounded-full text-xs font-bold backdrop-blur shadow-md">
                                                    <Eye className="w-3.5 h-3.5" />
                                                    مشاهده جزئیات و نظرات
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="text-xl font-display font-bold text-brown-900 dark:text-cream cursor-pointer hover:text-primary-600 transition-colors"
                                                >
                                                    {product.name}
                                                </h3>
                                            </div>

                                            {product.name_en && (
                                                <p className="text-xs font-mono text-brown-400 dark:text-brown-500 mb-3">
                                                    {product.name_en}
                                                </p>
                                            )}

                                            <p className="text-brown-600 dark:text-brown-300 mb-4 leading-relaxed text-sm flex-grow line-clamp-2">
                                                {product.benefits || product.desc}
                                            </p>

                                            {/* Features list */}
                                            <div className="space-y-1.5 mb-6">
                                                {Array.isArray(product.features) && product.features.slice(0, 3).map((feat, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <Star className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 fill-primary-600 dark:fill-primary-400 flex-shrink-0" />
                                                        <span className="text-xs text-brown-700 dark:text-brown-200 line-clamp-1">{feat}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Price & Weight */}
                                            <div className="flex items-center justify-between mb-6 pb-6 border-b border-brown-100 dark:border-brown-800 mt-auto">
                                                <div>
                                                    <p className="text-xs text-brown-500 dark:text-brown-400 mb-1">واحد / وزن</p>
                                                    <p className="font-bold text-brown-900 dark:text-cream text-sm">{product.weight}</p>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs text-brown-500 dark:text-brown-400 mb-1">قیمت</p>
                                                    <p className="text-xl font-extrabold text-primary-700 dark:text-primary-400">{formatPrice(product.price)}</p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="grid grid-cols-5 gap-2">
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    title="مشاهده جزئیات کامل"
                                                    className="col-span-1 p-3.5 bg-cream dark:bg-brown-800 hover:bg-brown-200 dark:hover:bg-brown-700 text-brown-700 dark:text-brown-200 rounded-full flex items-center justify-center transition-colors"
                                                >
                                                    <Info className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={isAdded}
                                                    className={`col-span-4 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 ${
                                                        isAdded ? 'bg-emerald-600 hover:bg-emerald-600' : ''
                                                    }`}
                                                >
                                                    {isAdded ? (
                                                        <>
                                                            <Check className="w-5 h-5" />
                                                            <span>به سبد اضافه شد</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShoppingCart className="w-5 h-5" />
                                                            <span>افزودن به سبد</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* PRODUCT DETAIL & REVIEWS MODAL */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white dark:bg-brown-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-brown-200 dark:border-brown-800 shadow-2xl relative">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-5 left-5 z-10 w-9 h-9 rounded-full bg-cream dark:bg-brown-800 flex items-center justify-center text-brown-600 dark:text-brown-300 hover:bg-brown-200 dark:hover:bg-brown-700 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <div className="p-8 pb-6 border-b border-brown-100 dark:border-brown-800 bg-gradient-to-br from-primary-50/70 via-cream to-cream dark:from-primary-950/40 dark:via-brown-900 dark:to-brown-900">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 rounded-full text-xs font-bold border border-primary-200 dark:border-primary-800">
                                    {categories.find(c => c.id === selectedProduct.category)?.label}
                                </span>
                                <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                                    <Star className="w-4 h-4 fill-amber-500" />
                                    <span>{selectedProduct.rating || 5.0}</span>
                                    <span className="text-brown-400">({reviews.length} نظر)</span>
                                </div>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brown-900 dark:text-cream mb-1">
                                {selectedProduct.name}
                            </h2>
                            {selectedProduct.name_en && (
                                <p className="text-sm font-mono text-brown-500 dark:text-brown-400 mb-4">
                                    {selectedProduct.name_en}
                                </p>
                            )}
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm text-brown-600 dark:text-brown-300">
                                    وزن یا بسته: <b className="text-brown-900 dark:text-cream">{selectedProduct.weight}</b>
                                </span>
                                <span className="text-2xl font-extrabold text-primary-700 dark:text-primary-400">
                                    {formatPrice(selectedProduct.price)}
                                </span>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-6">
                            {/* Health Benefits */}
                            {selectedProduct.benefits && (
                                <div>
                                    <h4 className="text-base font-bold text-brown-900 dark:text-cream mb-2 flex items-center gap-2">
                                        <HeartPulse className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                        خواص و فواید زیستی:
                                    </h4>
                                    <p className="text-sm text-brown-700 dark:text-brown-300 leading-relaxed bg-cream dark:bg-brown-800/50 p-4 rounded-2xl border border-brown-100 dark:border-brown-800">
                                        {selectedProduct.benefits}
                                    </p>
                                </div>
                            )}

                            {/* Usage instructions */}
                            {selectedProduct.usage && (
                                <div>
                                    <h4 className="text-base font-bold text-brown-900 dark:text-cream mb-2 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                        نحوه مصرف و نگهداری:
                                    </h4>
                                    <p className="text-sm text-brown-700 dark:text-brown-300 leading-relaxed bg-cream dark:bg-brown-800/50 p-4 rounded-2xl border border-brown-100 dark:border-brown-800">
                                        {selectedProduct.usage}
                                    </p>
                                </div>
                            )}

                            {/* Features Tags */}
                            {Array.isArray(selectedProduct.features) && (
                                <div>
                                    <h4 className="text-base font-bold text-brown-900 dark:text-cream mb-3 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                        ویژگی‌های برجسته محصول:
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {selectedProduct.features.map((feat, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs font-medium text-brown-800 dark:text-brown-200 bg-cream dark:bg-brown-800/80 px-3 py-2 rounded-xl">
                                                <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Customer Reviews Section */}
                            <div className="pt-6 border-t border-brown-100 dark:border-brown-800">
                                <h4 className="text-base font-bold text-brown-900 dark:text-cream mb-4 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                        نظرات و تجربیات مشتریان ({reviews.length})
                                    </span>
                                </h4>

                                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-1">
                                    {reviews.map((rev) => (
                                        <div key={rev.id} className="p-3.5 rounded-2xl bg-cream dark:bg-brown-800/40 border border-brown-100 dark:border-brown-800 text-xs">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="font-bold text-brown-900 dark:text-cream">{rev.author}</span>
                                                <div className="flex items-center text-amber-500">
                                                    {[...Array(rev.rating || 5)].map((_, idx) => (
                                                        <Star key={idx} className="w-3 h-3 fill-amber-500" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-brown-700 dark:text-brown-300 leading-relaxed">{rev.comment}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Review Form */}
                                <form onSubmit={handleAddReviewSubmit} className="bg-cream/60 dark:bg-brown-800/40 p-4 rounded-2xl border border-brown-100 dark:border-brown-800 space-y-3">
                                    <span className="text-xs font-bold text-brown-900 dark:text-cream block">تجربه شما از این محصول:</span>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={newReviewAuthor}
                                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                                            placeholder="نام شما..."
                                            className="px-3 py-2 rounded-xl bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-xs text-brown-900 dark:text-cream focus:outline-none focus:border-primary-600"
                                            required
                                        />
                                        <select
                                            value={newReviewRating}
                                            onChange={(e) => setNewReviewRating(Number(e.target.value))}
                                            className="px-3 py-2 rounded-xl bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-xs text-brown-900 dark:text-cream focus:outline-none"
                                        >
                                            <option value={5}>⭐⭐⭐⭐⭐ (عالی)</option>
                                            <option value={4}>⭐⭐⭐⭐ (خیلی خوب)</option>
                                            <option value={3}>⭐⭐⭐ (متوسط)</option>
                                        </select>
                                    </div>
                                    <textarea
                                        value={newReviewComment}
                                        onChange={(e) => setNewReviewComment(e.target.value)}
                                        placeholder="نظر یا تجربه مصرف..."
                                        rows={2}
                                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-xs text-brown-900 dark:text-cream focus:outline-none focus:border-primary-600"
                                        required
                                    />
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-colors"
                                        >
                                            ثبت نظر
                                        </button>
                                        {reviewSubmitted && (
                                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                                                <Check className="w-3.5 h-3.5" />
                                                نظر شما با موفقیت ثبت شد
                                            </span>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Modal Footer / Add to Cart Controls */}
                        <div className="p-6 bg-cream/70 dark:bg-brown-950/70 border-t border-brown-100 dark:border-brown-800 flex items-center justify-between gap-4">
                            {/* Quantity Picker */}
                            <div className="flex items-center gap-3 bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-700 rounded-full p-1 shadow-sm">
                                <button
                                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-brown-100 dark:hover:bg-brown-800 text-brown-700 dark:text-brown-200 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-bold text-brown-900 dark:text-cream text-sm">
                                    {modalQuantity}
                                </span>
                                <button
                                    onClick={() => setModalQuantity(modalQuantity + 1)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-brown-100 dark:hover:bg-brown-800 text-brown-700 dark:text-brown-200 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Total in Modal */}
                            <div className="text-left">
                                <span className="text-xs text-brown-500 dark:text-brown-400 block">جمع کل:</span>
                                <span className="text-xl font-extrabold text-primary-700 dark:text-primary-400">
                                    {formatPrice(selectedProduct.price * modalQuantity)}
                                </span>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => {
                                    handleAddToCart(selectedProduct, modalQuantity);
                                    setSelectedProduct(null);
                                }}
                                className="px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span>افزودن به سبد خرید</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Shipping Info Banner */}
            <section className="py-16 bg-white dark:bg-brown-900 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-4 p-6 bg-primary-50 dark:bg-brown-800 rounded-3xl border border-primary-100 dark:border-brown-700 text-center">
                        <Truck className="w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        <p className="text-brown-700 dark:text-brown-200 font-medium text-sm sm:text-base">
                            ارسال رایگان با بسته‌بندی عایق رطوبت برای کلیه سفارش‌های بالای ۹۰۰,۰۰۰ تومان در سراسر کشور
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
