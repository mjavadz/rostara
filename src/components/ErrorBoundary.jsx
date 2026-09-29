import React from 'react';
import { Sprout, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0a1608] text-[#fcfcf7] flex items-center justify-center p-4 font-sans" dir="rtl">
                    <div className="max-w-md w-full bg-[#132412] p-8 rounded-3xl border border-white/10 text-center shadow-2xl">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-5 text-[#d3fa99] border border-white/10">
                            <Sprout className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">اختلال موقت در بارگذاری ماژول زیستی</h2>
                        <p className="text-xs text-[#666666] dark:text-white/60 mb-6 leading-relaxed">
                            ماژول با یک وضعیت غیرمنتظره مواجه شد. جهت بازیابی جلسه و بازخوانی داده‌های پایدار، صفحه را تازه کنید.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="px-6 py-2.5 bg-[#d3fa99] text-[#1c3a13] font-bold text-xs rounded-full flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>بارگذاری مجدد</span>
                            </button>
                            <a
                                href="/"
                                className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-full flex items-center gap-1.5 transition-all"
                            >
                                <Home className="w-3.5 h-3.5" />
                                <span>صفحه اصلی</span>
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
