import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import { Lock, Users, ShoppingBag, LogOut, Eye, EyeOff } from 'lucide-react';

const ADMIN_PASSWORD = 'admin@rostara';

const Admin = () => {
    const { t } = useTranslation();
    const { currentUser } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const [selectedUser, setSelectedUser] = useState(null);

    // Check if already authenticated on mount
    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Fetch data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchUsers();
            fetchOrders();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem('adminAuth', 'true');
        } else {
            setError('رمز عبور اشتباه است');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
        setPassword('');
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Note: This requires admin privileges in Supabase
            // For now, we'll show a message that this needs configuration
            const { data, error } = await supabase.auth.admin.listUsers();

            if (error) {
                console.error('Error fetching users:', error);
                setUsers([]);
            } else {
                setUsers(data.users || []);
            }
        } catch (err) {
            console.error('Error:', err);
            // Fallback: Show current user only
            if (currentUser) {
                setUsers([currentUser]);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching orders:', error);
            } else {
                const formattedOrders = data.map(order => ({
                    id: order.id,
                    timestamp: order.created_at,
                    fullName: order.full_name,
                    email: order.email,
                    phone: order.phone,
                    address: order.address,
                    city: order.city,
                    postalCode: order.postal_code,
                    notes: order.notes,
                    total: order.total_price,
                    items: order.items,
                    status: order.status
                }));
                setOrders(formattedOrders);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        if (!confirm('آیا از تغییر وضعیت این سفارش اطمینان دارید؟')) return;

        try {
            // Use RPC to bypass RLS and verify admin password
            const { data, error } = await supabase.rpc('admin_update_order_status', {
                order_id_input: orderId,
                new_status: newStatus,
                admin_secret: ADMIN_PASSWORD
            });

            if (error) {
                console.error('Error updating status:', error);
                alert('خطا در بروزرسانی وضعیت: ' + error.message);
            } else if (!data.success) {
                alert('خطا: ' + data.message);
            } else {
                // If status is 'delivered', trigger cashback (if logic exists in DB triggers or separate RPC)
                if (newStatus === 'delivered') {
                    const { error: rpcError } = await supabase.rpc('process_cashback', { order_id_input: orderId });
                    if (rpcError) console.error('Cashback Error:', rpcError);
                    else alert('وضعیت تغییر کرد و پاداش ۱۲٪ به کیف پول کاربر واریز شد.');
                } else {
                    alert('وضعیت با موفقیت تغییر کرد.');
                }

                // Refresh list
                fetchOrders();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('خطا در برقراری ارتباط با سرور');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    // Login Form
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 py-20 transition-colors duration-300">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                            پنل مدیریت
                        </h1>
                        <p className="text-brown-600 dark:text-brown-300">
                            لطفاً رمز عبور ادمین را وارد کنید
                        </p>
                    </div>

                    <div className="bg-white dark:bg-brown-900 rounded-2xl p-8 border border-brown-100 dark:border-brown-800 shadow-lg transition-colors">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                    رمز عبور ادمین
                                </label>
                                <div className="relative">
                                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 dark:text-brown-500" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 pl-12 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                        placeholder={t('admin.login.passwordPlaceholder')}
                                        dir="ltr"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400 dark:text-brown-500 hover:text-brown-600 dark:hover:text-brown-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                {t('admin.login.submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                            {t('admin.title')}
                        </h1>
                        <p className="text-brown-600 dark:text-brown-300">
                            مدیریت کاربران و سفارش‌ها
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        {t('auth.logout')}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'users'
                            ? 'bg-primary-600 text-white shadow-lg'
                            : 'bg-white dark:bg-brown-900 text-brown-800 dark:text-brown-200 border border-brown-200 dark:border-brown-800'
                            }`}
                    >
                        <Users className="w-5 h-5" />
                        {t('admin.tabs.users')} ({users.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'orders'
                            ? 'bg-primary-600 text-white shadow-lg'
                            : 'bg-white dark:bg-brown-900 text-brown-800 dark:text-brown-200 border border-brown-200 dark:border-brown-800'
                            }`}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {t('admin.tabs.orders')} ({orders.length})
                    </button>
                </div>

                {/* Users Table */}
                {activeTab === 'users' && (
                    <div className="bg-white dark:bg-brown-900 rounded-2xl border border-brown-100 dark:border-brown-800 overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-brown-50 dark:bg-brown-800 border-b border-brown-100 dark:border-brown-700">
                                    <tr>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-brown-800 dark:text-brown-200">{t('admin.users.email')}</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-brown-800 dark:text-brown-200">{t('admin.users.name')}</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-brown-800 dark:text-brown-200">{t('admin.users.joined')}</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-brown-800 dark:text-brown-200">{t('admin.users.lastLogin')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brown-100 dark:divide-brown-800">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-brown-600 dark:text-brown-300">
                                                در حال بارگذاری...
                                            </td>
                                        </tr>
                                    ) : users.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-brown-600 dark:text-brown-300">
                                                {t('admin.users.noUsers')}
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user, index) => (
                                            <tr
                                                key={user.id || index}
                                                onClick={() => setSelectedUser(user)}
                                                className="hover:bg-brown-50 dark:hover:bg-brown-800/50 transition-colors cursor-pointer"
                                            >
                                                <td className="px-6 py-4 text-brown-900 dark:text-cream">{user.email}</td>
                                                <td className="px-6 py-4 text-brown-700 dark:text-brown-300">
                                                    {user.user_metadata?.display_name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-brown-700 dark:text-brown-300">
                                                    {formatDate(user.created_at)}
                                                </td>
                                                <td className="px-6 py-4 text-brown-700 dark:text-brown-300">
                                                    {formatDate(user.last_sign_in_at)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Orders Table */}
                {activeTab === 'orders' && (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white dark:bg-brown-900 rounded-2xl border border-brown-100 dark:border-brown-800 p-6 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-2">
                                            {t('admin.orders.orderId', { id: order.id.replace('order_', '') })}
                                        </h3>
                                        <p className="text-brown-600 dark:text-brown-300 text-sm">
                                            {formatDate(order.timestamp)}
                                        </p>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                                            {formatPrice(order.total)}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-brown-600 dark:text-brown-400 mb-1">نام مشتری</p>
                                        <p className="text-brown-900 dark:text-cream font-medium">{order.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-brown-600 dark:text-brown-400 mb-1">شماره تماس</p>
                                        <p className="text-brown-900 dark:text-cream font-medium" dir="ltr">{order.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-brown-600 dark:text-brown-400 mb-1">ایمیل</p>
                                        <p className="text-brown-900 dark:text-cream font-medium" dir="ltr">{order.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-brown-600 dark:text-brown-400 mb-1">وضعیت سفارش</p>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            className="w-full px-3 py-2 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-lg text-sm text-brown-900 dark:text-cream focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="pending">ثبت شده</option>
                                            <option value="processing">در حال پردازش</option>
                                            <option value="shipped">در حال ارسال</option>
                                            <option value="delivered">تحویل شده</option>
                                            <option value="cancelled">لغو شده</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-brown-600 dark:text-brown-400 mb-1">شهر</p>
                                    <p className="text-brown-900 dark:text-cream font-medium">{order.city}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-brown-600 dark:text-brown-400 mb-1">آدرس</p>
                                    <p className="text-brown-900 dark:text-cream">{order.address}</p>
                                    <p className="text-brown-700 dark:text-brown-300 text-sm mt-1">کد پستی: {order.postalCode}</p>
                                </div>

                                {order.notes && (
                                    <div className="mb-4">
                                        <p className="text-sm text-brown-600 dark:text-brown-400 mb-1">یادداشت</p>
                                        <p className="text-brown-900 dark:text-cream">{order.notes}</p>
                                    </div>
                                )}

                                <div className="border-t border-brown-100 dark:border-brown-800 pt-4">
                                    <p className="text-sm font-semibold text-brown-800 dark:text-brown-200 mb-3">محصولات:</p>
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="text-brown-700 dark:text-brown-300">
                                                    {item.name} × {item.quantity}
                                                </span>
                                                <span className="text-brown-900 dark:text-cream font-medium">
                                                    {formatPrice(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* User Profile Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white dark:bg-brown-900 w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-4 left-4 p-2 hover:bg-black/10 rounded-full transition-colors"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xl font-bold">
                                {selectedUser.email[0].toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-brown-900 dark:text-cream">
                                    {selectedUser.user_metadata?.display_name || 'کاربر بدون نام'}
                                </h2>
                                <p className="text-brown-500">{selectedUser.email}</p>
                            </div>
                        </div>

                        {/* User Data Sections */}
                        <div className="space-y-6">
                            {/* Wallet Info (Placeholder - needs fetching if we want live data) */}
                            <div className="bg-cream dark:bg-brown-800 p-4 rounded-xl">
                                <h3 className="font-bold text-brown-900 dark:text-cream mb-2 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    اطلاعات کیف پول
                                </h3>
                                {/* We could fetch real wallet data here if we had a sub-component */}
                                <p className="text-brown-600 text-sm">برای مشاهده موجودی دقیق به جدول Wallets در دیتابیس مراجعه کنید.</p>
                            </div>

                            {/* User Orders */}
                            <div>
                                <h3 className="font-bold text-brown-900 dark:text-cream mb-4">سفارش‌های کاربر</h3>
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {orders.filter(o => o.email === selectedUser.email).length === 0 ? (
                                        <p className="text-brown-500 text-center py-4">این کاربر سفارشی ندارد.</p>
                                    ) : (
                                        orders
                                            .filter(o => o.email === selectedUser.email)
                                            .map(order => (
                                                <div key={order.id} className="border border-brown-200 dark:border-brown-700 p-3 rounded-lg flex justify-between items-center">
                                                    <div>
                                                        <span className="text-sm font-bold block text-brown-900 dark:text-cream">سفارش #{order.id}</span>
                                                        <span className="text-xs text-brown-500">{formatDate(order.timestamp)}</span>
                                                    </div>
                                                    <div className="text-left">
                                                        <span className="block font-medium text-primary-600">{formatPrice(order.total)}</span>
                                                        <span className="text-xs px-2 py-1 bg-brown-100 dark:bg-brown-800 rounded-full text-brown-600 dark:text-brown-300">
                                                            {order.status === 'delivered' ? 'تحویل شده' :
                                                                order.status === 'pending' ? 'ثبت شده' : order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
