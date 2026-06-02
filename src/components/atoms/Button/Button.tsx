import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "link" | "icon";
export type ButtonColor   = "crimson" | "teal" | "gold" | "navy" | "neutral" | "white";
export type ButtonRadius  = "none" | "sm" | "md" | "full";
export type ButtonSize    = "sm" | "md" | "lg" | "xl";

// ── Static maps ───────────────────────────────────────────

const radiusMap: Record<ButtonRadius, string> = {
  none: "rounded-none",
  sm:   "rounded",        // 4px
  md:   "rounded-md",     // 8px
  full: "rounded-full",   // 9999px
};

const sizeMap: Record<ButtonSize, { base: string; icon: string; iconSize: number }> = {
  sm: { base: "h-[34px] px-[14px] text-[10px] gap-1.5", icon: "w-8 h-8",   iconSize: 14 },
  md: { base: "h-[44px] px-5 text-[12px] gap-2",         icon: "w-10 h-10", iconSize: 16 },
  lg: { base: "h-[54px] px-10 text-[14px] gap-2",        icon: "w-12 h-12", iconSize: 18 },
  xl: { base: "h-[60px] px-12 text-[14px] gap-2.5",      icon: "w-14 h-14", iconSize: 20 },
};

// color × variant combinations
const colorMap: Record<ButtonColor, Record<Exclude<ButtonVariant, "icon">, string>> = {
  crimson: {
    primary:   "bg-crimson text-white hover:bg-crimson-600 active:bg-crimson-700 focus-visible:ring-crimson",
    secondary: "bg-white text-crimson border-[1.5px] border-crimson hover:bg-crimson-50 focus-visible:ring-crimson",
    ghost:     "bg-transparent text-crimson hover:bg-crimson-50 focus-visible:ring-crimson",
    outline:   "bg-transparent text-crimson border-[1.5px] border-crimson hover:bg-crimson hover:text-white focus-visible:ring-crimson",
    link:      "text-crimson hover:text-crimson-600 underline-offset-4 hover:underline p-0 h-auto",
  },
  teal: {
    primary:   "bg-primary text-white hover:bg-primary-500 active:bg-primary-600 focus-visible:ring-primary",
    secondary: "bg-white text-primary border-[1.5px] border-primary hover:bg-primary-50 focus-visible:ring-primary",
    ghost:     "bg-transparent text-primary hover:bg-primary-50 focus-visible:ring-primary",
    outline:   "bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary hover:text-white focus-visible:ring-primary",
    link:      "text-primary hover:text-primary-500 underline-offset-4 hover:underline p-0 h-auto",
  },
  gold: {
    primary:   "bg-[#bcb884] text-[#050a0a] hover:bg-gold-500 active:bg-gold-600 focus-visible:ring-gold",
    secondary: "bg-white text-[#6c683c] border-[1.5px] border-[#bcb884] hover:bg-gold-50 focus-visible:ring-gold",
    ghost:     "bg-transparent text-[#6c683c] hover:bg-gold-50 focus-visible:ring-gold",
    outline:   "bg-transparent text-[#050a0a] border-[1.5px] border-[#bcb884] hover:bg-[#bcb884] focus-visible:ring-gold",
    link:      "text-[#6c683c] hover:text-gold-600 underline-offset-4 hover:underline p-0 h-auto",
  },
  navy: {
    primary:   "bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-secondary",
    secondary: "bg-white text-secondary border-[1.5px] border-secondary hover:bg-secondary-50 focus-visible:ring-secondary",
    ghost:     "bg-transparent text-secondary hover:bg-secondary-50 focus-visible:ring-secondary",
    outline:   "bg-transparent text-secondary border-[1.5px] border-secondary hover:bg-secondary hover:text-white focus-visible:ring-secondary",
    link:      "text-secondary hover:text-secondary-600 underline-offset-4 hover:underline p-0 h-auto",
  },
  neutral: {
    primary:   "bg-neutral-800 text-white hover:bg-neutral-700 active:bg-neutral-900 focus-visible:ring-neutral-500",
    secondary: "bg-white text-neutral-800 border-[1.5px] border-neutral-300 hover:bg-neutral-50 focus-visible:ring-neutral-400",
    ghost:     "bg-transparent text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-400",
    outline:   "bg-transparent text-neutral-700 border-[1.5px] border-neutral-300 hover:bg-neutral-800 hover:text-white focus-visible:ring-neutral-400",
    link:      "text-neutral-600 hover:text-neutral-900 underline-offset-4 hover:underline p-0 h-auto",
  },
  white: {
    primary:   "bg-white text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-white",
    secondary: "bg-transparent text-white border-[1.5px] border-white hover:bg-white/10 focus-visible:ring-white",
    ghost:     "bg-transparent text-white hover:bg-white/10 focus-visible:ring-white",
    outline:   "bg-transparent text-white border border-white/30 hover:bg-white hover:text-neutral-900 focus-visible:ring-white",
    link:      "text-white hover:text-white/70 underline-offset-4 hover:underline p-0 h-auto",
  },
};

// icon variant per color
const iconColorMap: Record<ButtonColor, string> = {
  crimson: "bg-crimson text-white hover:bg-crimson-600 focus-visible:ring-crimson",
  teal:    "bg-primary text-white hover:bg-primary-500 focus-visible:ring-primary",
  gold:    "bg-[#bcb884] text-[#050a0a] hover:bg-gold-500 focus-visible:ring-gold",
  navy:    "bg-secondary text-white hover:bg-secondary-600 focus-visible:ring-secondary",
  neutral: "bg-transparent text-neutral-700 border border-neutral-300 hover:border-neutral-500 focus-visible:ring-neutral-400",
  white:   "bg-white text-neutral-900 hover:bg-neutral-100 focus-visible:ring-white",
};

// ── Component ─────────────────────────────────────────────

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  radius?: ButtonRadius;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
}

export function Button({
  variant = "primary",
  color = "crimson",
  radius = "none",
  size = "md",
  loading = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const { base, icon: iconDims, iconSize } = sizeMap[size];
  const isIcon = variant === "icon";
  const isLink = variant === "link";

  const colorCls = isIcon
    ? iconColorMap[color]
    : colorMap[color][variant as Exclude<ButtonVariant, "icon">];

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        // base
        "inline-flex items-center justify-center font-sans font-bold tracking-[0.1em] uppercase",
        "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "select-none disabled:pointer-events-none disabled:opacity-40",
        !isLink && "active:scale-[0.97]",
        // size
        isIcon ? iconDims : isLink ? "gap-1" : base,
        // color × variant
        colorCls,
        // radius
        radiusMap[radius],
        className
      )}
      {...props}
    >
      {loading && <Loader2 size={iconSize} className="animate-spin" />}
      {!loading && !isIcon && IconLeft && <IconLeft size={iconSize} />}
      {!isIcon && children}
      {!loading && !isIcon && IconRight && <IconRight size={iconSize} />}
      {isIcon && !loading && (IconLeft ?? IconRight) && (
        (() => { const I = (IconLeft ?? IconRight)!; return <I size={iconSize} />; })()
      )}
      {isIcon && loading && <Loader2 size={iconSize} className="animate-spin" />}
    </button>
  );
}
