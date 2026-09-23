-- ==========================================================
-- 🌿 ROSTARA DATABASE SETUP SCRIPT (SUPABASE / POSTGRESQL)
-- ==========================================================
-- این اسکریپت را در بخش SQL Editor در پنل Supabase کپی و اجرا (RUN) کنید.
-- جداول: محصولات، سفارش‌ها، پیام‌های تماس، اعضای خبرنامه، کیف پول و تخفیف‌ها.
-- ==========================================================

-- 1. جدول محصولات (Products)
create table if not exists public.products (
    id text primary key,
    name text not null,
    name_en text,
    category text not null,
    price numeric not null,
    weight text,
    features jsonb default '[]'::jsonb,
    in_stock boolean default true,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- فعال‌سازی امنیت سطحی (RLS)
alter table public.products enable row level security;
drop policy if exists "Public products are viewable by everyone" on public.products;
create policy "Public products are viewable by everyone" on public.products for select using (true);

drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products" on public.products for all using (
    auth.role() = 'service_role' or auth.jwt() ->> 'email' in ('info@rostara.ir', 'admin@rostara.ir')
);


-- 2. درج محصولات پیش‌فرض ارگانیک و میکروگرین رُستارا
insert into public.products (id, name, name_en, category, price, weight, features, in_stock) values
('micro_kit_starter', 'کیت خانگی کشت میکروگرین رُستارا', 'Rostara Home Microgreens Kit', 'growing_kits', 680000, 'پک کامل با ۴ بذر', '["برداشت اول ظرف ۷ روز", "بدون نیاز به کود شیمیایی", "مناسب محیط آپارتمان"]', true),
('micro_broccoli', 'میکروگرین بروکلی تازه', 'Fresh Broccoli Microgreens', 'microgreens', 180000, '۱۰۰ گرم', '["بمب سولفورافان", "ضدالتهاب قوی", "طعم ملایم و ترد"]', true),
('micro_radish', 'میکروگرین تربچه بنفش', 'Purple Radish Microgreens', 'microgreens', 150000, '۱۰۰ گرم', '["طعم فلفلی و نشاط‌آور", "سرشار از ویتامین C", "تزیین لوکس سالاد و بشقاب"]', true),
('micro_sunflower', 'میکروگرین آفتابگردان', 'Sunflower Microgreens', 'microgreens', 160000, '۱۰۰ گرم', '["پروتئین گیاهی بالا", "طعم آجیلی لذیذ", "انرژی‌بخش روزانه"]', true),
('micro_pea', 'میکروگرین نخودفرنگی برفی', 'Snow Pea Microgreens', 'microgreens', 170000, '۱۰۰ گرم', '["شیرین و ترد", "کلروفیل غلیظ", "محبوب در رژیم‌های خام‌گیاهی"]', true),
('micro_seeds_pack', 'پک بذرهای ارگانیک میکروگرین (۴ عددی)', 'Organic Microgreen Seeds (4-Pack)', 'growing_kits', 240000, '۴ بسته بذر ارگانیک', '["بذر خالص غیرتراریخته", "تست جوانه‌زنی بالا", "کاملاً خوراکی و بهداشتی"]', true),
('growing_medium_coco', 'بستر کشت ارگانیک کوکوپیت و پرلیت', 'Organic Coco Coir & Perlite Mix', 'growing_kits', 190000, 'بسته ۵ لیتری', '["استریل و عاری از قارچ", "حفظ بهینه رطوبت", "کاملاً زیست‌تخریب‌پذیر"]', true),
('kombucha', 'کامبوچای تخمیری زنجبیل و لیمو', 'Ginger-Lemon Living Kombucha', 'fermented', 185000, '۱ لیتر', '["پروبیوتیک زنده و فعال", "گازدار طبیعی و بدون شکر افزوده", "تنظیم میکروبیوم روده"]', true),
('kimchi', 'کیمچی ارگانیک دست‌ساز', 'Artisanal Organic Kimchi', 'fermented', 490000, '۸۰۰ گرم', '["سرشار از لاکتوباسیلوس", "تقویت سیستم ایمنی", "طعم اصیل و تند"]', true),
('miso', 'خمیر میسو سویای دیم', 'Aged Soybean Miso', 'fermented', 650000, '۴۰۰ گرم', '["تخمیر چندماهه سنتی", "غنی از اسیدهای آمینه ضروری", "پایه‌گذار سوپ‌های سلامت"]', true),
('sourdough', 'نان ساوردو خمیرترش وحشی', 'Wild Ferment Sourdough Loaf', 'fermented', 160000, '۷۵۰ گرم', '["شاخص گلیسمی پایین", "پری‌بیوتیک طبیعی و هضم آسان", "ماندگاری طولانی طبیعی"]', true),
('lions_mane', 'پودر عصاره قارچ یال شیر (Lion''s Mane)', 'Lion''s Mane Mushroom Extract', 'mushrooms', 890000, '۱۵۰ گرم عصاره', '["نوتروپیک طبیعی", "افزایش تمرکز عمیق", "پشتیبان سیستم عصبی"]', true),
('shiitake', 'قارچ دارویی شیتاکه (خشک و تازه)', 'Medicinal Shiitake Mushrooms', 'mushrooms', 520000, '۳۰۰ گرم', '["تقویت سیستم ایمنی", "طعم دودی و اومامی عالی", "منبع غنی بتاگلوکان"]', true),
('reishi_extract', 'پودر ارگانیک قارچ ریشی (گانودرما)', 'Organic Reishi Mushroom Extract', 'mushrooms', 780000, '۱۰۰ گرم عصاره', '["تعدیل‌کننده استرس (آداپتوژن)", "بهبود کیفیت خواب عمیق", "پاکسازی کبد"]', true),
('wheatgrass_shot', 'پودر جوانه‌ریز گندم (ویت‌گرس)', 'Organic Wheatgrass Powder', 'superfoods', 340000, '۲۰۰ گرم پودر خالص', '["خون‌ساز و انرژی‌بخش", "سم‌زدایی عمیق سلولی", "قلیایی‌کننده بدن"]', true),
('kale', 'سبزی کیل فرفری ارگانیک', 'Fresh Organic Curly Kale', 'superfoods', 140000, '۵۰۰ گرم تازه', '["سوپرفود برگ سبز", "سرشار از لوتئین و ویتامین K", "مناسب اسموتی‌های سبز"]', true)
on conflict (id) do update set
    name = excluded.name,
    price = excluded.price,
    weight = excluded.weight,
    features = excluded.features;


-- 3. جدول سفارش‌ها (Orders) با پشتیبانی از کاربران عضو و مهمان
create table if not exists public.orders (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete set null,
    full_name text not null,
    email text,
    phone text not null,
    address text not null,
    city text not null,
    postal_code text,
    notes text,
    total_price numeric not null,
    items jsonb not null,
    status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
);

alter table public.orders enable row level security;
drop policy if exists "Anyone can insert orders" on public.orders;
create policy "Anyone can insert orders" on public.orders for insert with check (true);

drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders" on public.orders for select using (
    auth.uid() = user_id or auth.jwt() ->> 'email' in ('info@rostara.ir', 'admin@rostara.ir')
);


-- 4. جدول پیام‌های تماس (Contact Messages)
create table if not exists public.contact_messages (
    id bigint generated always as identity primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text not null,
    phone text,
    message text not null,
    status text default 'unread' check (status in ('unread', 'read', 'archived'))
);

alter table public.contact_messages enable row level security;
drop policy if exists "Anyone can send contact messages" on public.contact_messages;
create policy "Anyone can send contact messages" on public.contact_messages for insert with check (true);

drop policy if exists "Admins can view messages" on public.contact_messages;
create policy "Admins can view messages" on public.contact_messages for select using (
    auth.role() = 'service_role' or auth.jwt() ->> 'email' in ('info@rostara.ir', 'admin@rostara.ir')
);


-- 5. جدول اعضای خبرنامه (Newsletter Subscribers)
create table if not exists public.newsletter_subscribers (
    id bigint generated always as identity primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text unique not null
);

alter table public.newsletter_subscribers enable row level security;
drop policy if exists "Anyone can subscribe to newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to newsletter" on public.newsletter_subscribers for insert with check (true);


-- 6. جدول کیف پول اعضا (Wallets)
create table if not exists public.wallets (
    id bigint generated always as identity primary key,
    user_id uuid references auth.users(id) on delete cascade not null unique,
    credit_balance numeric default 0,
    cash_balance numeric default 0,
    ticket_balance int default 0,
    vip_level int default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.wallets enable row level security;
drop policy if exists "Users can view own wallet" on public.wallets;
create policy "Users can view own wallet" on public.wallets for select using (auth.uid() = user_id);
