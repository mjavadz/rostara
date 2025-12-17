import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, Home, User } from 'lucide-react';
import { supabase } from '../supabase';

const VerifyEmail = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { currentUser, loading: authLoading } = useAuth();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // If auth is done loading
        if (!authLoading) {
            if (currentUser) {
                setStatus('success');
            } else {
                // Check hash for semantic errors from Supabase
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const errorDescription = hashParams.get('error_description');
                const errorCode = hashParams.get('error_code');

                if (errorDescription) {
                    setStatus('error');
                    setErrorMessage(decodeURIComponent(errorDescription));
                } else {
                    // Fallback: If no user and no explicit error in hash, but we are done loading
                    // It might be that the link is invalid or expired, or the user is just visiting the page directly
                    setStatus('error');
                    setErrorMessage(t('auth.verifyEmail.invalidLink'));
                }
            }
        }
    }, [currentUser, authLoading, t]);

    // Safety timeout: If authLoading takes too long (e.g. 10s), show error or manual check
    useEffect(() => {
        const timer = setTimeout(() => {
            if (authLoading) {
                setStatus('error');
                setErrorMessage(t('auth.verifyEmail.timeout'));
            }
        }, 10000);
        return () => clearTimeout(timer);
    }, [authLoading, t]);

    if (authLoading && status === 'verifying') {
        return (
            <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-brown-600 dark:text-brown-300">{t('auth.verifyEmail.verifying')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 flex items-center justify-center px-4 py-20 transition-colors duration-300">
            <div className="max-w-md w-full text-center">
                {/* Icon based on status */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${status === 'success'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                    {status === 'success' ? (
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    ) : (
                        <User className="w-10 h-10 text-red-600 dark:text-red-400" />
                    )}
                </div>

                <h1 className="text-3xl font-display font-bold text-brown-900 dark:text-cream mb-4">
                    {status === 'success' ? t('auth.verifyEmail.title') : t('auth.verifyEmail.errorTitle')}
                </h1>

                <div className="text-brown-600 dark:text-brown-300 mb-8 text-lg">
                    {status === 'success' ? (
                        <>
                            <p className="mb-2">{t('auth.verifyEmail.activated')}</p>
                            <p>{t('auth.verifyEmail.readyToShop')}</p>
                        </>
                    ) : (
                        <p>{errorMessage || t('auth.errors.general')}</p>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col gap-4 justify-center">
                        {status === 'success' ? (
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 hover:scale-105 transition-all shadow-lg"
                            >
                                <Home className="w-6 h-6" />
                                <span>{t('auth.verifyEmail.startShopping')}</span>
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span>{t('auth.login.title')}</span>
                            </Link>
                        )}

                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-brown-600 dark:text-brown-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                            <span>{t('auth.verifyEmail.home')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
