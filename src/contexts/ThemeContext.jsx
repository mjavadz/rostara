import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // 'light' | 'dark' | 'auto'
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme || 'auto';
    });

    useEffect(() => {
        const applyTheme = () => {
            const root = document.documentElement;
            let isDark = false;

            if (theme === 'auto') {
                const hour = new Date().getHours();
                // Dark mode between 6 PM (18) and 6 AM (6)
                isDark = hour >= 18 || hour < 6;
            } else {
                isDark = theme === 'dark';
            }

            if (isDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme();
        localStorage.setItem('theme', theme);

        // If auto, check every minute to update if time crosses threshold
        let interval;
        if (theme === 'auto') {
            interval = setInterval(applyTheme, 60000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [theme]);

    const value = {
        theme,
        setTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
