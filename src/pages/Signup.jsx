import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

const Signup = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError(t('auth.errors.fillFields'));
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError(t('auth.errors.passwordMismatch'));
            return;
        }

        if (formData.password.length < 6) {
            setError(t('auth.errors.passwordShort'));
            return;
        }

        setError('');
        setLoading(true);

        try {
            await signup(formData.email, formData.password, formData.name);
            navigate('/check-email');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || t('auth.errors.signupFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 py-20 transition-colors duration-300">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                        <UserPlus className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-2">
                        {t('auth.signup.title')}
                    </h1>
                    <p className="text-brown-600 dark:text-brown-300">
                        {t('auth.signup.subtitle')}
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
                        {/* Name */}
                        <div>
                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                {t('auth.name')}
                            </label>
                            <div className="relative">
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 dark:text-brown-500" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    placeholder={t('auth.namePlaceholder')}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                {t('auth.email')}
                            </label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 dark:text-brown-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    placeholder="example@email.com"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                {t('auth.password')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 dark:text-brown-500" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    placeholder="••••••••"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-brown-800 dark:text-brown-200 font-medium mb-2">
                                {t('auth.confirmPassword')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 dark:text-brown-500" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                                    placeholder="••••••••"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-wait' : ''
                                }`}
                        >
                            {loading ? (
                                <span>{t('auth.signup.signingUp')}</span>
                            ) : (
                                <>
                                    <span>{t('auth.signup.submit')}</span>
                                    <UserPlus className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-brown-600 dark:text-brown-300">
                            {t('auth.signup.haveAccount')}{' '}
                            <Link
                                to="/login"
                                className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                            >
                                {t('auth.signup.loginLink')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
