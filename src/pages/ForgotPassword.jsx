import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '../supabase';
import { ShineButton } from '@/components/animations/shine-button';

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
            setError('خطا در ارسال پیوند بازیابی گذرواژه. لطفاً مجدداً بررسی فرمایید.');
            console.error('Password reset error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 py-20 transition-colors duration-300">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-seed-stone dark:bg-white/5 rounded-full mb-4 text-emerald-600 dark:text-seed-lime border border-seed-forest/10 dark:border-white/10">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-2">
                            پیوند بازیابی ارسال شد
                        </h1>
                        <p className="text-xs text-seed-pewter dark:text-seed-snow/70 mb-6 leading-relaxed">
                            دستورالعمل تنظیم مجدد رمز عبور به نشانی ایمیل شما فرستاده شد.
                        </p>
                    </div>

                    <div className="bg-seed-snow dark:bg-[#132412] rounded-3xl p-8 border border-seed-forest/10 dark:border-white/10 shadow-md">
                        <div className="space-y-3 text-seed-pewter dark:text-seed-snow/80 text-xs leading-relaxed">
                            <p>• لطفاً صندوق ورودی (Inbox) ایمیل خود را بررسی کنید.</p>
                            <p>• در صورت عدم دریافت در ۵ دقیقه، پوشه هرزنامه (Spam) را چک فرمایید.</p>
                        </div>

                        <Link
                            to="/login"
                            className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full text-xs font-bold transition-all shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>بازگشت به صفحه ورود</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 py-20 transition-colors duration-300">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-seed-stone dark:bg-white/5 rounded-2xl mb-4 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10 shadow-sm">
                        <Mail className="w-8 h-8" />
                    </div>
                    <span className="text-[11px] font-bold text-seed-pewter dark:text-seed-snow/50 block mb-1">
                        [بازیابی گذرواژه]
                    </span>
                    <h1 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-2">
                        فراموشی رمز عبور
                    </h1>
                    <p className="text-xs text-seed-pewter dark:text-seed-snow/70">
                        نشانی ایمیل ثبت‌شدهٔ خود را وارد کنید تا پیوند بازیابی ارسال شود.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-seed-snow dark:bg-[#132412] rounded-3xl p-8 border border-seed-forest/10 dark:border-white/10 shadow-md transition-colors">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-seed-forest dark:text-seed-snow mb-2">
                                نشانی ایمیل حساب کاربری
                            </label>
                            <div className="relative">
                                <Mail className="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-seed-pewter" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 pe-11 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs font-medium"
                                    placeholder="example@email.com"
                                    dir="ltr"
                                    required
                                />
                            </div>
                        </div>

                        <ShineButton
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <span>ارسال پیوند بازیابی گذرواژه</span>
                            )}
                        </ShineButton>
                    </form>

                    <div className="mt-6 pt-6 border-t border-seed-forest/10 dark:border-white/10 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-1.5 text-xs text-seed-forest dark:text-seed-lime font-bold hover:underline"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>بازگشت به صفحه ورود</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
