import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Lock, 
    Users, 
    ShoppingBag, 
    LogOut, 
    Eye, 
    EyeOff, 
    Mail, 
    Phone, 
    Calendar, 
    MessageSquare,
    Package,
    TrendingUp,
    Clock,
    Truck,
    CheckCircle2,
    XCircle,
    Plus,
    Edit3,
    Trash2,
    Search,
    RefreshCw,
    Filter,
    DollarSign,
    Sprout,
    Tag,
    X,
    ExternalLink
} from 'lucide-react';
import { db } from '../services/db';

const ADMIN_PASSWORD = 'admin@rostara';

const Admin = () => {
    const { t } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Data State
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        pendingOrders: 0,
        unreadMessages: 0,
        productsCount: 0
    });
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [products, setProducts] = useState([]);
    const [coupons, setCoupons] = useState([]);

    // UI State
    const [activeTab, setActiveTab] = useState('orders'); // orders, products, messages, coupons
    const [orderFilter, setOrderFilter] = useState('all');
    const [orderSearch, setOrderSearch] = useState('');
    const [productSearch, setProductSearch] = useState('');
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

    // Product Modal State
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productFormData, setProductFormData] = useState({
        name: '',
        name_en: '',
        category: 'microgreens',
        price: '',
        weight: '',
        in_stock: true,
        features: '',
        benefits: '',
        usage: ''
    });

    // Check if already authenticated on mount
    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Refresh all data
    const refreshData = async () => {
        setLoading(true);
        try {
            const [ordersData, messagesData, productsData, statsData] = await Promise.all([
                db.orders.getAll(),
                db.messages.getAll(),
                db.products.getAll(),
                db.stats.getOverview()
            ]);
            setOrders(ordersData);
            setMessages(messagesData);
            setProducts(productsData);
            setCoupons(db.coupons.getAll());
            setStats(statsData);
        } catch (e) {
            console.error('Failed to load admin data:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            refreshData();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem('adminAuth', 'true');
        } else {
            setError('رمز عبور نادرست است (رمز پیش‌فرض: admin@rostara)');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
        setPassword('');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    const formatDate = (isoString) => {
        if (!isoString) return 'نامشخص';
        try {
            const date = new Date(isoString);
            return new Intl.DateTimeFormat('fa-IR', {
                dateStyle: 'short',
                timeStyle: 'short'
            }).format(date);
        } catch {
            return isoString;
        }
    };

    // ---------------- ORDER ACTIONS ----------------
    const handleStatusChange = async (orderId, newStatus) => {
        await db.orders.updateStatus(orderId, newStatus);
        await refreshData();
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm(`آیا از حذف سفارش ${orderId} اطمینان دارید؟`)) {
            await db.orders.delete(orderId);
            await refreshData();
        }
    };

    // ---------------- PRODUCT ACTIONS ----------------
    const handleOpenAddProduct = () => {
        setEditingProduct(null);
        setProductFormData({
            name: '',
            name_en: '',
            category: 'microgreens',
            price: '',
            weight: '',
            in_stock: true,
            features: '',
            benefits: '',
            usage: ''
        });
        setIsProductModalOpen(true);
    };

    const handleOpenEditProduct = (prod) => {
        setEditingProduct(prod);
        setProductFormData({
            name: prod.name || '',
            name_en: prod.name_en || '',
            category: prod.category || 'microgreens',
            price: prod.price || '',
            weight: prod.weight || '',
            in_stock: prod.in_stock !== false,
            features: Array.isArray(prod.features) ? prod.features.join(' ، ') : (prod.features || ''),
            benefits: prod.benefits || prod.desc || '',
            usage: prod.usage || ''
        });
        setIsProductModalOpen(true);
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        const featArray = productFormData.features
            ? productFormData.features.split(/[،,]/).map(s => s.trim()).filter(Boolean)
            : [];

        const prodToSave = {
            id: editingProduct ? editingProduct.id : ('prod_' + Date.now()),
            name: productFormData.name,
            name_en: productFormData.name_en,
            category: productFormData.category,
            price: Number(productFormData.price),
            weight: productFormData.weight,
            in_stock: Boolean(productFormData.in_stock),
            features: featArray,
            benefits: productFormData.benefits,
            usage: productFormData.usage,
            rating: editingProduct?.rating || 5.0,
            reviews_count: editingProduct?.reviews_count || 1
        };

        await db.products.save(prodToSave);
        setIsProductModalOpen(false);
        await refreshData();
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('آیا از حذف این محصول اطمینان دارید؟')) {
            await db.products.delete(id);
            await refreshData();
        }
    };

    const handleResetProducts = async () => {
        if (window.confirm('آیا مایلید لیست محصولات به کاتالوگ ۱۶ محصول اصلی بازنشانی شود؟')) {
            db.products.resetToDefault();
            await refreshData();
        }
    };

    // ---------------- MESSAGE ACTIONS ----------------
    const handleToggleReadMessage = async (msgId) => {
        await db.messages.markRead(msgId);
        await refreshData();
    };

    const handleDeleteMessage = async (msgId) => {
        if (window.confirm('آیا از حذف این پیام اطمینان دارید؟')) {
            await db.messages.delete(msgId);
            await refreshData();
        }
    };

    // Filtered Orders
    const filteredOrders = orders.filter(o => {
        const matchesStatus = orderFilter === 'all' || o.status === orderFilter;
        if (!orderSearch.trim()) return matchesStatus;
        const q = orderSearch.toLowerCase();
        const matchesQuery = (o.id && o.id.toLowerCase().includes(q)) ||
                             (o.full_name && o.full_name.toLowerCase().includes(q)) ||
                             (o.phone && o.phone.includes(q));
        return matchesStatus && matchesQuery;
    });

    // Filtered Products
    const filteredProducts = products.filter(p => {
        if (!productSearch.trim()) return true;
        const q = productSearch.toLowerCase();
        return (p.name && p.name.toLowerCase().includes(q)) ||
               (p.category && p.category.toLowerCase().includes(q));
    });

    // If not authenticated, show login form
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 py-12 transition-colors duration-300">
                <div className="max-w-md w-full">
                    <div className="bg-white dark:bg-brown-900 rounded-3xl p-8 border border-brown-200/80 dark:border-brown-800 shadow-xl">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-950 rounded-2xl mb-4 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
                                <Lock className="w-8 h-8" />
                            </div>
                            <h1 className="text-2xl font-display font-extrabold text-brown-900 dark:text-cream">
                                پنل مدیریت رُستارا
                            </h1>
                            <p className="text-brown-600 dark:text-brown-400 text-xs mt-2">
                                پایش سفارش‌ها، محصولات، پیام‌ها و کدهای تخفیف
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-red-600 dark:text-red-400 text-xs">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-brown-800 dark:text-brown-200 mb-2">
                                    رمز عبور مدیریت
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="admin@rostara"
                                        className="w-full px-4 py-3.5 rounded-xl border border-brown-200 dark:border-brown-700 bg-white dark:bg-brown-800 text-brown-900 dark:text-cream focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                ورود به مدیریت
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">
                                پیشخوان هوشمند دیتابیس رُستارا
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-brown-900 dark:text-cream">
                            مدیریت و کنترل فروشگاه
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={refreshData}
                            disabled={loading}
                            className="px-4 py-2.5 bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-800 text-brown-700 dark:text-brown-300 hover:bg-brown-50 dark:hover:bg-brown-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                            <span>به‌روزرسانی داده‌ها</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>خروج</span>
                        </button>
                    </div>
                </div>

                {/* KPI Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-brown-900 p-5 rounded-2xl border border-brown-200/80 dark:border-brown-800 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-brown-500 dark:text-brown-400 font-medium">مجموع فروش</span>
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                                <DollarSign className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl font-extrabold text-brown-900 dark:text-cream">
                            {formatPrice(stats.totalRevenue)}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-brown-900 p-5 rounded-2xl border border-brown-200/80 dark:border-brown-800 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-brown-500 dark:text-brown-400 font-medium">سفارش‌های ثبت شده</span>
                            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl font-extrabold text-brown-900 dark:text-cream">
                            {stats.totalOrders} <span className="text-xs font-normal text-brown-500">سفارش</span>
                        </p>
                    </div>

                    <div className="bg-white dark:bg-brown-900 p-5 rounded-2xl border border-brown-200/80 dark:border-brown-800 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-brown-500 dark:text-brown-400 font-medium">در انتظار اقدام</span>
                            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                                <Clock className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                            {stats.pendingOrders} <span className="text-xs font-normal text-brown-500">مورد اقدام</span>
                        </p>
                    </div>

                    <div className="bg-white dark:bg-brown-900 p-5 rounded-2xl border border-brown-200/80 dark:border-brown-800 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-brown-500 dark:text-brown-400 font-medium">پیام‌های جدید</span>
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                                <MessageSquare className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                            {stats.unreadMessages} <span className="text-xs font-normal text-brown-500">پیام</span>
                        </p>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex border-b border-brown-200 dark:border-brown-800 mb-8 overflow-x-auto scrollbar-hide">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'orders'
                                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                : 'border-transparent text-brown-500 dark:text-brown-400 hover:text-brown-700'
                        }`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>مدیریت سفارش‌ها ({orders.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'products'
                                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                : 'border-transparent text-brown-500 dark:text-brown-400 hover:text-brown-700'
                        }`}
                    >
                        <Sprout className="w-4 h-4" />
                        <span>کاتالوگ محصولات ({products.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'messages'
                                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                : 'border-transparent text-brown-500 dark:text-brown-400 hover:text-brown-700'
                        }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>صندوق پیام‌ها ({messages.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('coupons')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'coupons'
                                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                : 'border-transparent text-brown-500 dark:text-brown-400 hover:text-brown-700'
                        }`}
                    >
                        <Tag className="w-4 h-4" />
                        <span>کدهای تخفیف فعال ({coupons.length})</span>
                    </button>
                </div>

                {/* TAB 1: ORDERS */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-brown-900 p-4 rounded-2xl border border-brown-200/80 dark:border-brown-800">
                            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                                {[
                                    { key: 'all', label: 'همه' },
                                    { key: 'pending', label: 'در انتظار' },
                                    { key: 'processing', label: 'در حال آماده‌سازی' },
                                    { key: 'shipped', label: 'ارسال شده' },
                                    { key: 'delivered', label: 'تحویل داده شده' },
                                    { key: 'cancelled', label: 'لغو شده' }
                                ].map(statusItem => (
                                    <button
                                        key={statusItem.key}
                                        onClick={() => setOrderFilter(statusItem.key)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                                            orderFilter === statusItem.key
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-cream dark:bg-brown-800 text-brown-600 dark:text-brown-300 hover:bg-brown-200'
                                        }`}
                                    >
                                        {statusItem.label}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full sm:w-72">
                                <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-brown-400" />
                                <input
                                    type="text"
                                    value={orderSearch}
                                    onChange={(e) => setOrderSearch(e.target.value)}
                                    placeholder="جستجوی کد، مشتری یا موبایل..."
                                    className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream focus:outline-none"
                                />
                            </div>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <div className="p-12 text-center bg-white dark:bg-brown-900 rounded-2xl border border-brown-200/80 dark:border-brown-800">
                                <ShoppingBag className="w-12 h-12 text-brown-400 mx-auto mb-3" />
                                <p className="text-brown-600 dark:text-brown-400 font-bold">هیچ سفارشی با این مشخصات یافت نشد</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="bg-white dark:bg-brown-900 rounded-2xl p-6 border border-brown-200/80 dark:border-brown-800 shadow-sm hover:shadow transition-all"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-brown-100 dark:border-brown-800">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-mono font-extrabold text-base text-primary-700 dark:text-primary-400">
                                                        {order.id}
                                                    </span>
                                                    <span className="text-xs text-brown-500 dark:text-brown-400">
                                                        {formatDate(order.created_at)}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-brown-900 dark:text-cream text-sm">
                                                    {order.full_name} <span className="text-xs text-brown-500 font-mono">({order.phone})</span>
                                                </h3>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-brown-500">تغییر وضعیت:</span>
                                                <select
                                                    value={order.status || 'pending'}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream focus:outline-none"
                                                >
                                                    <option value="pending">⏳ در انتظار اقدام</option>
                                                    <option value="processing">🌿 در حال آماده‌سازی</option>
                                                    <option value="shipped">🚚 ارسال شده</option>
                                                    <option value="delivered">✅ تحویل داده شد</option>
                                                    <option value="cancelled">❌ لغو سفارش</option>
                                                </select>

                                                <button
                                                    onClick={() => setSelectedOrderDetails(order)}
                                                    className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950 rounded-lg text-xs font-bold"
                                                    title="مشاهده فاکتور کامل"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteOrder(order.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg text-xs"
                                                    title="حذف سفارش"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-brown-600 dark:text-brown-300">
                                            <div>
                                                <span className="font-bold text-brown-800 dark:text-brown-200">مقصد: </span>
                                                <span>{order.address} {order.city ? `(${order.city})` : ''}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span>اقلام: <b>{order.items?.length || 0} قلم</b></span>
                                                <span>مبلغ: <b className="text-sm font-extrabold text-primary-700 dark:text-primary-400">{formatPrice(order.total_price)}</b></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: PRODUCTS */}
                {activeTab === 'products' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-brown-900 p-4 rounded-2xl border border-brown-200/80 dark:border-brown-800">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleOpenAddProduct}
                                    className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>افزودن محصول جدید</span>
                                </button>
                                <button
                                    onClick={handleResetProducts}
                                    className="px-4 py-2.5 bg-cream dark:bg-brown-800 text-brown-700 dark:text-brown-300 rounded-xl text-xs font-bold hover:bg-brown-200 transition-colors"
                                >
                                    بازنشانی به کاتالوگ اصلی
                                </button>
                            </div>

                            <div className="relative w-full sm:w-72">
                                <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-brown-400" />
                                <input
                                    type="text"
                                    value={productSearch}
                                    onChange={(e) => setProductSearch(e.target.value)}
                                    placeholder="جستجوی نام محصول..."
                                    className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-white dark:bg-brown-900 rounded-2xl p-5 border border-brown-200/80 dark:border-brown-800 flex flex-col justify-between shadow-sm"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 font-bold">
                                                {p.category}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                                p.in_stock !== false 
                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                                                    : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                                            }`}>
                                                {p.in_stock !== false ? 'موجود در انبار' : 'ناموجود'}
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-brown-900 dark:text-cream text-base mb-1">
                                            {p.name}
                                        </h4>
                                        {p.name_en && (
                                            <p className="text-xs font-mono text-brown-400 mb-2">{p.name_en}</p>
                                        )}
                                        <p className="text-xs text-brown-600 dark:text-brown-400 line-clamp-2 mb-4">
                                            {p.benefits || p.desc}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-brown-100 dark:border-brown-800">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs text-brown-500">{p.weight}</span>
                                            <span className="text-base font-extrabold text-primary-700 dark:text-primary-400">
                                                {formatPrice(p.price)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleOpenEditProduct(p)}
                                                className="flex-1 py-2 bg-cream dark:bg-brown-800 hover:bg-brown-200 dark:hover:bg-brown-700 text-brown-800 dark:text-brown-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                                <span>ویرایش</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(p.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                                                title="حذف محصول"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 3: CONTACT MESSAGES */}
                {activeTab === 'messages' && (
                    <div className="space-y-4">
                        {messages.length === 0 ? (
                            <div className="p-12 text-center bg-white dark:bg-brown-900 rounded-2xl border border-brown-200/80 dark:border-brown-800">
                                <MessageSquare className="w-12 h-12 text-brown-400 mx-auto mb-3" />
                                <p className="text-brown-600 dark:text-brown-400 font-bold">هیچ پیامی در صندوق تماس موجود نیست</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`bg-white dark:bg-brown-900 rounded-2xl p-6 border transition-all ${
                                        msg.status === 'unread' 
                                            ? 'border-primary-400 dark:border-primary-600 bg-primary-50/20' 
                                            : 'border-brown-200/80 dark:border-brown-800'
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-brown-900 dark:text-cream text-sm">
                                                {msg.name || msg.full_name || 'کاربر مهمان'}
                                            </span>
                                            {msg.status === 'unread' && (
                                                <span className="px-2 py-0.5 rounded-full bg-primary-600 text-white text-[10px] font-bold">
                                                    جدید
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-brown-500">
                                            <span>{formatDate(msg.created_at)}</span>
                                            <button
                                                onClick={() => handleToggleReadMessage(msg.id)}
                                                className="text-primary-600 dark:text-primary-400 hover:underline"
                                            >
                                                {msg.status === 'unread' ? 'علامت به عنوان خوانده شده' : 'خوانده شده'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteMessage(msg.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-xs text-brown-600 dark:text-brown-400 mb-3">
                                        {msg.email && (
                                            <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-primary-600">
                                                <Mail className="w-3.5 h-3.5" />
                                                <span>{msg.email}</span>
                                            </a>
                                        )}
                                        {msg.phone && (
                                            <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-primary-600">
                                                <Phone className="w-3.5 h-3.5" />
                                                <span className="font-mono">{msg.phone}</span>
                                            </a>
                                        )}
                                    </div>

                                    <p className="text-sm text-brown-800 dark:text-brown-200 bg-cream dark:bg-brown-800/40 p-4 rounded-xl leading-relaxed">
                                        {msg.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* TAB 4: COUPONS */}
                {activeTab === 'coupons' && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {coupons.map((coupon, i) => (
                            <div key={i} className="bg-white dark:bg-brown-900 rounded-2xl p-5 border border-brown-200/80 dark:border-brown-800">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-mono font-extrabold text-lg text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-950 px-3 py-1 rounded-xl">
                                        {coupon.code}
                                    </span>
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                                        {coupon.type === 'percent' ? `${coupon.value}٪ تخفیف` : `${formatPrice(coupon.value)}`}
                                    </span>
                                </div>
                                <h4 className="font-bold text-brown-900 dark:text-cream text-sm mb-1">{coupon.title}</h4>
                                <p className="text-xs text-brown-500">
                                    حداقل خرید: {coupon.min_total ? formatPrice(coupon.min_total) : 'بدون سقف'}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ORDER DETAILS MODAL */}
            {selectedOrderDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-brown-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-brown-200 dark:border-brown-800 p-6 shadow-2xl relative">
                        <button
                            onClick={() => setSelectedOrderDetails(null)}
                            className="absolute top-5 left-5 p-2 rounded-full hover:bg-cream dark:hover:bg-brown-800 text-brown-500"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-4">
                            فاکتور سفارش {selectedOrderDetails.id}
                        </h3>

                        <div className="space-y-3 text-xs text-brown-700 dark:text-brown-300 mb-6 bg-cream dark:bg-brown-800/50 p-4 rounded-2xl">
                            <div>نام مشتری: <b>{selectedOrderDetails.full_name}</b></div>
                            <div>شماره تماس: <b className="font-mono">{selectedOrderDetails.phone}</b></div>
                            <div>آدرس: <b>{selectedOrderDetails.address} ({selectedOrderDetails.city})</b></div>
                            {selectedOrderDetails.postal_code && <div>کد پستی: <b className="font-mono">{selectedOrderDetails.postal_code}</b></div>}
                            {selectedOrderDetails.notes && <div>یادداشت: <b className="text-amber-700 dark:text-amber-400">{selectedOrderDetails.notes}</b></div>}
                        </div>

                        <h4 className="font-bold text-xs text-brown-900 dark:text-cream mb-2">اقلام سفارش:</h4>
                        <div className="space-y-2 mb-6">
                            {selectedOrderDetails.items?.map((it, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-cream dark:bg-brown-800/30 text-xs">
                                    <span>{it.quantity}× {it.name}</span>
                                    <span className="font-bold">{formatPrice(it.price * it.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-brown-100 dark:border-brown-800 flex justify-between items-center">
                            <span className="font-bold text-sm">مبلغ نهایی پرداختی:</span>
                            <span className="text-xl font-extrabold text-primary-700 dark:text-primary-400">
                                {formatPrice(selectedOrderDetails.total_price)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* PRODUCT ADD/EDIT MODAL */}
            {isProductModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-brown-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-brown-200 dark:border-brown-800 p-6 shadow-2xl relative">
                        <button
                            onClick={() => setIsProductModalOpen(false)}
                            className="absolute top-5 left-5 p-2 rounded-full hover:bg-cream dark:hover:bg-brown-800 text-brown-500"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-4">
                            {editingProduct ? 'ویرایش محصول' : 'افزودن محصول جدید'}
                        </h3>

                        <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-bold mb-1">نام محصول (فارسی)</label>
                                <input
                                    type="text"
                                    value={productFormData.name}
                                    onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold mb-1">نام لاتین (انگلیسی)</label>
                                <input
                                    type="text"
                                    value={productFormData.name_en}
                                    onChange={(e) => setProductFormData({ ...productFormData, name_en: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream font-mono"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold mb-1">دسته‌بندی</label>
                                    <select
                                        value={productFormData.category}
                                        onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream"
                                    >
                                        <option value="microgreens">میکروگرین‌ها</option>
                                        <option value="growing_kits">کیت‌ها و بستر کشت</option>
                                        <option value="fermented">خوراک‌های تخمیری</option>
                                        <option value="mushrooms">قارچ‌های دارویی</option>
                                        <option value="superfoods">سوپرفودها</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-bold mb-1">قیمت (تومان)</label>
                                    <input
                                        type="number"
                                        value={productFormData.price}
                                        onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold mb-1">واحد / وزن (مثلاً ۱۰۰ گرم)</label>
                                    <input
                                        type="text"
                                        value={productFormData.weight}
                                        onChange={(e) => setProductFormData({ ...productFormData, weight: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold mb-1">وضعیت انبار</label>
                                    <select
                                        value={productFormData.in_stock ? 'true' : 'false'}
                                        onChange={(e) => setProductFormData({ ...productFormData, in_stock: e.target.value === 'true' })}
                                        className="w-full px-3 py-2 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream"
                                    >
                                        <option value="true">موجود در انبار</option>
                                        <option value="false">ناموجود</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold mb-1">ویژگی‌های شاخص (با ویرگول جدا کنید)</label>
                                <input
                                    type="text"
                                    value={productFormData.features}
                                    onChange={(e) => setProductFormData({ ...productFormData, features: e.target.value })}
                                    placeholder="سرشار از سولفورافان ، بدون کود شیمیایی ، ارگانیک"
                                    className="w-full px-3 py-2 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream"
                                />
                            </div>

                            <div>
                                <label className="block font-bold mb-1">خواص و فواید زیستی</label>
                                <textarea
                                    value={productFormData.benefits}
                                    onChange={(e) => setProductFormData({ ...productFormData, benefits: e.target.value })}
                                    rows={2}
                                    className="w-full px-3 py-2 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream"
                                />
                            </div>

                            <div>
                                <label className="block font-bold mb-1">نحوه مصرف و نگهداری</label>
                                <textarea
                                    value={productFormData.usage}
                                    onChange={(e) => setProductFormData({ ...productFormData, usage: e.target.value })}
                                    rows={2}
                                    className="w-full px-3 py-2 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors text-sm"
                            >
                                ذخیره در دیتابیس
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
