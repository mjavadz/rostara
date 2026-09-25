import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, DEMO_ACCOUNTS } from '../contexts/AuthContext';
import { Mail, Lock, LogIn, UserCheck, Sparkles, Check, KeyRound, ShieldCheck } from 'lucide-react';
import { ShineButton } from '@/components/animations/shine-button';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login, loginAsDemo } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError(t('auth.errors.fillFields', { defaultValue: 'لطفاً تمامی فیلدها را تکمیل کنید' }));
            return;
        }

        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/wallet');
        } catch (err) {
            setError(err.message || t('auth.errors.loginFailed', { defaultValue: 'ایمیل یا رمز عبور نادرست است' }));
        } finally {
            setLoading(false);
        }
    };

    const handleOneClickDemo = () => {
        loginAsDemo(0);
        navigate('/wallet');
    };

    const handleFillDemo = () => {
        setEmail(DEMO_ACCOUNTS[0].email);
        setPassword(DEMO_ACCOUNTS[0].password);
    };

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 pt-28 pb-12 transition-colors duration-300">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-seed-stone dark:bg-white/5 rounded-2xl mb-4 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10 shadow-sm">
                        <LogIn className="w-8 h-8" />
                    </div>
                    <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50 block mb-1">
                        [AUTHENTICATION ACCESS]
                    </span>
                    <h1 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-2">
                        ورود به حساب رُستارا
                    </h1>
                    <p className="text-xs text-seed-pewter dark:text-seed-snow/70">
                        دسترسی به پیشخوان شخصی، رهگیری سفارشات، کیف پول و اعتبارات زیستی
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-seed-snow dark:bg-[#132412] rounded-3xl p-8 border border-seed-forest/10 dark:border-white/10 shadow-md transition-colors">
                    {/* Demo Account Quick Action Box */}
                    <div className="mb-6 p-4 bg-seed-stone/70 dark:bg-white/5 rounded-2xl border border-seed-forest/10 dark:border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-seed-forest dark:text-seed-lime flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                حساب تستی فعال برای بررسی
                            </span>
                            <button
                                type="button"
                                onClick={handleFillDemo}
                                className="text-[11px] font-bold text-seed-pewter hover:text-seed-forest dark:hover:text-seed-snow underline"
                            >
                                درج خودکار
                            </button>
                        </div>
                        <div className="text-xs space-y-1 text-seed-pewter dark:text-seed-snow/70 font-mono bg-seed-snow dark:bg-black/20 p-2.5 rounded-xl border border-seed-forest/5 dark:border-white/5">
                            <div>ایمیل: <b className="text-seed-forest dark:text-seed-snow font-mono">demo@rostara.ir</b></div>
                            <div>رمز عبور: <b className="text-seed-forest dark:text-seed-snow font-mono">rostara2026</b></div>
                        </div>
                        <button
                            type="button"
                            onClick={handleOneClickDemo}
                            className="mt-3 w-full py-2.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:opacity-95"
                        >
                            <UserCheck className="w-4 h-4" />
                            <span>ورود فوری با حساب تست (یک کلیک)</span>
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-seed-forest dark:text-seed-snow mb-2">
                                نشانی ایمیل
                            </label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-seed-pewter" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 pr-11 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs font-medium"
                                    placeholder="demo@rostara.ir"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold text-seed-forest dark:text-seed-snow">
                                    رمز عبور
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-[11px] text-seed-pewter dark:text-seed-snow/60 hover:underline"
                                >
                                    فراموشی رمز؟
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-seed-pewter" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-11 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs font-mono"
                                    placeholder="••••••••"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <ShineButton
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4" />
                                        <span>ورود به حساب کاربری</span>
                                    </>
                                )}
                            </ShineButton>
                        </div>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 pt-6 border-t border-seed-forest/10 dark:border-white/10 text-center">
                        <p className="text-xs text-seed-pewter dark:text-seed-snow/60">
                            هنوز عضو رُستارا نشده‌اید؟{' '}
                            <Link
                                to="/signup"
                                className="text-seed-forest dark:text-seed-lime font-bold hover:underline"
                            >
                                ساخت حساب جدید
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
