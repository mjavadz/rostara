import React from 'react';
import { cn } from '@/lib/utils';

/**
 * 🏷️ TaxonomyTag Component
 * Renders scientific bracket labels with optimized typography for Persian & English.
 * Solves broken monospace fonts, character disconnects, and unstyled raw brackets.
 */
export const TaxonomyTag = ({
    children,
    variant = 'default', // 'default' | 'lime' | 'muted'
    size = 'sm', // 'xs' | 'sm' | 'base'
    className
}) => {
    const sizeClasses = {
        xs: 'text-[10px]',
        sm: 'text-[11px] sm:text-xs',
        base: 'text-xs sm:text-sm'
    };

    const variantClasses = {
        default: 'text-seed-pewter dark:text-seed-snow/70',
        lime: 'text-seed-forest dark:text-seed-lime',
        muted: 'text-seed-pewter/80 dark:text-seed-snow/50'
    };

    const bracketClasses = {
        default: 'text-seed-forest/40 dark:text-seed-lime/50',
        lime: 'text-seed-forest/50 dark:text-seed-lime/70',
        muted: 'text-seed-pewter/40 dark:text-seed-snow/30'
    };

    return (
        <span
            className={cn(
                'inline-flex items-center gap-0.5 font-sans font-bold tracking-normal select-none transition-colors',
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
            style={{ fontFeatureSettings: '"tnum" 1' }}
        >
            <span className={cn('font-mono font-medium opacity-80', bracketClasses[variant])}>[</span>
            <span className="px-0.5 tracking-normal">{children}</span>
            <span className={cn('font-mono font-medium opacity-80', bracketClasses[variant])}>]</span>
        </span>
    );
};

export default TaxonomyTag;
