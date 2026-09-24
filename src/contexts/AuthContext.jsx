import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Pre-seeded Demo Accounts
export const DEMO_ACCOUNTS = [
    {
        id: 'usr_demo_javad',
        email: 'demo@rostara.ir',
        password: 'rostara2026',
        user_metadata: {
            display_name: 'محمدجواد زمانی'
        },
        role: 'member'
    },
    {
        id: 'usr_founder_javad',
        email: 'javad@rostara.ir',
        password: 'rostara2026',
        user_metadata: {
            display_name: 'محمدجواد (موسس رُستارا)'
        },
        role: 'founder'
    }
];

const LOCAL_USERS_KEY = 'rostara_registered_users';
const LOCAL_SESSION_KEY = 'rostara_auth_session';

function getLocalUsers() {
    try {
        const item = localStorage.getItem(LOCAL_USERS_KEY);
        return item ? JSON.parse(item) : DEMO_ACCOUNTS;
    } catch {
        return DEMO_ACCOUNTS;
    }
}

function saveLocalUsers(users) {
    try {
        localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
    } catch (e) {
        console.warn('Failed to save local users:', e);
    }
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Check local session first (instant load)
        try {
            const savedSession = localStorage.getItem(LOCAL_SESSION_KEY);
            if (savedSession) {
                const parsed = JSON.parse(savedSession);
                if (parsed && parsed.email) {
                    setCurrentUser(parsed);
                }
            }
        } catch (e) {
            console.warn('Failed to parse local session:', e);
        }

        // 2. Try remote Supabase session with safe timeout
        let timer = setTimeout(() => {
            setLoading(false);
        }, 1200);

        try {
            supabase.auth.getSession().then(({ data: { session } }) => {
                clearTimeout(timer);
                if (session?.user) {
                    setCurrentUser(session.user);
                    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session.user));
                }
                setLoading(false);
            }).catch(() => {
                clearTimeout(timer);
                setLoading(false);
            });

            // Listen for remote auth changes
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                if (session?.user) {
                    setCurrentUser(session.user);
                    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session.user));
                }
            });

            return () => {
                clearTimeout(timer);
                subscription?.unsubscribe();
            };
        } catch {
            clearTimeout(timer);
            setLoading(false);
        }
    }, []);

    const signup = async (email, password, name) => {
        const cleanEmail = email.trim().toLowerCase();
        const users = getLocalUsers();

        // Check if already exists locally
        if (users.find(u => u.email.toLowerCase() === cleanEmail)) {
            throw new Error('حسابی با این آدرس ایمیل از قبل وجود دارد.');
        }

        const newUser = {
            id: 'usr_' + Date.now(),
            email: cleanEmail,
            password: password,
            user_metadata: {
                display_name: name || cleanEmail.split('@')[0]
            },
            created_at: new Date().toISOString()
        };

        users.push(newUser);
        saveLocalUsers(users);

        // Auto login newly registered user
        setCurrentUser(newUser);
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(newUser));

        // Background sync with Supabase (fire and forget)
        try {
            supabase.auth.signUp({
                email: cleanEmail,
                password,
                options: {
                    data: { display_name: name }
                }
            }).catch(() => {});
        } catch {}

        return newUser;
    };

    const login = async (email, password) => {
        const cleanEmail = email.trim().toLowerCase();
        const users = getLocalUsers();

        // 1. Check local pre-seeded or registered users
        const localMatch = users.find(u => 
            u.email.toLowerCase() === cleanEmail && u.password === password
        );

        if (localMatch) {
            const userSession = {
                id: localMatch.id,
                email: localMatch.email,
                user_metadata: localMatch.user_metadata || { display_name: localMatch.email.split('@')[0] }
            };
            setCurrentUser(userSession);
            localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(userSession));
            return userSession;
        }

        // 2. If not found locally, try remote Supabase
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: cleanEmail,
                password
            });
            if (error) throw error;
            if (data?.user) {
                setCurrentUser(data.user);
                localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(data.user));
                return data.user;
            }
        } catch (err) {
            throw new Error('ایمیل یا رمز عبور وارد شده نادرست است.');
        }

        throw new Error('ایمیل یا رمز عبور وارد شده نادرست است.');
    };

    const loginAsDemo = (accountIndex = 0) => {
        const demo = DEMO_ACCOUNTS[accountIndex] || DEMO_ACCOUNTS[0];
        const userSession = {
            id: demo.id,
            email: demo.email,
            user_metadata: demo.user_metadata
        };
        setCurrentUser(userSession);
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(userSession));
        return userSession;
    };

    const logout = async () => {
        setCurrentUser(null);
        localStorage.removeItem(LOCAL_SESSION_KEY);
        try {
            await supabase.auth.signOut();
        } catch {}
    };

    const value = {
        currentUser,
        signup,
        login,
        loginAsDemo,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
