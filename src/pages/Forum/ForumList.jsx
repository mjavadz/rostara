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
        <div className="max-w-4xl mx-auto space-y-6">
            <CreateTopic onTopicCreated={fetchPosts} />

            <div className="space-y-4">
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-seed-stone/40 dark:bg-white/5 p-6 rounded-2xl animate-pulse h-28 border border-seed-forest/10 dark:border-white/10"></div>
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 text-seed-pewter dark:text-seed-snow/60 bg-seed-stone/20 dark:bg-white/5 rounded-2xl border border-seed-forest/10 dark:border-white/10">
                        {t('forum.empty', { defaultValue: 'هنوز گفت‌وگویی ثبت نشده است. اولین نفری باشید که تجربه خود را می‌نویسد!' })}
                    </div>
                ) : (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => setSelectedPostId(post.id)}
                            className="bg-seed-snow dark:bg-[#132412] p-6 rounded-2xl border border-seed-forest/10 dark:border-white/10 hover:border-seed-forest/30 dark:hover:border-white/20 transition-all cursor-pointer group shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <span className="inline-block px-2.5 py-0.5 bg-seed-stone dark:bg-white/10 text-seed-forest dark:text-seed-lime text-[11px] font-mono rounded-full mb-2">
                                        {post.category || 'عمومی'}
                                    </span>
                                    <h3 className="text-base font-bold text-seed-forest dark:text-seed-snow group-hover:text-seed-lime transition-colors">
                                        {post.title}
                                    </h3>
                                </div>
                                <span className="text-[11px] font-mono text-seed-pewter dark:text-seed-snow/50 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(post.created_at)}
                                </span>
                            </div>

                            <p className="text-seed-pewter dark:text-seed-snow/70 text-xs line-clamp-2 mb-4 leading-relaxed">
                                {post.content}
                            </p>

                            <div className="flex items-center justify-between text-xs text-seed-pewter dark:text-seed-snow/50 border-t border-seed-forest/10 dark:border-white/10 pt-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-seed-stone dark:bg-white/10 rounded-full flex items-center justify-center">
                                        <User className="w-3 h-3 text-seed-pewter dark:text-seed-snow/70" />
                                    </div>
                                    <span className="font-mono text-[11px]">{post.user_email?.split('@')[0] || 'کاربر'}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <Heart className="w-3.5 h-3.5 text-red-500" />
                                        {post.likes_count || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageSquare className="w-3.5 h-3.5" />
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
