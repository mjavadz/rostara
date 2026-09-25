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
    Eye,
    ArrowLeft
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { db } from '../services/db';
import { Price } from '@/components/ui/price';
import { Badge } from '@/components/ui/badge';
import { fa } from '@/lib/utils';

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
        { id: 'all', label: 'همه نمونه‌ها' },
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
            case 'microgreens': return <Sprout className="w-6 h-6 text-seed-forest dark:text-seed-lime" />;
            case 'growing_kits': return <Package className="w-6 h-6 text-seed-forest dark:text-seed-lime" />;
            case 'fermented': return <Sparkles className="w-6 h-6 text-seed-forest dark:text-seed-lime" />;
            case 'mushrooms': return <HeartPulse className="w-6 h-6 text-seed-forest dark:text-seed-lime" />;
            case 'superfoods': return <Leaf className="w-6 h-6 text-seed-forest dark:text-seed-lime" />;
            default: return <Sprout className="w-6 h-6 text-seed-forest dark:text-seed-lime" />;
        }
    };

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-charcoal dark:text-seed-snow transition-colors duration-300">
            {/* Hero Header */}
            <section className="pt-28 pb-12 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
                    
                    <div className="flex items-center gap-2 mb-3">
                        <span className="badge-lime">
                            CATALOGUE 2026
                        </span>
                        <span className="label-mono">
                            نمونه‌های زیستی فعال و کیت‌های کشت خانگی
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-display font-black text-seed-forest dark:text-seed-snow mb-4">
                        واریته‌های فعال و تغذیه سلولی
                    </h1>
                    
                    <p className="text-sm sm:text-base text-seed-pewter dark:text-seed-snow/70 max-w-2xl leading-relaxed font-normal">
                        تمام محصولات از بذرهای دیم اصلاح‌نشده با بالاترین پتانسیل جوانه‌زنی کشت شده و عاری از هرگونه کود شیمیایی، آفت‌کش و نگهدارنده صنعتی هستند.
                    </p>

                    {/* Live Search Input (Clinical Seed style) */}
                    <div className="mt-8 max-w-lg relative">
                        <div className="relative flex items-center rounded-pill bg-white dark:bg-seed-glassDark border border-seed-forest/15 dark:border-white/15 focus-within:border-seed-forest dark:focus-within:border-seed-lime transition-all">
                            <Search className="w-4 h-4 text-seed-pewter mr-4 ml-1 flex-shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="جستجوی گونه، ترکیب زیستی (سولفورافان، کیت، کامبوچا)..."
                                className="w-full py-3 pr-2 pl-6 bg-transparent text-seed-forest dark:text-seed-snow placeholder-seed-pewter/60 focus:outline-none text-xs sm:text-sm font-medium"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="p-2 ml-2 text-seed-pewter hover:text-seed-forest"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter & Grid */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex items-center gap-2 px-1">
                            {categories.map((cat) => {
                                const count = categoryCounts[cat.id] || 0;
                                const isSelected = selectedCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-4 py-2 rounded-pill whitespace-nowrap transition-all duration-200 text-xs font-bold flex items-center gap-2 ${
                                            isSelected
                                                ? 'bg-seed-forest text-seed-snow dark:bg-seed-lime dark:text-seed-forest shadow-sm'
                                                : 'bg-white dark:bg-seed-glassDark text-seed-pewter dark:text-seed-snow/70 hover:text-seed-forest dark:hover:text-seed-snow border border-seed-forest/10 dark:border-white/10'
                                        }`}
                                    >
                                        <span>{cat.label}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                            isSelected 
                                                ? 'bg-white/20 text-white dark:bg-seed-forest/20 dark:text-seed-forest' 
                                                : 'bg-seed-stone dark:bg-white/10 text-seed-pewter dark:text-seed-snow/60'
                                        }`}>
                                            {fa(count)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="py-20 text-center">
                            <div className="w-8 h-8 border-2 border-seed-forest dark:border-seed-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-xs text-seed-pewter font-mono">در حال فراخوانی کاتالوگ زیستی رُستارا...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="py-16 text-center seed-card p-8 max-w-md mx-auto">
                            <Leaf className="w-10 h-10 text-seed-pewter mx-auto mb-3" />
                            <h3 className="text-base font-bold text-seed-forest dark:text-seed-snow mb-2">نمونه‌ای یافت نشد</h3>
                            <p className="text-xs text-seed-pewter mb-6">
                                با عبارت «{searchQuery}» موردی پیدا نشد.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                className="px-5 py-2 rounded-pill bg-seed-forest text-seed-snow text-xs font-bold"
                            >
                                مشاهده تمام نمونه‌ها
                            </button>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => {
                                const isAdded = addedToCart[product.id];
                                return (
                                    <div
                                        key={product.id}
                                        className="seed-card p-6 flex flex-col justify-between hover:border-seed-forest/30 dark:hover:border-seed-lime/40 group"
                                    >
                                        <div>
                                            {/* Specimen Header */}
                                            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-seed-forest/10 dark:border-white/10">
                                                <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50 uppercase tracking-wider">
                                                    [{product.id.replace(/^_/, '').substring(0, 10).toUpperCase()}]
                                                </span>
                                                <span className="badge-lime text-[10px]">
                                                    {categories.find(c => c.id === product.category)?.label}
                                                </span>
                                            </div>

                                            {/* Icon & Identity */}
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div>
                                                    <h3 
                                                        onClick={() => setSelectedProduct(product)}
                                                        className="text-lg font-display font-bold text-seed-forest dark:text-seed-snow cursor-pointer hover:text-seed-sage transition-colors"
                                                    >
                                                        {product.name}
                                                    </h3>
                                                    {product.name_en && (
                                                        <p className="text-[11px] font-mono text-seed-sage dark:text-seed-snow/50 italic mt-0.5">
                                                            {product.name_en}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="w-10 h-10 rounded-xl bg-seed-stone dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                                                    {getCategoryIcon(product.category)}
                                                </div>
                                            </div>

                                            <p className="text-xs text-seed-pewter dark:text-seed-snow/80 leading-relaxed mb-4 font-normal line-clamp-2">
                                                {product.benefits || product.desc}
                                            </p>

                                            {/* Biological Key Features */}
                                            <div className="space-y-1 mb-5">
                                                {Array.isArray(product.features) && product.features.slice(0, 2).map((feat, idx) => (
                                                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-seed-pewter dark:text-seed-snow/70">
                                                        <span className="w-1 h-1 rounded-full bg-seed-forest dark:bg-seed-lime flex-shrink-0" />
                                                        <span className="line-clamp-1">{feat}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            {/* Price & Unit Specs */}
                                            <div className="flex items-center justify-between py-3 border-t border-seed-forest/10 dark:border-white/10 mb-4 text-xs">
                                                <span className="text-seed-pewter dark:text-seed-snow/70 font-medium">{product.weight}</span>
                                                <Price amount={product.price} size="sm" />
                                            </div>

                                            {/* Action Grid */}
                                            <div className="grid grid-cols-5 gap-2">
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    title="بررسی مشخصات علمی"
                                                    className="col-span-1 py-2.5 rounded-pill bg-seed-stone dark:bg-white/10 hover:bg-seed-stone/80 text-seed-forest dark:text-seed-snow flex items-center justify-center transition-colors text-xs"
                                                >
                                                    <Info className="w-4 h-4" />
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={isAdded}
                                                    className={`col-span-4 py-2.5 rounded-pill font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                                                        isAdded 
                                                            ? 'bg-seed-lime text-seed-forest' 
                                                            : 'bg-seed-forest text-seed-snow hover:bg-seed-forestDeep dark:bg-white/15 dark:hover:bg-seed-lime dark:hover:text-seed-forest'
                                                    }`}
                                                >
                                                    {isAdded ? (
                                                        <>
                                                            <Check className="w-4 h-4" />
                                                            <span>ثبت شد</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShoppingCart className="w-4 h-4" />
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

            {/* PRODUCT SPECIMEN MODAL */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-seed-snow dark:bg-seed-forestDeep rounded-seed-lg max-w-xl w-full max-h-[90vh] overflow-y-auto border border-seed-forest/20 dark:border-white/20 shadow-2xl relative p-6 sm:p-8">
                        
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-5 left-5 w-8 h-8 rounded-full bg-seed-stone dark:bg-white/10 flex items-center justify-center text-seed-pewter hover:text-seed-forest transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Modal Header */}
                        <div className="pb-5 mb-5 border-b border-seed-forest/10 dark:border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="badge-lime text-[10px]">
                                    {categories.find(c => c.id === selectedProduct.category)?.label}
                                </span>
                                <span className="font-mono text-xs text-seed-pewter">
                                    امتیاز: {selectedProduct.rating || 5.0} ★
                                </span>
                            </div>

                            <h2 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-1">
                                {selectedProduct.name}
                            </h2>
                            {selectedProduct.name_en && (
                                <p className="font-mono text-xs text-seed-sage dark:text-seed-snow/50 italic mb-3">
                                    {selectedProduct.name_en}
                                </p>
                            )}

                            <div className="flex justify-between items-center text-sm pt-2">
                                <span className="text-seed-pewter dark:text-seed-snow/70 font-medium">{selectedProduct.weight}</span>
                                <Price amount={selectedProduct.price} size="md" className="text-seed-forest dark:text-seed-lime" />
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="space-y-5 text-xs text-seed-pewter dark:text-seed-snow/80 leading-relaxed font-normal">
                            {selectedProduct.benefits && (
                                <div>
                                    <h4 className="font-bold text-seed-forest dark:text-seed-snow mb-1.5">پروفایل بیولوژیک و فواید زیستی:</h4>
                                    <p className="p-3 bg-seed-stone/50 dark:bg-white/5 rounded-xl border border-seed-forest/10 dark:border-white/10">
                                        {selectedProduct.benefits}
                                    </p>
                                </div>
                            )}

                            {selectedProduct.usage && (
                                <div>
                                    <h4 className="font-bold text-seed-forest dark:text-seed-snow mb-1.5">دستورالعمل مصرف و نگهداری:</h4>
                                    <p className="p-3 bg-seed-stone/50 dark:bg-white/5 rounded-xl border border-seed-forest/10 dark:border-white/10">
                                        {selectedProduct.usage}
                                    </p>
                                </div>
                            )}

                            {/* Modal Reviews */}
                            <div className="pt-4 border-t border-seed-forest/10 dark:border-white/10">
                                <h4 className="font-bold text-seed-forest dark:text-seed-snow mb-3">تجارب مشتریان ({reviews.length})</h4>
                                <div className="space-y-2 max-h-36 overflow-y-auto mb-4">
                                    {reviews.map(r => (
                                        <div key={r.id} className="p-2.5 rounded-lg bg-seed-stone/40 dark:bg-white/5 border border-seed-forest/5 dark:border-white/5">
                                            <div className="flex justify-between font-bold text-seed-forest dark:text-seed-snow mb-1">
                                                <span>{r.author}</span>
                                                <span className="text-amber-500 font-mono">{r.rating}★</span>
                                            </div>
                                            <p>{r.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer Controls */}
                        <div className="pt-5 mt-5 border-t border-seed-forest/10 dark:border-white/10 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 bg-seed-stone dark:bg-white/10 rounded-pill p-1">
                                <button
                                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-white/20 transition-colors"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-6 text-center font-mono font-bold text-xs">{modalQuantity}</span>
                                <button
                                    onClick={() => setModalQuantity(modalQuantity + 1)}
                                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-white/20 transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    handleAddToCart(selectedProduct, modalQuantity);
                                    setSelectedProduct(null);
                                }}
                                className="btn-seed flex-1 py-3 text-xs flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span>افزودن ({formatPrice(selectedProduct.price * modalQuantity)})</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
