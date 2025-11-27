import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);
    const { getCartCount } = useCart();
    const { currentUser, logout } = useAuth();

    const navItems = [
        { path: '/', label: t('nav.home') },
        { path: '/about', label: t('nav.about') },
        { path: '/method', label: t('nav.method') },
        { path: '/products', label: t('nav.products') },
        { path: '/experience', label: t('nav.experience') },
        { path: '/gallery', label: t('nav.gallery') },
        { path: '/contact', label: t('nav.contact') },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-brown-200/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl font-bold">ر</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-brown-900">رُستارا</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm font-medium transition-all ${isActive(item.path)
                                    ? 'text-primary-600 border-b-2 border-primary-600'
                                    : 'text-brown-700 hover:text-primary-600'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Cart Icon */}
                        <Link
                            to="/cart"
                            className="relative p-2 rounded-lg hover:bg-brown-100 text-brown-700 transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {currentUser ? (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-brown-700">{currentUser.name}</span>
                                <button
                                    onClick={logout}
                                    className="p-2 rounded-lg hover:bg-brown-100 text-brown-700 transition-colors"
                                    title={t('auth.logout')}
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-brown-100 text-brown-700 transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span className="text-sm font-medium">{t('auth.login.title')}</span>
                            </Link>
                        )}

                        {/* Language Switcher */}
                        <button
                            onClick={() => {
                                const newLang = i18n.language === 'fa' ? 'en' : 'fa';
                                i18n.changeLanguage(newLang);
                                document.dir = newLang === 'fa' ? 'rtl' : 'ltr';
                            }}
                            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-brown-100 text-brown-700 font-medium transition-colors"
                        >
                            {i18n.language === 'fa' ? 'EN' : 'فا'}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-brown-100 transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-brown-200/20">
                    <div className="px-4 py-6 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block py-2 text-base font-medium transition-colors ${isActive(item.path)
                                    ? 'text-primary-600'
                                    : 'text-brown-700 hover:text-primary-600'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
