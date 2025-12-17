import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';
import { MessageSquare, Heart, Clock, User } from 'lucide-react';
import CreateTopic from './CreateTopic';
import ForumTopic from './ForumTopic';

const ForumList = () => {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('forum_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(i18n.language === 'fa' ? 'fa-IR' : 'en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (selectedPostId) {
        return (
            <ForumTopic
                postId={selectedPostId}
                onBack={() => setSelectedPostId(null)}
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <CreateTopic onTopicCreated={fetchPosts} />

            <div className="space-y-4">
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white dark:bg-brown-900 p-6 rounded-2xl animate-pulse h-32"></div>
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 text-brown-500 dark:text-brown-400">
                        {t('forum.empty')}
                    </div>
                ) : (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => setSelectedPostId(post.id)}
                            className="bg-white dark:bg-brown-900 p-6 rounded-2xl border border-brown-100 dark:border-brown-800 hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="inline-block px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-lg mb-2">
                                        {t(`forum.categories.${post.category}`)}
                                    </span>
                                    <h3 className="text-lg font-bold text-brown-900 dark:text-cream group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                                        {post.title}
                                    </h3>
                                </div>
                                <span className="text-xs text-brown-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(post.created_at)}
                                </span>
                            </div>

                            <p className="text-brown-600 dark:text-brown-400 text-sm line-clamp-2 mb-4">
                                {post.content}
                            </p>

                            <div className="flex items-center justify-between text-xs text-brown-500 dark:text-brown-400 border-t border-brown-50 dark:border-brown-800/50 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-brown-100 dark:bg-brown-800 rounded-full flex items-center justify-center">
                                        <User className="w-3 h-3 text-brown-500" />
                                    </div>
                                    <span>{post.user_email?.split('@')[0] || t('common.user')}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <Heart className="w-4 h-4" />
                                        {post.likes_count || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4" />
                                        {post.comments_count || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ForumList;
