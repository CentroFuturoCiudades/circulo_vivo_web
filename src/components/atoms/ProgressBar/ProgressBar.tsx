import { cn } from "@/lib/utils";

type ProgressColor = "gold" | "teal" | "secondary" | "crimson";

const colorMap: Record<ProgressColor, { fill: string; label: string }> = {
  gold:      { fill: "bg-[#bcb884]",  label: "text-[#bcb884]" },
  teal:      { fill: "bg-primary",    label: "text-primary" },
  secondary: { fill: "bg-secondary",  label: "text-secondary" },
  crimson:   { fill: "bg-crimson",    label: "text-crimson" },
};

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;           // 0–100
  label?: string;
  showValue?: boolean;
  color?: ProgressColor;
  trackClassName?: string;
}

export function ProgressBar({
  value,
  label,
  showValue = true,
  color = "gold",
  className,
  trackClassName,
  ...props
}: ProgressBarProps) {
  const { fill, label: labelColor } = colorMap[color];
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              {label}
            </span>
          )}
          {showValue && (
            <span className={cn("font-sans font-bold text-[10px] tracking-[0.1em] uppercase", labelColor)}>
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn("w-full h-[6px] rounded-full bg-neutral-200 overflow-hidden", trackClassName)}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", fill)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
