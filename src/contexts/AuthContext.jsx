import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in from localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signup = async (email, password, name) => {
        // Mock signup - in production, this would call Firebase
        const user = {
            id: Date.now().toString(),
            email,
            name,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        return user;
    };

    const login = async (email, password) => {
        // Mock login - in production, this would call Firebase
        const user = {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0],
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        return user;
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
