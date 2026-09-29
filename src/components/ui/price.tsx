import { cn, faNumber, faPercent } from "@/lib/utils";
import i18n from '@/i18n';

export interface PriceProps {
  amount: number;
  /** Original price before discount; renders struck through with the computed percent. */
  original?: number;
  unit?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: "text-base", md: "text-2xl", lg: "text-4xl" };

/** 
 * Price Component: Automatically respects current language (English vs Persian).
 * In English: LTR digits, Latin comma separator, "Toman" unit, "X% OFF" badge.
 * In Persian: RTL digits, Persian comma separator «٬», "تومان" unit, "٪X تخفیف" badge.
 */
export function Price({ amount, original, unit, size = "md", className }: PriceProps) {
  const isEn = i18n?.language === 'en';
  const defaultUnit = isEn ? 'Toman' : 'تومان';
  const displayUnit = unit || defaultUnit;

  const off = original && original > amount ? Math.round((1 - amount / original) * 100) : 0;
  
  const formattedAmount = isEn 
    ? new Intl.NumberFormat('en-US').format(amount)
    : faNumber(amount);

  const formattedOriginal = original ? (
    isEn ? new Intl.NumberFormat('en-US').format(original) : faNumber(original)
  ) : null;

  return (
    <div className={cn("inline-flex flex-col", className)}>
      <span className="flex items-baseline gap-1.5" dir={isEn ? "ltr" : "rtl"}>
        <span className={cn("font-bold tabular-nums", sizes[size])}>{formattedAmount}</span>
        <span className="text-xs text-muted-foreground font-medium">{displayUnit}</span>
      </span>
      {off > 0 && (
        <span className="mt-0.5 flex items-center gap-2 text-xs" dir={isEn ? "ltr" : "rtl"}>
          <span className="text-muted-foreground line-through tabular-nums">{formattedOriginal}</span>
          <span className="rounded-full bg-foreground px-1.5 py-px text-[11px] font-semibold text-background">
            {isEn ? `${off}% OFF` : `${faPercent(off)} تخفیف`}
          </span>
        </span>
      )}
    </div>
  );
}
