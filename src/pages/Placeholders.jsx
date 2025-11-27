import React from 'react';

const PagePlaceholder = ({ title }) => (
    <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-serif text-rostara-primary mb-6">{title}</h1>
        <p className="text-lg text-rostara-text/80">Content coming soon...</p>
    </div>
);

export const Home = () => <PagePlaceholder title="Home" />;
export const About = () => <PagePlaceholder title="About Rostara" />;
export const Method = () => <PagePlaceholder title="Shizen Method" />;
export const Products = () => <PagePlaceholder title="Our Products" />;
export const Experience = () => <PagePlaceholder title="Experience" />;
export const Gallery = () => <PagePlaceholder title="Gallery" />;
export const Contact = () => <PagePlaceholder title="Contact Us" />;
