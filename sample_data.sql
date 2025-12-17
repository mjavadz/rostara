-- Insert Sample Data for Forum
-- Run this AFTER creating the tables with supabase_schema.sql

-- Insert a mock user (optional, if you want to link to specific existing users, better to just use the IDs you have)
-- This script assumes you have at least one user in auth.users. 
-- Since we can't easily guess UUIDs, we will use a placeholder or you can run this manually replacing 'USER_ID_HERE'
-- However, to make it easier, we can insert generic content if we accept some might fail on foreign key constraint if not careful.
-- BETTER STRATEGY: We will insert posts linking to the *first found user* in the system just for demo purposes.

do $$
declare
  v_user_id uuid;
  v_post_id bigint;
begin
  -- Get the first user ID from auth.users to be the author
  select id into v_user_id from auth.users limit 1;

  if v_user_id is not null then
    
    -- Post 1: Recipes
    insert into public.forum_posts (title, content, user_id, user_email, category, likes_count, comments_count)
    values (
      'بهترین روش پخت برنج قهوه‌ای چیست؟', 
      'سلام دوستان، من اخیراً برنج قهوه‌ای رُستارا خریدم. می‌خواستم بدونم بهترین روش پختش چیه که نرم و خوشمزه بشه؟ آیا باید خیس بخوره؟', 
      v_user_id, 
      'sarah@example.com', 
      'recipes', 
      5, 
      2
    ) returning id into v_post_id;

    -- Comments for Post 1
    insert into public.forum_comments (post_id, user_id, user_email, content)
    values 
    (v_post_id, v_user_id, 'ali@example.com', 'سلام سارا جان. بله حتما حداقل ۳ ساعت خیس کن. من همیشه کته درست می‌کنم عالی میشه.'),
    (v_post_id, v_user_id, 'admin@rostara.ir', 'پیشنهاد ما استفاده از پلوپز با دمای ملایم هست. نوش جان!');


    -- Post 2: Farming
    insert into public.forum_posts (title, content, user_id, user_email, category, likes_count, comments_count)
    values (
      'تجربه من از محصولات ارگانیک گیلان', 
      'واقعاً تفاوت طعم سبزیجات ارگانیک با محصولات بازاری محسوسه. ممنون از زحمات شما.', 
      v_user_id, 
      'reza@example.com', 
      'farming', 
      12, 
      1
    ) returning id into v_post_id;
    
    -- Comment for Post 2
    insert into public.forum_comments (post_id, user_id, user_email, content)
    values 
    (v_post_id, v_user_id, 'support@rostara.ir', 'خوشحالیم که راضی هستید رضا جان. هدف ما سلامتی شماست.');


    -- Post 3: Announcement
    insert into public.forum_posts (title, content, user_id, user_email, category, likes_count, comments_count)
    values (
      'جشنواره برداشت برنج نزدیک است!', 
      'به اطلاع همه اعضای باشگاه می‌رسانیم که ماه آینده جشنواره برداشت داریم. منتظر تخفیف‌های ویژه باشید.', 
      v_user_id, 
      'team@rostara.ir', 
      'announcement', 
      45, 
      0
    );

  end if;
end $$;
