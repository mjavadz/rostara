import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { ShineButton } from '@/components/animations/shine-button';

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
            setError(t('auth.errors.fillFields', { defaultValue: 'لطفاً تمامی فیلدها را تکمیل کنید' }));
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError(t('auth.errors.passwordMismatch', { defaultValue: 'رمز عبور و تکرار آن یکسان نیستند' }));
            return;
        }

        if (formData.password.length < 6) {
            setError(t('auth.errors.passwordShort', { defaultValue: 'رمز عبور باید حداقل ۶ کاراکتر باشد' }));
            return;
        }

        setError('');
        setLoading(true);

        try {
            await signup(formData.email, formData.password, formData.name);
            navigate('/check-email');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || t('auth.errors.signupFailed', { defaultValue: 'خطا در ثبت‌نام حساب' }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-forest dark:text-seed-snow flex items-center justify-center px-4 pt-28 pb-12 transition-colors duration-300">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-seed-stone dark:bg-white/5 rounded-2xl mb-4 text-seed-forest dark:text-seed-lime border border-seed-forest/10 dark:border-white/10 shadow-sm">
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <span className="font-mono text-[10px] text-seed-pewter dark:text-seed-snow/50 block mb-1">
                        [CREATE SCIENTIFIC PROFILE]
                    </span>
                    <h1 className="text-2xl font-display font-black text-seed-forest dark:text-seed-snow mb-2">
                        عضویت در پلتفرم رُستارا
                    </h1>
                    <p className="text-xs text-seed-pewter dark:text-seed-snow/70">
                        دسترسی به باشگاه تندرستی، رهگیری آنلاین و تخفیف‌های ویژه اعضا
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-seed-snow dark:bg-[#132412] rounded-3xl p-8 border border-seed-forest/10 dark:border-white/10 shadow-md transition-colors">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-bold text-seed-forest dark:text-seed-snow mb-2">
                                نام و نام خانوادگی
                            </label>
                            <div className="relative">
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-seed-pewter" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-11 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs font-medium"
                                    placeholder="مثال: سارا محمدی"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-seed-forest dark:text-seed-snow mb-2">
                                نشانی ایمیل
                            </label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-seed-pewter" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-11 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs font-medium"
                                    placeholder="name@example.com"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold text-seed-forest dark:text-seed-snow mb-2">
                                رمز عبور
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-seed-pewter" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-11 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs font-mono"
                                    placeholder="حداقل ۶ نویسه"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-bold text-seed-forest dark:text-seed-snow mb-2">
                                تکرار رمز عبور
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-seed-pewter" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
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
                                        <UserPlus className="w-4 h-4" />
                                        <span>تکمیل عضویت در رُستارا</span>
                                    </>
                                )}
                            </ShineButton>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 pt-6 border-t border-seed-forest/10 dark:border-white/10 text-center">
                        <p className="text-xs text-seed-pewter dark:text-seed-snow/60">
                            قبلاً حساب کاربری ساخته‌اید؟{' '}
                            <Link
                                to="/login"
                                className="text-seed-forest dark:text-seed-lime font-bold hover:underline"
                            >
                                ورود به حساب
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
