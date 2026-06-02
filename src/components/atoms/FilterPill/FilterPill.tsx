import { cn } from "@/lib/utils";

export type FilterPillVariant = "active" | "default" | "teal" | "purple" | "navy";

const variantMap: Record<FilterPillVariant, string> = {
  active:  "bg-[#414848] text-white border-transparent",
  default: "bg-transparent text-[#6b7280] border border-[#e5e7eb] hover:border-neutral-400",
  teal:    "bg-primary text-white border-transparent",
  purple:  "bg-[#f0e8f0] text-[#582a56] border border-[#58295625] font-semibold",
  navy:    "bg-[#395284] text-white border-transparent",
};

export interface FilterPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FilterPillVariant;
}

export function FilterPill({ variant = "default", children, className, disabled, ...props }: FilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={variant === "active" || variant === "teal" || variant === "purple" || variant === "navy"}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 h-7 font-sans text-[10px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none whitespace-nowrap active:scale-[0.95]",
        variantMap[variant],
        disabled && "opacity-40 pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
