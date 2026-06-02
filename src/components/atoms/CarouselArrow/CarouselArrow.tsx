import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "prev" | "next";
  active?: boolean;
}

export function CarouselArrow({ direction, active = false, className, disabled, ...props }: CarouselArrowProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
      disabled={disabled}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:scale-[0.9]",
        active
          ? "bg-secondary border border-secondary text-white"
          : "bg-transparent border border-[#c4c6d0] text-neutral-700 hover:border-secondary hover:text-secondary",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
      {...props}
    >
      <Icon size={16} />
    </button>
  );
}
