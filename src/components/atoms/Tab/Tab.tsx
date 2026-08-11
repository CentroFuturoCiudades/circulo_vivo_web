import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: LucideIcon;
}

export function Tab({ active = false, icon: Icon, children, className, disabled, ...props }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-sans font-bold text-[12px] tracking-[0.1em] uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none whitespace-nowrap active:scale-[0.97]",
        active
          ? "bg-primary/20 text-primary border-b-2 border-primary px-5 py-4"
          : "text-[#9ca3af] hover:text-neutral-700 px-5 py-[20.5px]",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
      {...props}
    >
      {Icon && <Icon size={12} />}
      {children}
    </button>
  );
}
