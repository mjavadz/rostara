import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
    const { t } = useTranslation();

    const images = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        title: `تصویر ${i + 1}`,
    }));

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-brown-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-brown-900 mb-6">
                        گالری تصاویر
                    </h1>
                    <p className="text-xl text-brown-700 leading-relaxed">
                        نگاهی به زیبایی طبیعت و فرآیند کشت ما
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="group relative aspect-square bg-gradient-to-br from-primary-100 to-brown-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <ImageIcon className="w-16 h-16 text-primary-600/30" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-semibold">{image.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
