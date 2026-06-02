import { cva } from "class-variance-authority";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-sans font-medium text-[11px] transition-all cursor-pointer select-none h-7 px-3 active:scale-[0.95]",
  {
    variants: {
      color: {
        teal:      "bg-primary-50 text-primary-500 hover:bg-primary-100",
        crimson:   "bg-crimson-50 text-crimson hover:bg-crimson-100",
        gold:      "bg-gold-50 text-gold-700 hover:bg-gold-100",
        secondary: "bg-secondary-50 text-secondary-600 hover:bg-secondary-100",
        neutral:   "bg-neutral-200 text-neutral-700 hover:bg-neutral-300",
        purple:    "bg-[#f0e8f0] text-[#582a56] hover:bg-[#e4d4e4]",
      },
      selected: {
        true:  "font-semibold",
        false: "",
      },
    },
    compoundVariants: [
      { color: "teal",      selected: true, className: "bg-primary text-white hover:bg-primary-500" },
      { color: "crimson",   selected: true, className: "bg-crimson text-white hover:bg-crimson-600" },
      { color: "gold",      selected: true, className: "bg-gold text-neutral-900 hover:bg-gold-500" },
      { color: "secondary", selected: true, className: "bg-secondary text-white hover:bg-secondary-600" },
      { color: "neutral",   selected: true, className: "bg-neutral-700 text-white hover:bg-neutral-800" },
      { color: "purple",    selected: true, className: "bg-[#582a56] text-white hover:bg-[#4a2249]" },
    ],
    defaultVariants: { color: "teal", selected: false },
  }
);

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  color?: "teal" | "crimson" | "gold" | "secondary" | "neutral" | "purple";
  selected?: boolean;
  icon?: LucideIcon;
}

export function Chip({ className, color = "teal", selected = false, icon: Icon, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(chipVariants({ color, selected }), className)}
      aria-pressed={selected}
      {...props}
    >
      {Icon && <Icon size={11} />}
      {children}
    </button>
  );
}
