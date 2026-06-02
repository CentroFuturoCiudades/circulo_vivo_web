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
        "w-full text-left flex flex-col gap-1 p-4 transition-all duration-150 active:scale-[0.99]",
        "border-b border-neutral-200 last:border-b-0",
        selected
          ? "bg-white"
          : "bg-transparent hover:bg-white/60",
        className
      )}
    >
      <span className="font-serif font-bold text-[16px] leading-snug text-[#000000]">
        {title}
      </span>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {chips.map((chip, i) => (
            <Chip key={i} color={chip.color ?? "teal"} className="pointer-events-none text-[9px] h-[22px] px-2">
              {chip.label}
            </Chip>
          ))}
        </div>
      )}
    </button>
  );
}
