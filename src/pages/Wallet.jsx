import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import { Wallet as WalletIcon, Gift, ArrowRightLeft, CreditCard, History, Send, ShoppingBag, Clock, Crown, Award, CheckCircle, LogOut } from 'lucide-react';

const Wallet = () => {
    const { currentUser, logout } = useAuth();
    const [balance, setBalance] = useState({ credit: 0, cash: 0, tickets: 0 });
    const [vipData, setVipData] = useState({ level: 0, dailyClicks: 0, claimedRewards: [], nextClickAt: null });
    const [vipLoading, setVipLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [myOrders, setMyOrders] = useState([]); // New: User Orders
    const [loading, setLoading] = useState(true);
    const [transferEmail, setTransferEmail] = useState('');
    const [cryptoAmount, setCryptoAmount] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState('TRC20');
    const [txHash, setTxHash] = useState('');
    // Delete Account State
    const [isDeleting, setIsDeleting] = useState(false);
    const [activeTab, setActiveTab] = useState('orders'); // Default to Orders now maybe? or stay overview

    // Wallet Addresses
    const WALLETS = {
        'TRC20': 'TMBQGYcK4N1HWsgwzjbpyXpMW9e8Kvy32R',
        'BSC': '0xa9F710E0711122b95301bA81b860cB5fbDFF0B45',
        'ETH': '0xa9F710E0711122b95301bA81b860cB5fbDFF0B45' // Same as BSC
    };

    useEffect(() => {
        if (currentUser) {
            fetchWalletData();
        }
    }, [currentUser]);

    const fetchWalletData = async () => {
        try {
            // 1. Fetch Wallet
            const { data: wallet } = await supabase
                .from('wallets')
                .select('*')
                .eq('user_id', currentUser.id)
                .single();

            if (wallet) {
                setBalance({
                    credit: wallet.credit_balance,
                    cash: wallet.cash_balance || 0, // Handle missing column if old record
                    tickets: wallet.ticket_balance
                });
                setVipData({
                    level: wallet.vip_level || 0,
                    dailyClicks: wallet.daily_clicks || 0,
                    claimedRewards: wallet.claimed_rewards || [],
                    nextClickAt: wallet.last_click_at ? new Date(new Date(wallet.last_click_at).getTime() + 24 * 60 * 60 * 1000) : null
                });

                // Fetch Transactions
                const { data: txs } = await supabase
                    .from('wallet_transactions')
                    .select('*')
                    .eq('wallet_id', wallet.id)
                    .order('created_at', { ascending: false });
                if (txs) setTransactions(txs);
            }

            // 2. Fetch User Orders
            const { data: orders } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', currentUser.id)
                .order('created_at', { ascending: false });

            if (orders) setMyOrders(orders);

        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConvertTicket = async () => {
        if (balance.credit < 500000) return alert('موجودی اعتباری کافی نیست. (نیاز: ۵۰۰,۰۰۰ تومان)');
        if (!confirm('آیا مطمئن هستید؟ ۵۰۰,۰۰۰ تومان از اعتبار شما کسر و ۱ تیکت اضافه می‌شود.')) return;

        try {
            const { error } = await supabase.rpc('convert_credit_to_ticket');
            if (error) throw error;
            alert('تبدیل با موفقیت انجام شد!');
            fetchWalletData();
        } catch (err) {
            alert('خطا در تبدیل: ' + err.message);
        }
    };

    const handleTransferTicket = async (e) => {
        e.preventDefault();
        if (balance.tickets < 1) return alert('تیکت کافی ندارید.');

        const isDonation = transferEmail === 'donate@rostara.ir';
        const msg = isDonation
            ? 'با اهدای این تیکت، ۲۵۰,۰۰۰ تومان (۵۰٪) به حساب اعتباری شما باز میگردد. ادامه میدهید؟'
            : `آیا از ارسال ۱ تیکت به ${transferEmail} اطمینان دارید؟`;

        if (!confirm(msg)) return;

        try {
            const { error } = await supabase.rpc('transfer_ticket', { receiver_email: transferEmail });
            if (error) throw error;
            alert(isDonation ? 'اهدا انجام شد! پاداش به حساب شما واریز گردید.' : 'تیکت ارسال شد.');
            setTransferEmail('');
            fetchWalletData();
        } catch (err) {
            alert('خطا در ارسال: ' + err.message);
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm('آیا مطمئن هستید؟ این عملیات غیرقابل بازگشت است و تمام اطلاعات شما (سفارش‌ها، کیف پول و...) پاک خواهد شد.')) return;

        setIsDeleting(true);
        try {
            const { error } = await supabase.rpc('delete_own_account');
            if (error) throw error;

            alert('حساب کاربری شما با موفقیت حذف شد.');
            alert('حساب کاربری شما با موفقیت حذف شد.');
            await logout();
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('خطا در حذف حساب کاربری: ' + error.message);
            setIsDeleting(false);
        }
    };

    const handleCryptoDeposit = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('crypto_deposits').insert([{
                user_id: currentUser.id,
                network: selectedNetwork,
                amount_declared: cryptoAmount,
                tx_hash: txHash
            }]);

            if (error) throw error;
            alert('درخواست واریز ثبت شد. پس از تایید ادمین به کیف پول نقدی شما اضافه می‌شود.');
            setTxHash('');
            setCryptoAmount('');
        } catch (err) {
            alert('خطا در ثبت درخواست: ' + err.message);
        }
    };

    const handleVaqtBekheir = async () => {
        if (vipLoading) return;
        setVipLoading(true);
        try {
            const { data, error } = await supabase.rpc('click_vaqt_bekheir');

            if (error) {
                console.error('RPC Error:', error);
                alert('خطا در ارتباط با سرور: ' + error.message);
                return;
            }

            // Update State
            setVipData(prev => ({
                ...prev,
                dailyClicks: data.daily_clicks,
                level: data.vip_level,
                nextClickAt: data.next_click_at ? new Date(data.next_click_at) : null
            }));

            if (data.leveled_up) {
                alert('🎉 تبریک! سطح VIP شما ارتقا یافت.');
            } else if (data.success) {
                alert('✅ وقت بخیر! فعالیت امروز شما ثبت شد.');
            } else {
                alert('❌ ' + (data.message || 'خطای نامشخص'));
            }

        } catch (err) {
            console.error('Unexpected Error:', err);
            alert('خطای غیرمنتظره: ' + err.message);
        } finally {
            setVipLoading(false);
        }
    };

    const isClickable = !vipData.nextClickAt || new Date() >= new Date(vipData.nextClickAt);
    const getButtonText = () => {
        if (isClickable) return 'وقت بخیر!';
        return 'فردا برگردید';
    };

    const handleClaimReward = async (level) => {
        try {
            const { data, error } = await supabase.rpc('claim_vip_reward', { reward_level: level });
            if (error) throw error;
            alert('پاداش دریافت شد!');
            fetchWalletData();
        } catch (err) {
            alert('خطا: ' + err.message);
        }
    };

    const formatPrice = (price) => new Intl.NumberFormat('fa-IR').format(price);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('fa-IR');
    const toPersianDigits = (num) => {
        if (num === null || num === undefined) return '';
        const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, x => farsiDigits[x]);
    };

    if (loading) return <div className="min-h-screen pt-32 text-center">...</div>;

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-2xl">
                        <WalletIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-display font-bold text-brown-900 dark:text-cream">
                                کیف پول من
                            </h2>
                        </div>
                        <p className="text-brown-600 dark:text-brown-300">مدیریت کیف پول، سفارشات و تیکت‌ها</p>
                    </div>
                </div>

                {/* Balances - Grid Layout */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Cash Wallet */}
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                        <div className="relative z-10">
                            <p className="text-gray-300 mb-2">کیف پول نقدی (تومان)</p>
                            <h2 className="text-3xl font-bold mb-4" dir="ltr">{formatPrice(balance.cash)}</h2>
                            <button
                                onClick={() => setActiveTab('deposit')}
                                className="bg-white/10 hover:bg-white/20 text-white text-sm py-2 px-4 rounded-lg transition-colors flex items-center gap-2 w-full justify-center"
                            >
                                <CreditCard className="w-4 h-4" />
                                شارژ با رمز ارز
                            </button>
                        </div>
                    </div>

                    {/* Credit Wallet */}
                    <div className="bg-gradient-to-br from-brown-800 to-brown-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                        <div className="relative z-10">
                            <p className="text-brown-200 mb-2">کیف پول اعتباری (پاداش)</p>
                            <h2 className="text-3xl font-bold mb-4" dir="ltr">{formatPrice(balance.credit)}</h2>
                            <button
                                onClick={handleConvertTicket}
                                className="bg-white/10 hover:bg-white/20 text-white text-sm py-2 px-4 rounded-lg transition-colors flex items-center gap-2 w-full justify-center"
                            >
                                <ArrowRightLeft className="w-4 h-4" />
                                تبدیل به تیکت
                            </button>
                        </div>
                    </div>

                    {/* Ticket Wallet */}
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                        <div className="relative z-10">
                            <p className="text-primary-100 mb-2">تیکت‌های جشنواره</p>
                            <h2 className="text-3xl font-bold mb-4">{toPersianDigits(balance.tickets)}</h2>
                            <button
                                onClick={() => setActiveTab('transfer')}
                                className="bg-white/10 hover:bg-white/20 text-white text-sm py-2 px-4 rounded-lg transition-colors flex items-center gap-2 w-full justify-center"
                            >
                                <Send className="w-4 h-4" />
                                ارسال / اهدا
                            </button>
                        </div>
                    </div>
                </div>

                {/* VIP Section */}
                <div className="rounded-2xl p-6 text-white shadow-xl mb-8 relative overflow-hidden bg-[linear-gradient(to_bottom_right,#996515,#DAA520,#C5a009,#B8860B,#996515)]">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-10 -mt-10"></div>
                    <div className="absolute inset-0 bg-black/20"></div> {/* Darker overlay for text readability */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-black/30 backdrop-blur-sm rounded-full border border-white/20">
                                <Crown className="w-8 h-8 text-white drop-shadow-md" />
                            </div>
                            <div className="drop-shadow-sm">
                                <h2 className="text-xl font-display font-bold mb-1 text-white text-shadow-sm">هر روز به ما سر بزنید و موج حضورتون رو ثبت کنید</h2>
                                <p className="text-white/95 font-medium text-shadow-sm">سطح فعلی: <span className="font-bold text-white text-xl">{toPersianDigits(vipData.level)}</span> از ۷</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="text-sm font-medium text-white/90 drop-shadow-sm">پیشرفت چرخه‌ی ۷ روزه</div>
                            <button
                                onClick={handleVaqtBekheir}
                                disabled={!isClickable || vipLoading}
                                className={`px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-xl flex items-center gap-2 min-w-[160px] justify-center border-2
                                    ${!isClickable
                                        ? 'bg-gray-800/40 border-gray-600/40 text-gray-200 cursor-not-allowed backdrop-blur-sm'
                                        : 'bg-gradient-to-b from-white to-gray-100 border-white/50 text-[#8a6c25] hover:from-white hover:to-white hover:text-[#b38728] hover:shadow-2xl hover:scale-105'}`}
                            >
                                {vipLoading ? (
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    !isClickable ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />
                                )}
                                {vipLoading ? 'در حال ثبت...' : getButtonText()}
                            </button>
                            <div className="text-xs text-white/90 font-medium drop-shadow-sm">{toPersianDigits(vipData.dailyClicks)} / {toPersianDigits(7)} روز</div>
                        </div>

                        <div className="flex gap-4">
                            {/* Reward Level 3 */}
                            <div className="text-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 
                                    ${vipData.level >= 3 ? (vipData.claimedRewards.includes(3) ? 'bg-green-500/80 border-green-300 text-white shadow-lg' : 'bg-white/90 text-[#b38728] border-white/80 cursor-pointer hover:scale-110 transition shadow-lg') : 'bg-black/20 border-white/10 text-white/40 backdrop-blur-sm'}`}
                                    onClick={() => vipData.level >= 3 && !vipData.claimedRewards.includes(3) && handleClaimReward(3)}
                                    title="دریافت ۱ تیکت (سطح ۳)"
                                >
                                    <Gift className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium text-white drop-shadow-md">سطح {toPersianDigits(3)}</span>
                            </div>

                            {/* Reward Level 7 */}
                            <div className="text-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2
                                    ${vipData.level >= 7 ? (vipData.claimedRewards.includes(7) ? 'bg-green-500/80 border-green-300 text-white shadow-lg' : 'bg-white/90 text-[#b38728] border-white/80 cursor-pointer hover:scale-110 transition shadow-lg') : 'bg-black/20 border-white/10 text-white/40 backdrop-blur-sm'}`}
                                    onClick={() => vipData.level >= 7 && !vipData.claimedRewards.includes(7) && handleClaimReward(7)}
                                    title="دریافت ۲ تیکت (سطح ۷)"
                                >
                                    <Award className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium text-white drop-shadow-md">سطح {toPersianDigits(7)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1 space-y-2">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full text-right p-4 rounded-xl font-medium transition-colors flex items-center gap-3 ${activeTab === 'orders' ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-brown-900 text-brown-700 dark:text-brown-200 hover:bg-brown-50 dark:hover:bg-brown-800'}`}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            سفارش‌های من
                        </button>
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full text-right p-4 rounded-xl font-medium transition-colors flex items-center gap-3 ${activeTab === 'overview' ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-brown-900 text-brown-700 dark:text-brown-200 hover:bg-brown-50 dark:hover:bg-brown-800'}`}
                        >
                            <History className="w-5 h-5" />
                            تاریخچه تراکنش‌ها
                        </button>
                        <button
                            onClick={() => setActiveTab('deposit')}
                            className={`w-full text-right p-4 rounded-xl font-medium transition-colors flex items-center gap-3 ${activeTab === 'deposit' ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-brown-900 text-brown-700 dark:text-brown-200 hover:bg-brown-50 dark:hover:bg-brown-800'}`}
                        >
                            <CreditCard className="w-5 h-5" />
                            شارژ حساب (رمز ارز)
                        </button>
                        <button
                            onClick={() => setActiveTab('transfer')}
                            className={`w-full text-right p-4 rounded-xl font-medium transition-colors flex items-center gap-3 ${activeTab === 'transfer' ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-brown-900 text-brown-700 dark:text-brown-200 hover:bg-brown-50 dark:hover:bg-brown-800'}`}
                        >
                            <Send className="w-5 h-5" />
                            انتقال تیکت
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">

                        {/* 1. ORDERS TAB */}
                        {activeTab === 'orders' && (
                            <div className="bg-white dark:bg-brown-900 rounded-2xl p-6 border border-brown-100 dark:border-brown-800 min-h-[400px]">
                                <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-6">سفارش‌های من</h3>
                                {myOrders.length === 0 ? (
                                    <p className="text-center text-brown-500 py-8">هنوز سفارشی ثبت نکرده‌اید.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {myOrders.map(order => (
                                            <div key={order.id} className="border border-brown-200 dark:border-brown-700 rounded-xl p-4 hover:border-primary-300 transition-colors">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <span className="font-bold text-brown-900 dark:text-cream block">سفارش #{order.id}</span>
                                                        <span className="text-sm text-brown-500">{formatDate(order.created_at || order.timestamp)}</span>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                                                        ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                                    'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {order.status === 'pending' && 'در انتظار بررسی'}
                                                        {order.status === 'processing' && 'در حال پردازش'}
                                                        {order.status === 'shipped' && 'ارسال شده'}
                                                        {order.status === 'delivered' && 'تحویل شده'}
                                                        {order.status === 'cancelled' && 'لغو شده'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm text-brown-600 dark:text-brown-300 border-t border-brown-100 dark:border-brown-800 pt-3">
                                                    <span>مبلغ کل:</span>
                                                    <span className="font-bold text-primary-600">{formatPrice(order.total || order.total_price)} تومان</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 2. TRANSACTIONS TAB */}
                        {activeTab === 'overview' && (
                            <div className="bg-white dark:bg-brown-900 rounded-2xl p-6 border border-brown-100 dark:border-brown-800 min-h-[400px]">
                                <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-6">تراکنش‌های کیف پول</h3>
                                {transactions.length === 0 ? (
                                    <p className="text-center text-brown-500 py-8">تراکنشی یافت نشد.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {transactions.map(tx => (
                                            <div key={tx.id} className="flex justify-between items-center p-4 bg-cream dark:bg-brown-800/50 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-full ${tx.amount > 0 || tx.ticket_amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                        {tx.amount > 0 ? <CreditCard className="w-5 h-5" /> : <History className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-brown-900 dark:text-cream">{tx.description}</p>
                                                        <p className="text-xs text-brown-500">{formatDate(tx.created_at)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    {tx.amount !== 0 && (
                                                        <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`} dir="ltr">
                                                            {tx.amount > 0 ? '+' : ''}{formatPrice(tx.amount)} T
                                                        </p>
                                                    )}
                                                    {tx.ticket_amount !== 0 && (
                                                        <p className={`text-sm ${tx.ticket_amount > 0 ? 'text-green-600' : 'text-red-600'}`} dir="ltr">
                                                            {tx.ticket_amount > 0 ? '+' : ''}{tx.ticket_amount} Ticket
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 3. TRANSFER TAB */}
                        {activeTab === 'transfer' && (
                            <div className="bg-white dark:bg-brown-900 rounded-2xl p-6 border border-brown-100 dark:border-brown-800 min-h-[400px]">
                                <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-4">ارسال تیکت / اهدا</h3>
                                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl mb-6">
                                    <p className="text-sm text-primary-800 dark:text-primary-200">
                                        💡 <strong>نکته اهدا:</strong> با ارسال تیکت به آدرس <code className="bg-white/50 px-1 rounded">donate@rostara.ir</code>، شما ۵۰٪ ارزش تیکت (۲۵۰ هزار تومان) را به عنوان پاداش اعتباری دریافت میکنید!
                                    </p>
                                </div>
                                <form onSubmit={handleTransferTicket} className="space-y-4 max-w-md mx-auto">
                                    <div>
                                        <label className="block text-sm font-medium text-brown-700 dark:text-brown-300 mb-1">ایمیل گیرنده</label>
                                        <input
                                            type="email"
                                            required
                                            value={transferEmail}
                                            onChange={e => setTransferEmail(e.target.value)}
                                            placeholder="example@email.com"
                                            className="w-full px-4 py-3 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <button className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">
                                        ارسال تیکت
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* 4. DEPOSIT (RAMZARZ) TAB */}
                        {activeTab === 'deposit' && (
                            <div className="bg-white dark:bg-brown-900 rounded-2xl p-6 border border-brown-100 dark:border-brown-800 min-h-[400px]">
                                <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-4">شارژ حساب با رمز ارز</h3>
                                <div className="space-y-6">
                                    {/* Network Selector */}
                                    <div>
                                        <label className="block text-sm font-medium text-brown-700 dark:text-brown-300 mb-2">شبکه پرداخت را انتخاب کنید:</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['TRC20', 'BSC', 'ETH'].map(net => (
                                                <button
                                                    key={net}
                                                    onClick={() => setSelectedNetwork(net)}
                                                    className={`py-2 px-4 rounded-lg border font-medium transition-all
                                                        ${selectedNetwork === net
                                                            ? 'border-green-600 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                            : 'border-brown-200 dark:border-brown-700 text-brown-600 hover:bg-brown-50'}`}
                                                >
                                                    {net}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Address Display */}
                                    <div className="bg-gray-100 dark:bg-brown-800 p-4 rounded-xl border border-gray-200 dark:border-brown-700">
                                        <p className="text-xs text-brown-500 mb-1">آدرس کیف پول {selectedNetwork}:</p>
                                        <div className="flex items-center justify-between gap-2">
                                            <code className="text-sm font-mono break-all text-brown-900 dark:text-cream">
                                                {WALLETS[selectedNetwork]}
                                            </code>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(WALLETS[selectedNetwork])}
                                                className="p-2 text-primary-600 hover:bg-white rounded-lg transition-colors"
                                                title="کپی آدرس"
                                            >
                                                <ArrowRightLeft className="w-4 h-4 rotate-45" />
                                            </button>
                                        </div>
                                    </div>

                                    <form onSubmit={handleCryptoDeposit} className="space-y-4 pt-4 border-t border-brown-100 dark:border-brown-800">
                                        <div>
                                            <label className="block text-sm font-medium text-brown-700 dark:text-brown-300 mb-1">مبلغ واریزی (USDT)</label>
                                            <input
                                                type="number"
                                                required
                                                value={cryptoAmount}
                                                onChange={e => setCryptoAmount(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700"
                                                placeholder="مثلا: 100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-brown-700 dark:text-brown-300 mb-1">کد پیگیری تراکنش (TXID)</label>
                                            <input
                                                type="text"
                                                required
                                                value={txHash}
                                                onChange={e => setTxHash(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 font-mono text-sm"
                                                placeholder="0x..."
                                            />
                                        </div>
                                        <button className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
                                            ثبت درخواست واریز
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Danger Zone */}
                        <div className="mt-12 pt-8 border-t border-brown-200 dark:border-brown-800">
                            <h3 className="text-lg font-bold text-red-600 mb-4">ناحیه خطر</h3>
                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <p className="font-bold text-brown-900 dark:text-cream mb-1">حذف حساب کاربری</p>
                                    <p className="text-sm text-brown-600 dark:text-brown-400">
                                        با حذف حساب، تمام اطلاعات کیف پول و سفارشات شما برای همیشه پاک خواهد شد.
                                    </p>
                                </div>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                    className="shrink-0 px-6 py-3 bg-white dark:bg-red-900/20 text-red-600 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors font-medium flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    {isDeleting ? 'در حال حذف...' : 'حذف حساب کاربری'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
