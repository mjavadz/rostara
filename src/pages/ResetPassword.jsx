import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { supabase } from '../supabase';

const ResetPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Check if we have a session (user clicked the magic link)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                // If no session, they might have come here directly or link expired
                setError(t('auth.errors.sessionExpired') || 'لینک نامعتبر یا منقضی شده است.');
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError(t('auth.errors.passwordMismatch'));
            return;
        }

        if (password.length < 6) {
            setError(t('auth.errors.passwordShort'));
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.error('Update password error:', err);
            setError('خطا در تغییر رمز عبور. لطفاً دوباره تلاش کنید.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 py-20 transition-colors duration-300">
                <div className="max-w-md w-full text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                        رمز عبور تغییر کرد
                    </h1>
                    <p className="text-brown-600 dark:text-brown-300">
                        در حال انتقال به صفحه ورود...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 py-20 transition-colors duration-300">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                        تغییر رمز عبور
                    </h1>
                    <p className="text-brown-600 dark:text-brown-300">
                        لطفاً رمز عبور جدید خود را وارد کنید
                    </p>
                </div>

                <div className="bg-white dark:bg-brown-900 rounded-2xl p-8 border border-brown-100 dark:border-brown-800 shadow-lg transition-colors">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                {t('auth.password')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 dark:text-brown-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 pl-12 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    placeholder="••••••••"
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

                        <div>
                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                {t('auth.confirmPassword')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 dark:text-brown-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    placeholder="••••••••"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 ${loading ? 'opacity-75 cursor-wait' : ''}`}
                        >
                            {loading ? 'در حال ثبت...' : 'تغییر رمز عبور'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
