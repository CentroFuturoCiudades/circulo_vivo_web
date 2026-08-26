import { cn } from "@/lib/utils";

export interface DomainChevronCardProps {
  title: string;
  active?: boolean;
  onSelect?: () => void;
  className?: string;
}

/**
 * One chevron-shaped step in the domain stepper — an arrow-pointing card
 * that opens the domain's explanation when "Conoce más" is clicked.
 */
export function DomainChevronCard({ title, active = false, onSelect, className }: DomainChevronCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "relative flex-1 min-w-[180px] flex flex-col items-start justify-center gap-2 text-left pl-10 pr-8 py-5 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white drop-shadow-[0_3px_8px_rgba(86,20,39,0.2)]",
        active ? "bg-crimson-600" : "bg-crimson hover:bg-crimson-600",
        className
      )}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%, 22px 50%)",
      }}
    >
      <span className="font-serif font-bold text-white text-[16px] leading-snug pr-2">
        {title}
      </span>
      <span className="font-sans italic text-white/70 text-[12px]">
        Conoce más
      </span>
    </button>
  );
}
