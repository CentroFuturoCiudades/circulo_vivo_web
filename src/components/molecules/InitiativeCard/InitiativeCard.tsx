import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";

export interface InitiativeChip {
  label: string;
  color?: "teal" | "crimson" | "gold" | "secondary" | "neutral" | "purple";
}

export interface InitiativeCardProps {
  title: string;
  chips?: InitiativeChip[];
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function InitiativeCard({
  title,
  chips = [],
  selected = false,
  onClick,
  className,
}: InitiativeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left flex flex-col gap-1 border-l-[3px] pt-4 pr-4 pb-4 pl-[13px] transition-all duration-150 active:scale-[0.99]",
        "border-b border-neutral-200 last:border-b-0",
        selected
          ? "border-l-[#708b8d] bg-white"
          : "border-l-transparent bg-transparent hover:bg-white/60",
        className
      )}
    >
      <span className={cn(
        "font-serif font-bold text-[16px] leading-snug transition-colors duration-150",
        selected ? "text-[#708b8d]" : "text-[#000000]"
      )}>
        {title}
      </span>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {chips.map((chip, i) => (
            <Chip key={i} as="span" color={chip.color ?? "teal"} className="text-[9px] h-[22px] px-2">
              {chip.label}
            </Chip>
          ))}
        </div>
      )}
    </button>
  );
}
