import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Gift, Copy, Sparkles } from 'lucide-react';
import ForumList from './Forum/ForumList';

const Club = () => {
    const { t } = useTranslation();
    const [copiedCode, setCopiedCode] = useState(null);

    // Mock data for offers
    const offers = [
        {
            id: 1,
            code: 'WELCOME10',
            discount: '10%',
            title: t('club.offers.welcome.title'),
            desc: t('club.offers.welcome.desc'),
            color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
        },
        {
            id: 2,
            code: 'FREESHIP',
            discount: t('club.offers.shipping.discountBadge'),
            title: t('club.offers.shipping.title'),
            desc: t('club.offers.shipping.desc'),
            color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
        },
        {
            id: 3,
            code: 'BULK20',
            discount: '20%',
            title: t('club.offers.bulk.title'),
            desc: t('club.offers.bulk.desc'),
            color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
        }
    ];

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="min-h-screen bg-cream dark:bg-brown-950 pt-24 pb-12 transition-colors duration-300">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center space-x-2 space-x-reverse bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-1.5 rounded-full mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('club.hero.badge')}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-brown-900 dark:text-cream mb-6">
                        {t('club.hero.title')}
                    </h1>
                    <p className="text-xl text-brown-600 dark:text-brown-300 max-w-2xl mx-auto">
                        {t('club.hero.subtitle')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Exclusive Offers Section */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Gift className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        <h2 className="text-2xl font-display font-bold text-brown-900 dark:text-cream">
                            {t('forum.title')}
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {offers.map((offer) => (
                            <div key={offer.id} className="bg-white dark:bg-brown-900 rounded-2xl p-6 border border-brown-100 dark:border-brown-800 shadow-sm hover:shadow-md transition-all group">
                                <div className={`inline-block px-3 py-1 rounded-lg text-sm font-bold mb-4 ${offer.color}`}>
                                    {offer.discount}
                                </div>
                                <h3 className="text-xl font-bold text-brown-900 dark:text-cream mb-2">
                                    {offer.title}
                                </h3>
                                <p className="text-brown-600 dark:text-brown-400 text-sm mb-6">
                                    {offer.desc}
                                </p>
                                <div className="flex items-center justify-between bg-cream dark:bg-brown-950 p-3 rounded-xl border border-brown-200 dark:border-brown-800 border-dashed">
                                    <span className="font-mono font-bold text-brown-800 dark:text-brown-200 tracking-wider">
                                        {offer.code}
                                    </span>
                                    <button
                                        onClick={() => copyToClipboard(offer.code)}
                                        className="p-2 hover:bg-brown-200 dark:hover:bg-brown-800 rounded-lg transition-colors text-brown-600 dark:text-brown-400"
                                        title={t('club.offers.copy')}
                                    >
                                        {copiedCode === offer.code ? (
                                            <span className="text-xs font-bold text-green-600 dark:text-green-400">{t('club.offers.copied')}</span>
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Community Forum - Full Feature */}
                <div className="lg:col-span-2">
                    <ForumList />
                </div>
            </div>
        </div>
    );
};

export default Club;
