import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Menu, X, ShoppingCart, User, LogOut, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);
    const { getCartCount } = useCart();
    const { currentUser, logout } = useAuth();
    const { toggleTheme, isDark } = useTheme();

    const navItems = [
        { path: '/', label: 'خانه' },
        { path: '/products', label: 'محصولات و کیت‌ها' },
        { path: '/method', label: 'راهنمای کشت' },
        { path: '/track', label: 'رهگیری سفارش' },
        { path: '/club', label: 'باشگاه تندرستی' },
        { path: '/about', label: 'درباره ما' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-seed-snow/90 dark:bg-seed-forestDark/90 backdrop-blur-md border-b border-seed-forest/10 dark:border-white/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Brand Identifier (Seed Style Wordmark) */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 flex items-center justify-center">
                                <img src="/logo.svg" alt="Rostara Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-display font-black tracking-normal text-seed-forest dark:text-seed-snow">
                                    رُستارا
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-seed-lime" />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu (Seed Editorial Links) */}
                    <div className="hidden lg:flex items-center gap-7">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-xs font-bold tracking-normal transition-colors relative py-1 ${
                                    isActive(item.path)
                                        ? 'text-seed-forest dark:text-seed-snow'
                                        : 'text-seed-pewter dark:text-seed-snow/60 hover:text-seed-forest dark:hover:text-seed-snow'
                                }`}
                            >
                                <span>{item.label}</span>
                                {isActive(item.path) && (
                                    <span className="absolute -bottom-1 inset-x-0 h-0.5 bg-seed-forest dark:bg-seed-lime rounded-full" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Clinical Controls */}
                    <div className="hidden sm:flex items-center gap-3">
                        {/* Cart Pill with Lime Badge */}
                        <Link
                            to="/cart"
                            className="relative flex items-center gap-2 px-3.5 py-2 rounded-pill bg-seed-stone/70 dark:bg-white/5 hover:bg-seed-stone dark:hover:bg-white/10 text-seed-forest dark:text-seed-snow text-xs font-bold transition-colors border border-seed-forest/10 dark:border-white/10"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden md:inline">سبد خرید</span>
                            {getCartCount() > 0 && (
                                <span className="px-1.5 py-0.5 rounded-full bg-seed-lime text-seed-forest font-mono text-[10px] font-black">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* User Account / Login */}
                        {currentUser ? (
                            <div className="flex items-center gap-2">
                                <Link 
                                    to="/wallet" 
                                    className="px-4 py-2 rounded-pill bg-seed-forest text-seed-snow hover:bg-seed-forestDeep text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                                >
                                    <User className="w-3.5 h-3.5 text-seed-lime" />
                                    <span>{currentUser.user_metadata?.display_name || currentUser.email}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 text-seed-pewter hover:text-red-600 transition-colors"
                                    title="خروج"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-5 py-2 rounded-pill bg-seed-forest hover:bg-seed-forestDeep text-seed-snow dark:bg-seed-lime dark:hover:bg-seed-limeHover dark:text-seed-forest text-xs font-bold transition-all shadow-sm"
                            >
                                <span>ورود / عضویت</span>
                            </Link>
                        )}

                        {/* Theme Switcher */}
                        <button
                            onClick={toggleTheme}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-seed-pewter hover:text-seed-forest dark:hover:text-seed-snow hover:bg-seed-stone dark:hover:bg-white/10 transition-colors"
                            title={isDark ? 'حالت روز' : 'حالت شب'}
                        >
                            {isDark ? <Sun className="w-4 h-4 text-seed-lime" /> : <Moon className="w-4 h-4 text-seed-forest" />}
                        </button>

                        {/* Language Switcher */}
                        <button
                            onClick={() => {
                                const newLang = i18n.language === 'fa' ? 'en' : 'fa';
                                i18n.changeLanguage(newLang);
                                document.dir = newLang === 'fa' ? 'rtl' : 'ltr';
                            }}
                            className="px-2.5 py-1 rounded-full text-seed-pewter hover:text-seed-forest dark:hover:text-seed-snow font-mono text-[11px] font-bold transition-colors border border-seed-forest/10 dark:border-white/10"
                        >
                            {i18n.language === 'fa' ? 'EN' : 'فا'}
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="flex items-center gap-2 sm:hidden">
                        <Link
                            to="/cart"
                            className="relative p-2 text-seed-forest dark:text-seed-snow"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {getCartCount() > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-seed-lime text-seed-forest font-mono text-[9px] font-black flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-seed-forest dark:text-seed-snow"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="lg:hidden bg-seed-snow dark:bg-seed-forestDark border-b border-seed-forest/10 dark:border-white/10 px-6 py-6 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`block text-sm font-bold py-2 ${
                                isActive(item.path) ? 'text-seed-forest dark:text-seed-lime' : 'text-seed-pewter dark:text-seed-snow/70'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="pt-2">
                        {currentUser ? (
                            <Link
                                to="/wallet"
                                onClick={() => setIsOpen(false)}
                                className="block w-full py-2.5 px-4 rounded-full bg-seed-forest text-seed-snow text-xs font-bold text-center"
                            >
                                حساب کاربری ({currentUser.user_metadata?.display_name || currentUser.email})
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="block w-full py-2.5 px-4 rounded-full bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest text-xs font-bold text-center"
                            >
                                ورود / عضویت در رُستارا
                            </Link>
                        )}
                    </div>

                    <div className="pt-4 border-t border-seed-forest/10 dark:border-white/10 flex items-center justify-between">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 text-xs font-bold text-seed-pewter"
                        >
                            {isDark ? <Sun className="w-4 h-4 text-seed-lime" /> : <Moon className="w-4 h-4 text-seed-forest" />}
                            <span>حالت تم</span>
                        </button>

                        <button
                            onClick={() => {
                                const newLang = i18n.language === 'fa' ? 'en' : 'fa';
                                i18n.changeLanguage(newLang);
                                document.dir = newLang === 'fa' ? 'rtl' : 'ltr';
                                setIsOpen(false);
                            }}
                            className="text-xs font-mono font-bold text-seed-pewter"
                        >
                            {i18n.language === 'fa' ? 'English' : 'فارسی'}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
