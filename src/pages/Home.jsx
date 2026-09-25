import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    Leaf, 
    Sprout, 
    Sparkles, 
    Package, 
    ShieldCheck, 
    HeartPulse,
    Activity,
    Dna,
    Layers,
    ArrowUpRight,
    Check,
    HelpCircle
} from 'lucide-react';
import { GridBackground } from '@/components/backgrounds/grid';
import { TextShimmer } from '@/components/animations/text-shimmer';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { ShineButton } from '@/components/animations/shine-button';
import { Stat } from '@/components/ui/stat';
import { Accordion } from '@/components/ui/accordion';

const Home = () => {
    const { t } = useTranslation();

    // Seed-style Specimen Products
    const specimens = [
        {
            code: 'BIO-MG01',
            name: 'میکروگرین بروکلی تازه',
            scientificName: 'Brassica oleracea var. italica',
            potencyBadge: 'سولفورافان تا ۵۰×',
            desc: 'غنی‌ترین تراکم زیستی گلوکورافانین در جهان؛ تبدیل آنزیمی سریع به سولفورافان خالص برای پاکسازی رادیکال‌های آزاد و محافظت از سلول‌های خاکستری مغز.',
            metrics: [
                { label: 'دوره جوانه', val: '۷ روز' },
                { label: 'روش کشت', val: 'سلولزی هیدروپونیک' },
                { label: 'خلوص', val: '۱۰۰٪ عاری از سم' }
            ],
            icon: Sprout
        },
        {
            code: 'KIT-HK04',
            name: 'کیت خانگی کشت ۷ روزه',
            scientificName: 'Automated Urban Micro-Farm',
            potencyBadge: 'سیستم زهکشی دو‌طبقه',
            desc: 'مهندسی اختصاصی برای بازتولید اقلیم بهینه جوانه‌زنی در محیط بسته آپارتمان؛ همراه با پدهای زیست‌تخریب‌پذیر و ۴ واریته بذر دیم غیرتراریخته.',
            metrics: [
                { label: 'زمان تا برداشت', val: '۷ تا ۱۰ روز' },
                { label: 'ظرفیت', val: '۴ کشت متوالی' },
                { label: 'نگهداری', val: 'فقط آب تصفیه' }
            ],
            icon: Package
        },
        {
            code: 'FERM-KB21',
            name: 'کامبوچای زنجبیل و لیمو',
            scientificName: 'Symbiotic Ferment Matrix',
            potencyBadge: 'پروبیوتیک زنده فعال',
            desc: 'تخمیر سنتی ۲۱ روزه چای سبز و سیاه با کشت همزیست باکتری و مخمر (SCOBY)؛ سرشار از اسید گلوکونیک و باکتری‌های مفید استیک برای احیای میکروبیوم روده.',
            metrics: [
                { label: 'مدت تخمیر', val: '۲۱ روز سنتی' },
                { label: 'گازدار', val: 'تخمیر طبیعی' },
                { label: 'شکر افزوده', val: 'صفر' }
            ],
            icon: Sparkles
        }
    ];

    // Seed Biological Comparison Matrix
    const clinicalComparison = [
        {
            num: '۰۱',
            title: 'زیست‌دسترسی و جذب آنزیمی',
            subtitle: 'Cellular Bioavailability',
            rostara: 'جذب مستقیم و هم‌افزا از طریق ماتریکس کامل گیاهی بدون نیاز به فرآوری کبد',
            synthetic: 'دفع بیش از ۸۰٪ املاح و ویتامین‌های سنتتیک شیمیایی پیش از ورود به بافت سلولی'
        },
        {
            num: '۰۲',
            title: 'سولفورافان و آنتی‌اکسیدان‌های فعال',
            subtitle: 'Phase II Enzyme Induction',
            rostara: 'آنزیم میروزیناز زنده برای تبدیل کامل گلوکورافانین به مولکول محافظ DNA',
            synthetic: 'از بین رفتن آنزیم‌های فعال در فرآیندهای خشک‌کردن صنعتی و حرارتی مکمل‌ها'
        },
        {
            num: '۰۳',
            title: 'تنوع اکوسیستم میکروبیوم',
            subtitle: 'Living Symbiotic Flora',
            rostara: 'میلیاردها میکروارگانیسم زنده و پایدار که با مخاط گوارش انسان سازگارند',
            synthetic: 'کپسول‌های لیوفیلیزه که بخش عمده آنها در اسید معده از بین می‌روند'
        },
        {
            num: '۰۴',
            title: 'پایداری بوم‌شناختی و زنجیره سرد',
            subtitle: 'Zero-Distance Freshness',
            rostara: 'صفر کیلومتر فاصله از بستر رویش تا سفره؛ بالاترین غلظت ویتامین در لحظه چیدن',
            synthetic: 'ماهها ماندگی در انبارهای توزیع، اکسیداسیون و افت شدید ارزش بیولوژیک'
        }
    ];

    // Scientific FAQ items for VibeFarsi Accordion
    const faqItems = [
        {
            id: 'faq-1',
            title: 'سولفورافان چیست و چرا میکروگرین بروکلی قوی‌ترین منبع آن است؟',
            content: 'سولفورافان یک ترکیب ایزوتیوسیانات ارگانیک است که باعث فعال شدن مسیر Nrf2 در سلول‌ها می‌شود؛ این مسیر قوی‌ترین سیستم آنتی‌اکسیدانی درونی بدن را تحریک می‌کند. در میکروگرین بروکلی ۷ روزه، غلظت پیش‌ساز این ماده تا ۵۰ برابر بروکلی بالغ پخته‌شده است.'
        },
        {
            id: 'faq-2',
            title: 'کیت کشت خانگی رُستارا چگونه بدون نیاز به نور مستقیم آفتاب کار می‌کند؟',
            content: 'میکروگرین‌ها در فاز اول انرژی خود را از آندوسپرم بذر تامین می‌کنند. سینی دوطبقه رُستارا سیستم زهکشی خودکار دارد و برای فتوسنتز نهایی فقط به نور ملایم پنجره یا نور معمول آپارتمان نیاز دارد؛ بدون نیاز به خاک، کود یا ابزار پیچیده.'
        },
        {
            id: 'faq-3',
            title: 'تفاوت کامبوچای تخمیری زنده رُستارا با نوشیدنی‌های صنعتی چیست؟',
            content: 'کامبوچای رُستارا پاستوریزه نمی‌شود؛ به این معنا که باکتری‌های اسید استیک و پروبیوتیک‌های طبیعی آن زنده و فعال هستند و گاز آن حاصل تخمیر زیستی است، نه تزریق گاز دی‌اکسید کربن صنعتی.'
        },
        {
            id: 'faq-4',
            title: 'ارسال بسته‌ها و زمان تحویل به چه صورت است؟',
            content: 'کیت‌ها و بذرهای ارگانیک به سراسر کشور با پست پیشتاز ارسال می‌شوند. محصولات تازه و زنده نیز در بسته‌بندی‌های عایق رطوبت و تنفس‌پذیر جهت حفظ شادابی سلولی ارسال می‌گردند.'
        }
    ];

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-charcoal dark:text-seed-snow transition-colors duration-500 font-sans">
            
            {/* HERO SECTION (Seed.com Clinical Botanical with VibeFarsi Grid & Shimmer) */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-seed-forest/10 dark:border-white/10 overflow-hidden">
                {/* VibeFarsi Grid Background */}
                <GridBackground size={52} className="opacity-40 dark:opacity-20" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Science Eyebrow Tag with VibeFarsi TextShimmer */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="badge-lime">
                            <span className="w-1.5 h-1.5 rounded-full bg-seed-forest animate-pulse" />
                            BIO-NUTRITION
                        </span>
                        <TextShimmer className="label-persian">
                            پلتفرم زیست‌پایدار کشاورزی شهری و غذای زنده • رُستارا
                        </TextShimmer>
                    </div>

                    {/* Architectural Editorial Headline */}
                    <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
                        <div className="lg:col-span-8">
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-normal leading-[1.22] text-seed-forest dark:text-seed-snow">
                                هوشِ بیولوژیک گیاه، <br />
                                <span className="font-light italic text-seed-sage dark:text-seed-lime">
                                    تغذیهٔ زنده برای سلول.
                                </span>
                            </h1>
                        </div>
                        <div className="lg:col-span-4 text-seed-pewter dark:text-seed-snow/70 text-sm sm:text-base leading-relaxed pb-2 font-normal">
                            رُستارا حلقهٔ مفقوده میان سلامتی انسان و خاک است؛ توسعهٔ کشت خانگی میکروگرین‌ها و فرآورده‌های پروبیوتیک زنده بدون فرآیندهای شیمیایی و نگهدارنده‌های صنعتی.
                        </div>
                    </div>

                    {/* Action Bar & Key Metrics */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-seed-forest/10 dark:border-white/10">
                        <Link to="/products">
                            <ShineButton className="btn-seed flex items-center justify-center gap-2">
                                <span>مشاهده کاتالوگ زیستی</span>
                                <ArrowLeft className="w-4 h-4" />
                            </ShineButton>
                        </Link>
                        
                        <Link
                            to="/method"
                            className="btn-seed-outline flex items-center justify-center gap-2"
                        >
                            <span>راهنمای رویش خانگی</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>

                        <div className="hidden md:flex items-center gap-6 mr-auto text-xs text-seed-pewter dark:text-seed-snow/70 font-normal">
                            <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-seed-forest dark:text-seed-lime" />
                                بذرهای ۱۰۰٪ غیرتراریخته
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-seed-forest dark:text-seed-lime" />
                                برداشت در ۷ روز
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* NUMERICAL DATA TICKER (VibeFarsi Stat Components) */}
            <section className="bg-seed-stone/40 dark:bg-seed-forest/20 border-b border-seed-forest/10 dark:border-white/10 py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Stat 
                            label="تراکم سولفورافان بروکلی"
                            value="۵۰"
                            unit="برابر برگ بالغ"
                            delta={42}
                            deltaLabel="غلظت گلوکورافانین"
                        />
                        <Stat 
                            label="زمان تا برداشت خانگی"
                            value="۷"
                            unit="روز در آپارتمان"
                            delta={85}
                            deltaLabel="سرعت رویش سلولزی"
                        />
                        <Stat 
                            label="خلوص بیولوژیک بذرها"
                            value="۱۰۰٪"
                            unit="عاری از سموم"
                        />
                        <Stat 
                            label="تخمیر سنتی زنده"
                            value="۲۱"
                            unit="روز فرآوری طبیعی"
                            delta={100}
                            deltaLabel="پروبیوتیک پایدار"
                        />
                    </div>
                </div>
            </section>

            {/* SPECIMEN SHOWCASE (Wrapped with VibeFarsi SpotlightCard) */}
            <section className="py-24 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
                        <div>
                            <span className="label-mono mb-2 block">CATALOGUE • نمونه‌های فعال زیستی</span>
                            <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow">
                                گیاهان ریزمقیاس و محصولات زنده
                            </h2>
                        </div>
                        <Link 
                            to="/products"
                            className="inline-flex items-center gap-1 text-xs font-bold text-seed-forest dark:text-seed-lime hover:underline"
                        >
                            <span>مشاهده تمام ۱۶ محصول</span>
                            <ArrowLeft className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* 3 Specimen Cards with Spotlight Effect */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {specimens.map((item, idx) => {
                            const IconC = item.icon;
                            return (
                                <SpotlightCard key={idx} className="h-full">
                                    <div className="p-6 flex flex-col justify-between h-full">
                                        <div>
                                            {/* Card Meta Bar */}
                                            <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-seed-forest/10 dark:border-white/10">
                                                <span className="font-mono text-[11px] font-bold text-seed-pewter dark:text-seed-snow/50 tracking-wider">
                                                    [{item.code}]
                                                </span>
                                                <span className="badge-lime text-[10px]">
                                                    {item.potencyBadge}
                                                </span>
                                            </div>

                                            {/* Visual Icon Container */}
                                            <div className="w-12 h-12 rounded-xl bg-seed-stone dark:bg-white/5 flex items-center justify-center text-seed-forest dark:text-seed-lime mb-5">
                                                <IconC className="w-6 h-6" />
                                            </div>

                                            <h3 className="text-xl font-display font-bold text-seed-forest dark:text-seed-snow mb-1">
                                                {item.name}
                                            </h3>
                                            <p className="font-mono text-xs text-seed-sage dark:text-seed-snow/50 italic mb-4">
                                                {item.scientificName}
                                            </p>

                                            <p className="text-xs text-seed-pewter dark:text-seed-snow/80 leading-relaxed mb-6 font-normal">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <div>
                                            {/* Clinical Metrics Specs */}
                                            <div className="space-y-2 py-4 border-t border-seed-forest/10 dark:border-white/10 text-[11px] font-mono">
                                                {item.metrics.map((m, mi) => (
                                                    <div key={mi} className="flex justify-between text-seed-pewter dark:text-seed-snow/60">
                                                        <span>{m.label}:</span>
                                                        <span className="font-bold text-seed-forest dark:text-seed-snow">{m.val}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                to="/products"
                                                className="mt-2 w-full py-2.5 rounded-pill bg-seed-stone dark:bg-white/10 hover:bg-seed-forest hover:text-seed-snow dark:hover:bg-seed-lime dark:hover:text-seed-forest text-seed-forest dark:text-seed-snow text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <span>بررسی و ثبت سفارش</span>
                                                <ArrowLeft className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SEED BIOLOGICAL COMPARISON MATRIX (Clinical Superiority) */}
            <section className="py-24 bg-seed-stone/40 dark:bg-seed-forestDeep/40 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="max-w-2xl mb-16 text-right">
                        <span className="label-mono mb-2 block">SCIENTIFIC PROOF • برتری بیولوژیک</span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow mb-4">
                            تفاوت غذای زیست‌فعال با مکمل‌های شیمیایی
                        </h2>
                        <p className="text-sm text-seed-pewter dark:text-seed-snow/70 leading-relaxed">
                            چرا زیست‌شناسی انسان مولکول‌های گیاهی استخراج‌شده در ماتریکس طبیعی را به ویتامین‌ها و قرص‌های آزمایشگاهی ترجیح می‌دهد؟
                        </p>
                    </div>

                    {/* Comparison Grid */}
                    <div className="space-y-4">
                        {clinicalComparison.map((comp, ci) => (
                            <div 
                                key={ci}
                                className="seed-card p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-center"
                            >
                                <div className="md:col-span-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-xs font-bold text-seed-sage dark:text-seed-lime">{comp.num}</span>
                                        <h3 className="text-base sm:text-lg font-bold text-seed-forest dark:text-seed-snow">
                                            {comp.title}
                                        </h3>
                                    </div>
                                    <span className="font-mono text-xs text-seed-pewter dark:text-seed-snow/50 italic">
                                        {comp.subtitle}
                                    </span>
                                </div>

                                <div className="md:col-span-4 bg-seed-snow dark:bg-seed-forest/50 p-4 rounded-xl border border-seed-forest/10 dark:border-white/10">
                                    <span className="text-[10px] font-mono font-bold uppercase text-seed-forest dark:text-seed-lime block mb-1">
                                        [ رُستارا: گیاه زنده ]
                                    </span>
                                    <p className="text-xs text-seed-forest dark:text-seed-snow font-medium leading-relaxed">
                                        {comp.rostara}
                                    </p>
                                </div>

                                <div className="md:col-span-4 bg-seed-stone/60 dark:bg-white/5 p-4 rounded-xl border border-seed-forest/5 dark:border-white/5">
                                    <span className="text-[10px] font-mono font-bold uppercase text-seed-pewter dark:text-seed-snow/40 block mb-1">
                                        [ مکمل‌های صنعتی و کپسول ]
                                    </span>
                                    <p className="text-xs text-seed-pewter dark:text-seed-snow/60 leading-relaxed">
                                        {comp.synthetic}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIBEFARSI SCIENTIFIC ACCORDION (Interactive FAQ) */}
            <section className="py-24 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
                    
                    <div className="mb-12">
                        <span className="label-mono mb-2 block">KNOWLEDGE BASE • پرسش‌های علمی و فنی</span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow mb-3">
                            پاسخ به پرسش‌های متداول کشت و سلامت
                        </h2>
                        <p className="text-sm text-seed-pewter dark:text-seed-snow/70">
                            اطلاعات کاربردی پیرامون نگهداری کیت‌ها، ارزش بیولوژیک جوانه‌ها و شیوه مصرف سوپرفودها
                        </p>
                    </div>

                    <Accordion items={faqItems} multiple defaultOpen={['faq-1']} />
                </div>
            </section>

            {/* THE ROSTARA CHARTER (Seed-style Peer-Reviewed Manifesto) */}
            <section className="py-24 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
                    
                    <div className="border-b border-seed-forest/10 dark:border-white/10 pb-6 mb-8 flex items-center justify-between">
                        <span className="label-mono">
                            ROSTARA CHARTER • منشور زیست‌پایدار
                        </span>
                        <span className="font-mono text-xs text-seed-pewter dark:text-seed-snow/60">
                            نسخهٔ رسمی ۱۴۰۵
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-seed-forest dark:text-seed-snow mb-6 leading-snug">
                        ما باور داریم که بدن انسان برای مصرف مواد نگه‌دارنده و مولکول‌های سنتتیک فرآوری‌شده طراحی نشده است.
                    </h2>

                    <div className="space-y-6 text-sm text-seed-pewter dark:text-seed-snow/80 leading-relaxed font-normal">
                        <p>
                            میکروگرین‌ها، محصولات تخمیری زنده و قارچ‌های دارویی، غذاهای زودگذر ترند اینترنت نیستند؛ آنها کهن‌ترین فناوری حیات برای بقا، خودترمیمی سلولی و پاکسازی بافت‌های زنده هستند. وقتی گیاه در سن ۷ تا ۱۰ روزگی مصرف می‌شود، قوی‌ترین پاسخ سازگاری زیستی را در متابولیسم ایجاد می‌کند.
                        </p>
                        <p>
                            هدف رُستارا رساندن ابزار باغبانی علمی به آشپزخانه‌هاست تا وابستگی به زنجیره‌های غذایی متمرکز و انبارهای تجاری کاهش یابد و هر فرد بتواند تازه‌ترین سوپرفودهای طبیعی را با کمترین هزینه و در بالاترین خلوص زیستی برداشت کند.
                        </p>
                    </div>

                    <div className="pt-8 mt-8 border-t border-seed-forest/10 dark:border-white/10 flex items-center justify-between text-xs text-seed-pewter dark:text-seed-snow/60 font-mono">
                        <span>بنیان‌گذاری: رُستارا (محیط زیست‌پایدار)</span>
                        <span>پلتفرم ثبت شده rostara.ir</span>
                    </div>
                </div>
            </section>

            {/* SEED STYLE FOOTER CTA (Deep Forest Section with VibeFarsi ShineButton) */}
            <section className="py-20 bg-seed-forest text-seed-snow relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    
                    <span className="inline-block px-3 py-1 rounded-full bg-seed-lime text-seed-forest text-xs font-bold mb-6">
                        شروع پرورش در خانه
                    </span>
                    
                    <h2 className="text-3xl sm:text-5xl font-display font-black mb-6 tracking-normal leading-snug">
                        اولین مزرعهٔ زیستی خود را در آپارتمان برپا کنید.
                    </h2>
                    
                    <p className="text-sm sm:text-base text-seed-snow/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                        کیت کامل کشت خانگی همراه با ۴ نوع بذر غیرتراریخته و پدهای سلولزی زیست‌تخریب‌پذیر؛ تحویل فوری با ضمانت جوانه‌زنی در سراسر کشور.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/products">
                            <ShineButton className="px-9 py-4 rounded-pill bg-seed-lime hover:bg-seed-limeHover text-seed-forest font-bold text-sm tracking-normal transition-all shadow-md active:scale-[0.98] flex items-center gap-2">
                                <span>سفارش کیت کشت خانگی</span>
                                <ArrowLeft className="w-4 h-4" />
                            </ShineButton>
                        </Link>
                        
                        <Link
                            to="/method"
                            className="px-9 py-4 rounded-pill bg-transparent hover:bg-white/10 text-seed-snow font-bold text-sm border border-white/20 transition-all active:scale-[0.98]"
                        >
                            مشاهده روش کشت ۷ روزه
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
