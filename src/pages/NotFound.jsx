import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-display font-bold text-primary-200 mb-4">404</h1>
                <h2 className="text-3xl font-display font-bold text-brown-900 mb-6">
                    صفحه مورد نظر پیدا نشد
                </h2>
                <p className="text-brown-600 mb-8 text-lg">
                    متاسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    <Home className="w-5 h-5" />
                    <span>بازگشت به خانه</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
