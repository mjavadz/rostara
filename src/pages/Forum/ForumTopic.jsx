import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Heart, ArrowRight, User, Send, Clock, ArrowLeft } from 'lucide-react';

const ForumTopic = ({ postId, onBack }) => {
    const { t, i18n } = useTranslation();
    const { currentUser } = useAuth();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [liked, setLiked] = useState(false);

    const fetchPostDetails = async () => {
        try {
            // Fetch post
            const { data: postData, error: postError } = await supabase
                .from('forum_posts')
                .select('*')
                .eq('id', postId)
                .single();

            if (postError) throw postError;
            setPost(postData);

            // Fetch comments
            const { data: commentsData, error: commentsError } = await supabase
                .from('forum_comments')
                .select('*')
                .eq('post_id', postId)
                .order('created_at', { ascending: true });

            if (commentsError) throw commentsError;
            setComments(commentsData || []);

            // Check if liked
            if (currentUser) {
                const { count } = await supabase
                    .from('forum_likes')
                    .select('*', { count: 'exact', head: true })
                    .eq('post_id', postId)
                    .eq('user_id', currentUser.id);
                setLiked(count > 0);
            }

        } catch (error) {
            console.error('Error details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPostDetails();
    }, [postId]);

    const handleLike = async () => {
        if (!currentUser) return;

        try {
            if (liked) {
                await supabase
                    .from('forum_likes')
                    .delete()
                    .eq('post_id', postId)
                    .eq('user_id', currentUser.id);
                setLiked(false);
                setPost(prev => ({ ...prev, likes_count: (prev.likes_count || 1) - 1 }));
                // Decrement counter on post (RPC or simplistic update)
                await supabase.rpc('decrement_likes', { row_id: postId });
            } else {
                await supabase
                    .from('forum_likes')
                    .insert([{ post_id: postId, user_id: currentUser.id }]);
                setLiked(true);
                setPost(prev => ({ ...prev, likes_count: (prev.likes_count || 0) + 1 }));
                // Increment counter on post
                await supabase.rpc('increment_likes', { row_id: postId });
            }
        } catch (error) {
            console.error('Like error', error);
        }
    };

    // Note: Creating RPCs for counters is best practice, but for simplicity we rely on manual update or triggers.
    // Assuming simple client-side update for now or adding RPCs to SQL script later if strictly needed.
    // For this prototype, we'll skip the RPC call if it doesn't exist and just rely on a refresh or client state.

    const handleComment = async (e) => {
        e.preventDefault();
        if (!currentUser || !newComment.trim()) return;

        setSubmitting(true);
        try {
            const { error } = await supabase
                .from('forum_comments')
                .insert([{
                    post_id: postId,
                    user_id: currentUser.id,
                    user_email: currentUser.email,
                    content: newComment
                }]);

            if (error) throw error;

            setNewComment('');
            fetchPostDetails(); // Refresh comments
        } catch (error) {
            console.error('Comment error', error);
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(i18n.language === 'fa' ? 'fa-IR' : 'en-US', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (loading) return <div className="p-8 text-center"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div></div>;
    if (!post) return <div className="p-8 text-center">{t('forum.notFound')}</div>;

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
            <button
                onClick={onBack}
                className="mb-6 flex items-center gap-2 text-brown-600 dark:text-brown-400 hover:text-primary-600 transition-colors"
            >
                {i18n.dir() === 'rtl' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                {t('common.back')}
            </button>

            {/* Main Post */}
            <div className="bg-white dark:bg-brown-900 p-8 rounded-3xl border border-brown-100 dark:border-brown-800 shadow-sm mb-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full mb-3">
                            {t(`forum.categories.${post.category}`)}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-brown-900 dark:text-cream">
                            {post.title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-brown-500 mb-8 pb-6 border-b border-brown-100 dark:border-brown-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brown-100 dark:bg-brown-800 rounded-full flex items-center justify-center">
                            <span className="font-bold text-brown-600">
                                {post.user_email?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <span className="font-medium text-brown-900 dark:text-brown-200">
                            {post.user_email?.split('@')[0]}
                        </span>
                    </div>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(post.created_at)}
                    </span>
                </div>

                <div className="prose dark:prose-invert max-w-none text-brown-800 dark:text-brown-200 whitespace-pre-wrap">
                    {post.content}
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-brown-100 dark:border-brown-800">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${liked ? 'bg-red-50 text-red-600' : 'bg-gray-50 dark:bg-brown-800 text-brown-600 hover:bg-brown-100'}`}
                    >
                        <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                        <span className="font-bold">{post.likes_count || 0}</span>
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-brown-800 text-brown-600 rounded-xl">
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-bold">{comments.length}</span>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-cream-50 dark:bg-brown-950/50 rounded-3xl p-6 lg:p-8">
                <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-6">
                    {t('forum.comments')} ({comments.length})
                </h3>

                <div className="space-y-6 mb-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white dark:bg-brown-900 p-5 rounded-2xl border border-brown-100 dark:border-brown-800">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-primary-700 dark:text-primary-400 text-sm">
                                        {comment.user_email?.split('@')[0]}
                                    </span>
                                    <span className="text-xs text-brown-400">
                                        {formatDate(comment.created_at)}
                                    </span>
                                </div>
                            </div>
                            <p className="text-brown-800 dark:text-brown-200 text-sm leading-relaxed">
                                {comment.content}
                            </p>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <p className="text-center text-brown-400 italic py-4">
                            {t('forum.noComments')}
                        </p>
                    )}
                </div>

                {/* Comment Form */}
                {currentUser ? (
                    <form onSubmit={handleComment} className="relative">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={t('forum.writeComment')}
                            className="w-full pl-4 pr-12 py-4 bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all"
                            rows="2"
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim() || submitting}
                            className="absolute right-3 bottom-3 p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-colors rtl:right-auto rtl:left-3"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                ) : (
                    <div className="text-center p-6 bg-brown-100 dark:bg-brown-900/50 rounded-2xl text-brown-600 dark:text-brown-300 text-sm">
                        {t('forum.loginToComment')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForumTopic;
