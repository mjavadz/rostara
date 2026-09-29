import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, Home, User, AlertCircle } from 'lucide-react';
import { supabase } from '../supabase';
import { ShineButton } from '@/components/animations/shine-button';

const VerifyEmail = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { currentUser, loading: authLoading } = useAuth();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!authLoading) {
            if (currentUser) {
                setStatus('success');
            } else {
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const errorDescription = hashParams.get('error_description');

                if (errorDescription) {
                    setStatus('error');
                    setErrorMessage(decodeURIComponent(errorDescription));
                } else {
                    setStatus('error');
                    setErrorMessage('پیوند فعال‌سازی نامعتبر یا منقضی شده است.');
                }
            }
        }
    }, [currentUser, authLoading]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (authLoading) {
                setStatus('error');
                setErrorMessage('مدت زمان بررسی به پایان رسید. لطفاً مجدداً وارد شوید.');
            }
        }, 10000);
        return () => clearTimeout(timer);
    }, [authLoading]);

    if (authLoading && status === 'verifying') {
        return (
            <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4">
                <div className="text-center p-8 bg-seed-snow dark:bg-[#132412] rounded-3xl border border-seed-forest/10 dark:border-white/10 shadow-sm max-w-sm w-full">
                    <div className="w-10 h-10 border-2 border-seed-forest dark:border-seed-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xs text-seed-pewter dark:text-seed-snow/70">در حال تایید و فعال‌سازی حساب کاربری...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 py-20 transition-colors duration-300">
            <div className="max-w-md w-full text-center p-8 bg-seed-snow dark:bg-[#132412] rounded-3xl border border-seed-forest/10 dark:border-white/10 shadow-md">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 border ${
                    status === 'success'
                        ? 'bg-seed-stone dark:bg-white/5 text-emerald-600 dark:text-seed-lime border-seed-forest/10 dark:border-white/10'
                        : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                    {status === 'success' ? (
                        <CheckCircle className="w-8 h-8" />
                    ) : (
                        <AlertCircle className="w-8 h-8" />
                    )}
                </div>

                <h1 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-3">
                    {status === 'success' ? 'حساب کاربری فعال شد' : 'خطا در فعال‌سازی حساب'}
                </h1>

                <p className="text-xs text-seed-pewter dark:text-seed-snow/70 mb-8 leading-relaxed">
                    {status === 'success'
                        ? 'ایمیل شما با موفقیت تایید گردید. اکنون می‌توانید سفارش‌های خود را ثبت کرده و از مزایای باشگاه تندرستی استفاده فرمایید.'
                        : (errorMessage || 'پیوند معتبر نیست یا قبلاً مصرف شده است.')
                    }
                </p>

                <div className="space-y-3">
                    {status === 'success' ? (
                        <Link to="/products" className="block w-full">
                            <ShineButton className="w-full py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95">
                                <span>ورود به کاتالوگ زیستی و سفارش</span>
                            </ShineButton>
                        </Link>
                    ) : (
                        <Link to="/login" className="block w-full">
                            <ShineButton className="w-full py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95">
                                <User className="w-4 h-4" />
                                <span>ورود به حساب کاربری</span>
                            </ShineButton>
                        </Link>
                    )}

                    <Link
                        to="/"
                        className="block w-full py-2.5 text-center text-xs text-seed-pewter dark:text-seed-snow/60 hover:text-seed-forest dark:hover:text-seed-snow transition-colors"
                    >
                        بازگشت به صفحه اصلی رُستارا
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
