import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import { db } from '../services/db';
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
            // 1. Local Wallet Check
            let localWallet = null;
            try {
                const raw = localStorage.getItem('rostara_wallet_' + currentUser.id);
                if (raw) localWallet = JSON.parse(raw);
            } catch {}

            if (!localWallet) {
                localWallet = {
                    credit: 350000,
                    cash: 50000,
                    tickets: 2,
                    vip_level: 1,
                    daily_clicks: 1
                };
                localStorage.setItem('rostara_wallet_' + currentUser.id, JSON.stringify(localWallet));
            }

            setBalance({
                credit: localWallet.credit,
                cash: localWallet.cash || 0,
                tickets: localWallet.tickets || 0
            });
            setVipData({
                level: localWallet.vip_level || 1,
                dailyClicks: localWallet.daily_clicks || 0,
                claimedRewards: [],
                nextClickAt: null
            });

            // 2. Fetch User Orders from Unified DB
            const allOrders = await db.orders.getAll();
            const userOrders = allOrders.filter(o => 
                (o.email && currentUser.email && o.email.toLowerCase() === currentUser.email.toLowerCase()) ||
                (o.user_id && o.user_id === currentUser.id)
            );
            setMyOrders(userOrders.length > 0 ? userOrders : allOrders);

            // 3. Optional background cloud fetch
            supabase.from('wallets').select('*').eq('user_id', currentUser.id).single().then(({ data: wallet }) => {
                if (wallet) {
                    setBalance({
                        credit: wallet.credit_balance,
                        cash: wallet.cash_balance || 0,
                        tickets: wallet.ticket_balance
                    });
                }
            }).catch(() => {});

        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConvertTicket = async () => {
        if (balance.credit < 500000) return alert('موجودی اعتباری کافی نیست. (نیاز: ۵۰۰,۰۰۰ تومان)');
        if (!confirm('آیا مطمئن هستید؟ ۵۰۰,۰۰۰ تومان از اعتبار شما کسر و ۱ بلیط اضافه می‌شود.')) return;

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
        if (balance.tickets < 1) return alert('بلیط کافی ندارید.');

        const isDonation = transferEmail === 'donate@rostara.ir';
        const msg = isDonation
            ? 'با اهدای این بلیط، ۲۵۰,۰۰۰ تومان (۵۰٪) به حساب اعتباری شما باز میگردد. ادامه میدهید؟'
            : `آیا از ارسال ۱ بلیط به ${transferEmail} اطمینان دارید؟`;

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
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow pt-32 pb-20 px-4 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-seed-stone dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-2xl text-seed-forest dark:text-seed-lime">
                        <WalletIcon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <h2 className="text-3xl font-display font-black text-seed-forest dark:text-seed-snow">
                                پیشخوان شخصی و کیف پول رُستارا
                            </h2>
                        </div>
                        <p className="text-seed-pewter dark:text-seed-snow/70 text-xs">مدیریت اعتبارات زیستی، سفارشات فعال و سطوح همراهی</p>
                    </div>
                </div>

                {/* Balances - Grid Layout */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Cash Wallet - Shows USDT and Toman */}
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                        <div className="relative z-10">
                            <p className="text-gray-300 mb-3">کیف پول نقدی</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">تتر (USDT):</span>
                                    <span className="text-lg font-bold" dir="ltr">{formatPrice(balance.cash)} USDT</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-gray-600 pt-2">
                                    <span className="text-sm text-gray-400">تومان:</span>
                                    <span className="text-lg font-bold" dir="ltr">{formatPrice(balance.credit)}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setActiveTab('deposit')}
                                    className="bg-white/10 hover:bg-white/20 text-white text-xs py-2 px-3 rounded-lg transition-colors flex items-center gap-1 justify-center"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>رمز ارز</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('deposit')}
                                    className="bg-white/10 hover:bg-white/20 text-white text-xs py-2 px-3 rounded-lg transition-colors flex items-center gap-1 justify-center"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <span>حساب بانکی</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Credit Wallet */}
                    <div className="bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 rounded-2xl p-6 text-seed-forest dark:text-seed-snow shadow-sm relative overflow-hidden">
                        <div className="relative z-10 flex flex-col h-full">
                            <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50 block mb-1">[BIO_CREDIT]</span>
                            <p className="text-seed-pewter dark:text-seed-snow/70 text-xs mb-1">اعتبار زیستی (پاداش همراهی)</p>
                            <h2 className="text-2xl font-black mb-auto font-mono text-seed-forest dark:text-seed-lime" dir="ltr">{formatPrice(balance.credit)}</h2>
                            <button
                                onClick={handleConvertTicket}
                                className="mt-6 bg-seed-stone dark:bg-white/5 hover:bg-seed-stone/80 text-seed-forest dark:text-seed-snow text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2 w-full justify-center border border-seed-forest/10 dark:border-white/10"
                            >
                                <ArrowRightLeft className="w-4 h-4 text-seed-forest dark:text-seed-lime" />
                                تبدیل اعتبار به بلیط
                            </button>
                        </div>
                    </div>

                    {/* Ticket Wallet */}
                    <div className="bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 rounded-2xl p-6 text-seed-forest dark:text-seed-snow shadow-sm relative overflow-hidden">
                        <div className="relative z-10 flex flex-col h-full">
                            <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50 block mb-1">[VOUCHERS]</span>
                            <p className="text-seed-pewter dark:text-seed-snow/70 text-xs mb-1">بلیط‌های جشنواره و تخفیف</p>
                            <h2 className="text-2xl font-black mb-auto text-seed-forest dark:text-seed-lime font-mono">{toPersianDigits(balance.tickets)}</h2>
                            <button
                                onClick={() => setActiveTab('transfer')}
                                className="mt-6 bg-seed-stone dark:bg-white/5 hover:bg-seed-stone/80 text-seed-forest dark:text-seed-snow text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2 w-full justify-center border border-seed-forest/10 dark:border-white/10"
                            >
                                <Send className="w-4 h-4 text-seed-forest dark:text-seed-lime" />
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
                                    title="دریافت ۱ بلیط (سطح ۳)"
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
                                    title="دریافت ۲ بلیط (سطح ۷)"
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
                            className={`w-full text-right p-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'orders' ? 'bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest shadow-sm' : 'bg-seed-snow dark:bg-[#132412] text-seed-forest dark:text-seed-snow border border-seed-forest/10 dark:border-white/10 hover:bg-seed-stone dark:hover:bg-white/5'}`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            سفارش‌های من
                        </button>
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full text-right p-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'overview' ? 'bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest shadow-sm' : 'bg-seed-snow dark:bg-[#132412] text-seed-forest dark:text-seed-snow border border-seed-forest/10 dark:border-white/10 hover:bg-seed-stone dark:hover:bg-white/5'}`}
                        >
                            <History className="w-4 h-4" />
                            تاریخچه تراکنش‌ها
                        </button>
                        <button
                            onClick={() => setActiveTab('deposit')}
                            className={`w-full text-right p-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'deposit' ? 'bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest shadow-sm' : 'bg-seed-snow dark:bg-[#132412] text-seed-forest dark:text-seed-snow border border-seed-forest/10 dark:border-white/10 hover:bg-seed-stone dark:hover:bg-white/5'}`}
                        >
                            <CreditCard className="w-4 h-4" />
                            شارژ حساب (رمز ارز)
                        </button>
                        <button
                            onClick={() => setActiveTab('transfer')}
                            className={`w-full text-right p-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'transfer' ? 'bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest shadow-sm' : 'bg-seed-snow dark:bg-[#132412] text-seed-forest dark:text-seed-snow border border-seed-forest/10 dark:border-white/10 hover:bg-seed-stone dark:hover:bg-white/5'}`}
                        >
                            <Send className="w-4 h-4" />
                            انتقال بلیط
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">

                        {/* 1. ORDERS TAB */}
                        {activeTab === 'orders' && (
                            <div className="bg-seed-snow dark:bg-[#132412] rounded-2xl p-6 border border-seed-forest/10 dark:border-white/10 min-h-[400px]">
                                <h3 className="text-lg font-bold text-seed-forest dark:text-seed-snow mb-6 pb-2 border-b border-seed-forest/10 dark:border-white/10">سفارش‌های ثبت شده</h3>
                                {myOrders.length === 0 ? (
                                    <p className="text-center text-seed-pewter dark:text-seed-snow/60 py-8 text-xs">هنوز سفارشی ثبت نکرده‌اید.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {myOrders.map(order => (
                                            <div key={order.id} className="border border-seed-forest/10 dark:border-white/10 rounded-xl p-4 hover:border-seed-lime/40 transition-colors">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <span className="font-bold text-seed-forest dark:text-seed-snow block text-sm">سفارش #{order.id}</span>
                                                        <span className="text-xs font-mono text-seed-pewter dark:text-seed-snow/60">{formatDate(order.created_at || order.timestamp)}</span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium font-mono
                                                        ${order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                                                            order.status === 'processing' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                                                                order.status === 'cancelled' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                                                                    'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                                        }`}>
                                                        {order.status === 'pending' && 'در انتظار بررسی'}
                                                        {order.status === 'processing' && 'در حال آماده‌سازی'}
                                                        {order.status === 'shipped' && 'ارسال شده'}
                                                        {order.status === 'delivered' && 'تحویل شده'}
                                                        {order.status === 'cancelled' && 'لغو شده'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-xs text-seed-pewter dark:text-seed-snow/70 border-t border-seed-forest/10 dark:border-white/10 pt-3">
                                                    <span>مبلغ کل:</span>
                                                    <span className="font-bold text-seed-forest dark:text-seed-lime font-mono">{formatPrice(order.total || order.total_price)} تومان</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 2. TRANSACTIONS TAB */}
                        {activeTab === 'overview' && (
                            <div className="bg-seed-snow dark:bg-[#132412] rounded-2xl p-6 border border-seed-forest/10 dark:border-white/10 min-h-[400px]">
                                <h3 className="text-lg font-bold text-seed-forest dark:text-seed-snow mb-6 pb-2 border-b border-seed-forest/10 dark:border-white/10">تراکنش‌های کیف پول</h3>
                                {transactions.length === 0 ? (
                                    <p className="text-center text-seed-pewter dark:text-seed-snow/60 py-8 text-xs">تراکنشی یافت نشد.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {transactions.map(tx => (
                                            <div key={tx.id} className="flex justify-between items-center p-4 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/5 dark:border-white/5 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-full ${tx.amount > 0 || tx.ticket_amount > 0 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                                                        {tx.amount > 0 ? <CreditCard className="w-4 h-4" /> : <History className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-seed-forest dark:text-seed-snow text-xs">{tx.description}</p>
                                                        <p className="text-[11px] font-mono text-seed-pewter dark:text-seed-snow/60">{formatDate(tx.created_at)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-left font-mono">
                                                    {tx.amount !== 0 && (
                                                        <p className={`font-bold text-xs ${tx.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`} dir="ltr">
                                                            {tx.amount > 0 ? '+' : ''}{formatPrice(tx.amount)} T
                                                        </p>
                                                    )}
                                                    {tx.ticket_amount !== 0 && (
                                                        <p className={`text-xs ${tx.ticket_amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`} dir="ltr">
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
                            <div className="bg-seed-snow dark:bg-[#132412] rounded-2xl p-6 border border-seed-forest/10 dark:border-white/10 min-h-[400px]">
                                <h3 className="text-lg font-bold text-seed-forest dark:text-seed-snow mb-4 pb-2 border-b border-seed-forest/10 dark:border-white/10">ارسال بلیط / اهدا</h3>
                                <div className="bg-seed-stone/70 dark:bg-white/5 p-4 rounded-xl mb-6 border border-seed-forest/10 dark:border-white/10">
                                    <p className="text-xs text-seed-forest dark:text-seed-snow leading-relaxed">
                                        💡 <strong>نکته اهدا:</strong> با ارسال بلیط به آدرس <code className="bg-seed-forest/10 dark:bg-white/10 px-1 rounded font-mono">donate@rostara.ir</code>، شما ۵۰٪ ارزش تیکت (۲۵۰ هزار تومان) را به عنوان پاداش اعتباری دریافت می‌کنید!
                                    </p>
                                </div>
                                <form onSubmit={handleTransferTicket} className="space-y-4 max-w-md mx-auto text-xs">
                                    <div>
                                        <label className="block font-bold text-seed-forest dark:text-seed-snow mb-1">ایمیل گیرنده</label>
                                        <input
                                            type="email"
                                            required
                                            value={transferEmail}
                                            onChange={e => setTransferEmail(e.target.value)}
                                            placeholder="example@email.com"
                                            dir="ltr"
                                            className="w-full px-4 py-3 rounded-xl bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 focus:outline-none focus:border-seed-lime text-xs text-seed-forest dark:text-seed-snow"
                                        />
                                    </div>
                                    <button className="w-full py-3 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest font-bold rounded-xl hover:opacity-95 transition text-xs shadow-sm">
                                        ارسال بلیط
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* 4. DEPOSIT (RAMZARZ) TAB */}
                        {activeTab === 'deposit' && (
                            <div className="bg-seed-snow dark:bg-[#132412] rounded-2xl p-6 border border-seed-forest/10 dark:border-white/10 min-h-[400px]">
                                <h3 className="text-lg font-bold text-seed-forest dark:text-seed-snow mb-4 pb-2 border-b border-seed-forest/10 dark:border-white/10">شارژ حساب با رمز ارز</h3>
                                <div className="space-y-6 text-xs">
                                    {/* Network Selector */}
                                    <div>
                                        <label className="block font-bold text-seed-forest dark:text-seed-snow mb-2">شبکه پرداخت را انتخاب کنید:</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['TRC20', 'BSC', 'ETH'].map(net => (
                                                <button
                                                    key={net}
                                                    onClick={() => setSelectedNetwork(net)}
                                                    className={`py-2 px-4 rounded-xl border font-bold font-mono transition-all
                                                        ${selectedNetwork === net
                                                            ? 'border-seed-forest bg-seed-forest text-seed-snow dark:border-seed-lime dark:bg-seed-lime dark:text-seed-forest'
                                                            : 'border-seed-forest/10 dark:border-white/10 text-seed-pewter dark:text-seed-snow/70 hover:bg-seed-stone dark:hover:bg-white/5'}`}
                                                >
                                                    {net}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Address Display */}
                                    <div className="bg-seed-stone/50 dark:bg-white/5 p-4 rounded-xl border border-seed-forest/10 dark:border-white/10">
                                        <p className="text-[11px] font-mono text-seed-pewter dark:text-seed-snow/60 mb-1">آدرس کیف پول {selectedNetwork}:</p>
                                        <div className="flex items-center justify-between gap-2">
                                            <code className="text-xs font-mono break-all text-seed-forest dark:text-seed-lime">
                                                {WALLETS[selectedNetwork]}
                                            </code>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(WALLETS[selectedNetwork])}
                                                className="p-1.5 text-seed-forest dark:text-seed-lime hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                                                title="کپی آدرس"
                                            >
                                                <ArrowRightLeft className="w-3.5 h-3.5 rotate-45" />
                                            </button>
                                        </div>
                                    </div>

                                    <form onSubmit={handleCryptoDeposit} className="space-y-4 pt-4 border-t border-seed-forest/10 dark:border-white/10">
                                        <div>
                                            <label className="block font-bold text-seed-forest dark:text-seed-snow mb-1">مبلغ واریزی (USDT)</label>
                                            <input
                                                type="number"
                                                required
                                                value={cryptoAmount}
                                                onChange={e => setCryptoAmount(e.target.value)}
                                                dir="ltr"
                                                className="w-full px-4 py-3 rounded-xl bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 text-xs text-seed-forest dark:text-seed-snow font-mono focus:outline-none focus:border-seed-lime"
                                                placeholder="مثلا: 100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-bold text-seed-forest dark:text-seed-snow mb-1">کد پیگیری تراکنش (TXID)</label>
                                            <input
                                                type="text"
                                                required
                                                value={txHash}
                                                onChange={e => setTxHash(e.target.value)}
                                                dir="ltr"
                                                className="w-full px-4 py-3 rounded-xl bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 font-mono text-xs text-seed-forest dark:text-seed-snow focus:outline-none focus:border-seed-lime"
                                                placeholder="0x..."
                                            />
                                        </div>
                                        <button className="w-full py-3 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest font-bold rounded-xl hover:opacity-95 transition text-xs shadow-sm">
                                            ثبت درخواست واریز
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Danger Zone */}
                        <div className="mt-12 pt-8 border-t border-seed-forest/10 dark:border-white/10">
                            <h3 className="text-sm font-bold text-red-500 mb-3">ناحیه مدیریت حساس</h3>
                            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                                <div>
                                    <p className="font-bold text-seed-forest dark:text-seed-snow mb-1">حذف حساب کاربری</p>
                                    <p className="text-seed-pewter dark:text-seed-snow/60 text-[11px] leading-relaxed">
                                        با حذف حساب، تمام اطلاعات کیف پول و سفارشات شما برای همیشه پاک خواهد شد.
                                    </p>
                                </div>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                    className="shrink-0 px-4 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-colors font-bold flex items-center gap-1.5"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    <span>{isDeleting ? 'در حال حذف...' : 'حذف حساب کاربری'}</span>
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
