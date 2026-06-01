import { cn } from "@/lib/utils";

type StatCounterColor = "light" | "gold" | "dark";

const colorMap: Record<StatCounterColor, { value: string; label: string }> = {
  light: { value: "text-white",       label: "text-white" },
  gold:  { value: "text-[#bcb884]",   label: "text-[#bcb884]" },
  dark:  { value: "text-neutral-900", label: "text-neutral-500" },
};

export interface StatCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  color?: StatCounterColor;
}

export function StatCounter({ value, label, color = "light", className, ...props }: StatCounterProps) {
  const { value: valueColor, label: labelColor } = colorMap[color];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)} {...props}>
      <span
        className={cn(
          "font-display font-normal italic leading-none tracking-[-0.05em]",
          "text-[60px]",
          valueColor
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "font-sans font-bold text-[12px] tracking-[0.2em] uppercase",
          labelColor
        )}
      >
        {label}
      </span>
    </div>
  );
}
