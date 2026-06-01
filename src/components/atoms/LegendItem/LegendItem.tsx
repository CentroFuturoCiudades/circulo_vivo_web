import { cn } from "@/lib/utils";

export type LegendItemColor = "crimson" | "navy" | "teal" | "gold" | "neutral";

const colorMap: Record<LegendItemColor, { bg: string; border: string; dot: string; value: string }> = {
  crimson: { bg: "bg-crimson-50",    border: "border-crimson/15",    dot: "bg-crimson",   value: "text-crimson" },
  navy:    { bg: "bg-secondary-50",  border: "border-secondary/15",  dot: "bg-secondary", value: "text-secondary" },
  teal:    { bg: "bg-primary-50",    border: "border-primary/15",    dot: "bg-[#466062]", value: "text-[#466062]" },
  gold:    { bg: "bg-gold-50",       border: "border-gold/15",       dot: "bg-[#bcb884]", value: "text-[#6c683c]" },
  neutral: { bg: "bg-neutral-100",   border: "border-neutral-300/40",dot: "bg-neutral-500", value: "text-neutral-700" },
};

export interface LegendItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  color?: LegendItemColor;
}

export function LegendItem({ value, label, color = "neutral", className, ...props }: LegendItemProps) {
  const { bg, border, dot, value: valueCls } = colorMap[color];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-2xl border",
        bg, border,
        className
      )}
      {...props}
    >
      <span className={cn("w-2 h-2 rounded-full flex-shrink-0", dot)} />
      <div className="flex flex-col gap-0.5">
        <span className={cn("font-display font-bold text-[13px] leading-tight", valueCls)}>
          {String(value).padStart(2, "0")}
        </span>
        <span className="font-sans text-[10px] text-[#8a7888] leading-none">
          {label}
        </span>
      </div>
    </div>
  );
}
