import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, DEMO_ACCOUNTS } from '../contexts/AuthContext';
import { Mail, Lock, LogIn, UserCheck, Sparkles, Check, KeyRound } from 'lucide-react';

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
        <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 pt-28 pb-12 transition-colors duration-300">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-950 rounded-2xl mb-4 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
                        <LogIn className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-display font-extrabold text-brown-900 dark:text-cream mb-2">
                        ورود به حساب رُستارا
                    </h1>
                    <p className="text-brown-600 dark:text-brown-300 text-sm">
                        برای دسترسی به سوابق سفارشات، کیف پول و تخفیف‌های اعضا
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-brown-900 rounded-3xl p-8 border border-brown-200/80 dark:border-brown-800 shadow-xl transition-colors">
                    {/* Demo Account Quick Action Box */}
                    <div className="mb-6 p-4 bg-primary-50/80 dark:bg-primary-950/40 rounded-2xl border border-primary-200 dark:border-primary-900/60">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-primary-800 dark:text-primary-300 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                اکانت تستی پیش‌فرض برای بررسی
                            </span>
                            <button
                                type="button"
                                onClick={handleFillDemo}
                                className="text-[11px] font-bold text-primary-700 dark:text-primary-400 hover:underline"
                            >
                                جای‌گذاری خودکار
                            </button>
                        </div>
                        <div className="text-xs space-y-1 text-brown-700 dark:text-brown-300 font-mono bg-white dark:bg-brown-900 p-2.5 rounded-xl border border-primary-100 dark:border-brown-800">
                            <div>ایمیل: <b className="text-primary-700 dark:text-primary-400 font-sans">demo@rostara.ir</b></div>
                            <div>رمز عبور: <b className="text-primary-700 dark:text-primary-400 font-sans">rostara2026</b></div>
                        </div>
                        <button
                            type="button"
                            onClick={handleOneClickDemo}
                            className="mt-3 w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                        >
                            <UserCheck className="w-4 h-4" />
                            <span>ورود فوری با اکانت تست (یک کلیک)</span>
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-red-600 dark:text-red-400 text-xs font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-brown-800 dark:text-brown-200 mb-2">
                                نشانی ایمیل
                            </label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 pr-11 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream text-sm font-medium"
                                    placeholder="demo@rostara.ir"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold text-brown-800 dark:text-brown-200">
                                    رمز عبور
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                                >
                                    فراموشی رمز؟
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-11 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream text-sm font-mono"
                                    placeholder="••••••••"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-wait' : ''}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4" />
                                    <span>ورود به حساب</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 pt-6 border-t border-brown-100 dark:border-brown-800 text-center">
                        <p className="text-xs text-brown-600 dark:text-brown-400">
                            هنوز حساب کاربری ندارید؟{' '}
                            <Link
                                to="/signup"
                                className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
                            >
                                ساخت حساب کاربری جدید
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
