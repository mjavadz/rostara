import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    ArrowRight,
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
import { TaxonomyTag } from '@/components/ui/TaxonomyTag';

const Home = () => {
    const { t, i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

    // Seed-style Specimen Products
    const specimens = [
        {
            code: isEn ? 'Bio-Specimen 01' : 'نمونه زیستی ۰۱',
            name: isEn ? 'Fresh Broccoli Microgreens' : 'میکروگرین بروکلی تازه',
            scientificName: 'Brassica oleracea var. italica',
            potencyBadge: isEn ? 'Sulforaphane up to 50×' : 'سولفورافان تا ۵۰×',
            desc: isEn 
                ? 'Earth’s richest known concentration of glucoraphanin; enzymatic activation directly yields cellular sulforaphane to neutralize reactive oxidative species and protect neurons.'
                : 'غنی‌ترین تراکم زیستی گلوکورافانین در جهان؛ تبدیل آنزیمی سریع به سولفورافان خالص برای پاکسازی رادیکال‌های آزاد و محافظت از سلول‌های خاکستری مغز.',
            metrics: [
                { label: isEn ? 'Sprout Cycle' : 'دوره جوانه', val: isEn ? '7 Days' : '۷ روز' },
                { label: isEn ? 'Growth SOP' : 'روش کشت', val: isEn ? 'Hydro-Cellulose' : 'سلولزی هیدروپونیک' },
                { label: isEn ? 'Purity' : 'خلوص', val: isEn ? '100% Non-Toxic' : '۱۰۰٪ عاری از سم' }
            ],
            icon: Sprout
        },
        {
            code: isEn ? 'Growth Kit 04' : 'کیت رویش ۰۴',
            name: isEn ? '7-Day Home Cultivation Kit' : 'کیت خانگی کشت ۷ روزه',
            scientificName: isEn ? 'Soilless Bio-Cultivation Unit' : 'سازهٔ کشت زیستی بدون خاک',
            potencyBadge: isEn ? 'Dual-Tier Drainage System' : 'سیستم زهکشی دو‌طبقه',
            desc: isEn 
                ? 'Precision micro-climate engineering for apartment windowsills; includes self-aerating trays, biodegradable cellulose pads, and 4 heirloom untreated seed varieties.'
                : 'مهندسی اختصاصی برای بازتولید اقلیم بهینه جوانه‌زنی در محیط بسته آپارتمان؛ همراه با پدهای زیست‌تخریب‌پذیر و ۴ واریته بذر دیم غیرتراریخته.',
            metrics: [
                { label: isEn ? 'Harvest Time' : 'زمان تا برداشت', val: isEn ? '7 to 10 Days' : '۷ تا ۱۰ روز' },
                { label: isEn ? 'Capacity' : 'ظرفیت', val: isEn ? '4 Successive Batches' : '۴ کشت متوالی' },
                { label: isEn ? 'Nutrient Feed' : 'نگهداری', val: isEn ? 'Pure Water Only' : 'فقط آب تصفیه' }
            ],
            icon: Package
        },
        {
            code: isEn ? 'Living Ferment 21' : 'فرآورده تخمیر ۲۱',
            name: isEn ? 'Ginger-Lemon Living Kombucha' : 'کامبوچای زنجبیل و لیمو',
            scientificName: isEn ? 'Symbiotic Live Bacteria & Yeast Matrix' : 'تخمیر هم‌زیست باکتری و مخمر زنده',
            potencyBadge: isEn ? 'Active Living Probiotic' : 'پروبیوتیک زنده فعال',
            desc: isEn 
                ? 'Raw 21-day botanical fermentation of organic tea with living symbiotic cultures (SCOBY); rich in gluconic acid and beneficial acetic flora to nurture gut microbiome.'
                : 'تخمیر سنتی ۲۱ روزه چای سبز و سیاه با کشت همزیست باکتری و مخمر (SCOBY)؛ سرشار از اسید گلوکونیک و باکتری‌های مفید استیک برای احیای میکروبیوم روده.',
            metrics: [
                { label: isEn ? 'Fermentation' : 'مدت تخمیر', val: isEn ? '21 Days Aged' : '۲۱ روز سنتی' },
                { label: isEn ? 'Carbonation' : 'گازدار', val: isEn ? '100% Bio-Effervescent' : 'تخمیر طبیعی' },
                { label: isEn ? 'Added Sugar' : 'شکر افزوده', val: isEn ? 'Zero' : 'صفر' }
            ],
            icon: Sparkles
        }
    ];

    // Seed Biological Comparison Matrix
    const clinicalComparison = [
        {
            num: isEn ? '01' : '۰۱',
            title: isEn ? 'Cellular Bioavailability & Absorption' : 'زیست‌دسترسی و جذب آنزیمی',
            subtitle: 'Cellular Bioavailability',
            rostara: isEn 
                ? 'Whole-plant bioactive matrix enables direct uptake without hepatic burden or breakdown.'
                : 'جذب مستقیم و هم‌افزا از طریق ماتریکس کامل گیاهی بدون نیاز به فرآوری کبد',
            synthetic: isEn 
                ? 'Over 80% of synthetic isolates are excreted before penetrating cellular membranes.'
                : 'دفع بیش از ۸۰٪ املاح و ویتامین‌های سنتتیک شیمیایی پیش از ورود به بافت سلولی'
        },
        {
            num: isEn ? '02' : '۰۲',
            title: isEn ? 'Sulforaphane & Active Phase II Enzymes' : 'سولفورافان و آنتی‌اکسیدان‌های فعال',
            subtitle: 'Phase II Enzyme Induction',
            rostara: isEn 
                ? 'Native intact myrosinase enzyme dynamically catalyzes glucoraphanin into cell-protective molecules.'
                : 'آنزیم میروزیناز زنده برای تبدیل کامل گلوکورافانین به مولکول محافظ DNA',
            synthetic: isEn 
                ? 'Heat and spray-drying completely denature fragile enzymes in commercial supplements.'
                : 'از بین رفتن آنزیم‌های فعال در فرآیندهای خشک‌کردن صنعتی و حرارتی مکمل‌ها'
        },
        {
            num: isEn ? '03' : '۰۳',
            title: isEn ? 'Living Flora & Microbiome Diversity' : 'تنوع اکوسیستم میکروبیوم',
            subtitle: 'Living Symbiotic Flora',
            rostara: isEn 
                ? 'Billions of viable, resilient probiotic strains synchronized with human digestive tract mucosa.'
                : 'میلیاردها میکروارگانیسم زنده و پایدار که با مخاط گوارش انسان سازگارند',
            synthetic: isEn 
                ? 'Lyophilized pill cultures suffer massive mortality upon exposure to gastric acidity.'
                : 'کپسول‌های لیوفیلیزه که بخش عمده آنها در اسید معده از بین می‌روند'
        },
        {
            num: isEn ? '04' : '۰۴',
            title: isEn ? 'Zero-Distance Freshness & Cold-Chain' : 'پایداری بوم‌شناختی و زنجیره سرد',
            subtitle: 'Zero-Distance Freshness',
            rostara: isEn 
                ? 'Zero meters from windowsill to fork; peak enzyme concentrations preserved at moment of clipping.'
                : 'صفر کیلومتر فاصله از بستر رویش تا سفره؛ بالاترین غلظت ویتامین در لحظه چیدن',
            synthetic: isEn 
                ? 'Months in distribution warehouses causing oxidation, degradation, and severe nutrient decline.'
                : 'ماهها ماندگی در انبارهای توزیع، اکسیداسیون و افت شدید ارزش بیولوژیک'
        }
    ];

    // Scientific FAQ items for VibeFarsi Accordion
    const faqItems = [
        {
            id: 'faq-1',
            title: isEn 
                ? 'What is Sulforaphane and why are broccoli microgreens its richest source?' 
                : 'سولفورافان چیست و چرا میکروگرین بروکلی قوی‌ترین منبع آن است؟',
            content: isEn 
                ? 'Sulforaphane is a potent isothiocyanate organosulfur compound that triggers the cellular Nrf2 pathway—the master regulator of antioxidant cytoprotection. In 7-day broccoli microgreens, the precursor concentration is up to 50 times higher than in mature cooked broccoli.'
                : 'سولفورافان یک ترکیب ایزوتیوسیانات ارگانیک است که باعث فعال شدن مسیر Nrf2 در سلول‌ها می‌شود؛ این مسیر قوی‌ترین سیستم آنتی‌اکسیدانی درونی بدن را تحریک می‌کند. در میکروگرین بروکلی ۷ روزه، غلظت پیش‌ساز این ماده تا ۵۰ برابر بروکلی بالغ پخته‌شده است.'
        },
        {
            id: 'faq-2',
            title: isEn 
                ? 'How does Rostara’s home kit grow microgreens without direct sunlight?' 
                : 'کیت کشت خانگی رُستارا چگونه بدون نیاز به نور مستقیم آفتاب کار می‌کند؟',
            content: isEn 
                ? 'During their initial days, young shoots derive primary metabolic energy from seed endosperm reserves. Rostara’s dual-tier tray provides automated drainage and aeration, requiring only gentle indirect ambient room light for final chlorophyll synthesis.'
                : 'میکروگرین‌ها در فاز اول انرژی خود را از آندوسپرم بذر تامین می‌کنند. سینی دوطبقه رُستارا سیستم زهکشی خودکار دارد و برای فتوسنتز نهایی فقط به نور ملایم پنجره یا نور معمول آپارتمان نیاز دارد؛ بدون نیاز به خاک، کود یا ابزار پیچیده.'
        },
        {
            id: 'faq-3',
            title: isEn 
                ? 'How is raw living Kombucha different from commercial soft drinks?' 
                : 'تفاوت کامبوچای تخمیری زنده رُستارا با نوشیدنی‌های صنعتی چیست؟',
            content: isEn 
                ? 'Rostara Kombucha is unpasteurized, retaining raw probiotic cultures and beneficial organic acids. Carbonation is a 100% natural byproduct of live anaerobic respiration rather than forced industrial CO2 gas injection.'
                : 'کامبوچای رُستارا پاستوریزه نمی‌شود؛ به این معنا که باکتری‌های اسید استیک و پروبیوتیک‌های طبیعی آن زنده و فعال هستند و گاز آن حاصل تخمیر زیستی است، نه تزریق گاز دی‌اکسید کربن صنعتی.'
        },
        {
            id: 'faq-4',
            title: isEn 
                ? 'How are living specimens packaged and delivered safely?' 
                : 'ارسال بسته‌ها و زمان تحویل به چه صورت است؟',
            content: isEn 
                ? 'Kits and organic seeds ship via express registered parcel. Live microgreen crops are transported in breathable micro-perforated bio-packaging designed to preserve cellular turgor and enzymatic vitality throughout transit.'
                : 'کیت‌ها و بذرهای ارگانیک به سراسر کشور با پست پیشتاز ارسال می‌شوند. محصولات تازه و زنده نیز در بسته‌بندی‌های عایق رطوبت و تنفس‌پذیر جهت حفظ شادابی سلولی ارسال می‌گردند.'
        }
    ];

    return (
        <div className="min-h-screen bg-seed-snow dark:bg-seed-forestDark text-seed-charcoal dark:text-seed-snow transition-colors duration-500 font-sans">
            
            {/* HERO SECTION (Seed.com Clinical Botanical with VibeFarsi Grid & Shimmer) */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-seed-forest/10 dark:border-white/10 overflow-hidden">
                <GridBackground size={52} className="opacity-40 dark:opacity-20" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Science Eyebrow Tag with VibeFarsi TextShimmer */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="badge-lime">
                            <span className="w-1.5 h-1.5 rounded-full bg-seed-forest animate-pulse" />
                            {isEn ? 'Cellular Living Nutrition' : 'تغذیهٔ زنده سلولی'}
                        </span>
                        <TextShimmer className="label-persian text-xs">
                            {isEn 
                                ? 'Sustainable Urban Agriculture & Living Food Matrix • Rostara' 
                                : 'پلتفرم زیست‌پایدار کشاورزی شهری و غذای زنده • رُستارا'}
                        </TextShimmer>
                    </div>

                    {/* Architectural Editorial Headline */}
                    <div className="grid lg:grid-cols-12 gap-8 items-start mb-14 md:mb-16">
                        <div className="lg:col-span-8">
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-normal leading-[1.38] text-seed-forest dark:text-seed-snow">
                                <span>{isEn ? 'Plant Biological Intelligence,' : 'هوشِ بیولوژیک گیاه،'}</span>
                                <span className="block mt-3 sm:mt-4 pb-2 font-normal text-seed-sage dark:text-seed-lime">
                                    {isEn ? 'Living Cellular Nutrition.' : 'تغذیهٔ زنده برای سلول.'}
                                </span>
                            </h1>
                        </div>
                        <div className="lg:col-span-4 text-seed-pewter dark:text-seed-snow/75 text-sm sm:text-base leading-relaxed pt-2 font-normal">
                            {isEn 
                                ? 'Rostara restores the vital connection between human health and soil ecology through indoor microgreen cultivation, pure heirloom non-GMO seeds, and raw probiotic ferments.'
                                : 'رُستارا حلقهٔ مفقوده میان سلامتی انسان و خاک است؛ توسعهٔ کشت خانگی میکروگرین‌ها و فرآورده‌های پروبیوتیک زنده بدون فرآیندهای شیمیایی و نگهدارنده‌های صنعتی.'}
                        </div>
                    </div>

                    {/* Action Bar & Key Metrics */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-8 border-t border-seed-forest/10 dark:border-white/10">
                        <Link to="/products">
                            <ShineButton className="btn-seed flex items-center justify-center gap-2">
                                <span>{isEn ? 'Explore Biological Catalog' : 'مشاهده کاتالوگ زیستی'}</span>
                                <ArrowIcon className="w-4 h-4" />
                            </ShineButton>
                        </Link>
                        
                        <Link
                            to="/method"
                            className="btn-seed-outline flex items-center justify-center gap-2"
                        >
                            <span>{isEn ? '7-Day Cultivation SOP' : 'راهنمای رویش خانگی'}</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>

                        <div className="hidden md:flex items-center gap-6 ms-auto text-xs text-seed-pewter dark:text-seed-snow/70 font-normal">
                            <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-seed-forest dark:text-seed-lime" />
                                {isEn ? '100% Non-GMO Seeds' : 'بذرهای ۱۰۰٪ غیرتراریخته'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-seed-forest dark:text-seed-lime" />
                                {isEn ? 'Harvest in 7 Days' : 'برداشت در ۷ روز'}
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
                            label={isEn ? 'Broccoli Sulforaphane' : 'تراکم سولفورافان بروکلی'}
                            value={isEn ? '50×' : '۵۰'}
                            unit={isEn ? 'vs Mature Florets' : 'برابر برگ بالغ'}
                            delta={42}
                            deltaLabel={isEn ? 'Glucoraphanin Potency' : 'غلظت گلوکورافانین'}
                        />
                        <Stat 
                            label={isEn ? 'Time to Harvest' : 'زمان تا برداشت خانگی'}
                            value={isEn ? '7' : '۷'}
                            unit={isEn ? 'Days Indoors' : 'روز در آپارتمان'}
                            delta={85}
                            deltaLabel={isEn ? 'Cellulose Sprout Rate' : 'سرعت رویش سلولزی'}
                        />
                        <Stat 
                            label={isEn ? 'Seed Genetic Purity' : 'خلوص بیولوژیک بذرها'}
                            value={isEn ? '100%' : '۱۰۰٪'}
                            unit={isEn ? 'Untreated & Pure' : 'عاری از سموم'}
                        />
                        <Stat 
                            label={isEn ? 'Living Fermentation' : 'تخمیر سنتی زنده'}
                            value={isEn ? '21' : '۲۱'}
                            unit={isEn ? 'Days Aged Raw' : 'روز فرآوری طبیعی'}
                            delta={100}
                            deltaLabel={isEn ? 'Active Biome Flora' : 'پروبیوتیک پایدار'}
                        />
                    </div>
                </div>
            </section>

            {/* SPECIMEN SHOWCASE (Wrapped with VibeFarsi SpotlightCard) */}
            <section className="py-24 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="text-xs font-bold text-seed-forest/70 dark:text-seed-lime mb-2 block">
                                {isEn ? 'Bioactive Organic Catalog' : 'واریته‌های زیست‌فعال و ارگانیک'}
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-seed-forest dark:text-seed-snow">
                                {isEn ? 'Micro-scale Species & Living Botanicals' : 'گونه‌های گیاهی ریزمقیاس و محصولات زنده'}
                            </h2>
                        </div>
                        <Link 
                            to="/products"
                            className="inline-flex items-center gap-1 text-xs font-bold text-seed-forest dark:text-seed-lime hover:underline"
                        >
                            <span>{isEn ? 'View all 16 specimens' : 'مشاهده تمام ۱۶ محصول'}</span>
                            <ArrowIcon className="w-3.5 h-3.5" />
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
                                            {/* Card Meta Bar with Optimized TaxonomyTag */}
                                            <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-seed-forest/10 dark:border-white/10">
                                                <TaxonomyTag variant="muted">
                                                    {item.code}
                                                </TaxonomyTag>
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
                                                        <span className="font-sans font-medium">{m.label}:</span>
                                                        <span className="font-bold text-seed-forest dark:text-seed-snow">{m.val}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                to="/products"
                                                className="mt-2 w-full py-2.5 rounded-pill bg-seed-stone dark:bg-white/10 hover:bg-seed-forest hover:text-seed-snow dark:hover:bg-seed-lime dark:hover:text-seed-forest text-seed-forest dark:text-seed-snow text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <span>{isEn ? 'Review & Order Specimen' : 'بررسی و ثبت سفارش'}</span>
                                                <ArrowIcon className="w-3.5 h-3.5" />
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
                    
                    <div className="max-w-2xl mb-16">
                        <span className="label-mono mb-2 block">
                            {isEn ? 'SCIENTIFIC BENCHMARK • CLINICAL SUPERIORITY' : 'SCIENTIFIC PROOF • برتری بیولوژیک'}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow mb-4">
                            {isEn ? 'Bioactive Whole-Foods vs. Synthetic Isolates' : 'تفاوت غذای زیست‌فعال با مکمل‌های شیمیایی'}
                        </h2>
                        <p className="text-sm text-seed-pewter dark:text-seed-snow/70 leading-relaxed">
                            {isEn 
                                ? 'Why human cellular biology prioritizes intact plant enzyme matrices over factory-synthesized multivitamins and chemical extractions.'
                                : 'چرا زیست‌شناسی انسان مولکول‌های گیاهی استخراج‌شده در ماتریکس طبیعی را به ویتامین‌ها و قرص‌های آزمایشگاهی ترجیح می‌دهد؟'}
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
                                    <div className="mb-1">
                                        <TaxonomyTag variant="lime">
                                            {isEn ? 'Rostara: Living Botanical Matrix' : 'رُستارا: گیاه زنده'}
                                        </TaxonomyTag>
                                    </div>
                                    <p className="text-xs text-seed-forest dark:text-seed-snow font-medium leading-relaxed">
                                        {comp.rostara}
                                    </p>
                                </div>

                                <div className="md:col-span-4 bg-seed-stone/60 dark:bg-white/5 p-4 rounded-xl border border-seed-forest/5 dark:border-white/5">
                                    <div className="mb-1">
                                        <TaxonomyTag variant="muted">
                                            {isEn ? 'Synthetic Supplements & Pills' : 'مکمل‌های صنعتی و کپسول'}
                                        </TaxonomyTag>
                                    </div>
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
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="mb-12">
                        <span className="label-mono mb-2 block">
                            {isEn ? 'KNOWLEDGE REPOSITORY • TECHNICAL FAQ' : 'KNOWLEDGE BASE • پرسش‌های علمی و فنی'}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-seed-forest dark:text-seed-snow mb-3">
                            {isEn ? 'Frequently Answered Questions on Biological Cultivation' : 'پاسخ به پرسش‌های متداول کشت و سلامت'}
                        </h2>
                        <p className="text-sm text-seed-pewter dark:text-seed-snow/70">
                            {isEn 
                                ? 'Practical guidance on home kit maintenance, enzymatic potency, and whole-food microgreen integration.'
                                : 'اطلاعات کاربردی پیرامون نگهداری کیت‌ها، ارزش بیولوژیک جوانه‌ها و شیوه مصرف سوپرفودها'}
                        </p>
                    </div>

                    <Accordion items={faqItems} multiple defaultOpen={['faq-1']} />
                </div>
            </section>

            {/* THE ROSTARA CHARTER (Seed-style Peer-Reviewed Manifesto) */}
            <section className="py-24 border-b border-seed-forest/10 dark:border-white/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="border-b border-seed-forest/10 dark:border-white/10 pb-6 mb-8 flex items-center justify-between">
                        <span className="label-mono">
                            {isEn ? 'ROSTARA CHARTER • SUSTAINABLE ECO-MANIFESTO' : 'ROSTARA CHARTER • منشور زیست‌پایدار'}
                        </span>
                        <span className="font-mono text-xs text-seed-pewter dark:text-seed-snow/60">
                            {isEn ? 'Official Release 2026' : 'نسخهٔ رسمی ۱۴۰۵'}
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-seed-forest dark:text-seed-snow mb-6 leading-snug">
                        {isEn 
                            ? 'We believe the human organism was not engineered to thrive on synthetic preservatives, ultra-processed calories, and chemical concentrates.'
                            : 'ما باور داریم که بدن انسان برای مصرف مواد نگه‌دارنده و مولکول‌های سنتتیک فرآوری‌شده طراحی نشده است.'}
                    </h2>

                    <div className="space-y-6 text-sm text-seed-pewter dark:text-seed-snow/80 leading-relaxed font-normal">
                        <p>
                            {isEn 
                                ? 'Microgreens, raw probiotic ferments, and medicinal functional mushrooms are not fleeting culinary trends; they are nature’s ancient biotechnology for survival, cellular cellular regeneration, and tissue detoxification. When clipped at 7 to 10 days of age, young shoots trigger peak biological adaptation in mammalian metabolism.'
                                : 'میکروگرین‌ها، محصولات تخمیری زنده و قارچ‌های دارویی، غذاهای زودگذر ترند اینترنت نیستند؛ آنها کهن‌ترین فناوری حیات برای بقا، خودترمیمی سلولی و پاکسازی بافت‌های زنده هستند. وقتی گیاه در سن ۷ تا ۱۰ روزگی مصرف می‌شود، قوی‌ترین پاسخ سازگاری زیستی را در متابولیسم ایجاد می‌کند.'}
                        </p>
                        <p>
                            {isEn 
                                ? 'Rostara empowers every individual to cultivate living medicine right on their windowsill—reducing dependence on centralized fragile supply chains, eliminating storage oxidation, and delivering maximum nutrient density at nominal cost.'
                                : 'هدف رُستارا رساندن ابزار باغبانی علمی به آشپزخانه‌هاست تا وابستگی به زنجیره‌های غذایی متمرکز و انبارهای تجاری کاهش یابد و هر فرد بتواند تازه‌ترین سوپرفودهای طبیعی را با کمترین هزینه و در بالاترین خلوص زیستی برداشت کند.'}
                        </p>
                    </div>

                    <div className="pt-8 mt-8 border-t border-seed-forest/10 dark:border-white/10 flex items-center justify-between text-xs text-seed-pewter dark:text-seed-snow/60 font-mono">
                        <span>{isEn ? 'Founded by: Rostara Bio-Ecosystem' : 'بنیان‌گذاری: رُستارا (محیط زیست‌پایدار)'}</span>
                        <span>rostara.ir</span>
                    </div>
                </div>
            </section>

            {/* SEED STYLE FOOTER CTA (Deep Forest Section with VibeFarsi ShineButton) */}
            <section className="py-20 bg-seed-forest text-seed-snow relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    
                    <span className="inline-block px-3 py-1 rounded-full bg-seed-lime text-seed-forest text-xs font-bold mb-6">
                        {isEn ? 'Start Cultivating at Home' : 'شروع پرورش در خانه'}
                    </span>
                    
                    <h2 className="text-3xl sm:text-5xl font-display font-black mb-6 tracking-normal leading-snug">
                        {isEn 
                            ? 'Establish your first biological home micro-farm today.' 
                            : 'اولین مزرعهٔ زیستی خود را در آپارتمان برپا کنید.'}
                    </h2>
                    
                    <p className="text-sm sm:text-base text-seed-snow/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                        {isEn 
                            ? 'Complete indoor setup with 4 heirloom non-GMO seed varieties and biodegradable cellulose pads. Immediate dispatch with 100% germination guarantee.'
                            : 'کیت کامل کشت خانگی همراه با ۴ نوع بذر غیرتراریخته و پدهای سلولزی زیست‌تخریب‌پذیر؛ تحویل فوری با ضمانت جوانه‌زنی در سراسر کشور.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/products">
                            <ShineButton className="px-9 py-4 rounded-pill bg-seed-lime hover:bg-seed-limeHover text-seed-forest font-bold text-sm tracking-normal transition-all shadow-md active:scale-[0.98] flex items-center gap-2">
                                <span>{isEn ? 'Order Cultivation Kit' : 'سفارش کیت کشت خانگی'}</span>
                                <ArrowIcon className="w-4 h-4" />
                            </ShineButton>
                        </Link>
                        
                        <Link
                            to="/method"
                            className="px-9 py-4 rounded-pill bg-transparent hover:bg-white/10 text-seed-snow font-bold text-sm border border-white/20 transition-all active:scale-[0.98]"
                        >
                            {isEn ? 'View 7-Day Cultivation SOP' : 'مشاهده روش کشت ۷ روزه'}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
