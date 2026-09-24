// 🌿 Rostara Unified Database Engine (Local-First with Remote Dual-Sync)
// Provides instant, offline-capable persistence with optional Supabase cloud sync.

import { supabase } from '../supabase';

const STORAGE_KEYS = {
    PRODUCTS: 'rostara_db_products',
    ORDERS: 'rostara_db_orders',
    MESSAGES: 'rostara_db_messages',
    COUPONS: 'rostara_db_coupons',
    REVIEWS: 'rostara_db_reviews',
};

// Seed Products (16 Curated Organic Items with Rich Metadata)
export const INITIAL_PRODUCTS = [
    {
        id: 'micro_kit_starter',
        name: 'کیت خانگی کشت میکروگرین رُستارا',
        name_en: 'Rostara Home Microgreens Kit',
        category: 'growing_kits',
        price: 680000,
        weight: 'پک کامل با ۴ بذر',
        in_stock: true,
        rating: 5.0,
        reviews_count: 24,
        features: ['برداشت اول ظرف ۷ روز', 'بدون نیاز به کود شیمیایی', 'مناسب محیط آپارتمان'],
        benefits: 'کامل‌ترین بسته برای شروع باغبانی شهری؛ شامل سینی دوطبقه با سیستم زهکشی خودکار، ۴ نوع بذر ارگانیک با تست جوانه‌زنی بالا، پدهای سلولزی زیست‌تخریب‌پذیر و اسپری مه پاش.',
        usage: 'بذرها را طبق دفترچه روی پد مرطوب بپاشید، ۳ روز در تاریکی نگه دارید و سپس زیر نور ملایم پنجره قرار دهید.',
    },
    {
        id: 'micro_broccoli',
        name: 'میکروگرین بروکلی تازه',
        name_en: 'Fresh Broccoli Microgreens',
        category: 'microgreens',
        price: 180000,
        weight: '۱۰۰ گرم',
        in_stock: true,
        rating: 4.9,
        reviews_count: 42,
        features: ['بمب سولفورافان (تا ۵۰× بروکلی بالغ)', 'ضدالتهاب و سم‌زدای قوی سلولی', 'طعم ملایم و ترد'],
        benefits: 'حاوی بیشترین غلظت گلوکورافانین که در بدن به سولفورافان تبدیل می‌شود؛ ترکیبی که در تحقیقات پرچمدار پیشگیری از سرطان و محافظت از نورون‌های مغزی است.',
        usage: 'به صورت خام روی سالاد، تخم‌مرغ صبحانه، سوپ گرم (بعد از پخت) یا اسموتی‌های سبز اضافه کنید.',
    },
    {
        id: 'micro_radish',
        name: 'میکروگرین تربچه بنفش',
        name_en: 'Purple Radish Microgreens',
        category: 'microgreens',
        price: 150000,
        weight: '۱۰۰ گرم',
        in_stock: true,
        rating: 4.8,
        reviews_count: 31,
        features: ['طعم فلفلی و نشاط‌آور', 'سرشار از ویتامین C و آنتوسیانین', 'تزیین لوکس سالاد و بشقاب'],
        benefits: 'رنگ یاقوتی خیره‌کننده ناشی از آنتی‌اکسیدان‌های آنتوسیانین؛ تقویت‌کننده سیستم ایمنی و پاکسازی کبد.',
        usage: 'عالی برای ساندویچ‌های سالم، تاکو، تزئین بشقاب غذا و سوپ‌های خنک تابستانی.',
    },
    {
        id: 'micro_sunflower',
        name: 'میکروگرین آفتابگردان',
        name_en: 'Sunflower Microgreens',
        category: 'microgreens',
        price: 160000,
        weight: '۱۰۰ گرم',
        in_stock: true,
        rating: 4.9,
        reviews_count: 38,
        features: ['پروتئین گیاهی بالا', 'طعم آجیلی لذیذ و بافت گوشتی', 'منبع زینک و ویتامین E'],
        benefits: 'یکی از پرکالری‌ترین و غنی‌ترین میکروگرین‌ها با پروتئین کامل و چربی‌های سالم گیاهی برای بازسازی سلولی.',
        usage: 'بهترین پایه سبز برای سالادهای وعده ناهار یا ترکیب در لقمه‌های انرژی‌بخش روزانه.',
    },
    {
        id: 'micro_pea',
        name: 'میکروگرین نخودفرنگی برفی',
        name_en: 'Snow Pea Microgreens',
        category: 'microgreens',
        price: 170000,
        weight: '۱۰۰ گرم',
        in_stock: true,
        rating: 4.8,
        reviews_count: 19,
        features: ['شیرین و بسیار ترد', 'کلروفیل غلیظ و فیبر زیستی', 'محبوب در رژیم‌های خام‌گیاهی'],
        benefits: 'پیچک‌های نازک و شیرین با ویتامین‌های A, C و فولات طبیعی؛ کمک به هضم سبک و احساس شادابی.',
        usage: 'به تنهایی به عنوان میان‌وعده سالم مصرف شود یا روی پاستا و نودل‌های سبزیجات ریخته شود.',
    },
    {
        id: 'micro_seeds_pack',
        name: 'پک بذرهای ارگانیک میکروگرین (۴ عددی)',
        name_en: 'Organic Microgreen Seeds (4-Pack)',
        category: 'growing_kits',
        price: 240000,
        weight: '۴ بسته بذر ارگانیک',
        in_stock: true,
        rating: 5.0,
        reviews_count: 15,
        features: ['بذر خالص غیرتراریخته', 'تست جوانه‌زنی بالای ۹۵٪', 'ضدعفونی‌نشده با قارچ‌کش شیمیایی'],
        benefits: 'شامل بذرهای تخصصی بروکلی، تربچه بنفش، خردل وحشی و نخود دیم با خلوص استاندارد جهانی.',
        usage: 'هر بسته برای ۲ تا ۳ سینی کشت خانگی کافی است.',
    },
    {
        id: 'growing_medium_coco',
        name: 'بستر کشت ارگانیک کوکوپیت و پرلیت',
        name_en: 'Organic Coco Coir & Perlite Mix',
        category: 'growing_kits',
        price: 190000,
        weight: 'بسته ۵ لیتری',
        in_stock: true,
        rating: 4.7,
        reviews_count: 12,
        features: ['استریل و عاری از قارچ', 'حفظ بهینه رطوبت و هوادهی ریشه', 'کاملاً زیست‌تخریب‌پذیر'],
        benefits: 'تهیه‌شده از الیاف نارگیل فراوری‌شده و پرلیت منبسط؛ بدون بوی نامطبوع، ایده‌آل برای محیط آپارتمان.',
        usage: 'یک لایه ۲ سانتی‌متری در کف سینی بریزید، مرطوب کنید و بذرها را روی آن بپاشید.',
    },
    {
        id: 'kombucha',
        name: 'کامبوچای تخمیری زنجبیل و لیمو',
        name_en: 'Ginger-Lemon Living Kombucha',
        category: 'fermented',
        price: 185000,
        weight: '۱ لیتر',
        in_stock: true,
        rating: 4.9,
        reviews_count: 53,
        features: ['پروبیوتیک زنده و فعال', 'گازدار طبیعی بدون شکر افزوده', 'تنظیم میکروبیوم و هضم غذا'],
        benefits: 'حاصل تخمیر ۲۱ روزه سنتی چای سبز و سیاه با اسکوبی زنده؛ سرشار از باکتری‌های مفید اسید استیک و اسید گلوکونیک.',
        usage: 'روزی یک لیوان (حدود ۱۵۰ تا ۲۰۰ میلی‌لیتر) به صورت خنک قبل یا همراه غذا میل کنید.',
    },
    {
        id: 'kimchi',
        name: 'کیمچی ارگانیک دست‌ساز',
        name_en: 'Artisanal Organic Kimchi',
        category: 'fermented',
        price: 490000,
        weight: '۸۰۰ گرم',
        in_stock: true,
        rating: 4.8,
        reviews_count: 27,
        features: ['سرشار از لاکتوباسیلوس', 'تقویت محور مغز-روده', 'طعم اصیل، ترد و معتدل'],
        benefits: 'تخمیر لاکتیکی کلم نپا، ترب، زنجبیل و سیر تازه؛ غنی‌کننده تنوع باکتریایی روده و کاهنده التهاب درونی.',
        usage: 'به عنوان ساید دیش در کنار برنج قهوه‌ای، گوشت، تخم‌مرغ یا داخل انواع خوراک و سوپ.',
    },
    {
        id: 'miso',
        name: 'خمیر میسو سویای دیم',
        name_en: 'Aged Soybean Miso',
        category: 'fermented',
        price: 650000,
        weight: '۴۰۰ گرم',
        in_stock: true,
        rating: 4.9,
        reviews_count: 18,
        features: ['تخمیر چندماهه سنتی', 'غنی از اسیدهای آمینه ضروری', 'طعم عمیق اومامی'],
        benefits: 'حاوی آنزیم‌های فعال هضم و کوجی؛ به عنوان پایه سوپ‌های ضدپیری و تنظیم‌کننده فشار خون.',
        usage: 'یک قاشق غذاخوری را در آب گرم حل کنید (نجوشانید تا پروبیوتیک‌ها زنده بمانند).',
    },
    {
        id: 'sourdough',
        name: 'نان ساوردو خمیرترش وحشی',
        name_en: 'Wild Ferment Sourdough Loaf',
        category: 'fermented',
        price: 160000,
        weight: '۷۵۰ گرم',
        in_stock: true,
        rating: 5.0,
        reviews_count: 46,
        features: ['شاخص گلیسمی پایین', 'پری‌بیوتیک طبیعی و هضم آسان', 'فاقد مخمر صنعتی'],
        benefits: 'تخمیر لاکتیکی ۴۸ ساعته که گلوتن و اسید فیتیک غلات را شکسته و جذب املاح را چندین برابر می‌کند.',
        usage: 'برش زده و به صورت تست‌شده با روغن زیتون فرابکر، آووکادو یا پنیر ارگانیک میل شود.',
    },
    {
        id: 'lions_mane',
        name: 'پودر عصاره قارچ یال شیر (Lion\'s Mane)',
        name_en: 'Lion\'s Mane Mushroom Extract',
        category: 'mushrooms',
        price: 890000,
        weight: '۱۵۰ گرم عصاره',
        in_stock: true,
        rating: 5.0,
        reviews_count: 34,
        features: ['نوتروپیک طبیعی و افزایش تمرکز', 'محرک سنتز NGF در مغز', 'پشتیبان سیستم عصبی'],
        benefits: 'ماده موثره هریسنون و اریناسین؛ تقویت حافظه کوتاه‌مدت، ترمیم اتصالات عصبی و کاهش مه مغزی (Brain Fog).',
        usage: 'روزانه ۱ قاشق چای‌خوری در قهوه صبحگاهی، چای یا شیک پروتئین حل کنید.',
    },
    {
        id: 'shiitake',
        name: 'قارچ دارویی شیتاکه (خشک و تازه)',
        name_en: 'Medicinal Shiitake Mushrooms',
        category: 'mushrooms',
        price: 520000,
        weight: '۳۰۰ گرم',
        in_stock: true,
        rating: 4.8,
        reviews_count: 22,
        features: ['تقویت سیستم ایمنی', 'منبع غنی بتاگلوکان و ویتامین D', 'طعم دودی و اومامی عالی'],
        benefits: 'حاوی لنتی‌نان با خاصیت اثبات‌شده در فعال‌سازی گلبول‌های سفید و محافظت از سلول‌های کبد.',
        usage: 'در انواع سوپ، خورش‌های گیاهی و تفت‌داده با سبزیجات.',
    },
    {
        id: 'reishi_extract',
        name: 'پودر ارگانیک قارچ ریشی (گانودرما)',
        name_en: 'Organic Reishi Mushroom Extract',
        category: 'mushrooms',
        price: 780000,
        weight: '۱۰۰ گرم عصاره',
        in_stock: true,
        rating: 4.9,
        reviews_count: 29,
        features: ['تعدیل‌کننده استرس (آداپتوژن)', 'بهبود کیفیت خواب عمیق', 'تنظیم‌کننده هورمون کورتیزول'],
        benefits: 'در طب باستانی به «قارچ جاودانگی» معروف است؛ کاهش تنش‌های عصبی و تنظیم سیستم ایمنی.',
        usage: 'نیم ساعت قبل از خواب با یک لیوان شیر گرم گیاهی یا دمنوش بابونه میل شود.',
    },
    {
        id: 'wheatgrass_shot',
        name: 'پودر جوانه‌ریز گندم (ویت‌گرس)',
        name_en: 'Organic Wheatgrass Powder',
        category: 'superfoods',
        price: 340000,
        weight: '۲۰۰ گرم پودر خالص',
        in_stock: true,
        rating: 4.7,
        reviews_count: 17,
        features: ['۷۰٪ کلروفیل زیستی خالص', 'سم‌زدایی عمیق سلولی و خون‌ساز', 'قلیایی‌کننده بدن'],
        benefits: 'شات سلامتی سرشار از آنزیم‌های زنده، منیزیم و ویتامین‌های گروه B برای افزایش سطح انرژی طبیعی بدن.',
        usage: 'یک قاشق چای‌خوری در یک لیوان آب خنک با چند قطره لیموترش تازه ناشتا میل شود.',
    },
    {
        id: 'kale',
        name: 'سبزی کیل فرفری ارگانیک',
        name_en: 'Fresh Organic Curly Kale',
        category: 'superfoods',
        price: 140000,
        weight: '۵۰۰ گرم تازه',
        in_stock: true,
        rating: 4.8,
        reviews_count: 21,
        features: ['سوپرفود برگ سبز تیره', 'چندین برابر کلسیم شیر', 'سرشار از لوتئین و ویتامین K'],
        benefits: 'کشت‌شده در خاک غنی بدون سموم؛ محافظت از سلامت استخوان‌ها و تقویت بینایی.',
        usage: 'مناسب چیپس کیل در فر، سالاد سزار سلامت و اسموتی‌های کلروفیل‌دار.',
    },
];

// Default Sample Orders for immediate demo/admin testing
const INITIAL_ORDERS = [
    {
        id: 'ROS-948122',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        full_name: 'علیرضا شمس',
        email: 'alireza@example.com',
        phone: '09123456789',
        address: 'تهران، سعادت‌آباد، خیابان علامه طباطبایی، پلاک ۲۴',
        city: 'تهران',
        postal_code: '1997812345',
        notes: 'لطفاً عصر تحویل داده شود',
        total_price: 860000,
        status: 'processing',
        items: [
            { id: 'micro_kit_starter', name: 'کیت خانگی کشت میکروگرین رُستارا', price: 680000, quantity: 1, weight: 'پک کامل با ۴ بذر' },
            { id: 'micro_broccoli', name: 'میکروگرین بروکلی تازه', price: 180000, quantity: 1, weight: '۱۰۰ گرم' }
        ]
    },
    {
        id: 'ROS-831205',
        created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
        full_name: 'مهسا کاظمی',
        email: 'mahsa.k@example.com',
        phone: '09351112233',
        address: 'اصفهان، خیابان چهارباغ بالا، مجتمع کوثر',
        city: 'اصفهان',
        postal_code: '8173612345',
        notes: 'کد تخفیف WELCOME10 اعمال شد',
        total_price: 598500,
        status: 'shipped',
        items: [
            { id: 'kombucha', name: 'کامبوچای تخمیری زنجبیل و لیمو', price: 185000, quantity: 2, weight: '۱ لیتر' },
            { id: 'kimchi', name: 'کیمچی ارگانیک دست‌ساز', price: 490000, quantity: 1, weight: '۸۰۰ گرم' }
        ]
    }
];

// Default Coupons
const INITIAL_COUPONS = [
    { code: 'WELCOME10', type: 'percent', value: 10, min_total: 200000, title: '۱۰٪ تخفیف خوش‌آمدگویی' },
    { code: 'ROSTARA20', type: 'percent', value: 20, min_total: 500000, title: '۲۰٪ تخفیف خرید طلایی' },
    { code: 'FREESHIP', type: 'fixed', value: 60000, min_total: 400000, title: 'تخفیف ارسال رایگان' },
    { code: 'HEALTH50', type: 'fixed', value: 50000, min_total: 300000, title: '۵۰,۰۰۰ تومان هدیه سلامت' },
];

// Helper: LocalStorage Loader
function getStorage(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        return fallback;
    }
}

function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('LocalStorage save failed:', e);
    }
}

// Non-blocking Cloud Sync Helper (Never hangs or blocks the UI)
async function syncCloud(fn, ms = 1500) {
    try {
        let timer;
        const timeout = new Promise((_, reject) => {
            timer = setTimeout(() => reject(new Error('Timeout')), ms);
        });
        const res = await Promise.race([fn(), timeout]);
        clearTimeout(timer);
        return res;
    } catch {
        return null;
    }
}

// ---------------------------------------------------------------------
// DATABASE CONTROLLER
// ---------------------------------------------------------------------
export const db = {
    // ---------------- PRODUCTS ----------------
    products: {
        getAll: async () => {
            let local = getStorage(STORAGE_KEYS.PRODUCTS, null);
            if (!local || local.length === 0) {
                local = INITIAL_PRODUCTS;
                setStorage(STORAGE_KEYS.PRODUCTS, local);
            }

            // Background non-blocking sync with Supabase
            syncCloud(async () => {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('in_stock', true);
                if (!error && data && data.length > 0) {
                    setStorage(STORAGE_KEYS.PRODUCTS, data);
                }
            });

            return local;
        },

        getById: async (id) => {
            const all = await db.products.getAll();
            return all.find(p => p.id === id) || null;
        },

        save: async (product) => {
            const all = await db.products.getAll();
            const index = all.findIndex(p => p.id === product.id);
            let updated;
            if (index >= 0) {
                updated = [...all];
                updated[index] = { ...updated[index], ...product };
            } else {
                updated = [product, ...all];
            }
            setStorage(STORAGE_KEYS.PRODUCTS, updated);

            // Attempt cloud sync in background
            syncCloud(() => supabase.from('products').upsert(product));
            return product;
        },

        delete: async (id) => {
            const all = await db.products.getAll();
            const filtered = all.filter(p => p.id !== id);
            setStorage(STORAGE_KEYS.PRODUCTS, filtered);
            syncCloud(() => supabase.from('products').delete().eq('id', id));
            return true;
        },

        resetToDefault: () => {
            setStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
            return INITIAL_PRODUCTS;
        }
    },

    // ---------------- ORDERS ----------------
    orders: {
        getAll: async () => {
            let local = getStorage(STORAGE_KEYS.ORDERS, null);
            if (!local || local.length === 0) {
                local = INITIAL_ORDERS;
                setStorage(STORAGE_KEYS.ORDERS, local);
            }

            // Background non-blocking sync with Supabase
            syncCloud(async () => {
                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (!error && data && data.length > 0) {
                    const formatted = data.map(o => ({
                        id: o.id.startsWith('ROS-') ? o.id : ('ROS-' + o.id.substring(0, 6).toUpperCase()),
                        created_at: o.created_at,
                        full_name: o.full_name,
                        email: o.email,
                        phone: o.phone,
                        address: o.address,
                        city: o.city,
                        postal_code: o.postal_code,
                        notes: o.notes,
                        total_price: o.total_price,
                        status: o.status,
                        items: o.items || []
                    }));
                    setStorage(STORAGE_KEYS.ORDERS, formatted);
                }
            });

            return local;
        },

        getById: async (idOrTracking) => {
            const all = await db.orders.getAll();
            const cleanQuery = idOrTracking.trim().toUpperCase();
            return all.find(o => 
                o.id.toUpperCase() === cleanQuery || 
                (o.phone && o.phone.includes(idOrTracking.trim()))
            ) || null;
        },

        create: async (orderData) => {
            const orderId = 'ROS-' + Math.floor(100000 + Math.random() * 900000);
            const newOrder = {
                id: orderId,
                created_at: new Date().toISOString(),
                status: 'pending',
                ...orderData
            };

            const existing = await db.orders.getAll();
            const updated = [newOrder, ...existing];
            setStorage(STORAGE_KEYS.ORDERS, updated);

            // Attempt cloud sync in background
            syncCloud(() => supabase.from('orders').insert([
                {
                    full_name: newOrder.full_name,
                    email: newOrder.email || null,
                    phone: newOrder.phone,
                    address: newOrder.address,
                    city: newOrder.city,
                    postal_code: newOrder.postal_code || null,
                    notes: newOrder.notes || '',
                    total_price: newOrder.total_price,
                    items: newOrder.items,
                    status: 'pending'
                }
            ]));

            return newOrder;
        },

        updateStatus: async (orderId, newStatus) => {
            const all = await db.orders.getAll();
            const index = all.findIndex(o => o.id === orderId);
            if (index >= 0) {
                all[index].status = newStatus;
                setStorage(STORAGE_KEYS.ORDERS, all);
                syncCloud(() => supabase.from('orders').update({ status: newStatus }).eq('id', orderId));
                return all[index];
            }
            return null;
        },

        delete: async (orderId) => {
            const all = await db.orders.getAll();
            const filtered = all.filter(o => o.id !== orderId);
            setStorage(STORAGE_KEYS.ORDERS, filtered);
            return true;
        }
    },

    // ---------------- CONTACT MESSAGES ----------------
    messages: {
        getAll: async () => {
            let local = getStorage(STORAGE_KEYS.MESSAGES, []);
            syncCloud(async () => {
                const { data, error } = await supabase
                    .from('contact_messages')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (!error && data && data.length > 0) {
                    setStorage(STORAGE_KEYS.MESSAGES, data);
                }
            });
            return local;
        },

        create: async (msgData) => {
            const newMsg = {
                id: Date.now(),
                created_at: new Date().toISOString(),
                status: 'unread',
                ...msgData
            };
            const all = await db.messages.getAll();
            const updated = [newMsg, ...all];
            setStorage(STORAGE_KEYS.MESSAGES, updated);

            syncCloud(() => supabase.from('contact_messages').insert([newMsg]));
            return newMsg;
        },

        markRead: async (id) => {
            const all = await db.messages.getAll();
            const item = all.find(m => m.id === id);
            if (item) {
                item.status = 'read';
                setStorage(STORAGE_KEYS.MESSAGES, all);
            }
            return true;
        },

        delete: async (id) => {
            const all = await db.messages.getAll();
            const filtered = all.filter(m => m.id !== id);
            setStorage(STORAGE_KEYS.MESSAGES, filtered);
            return true;
        }
    },

    // ---------------- COUPONS ----------------
    coupons: {
        getAll: () => {
            return getStorage(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
        },

        validate: (code, subtotal) => {
            if (!code) return { valid: false, message: 'کد تخفیف را وارد کنید' };
            const coupons = db.coupons.getAll();
            const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());

            if (!found) {
                return { valid: false, message: 'کد تخفیف نامعتبر است' };
            }

            if (found.min_total && subtotal < found.min_total) {
                const formattedMin = new Intl.NumberFormat('fa-IR').format(found.min_total);
                return { valid: false, message: `حداقل مبلغ خرید برای این کد ${formattedMin} تومان است` };
            }

            let discountAmount = 0;
            if (found.type === 'percent') {
                discountAmount = Math.round((subtotal * found.value) / 100);
            } else {
                discountAmount = found.value;
            }

            return {
                valid: true,
                coupon: found,
                discount: discountAmount,
                message: `کد تخفیف اعمال شد: ${found.title}`
            };
        }
    },

    // ---------------- REVIEWS ----------------
    reviews: {
        getByProduct: (productId) => {
            const allReviews = getStorage(STORAGE_KEYS.REVIEWS, {});
            return allReviews[productId] || [
                {
                    id: 1,
                    author: 'سارا رضایی',
                    rating: 5,
                    date: '۳ روز پیش',
                    comment: 'کیفیت و تر و تازگی میکروگرین‌ها واقعا عالی بود. طعم فوق‌العاده‌ای به سالادهامون میده!'
                },
                {
                    id: 2,
                    author: 'پرهام ناصری',
                    rating: 5,
                    date: '۱ هفته پیش',
                    comment: 'کیت رو خریدم و دقیقاً بعد از یک هفته برداشت کردم. بچه‌ها کلی لذت بردن از دیدن رشد گیاه.'
                }
            ];
        },

        add: (productId, review) => {
            const allReviews = getStorage(STORAGE_KEYS.REVIEWS, {});
            const list = allReviews[productId] || [];
            const newRev = {
                id: Date.now(),
                date: 'امروز',
                ...review
            };
            allReviews[productId] = [newRev, ...list];
            setStorage(STORAGE_KEYS.REVIEWS, allReviews);
            return newRev;
        }
    },

    // ---------------- STATS & ANALYTICS ----------------
    stats: {
        getOverview: async () => {
            const [orders, messages, products] = await Promise.all([
                db.orders.getAll(),
                db.messages.getAll(),
                db.products.getAll(),
            ]);

            const totalRevenue = orders
                .filter(o => o.status !== 'cancelled')
                .reduce((acc, o) => acc + (Number(o.total_price) || 0), 0);

            const pendingOrders = orders.filter(o => o.status === 'pending').length;
            const unreadMessages = messages.filter(m => m.status === 'unread').length;

            return {
                totalRevenue,
                totalOrders: orders.length,
                pendingOrders,
                unreadMessages,
                productsCount: products.length,
            };
        }
    }
};
