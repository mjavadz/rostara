import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Send, Star, AlertCircle, Sprout } from 'lucide-react';
import { TaxonomyTag } from '@/components/ui/TaxonomyTag';

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
                } else {
                    // Also allow demo accounts
                    setIsStarUser(true);
                }
            } catch (err) {
                console.error("Error checking star status:", err);
                setIsStarUser(true);
            } finally {
                setCheckingStatus(false);
            }
        };

        checkStarStatus();
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

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
            alert('خطا در ثبت گفت‌وگو. لطفاً دوباره تلاش فرمایید.');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="bg-seed-stone/50 dark:bg-white/5 p-4 rounded-2xl border border-seed-forest/10 dark:border-white/10 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-seed-forest dark:text-seed-lime shrink-0" />
                <p className="text-seed-forest dark:text-seed-snow text-xs font-medium">
                    برای مشارکت در گفت‌وگوهای باشگاه و ثبت تجربه، لطفاً ابتدا وارد حساب کاربری خود شوید.
                </p>
            </div>
        );
    }

    if (checkingStatus) {
        return <div className="animate-pulse h-24 bg-seed-stone/30 dark:bg-white/5 rounded-2xl"></div>;
    }

    return (
        <div className="bg-seed-snow dark:bg-[#132412] p-6 rounded-3xl border border-seed-forest/10 dark:border-white/10 shadow-sm mb-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-seed-forest/10 dark:border-white/10">
                <h3 className="font-display font-bold text-base text-seed-forest dark:text-seed-snow flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-seed-forest dark:text-seed-lime" />
                    <span>ثبت تجربه یا پرسش جدید در تالار</span>
                </h3>
                <TaxonomyTag variant="muted">
                    {t('forum.create.title', { defaultValue: 'مشارکت علمی' })}
                </TaxonomyTag>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="عنوان موضوع یا تجربه (مثال: تجربه کشت میکروگرین بروکلی در زمستان)..."
                        className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime transition-all text-seed-forest dark:text-seed-snow text-xs"
                        required
                    />
                </div>
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="مشاهدات، چالش‌ها، شرایط دما و نور یا تجارب تغذیه‌ای خود را تشریح فرمایید..."
                        rows="3"
                        className="w-full px-4 py-3 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-seed-lime resize-none text-seed-forest dark:text-seed-snow text-xs leading-relaxed"
                        required
                    />
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-2">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-3.5 py-2.5 bg-seed-stone/50 dark:bg-white/5 border border-seed-forest/10 dark:border-white/10 rounded-xl text-xs text-seed-forest dark:text-seed-snow focus:outline-none focus:border-seed-lime"
                    >
                        <option value="general">عمومی و تجارب سلامت</option>
                        <option value="recipes">رسپی‌ها و نحوه مصرف</option>
                        <option value="farming">نکات باغبانی و کشت آپارتمانی</option>
                    </select>

                    <ShineButton
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-seed-forest dark:bg-seed-lime text-seed-snow dark:text-seed-forest rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95"
                    >
                        <Send className="w-3.5 h-3.5" />
                        <span>{loading ? 'در حال ثبت...' : 'انتشار موضوع در تالار'}</span>
                    </ShineButton>
                </div>
            </form>
        </div>
    );
};

export default CreateTopic;
