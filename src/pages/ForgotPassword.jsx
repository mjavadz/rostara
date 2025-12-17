import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '../supabase';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setSuccess(true);
        } catch (err) {
            setError('خطا در ارسال ایمیل بازیابی. لطفاً دوباره تلاش کنید.');
            console.error('Password reset error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 py-20 transition-colors duration-300">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                            {t('auth.forgotPassword.successTitle')}
                        </h1>
                        <p className="text-brown-600 dark:text-brown-300 mb-6">
                            {t('auth.forgotPassword.successDesc')}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-brown-900 rounded-2xl p-8 border border-brown-100 dark:border-brown-800 shadow-lg transition-colors">
                        <div className="space-y-4 text-brown-700 dark:text-brown-300 text-sm">
                            <p>{t('auth.forgotPassword.checkEmail')}</p>
                            <p>{t('auth.forgotPassword.spamCheck')}</p>
                        </div>

                        <Link
                            to="/login"
                            className="mt-6 flex items-center justify-center gap-2 w-full py-3 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl font-medium transition-colors"
                        >
                            <ArrowRight className="w-5 h-5" />
                            <span>{t('auth.forgotPassword.backToLogin')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 py-20 transition-colors duration-300">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                        <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                        {t('auth.forgotPassword.title')}
                    </h1>
                    <p className="text-brown-600 dark:text-brown-300">
                        {t('auth.forgotPassword.subtitle')}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-brown-900 rounded-2xl p-8 border border-brown-100 dark:border-brown-800 shadow-lg transition-colors">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                {t('auth.email')}
                            </label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 dark:text-brown-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    placeholder="example@email.com"
                                    dir="ltr"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 ${loading ? 'opacity-75 cursor-wait' : ''
                                }`}
                        >
                            {loading ? t('auth.forgotPassword.sending') : t('auth.forgotPassword.submit')}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        >
                            <ArrowRight className="w-4 h-4" />
                            <span>{t('auth.forgotPassword.backToLogin')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
