import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Send, Star, AlertCircle } from 'lucide-react';

const CreateTopic = ({ onTopicCreated }) => {
    const { t } = useTranslation();
    const { currentUser } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('general');
    const [loading, setLoading] = useState(false);
    const [isStarUser, setIsStarUser] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const checkStarStatus = async () => {
            if (!currentUser) return;

            try {
                const { count, error } = await supabase
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', currentUser.id);

                if (!error && count > 0) {
                    setIsStarUser(true);
                }
            } catch (err) {
                console.error("Error checking star status:", err);
            } finally {
                setCheckingStatus(false);
            }
        };

        checkStarStatus();
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser || !isStarUser) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('forum_posts')
                .insert([
                    {
                        title,
                        content,
                        user_id: currentUser.id,
                        user_email: currentUser.email,
                        category
                    }
                ]);

            if (error) throw error;

            setTitle('');
            setContent('');
            onTopicCreated();
        } catch (error) {
            console.error('Error creating topic:', error);
            alert(t('forum.create.error'));
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    {t('forum.create.loginRequired')}
                </p>
            </div>
        );
    }

    if (checkingStatus) {
        return <div className="animate-pulse h-24 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>;
    }

    if (!isStarUser) {
        return (
            <div className="bg-white dark:bg-brown-900 p-6 rounded-2xl border border-brown-100 dark:border-brown-800 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                    <Star className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-bold text-brown-900 dark:text-cream mb-2">
                    {t('forum.create.starUserOnly')}
                </h3>
                <p className="text-sm text-brown-600 dark:text-brown-400">
                    {t('forum.create.starUserDesc')}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-brown-900 p-6 rounded-2xl border border-brown-100 dark:border-brown-800 shadow-sm mb-8">
            <h3 className="font-display font-bold text-xl text-brown-900 dark:text-cream mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                {t('forum.create.title')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={t('forum.create.titlePlaceholder')}
                        className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-brown-900 dark:text-cream"
                        required
                    />
                </div>
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={t('forum.create.contentPlaceholder')}
                        rows="3"
                        className="w-full px-4 py-3 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-brown-900 dark:text-cream"
                        required
                    />
                </div>
                <div className="flex justify-between items-center">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-3 py-2 bg-cream dark:bg-brown-800 border border-brown-200 dark:border-brown-700 rounded-lg text-sm text-brown-700 dark:text-brown-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="general">{t('forum.categories.general')}</option>
                        <option value="recipes">{t('forum.categories.recipes')}</option>
                        <option value="farming">{t('forum.categories.farming')}</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        {loading ? t('common.sending') : t('forum.create.submit')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTopic;
