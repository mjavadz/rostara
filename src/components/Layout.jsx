import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ScrollProgress } from '@/components/animations/scroll-progress';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-charcoal dark:text-seed-snow font-sans transition-colors duration-300 selection:bg-seed-lime selection:text-seed-forest relative">
            <ScrollProgress className="h-1 bg-seed-forest/10 dark:bg-white/10 z-[60]" />
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
