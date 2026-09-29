import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabase';
import { ShineButton } from '@/components/animations/shine-button';

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
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                setError('پیوند بازیابی منقضی شده یا نامعتبر است. لطفاً مجدداً درخواست دهید.');
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('رمز عبور و تکرار آن یکسان نیستند.');
            return;
        }

        if (password.length < 6) {
            setError('رمز عبور باید حداقل ۶ نویسه باشد.');
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
            }, 2500);
        } catch (err) {
            console.error('Update password error:', err);
            setError('خطا در به‌روزرسانی رمز عبور. لطفاً دوباره تلاش فرمایید.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 py-20 transition-colors duration-300">
                <div className="max-w-md w-full text-center p-8 bg-seed-snow dark:bg-[#132412] rounded-3xl border border-seed-forest/10 dark:border-white/10 shadow-md">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-seed-stone dark:bg-white/5 rounded-full mb-4 text-emerald-600 dark:text-seed-lime border border-seed-forest/10 dark:border-white/10">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-2">
                        رمز عبور با موفقیت تغییر کرد
                    </h1>
                    <p className="text-xs text-seed-pewter dark:text-seed-snow/70">
                        در حال انتقال خودکار به صفحه ورود به حساب کاربری...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 py-20 transition-colors duration-300">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-seed-stone dark:bg-white/5 rounded-2xl mb-4 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10 shadow-sm">
                        <Lock className="w-8 h-8" />
                    </div>
                    <span className="text-[11px] font-bold text-seed-pewter dark:text-seed-snow/50 block mb-1">
                        [تنظیم گذرواژه جدید]
                    </span>
                    <h1 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-2">
                        تغییر رمز عبور
                    </h1>
                    <p className="text-xs text-seed-pewter dark:text-seed-snow/70">
                        رمز عبور جدید حساب خود را تعیین کنید.
                    </p>
                </div>

                <div className="bg-seed-snow dark:bg-[#132412] rounded-3xl p-8 border border-seed-forest/10 dark:border-white/10 shadow-md transition-colors">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-seed-forest dark:text-seed-snow mb-2">
                                رمز عبور جدید
                            </label>
                            <div className="relative">
                                <Lock className="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-seed-pewter" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pe-11 ps-11 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs font-mono"
                                    placeholder="حداقل ۶ نویسه"
                                    dir="ltr"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 text-seed-pewter hover:text-seed-forest dark:hover:text-seed-snow transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-seed-forest dark:text-seed-snow mb-2">
                                تکرار رمز عبور جدید
                            </label>
                            <div className="relative">
                                <Lock className="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-seed-pewter" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 pe-11 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs font-mono"
                                    placeholder="••••••••"
                                    dir="ltr"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <ShineButton
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <span>ثبت و ذخیره رمز عبور جدید</span>
                                )}
                            </ShineButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
