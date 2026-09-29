import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Heart, ArrowLeft, User, Send, Clock } from 'lucide-react';
import { ShineButton } from '@/components/animations/shine-button';
import { fa } from '@/lib/utils';

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
            const { data: postData, error: postError } = await supabase
                .from('forum_posts')
                .select('*')
                .eq('id', postId)
                .single();

            if (postError) throw postError;
            setPost(postData);

            const { data: commentsData, error: commentsError } = await supabase
                .from('forum_comments')
                .select('*')
                .eq('post_id', postId)
                .order('created_at', { ascending: true });

            if (commentsError) throw commentsError;
            setComments(commentsData || []);

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
                setPost(prev => ({ ...prev, likes_count: Math.max(0, (prev.likes_count || 1) - 1) }));
            } else {
                await supabase
                    .from('forum_likes')
                    .insert([{ post_id: postId, user_id: currentUser.id }]);
                setLiked(true);
                setPost(prev => ({ ...prev, likes_count: (prev.likes_count || 0) + 1 }));
            }
        } catch (error) {
            console.error('Like error', error);
        }
    };

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
            fetchPostDetails();
        } catch (error) {
            console.error('Comment error', error);
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fa-IR', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const categoryLabels = {
        general: 'عمومی و تجارب سلامت',
        recipes: 'رسپی‌ها و نحوه مصرف',
        farming: 'نکات باغبانی و کشت آپارتمانی'
    };

    if (loading) return (
        <div className="py-16 text-center">
            <div className="w-8 h-8 border-2 border-seed-forest dark:border-seed-lime border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-seed-pewter dark:text-seed-snow/60">در حال فراخوانی گفت‌وگو...</p>
        </div>
    );

    if (!post) return <div className="p-8 text-center text-xs text-seed-pewter">موضوع مورد نظر یافت نشد.</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-xs font-bold text-seed-pewter hover:text-seed-forest dark:hover:text-seed-snow transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>بازگشت به فهرست تالار گفتگو</span>
            </button>

            {/* Main Post Card */}
            <div className="bg-seed-snow dark:bg-[#132412] p-8 rounded-3xl border border-seed-forest/10 dark:border-white/10 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="inline-block px-3 py-1 bg-seed-stone/60 dark:bg-white/10 text-seed-forest dark:text-seed-lime text-xs font-bold rounded-full mb-3">
                            {categoryLabels[post.category] || post.category || 'عمومی'}
                        </span>
                        <h1 className="text-xl md:text-2xl font-display font-black text-seed-forest dark:text-seed-snow leading-snug">
                            {post.title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-seed-pewter dark:text-seed-snow/60 mb-6 pb-4 border-b border-seed-forest/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-seed-stone dark:bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-seed-forest dark:text-seed-lime">
                            <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-seed-forest dark:text-seed-snow">
                            {post.user_email?.split('@')[0] || 'کاربر'}
                        </span>
                    </div>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(post.created_at)}
                    </span>
                </div>

                <div className="text-xs sm:text-sm text-seed-forest/90 dark:text-seed-snow/85 leading-relaxed font-normal whitespace-pre-wrap">
                    {post.content}
                </div>

                <div className="flex items-center gap-3 mt-8 pt-4 border-t border-seed-forest/10 dark:border-white/10">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                            liked 
                                ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                                : 'bg-seed-stone/50 dark:bg-white/5 text-seed-pewter dark:text-seed-snow/70 hover:bg-seed-stone border border-seed-forest/10 dark:border-white/10'
                        }`}
                    >
                        <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                        <span className="font-mono">{fa(post.likes_count || 0)}</span>
                    </button>
                    <div className="flex items-center gap-1.5 px-4 py-2 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 text-seed-pewter dark:text-seed-snow/70 rounded-full text-xs font-bold">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-mono">{fa(comments.length)}</span>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-seed-stone/30 dark:bg-seed-forest/10 rounded-3xl p-6 lg:p-8 border border-seed-forest/10 dark:border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-seed-forest/10 dark:border-white/10">
                    <h3 className="text-base font-bold text-seed-forest dark:text-seed-snow">
                        دیدگاه‌ها و پاسخ‌های اعضا ({fa(comments.length)})
                    </h3>
                </div>

                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-seed-snow dark:bg-[#132412] p-5 rounded-2xl border border-seed-forest/10 dark:border-white/10">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-seed-forest dark:text-seed-lime text-xs">
                                    {comment.user_email?.split('@')[0] || 'همراه رُستارا'}
                                </span>
                                <span className="text-[11px] font-mono text-seed-pewter dark:text-seed-snow/50">
                                    {formatDate(comment.created_at)}
                                </span>
                            </div>
                            <p className="text-seed-pewter dark:text-seed-snow/80 text-xs leading-relaxed font-normal">
                                {comment.content}
                            </p>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <p className="text-center text-seed-pewter dark:text-seed-snow/60 text-xs py-4">
                            هنوز پاسخی ثبت نشده است. اولین نفری باشید که دیدگاه خود را می‌نویسد.
                        </p>
                    )}
                </div>

                {/* Comment Form */}
                {currentUser ? (
                    <form onSubmit={handleComment} className="space-y-3 pt-2">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="دیدگاه، پرسش یا تجربه تکمیلی خود را بنویسید..."
                            className="w-full p-4 bg-seed-snow dark:bg-[#132412] border border-seed-forest/10 dark:border-white/10 rounded-2xl focus:outline-none focus:border-seed-lime text-xs text-seed-forest dark:text-seed-snow leading-relaxed resize-none shadow-sm"
                            rows="3"
                            required
                        />
                        <div className="text-start">
                            <ShineButton
                                type="submit"
                                disabled={!newComment.trim() || submitting}
                                className="px-6 py-2.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold text-xs shadow-md flex items-center gap-2 hover:opacity-95 disabled:opacity-50"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>{submitting ? 'در حال ثبت...' : 'ارسال دیدگاه'}</span>
                            </ShineButton>
                        </div>
                    </form>
                ) : (
                    <div className="text-center p-4 bg-seed-stone/50 dark:bg-white/5 rounded-2xl text-seed-pewter dark:text-seed-snow/70 text-xs">
                        جهت ارسال دیدگاه، لطفاً ابتدا وارد حساب کاربری شوید.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForumTopic;
