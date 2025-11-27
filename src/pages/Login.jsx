import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError(t('auth.errors.fillFields'));
            return;
        }

        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(t('auth.errors.loginFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                        <LogIn className="w-8 h-8 text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-brown-900 mb-2">
                        {t('auth.login.title')}
                    </h1>
                    <p className="text-brown-600">
                        {t('auth.login.subtitle')}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl p-8 border border-brown-100 shadow-lg">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-brown-800 font-medium mb-2">
                                {t('auth.email')}
                            </label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-cream border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                                    placeholder="example@email.com"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-brown-800 font-medium mb-2">
                                {t('auth.password')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-cream border border-brown-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
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
                                <span>{t('auth.login.signingIn')}</span>
                            ) : (
                                <>
                                    <span>{t('auth.login.submit')}</span>
                                    <LogIn className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-brown-600">
                            {t('auth.login.noAccount')}{' '}
                            <Link
                                to="/signup"
                                className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                            >
                                {t('auth.login.signupLink')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
