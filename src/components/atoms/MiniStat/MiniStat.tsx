import { cn } from "@/lib/utils";

export type MiniStatColor = "gold" | "blue" | "rose" | "neutral" | "teal";

const colorMap: Record<MiniStatColor, { bg: string; border: string; value: string }> = {
  gold:    { bg: "bg-[#eeeee2]", border: "border-[#bcb88425]", value: "text-[#bcb884]" },
  blue:    { bg: "bg-secondary-50", border: "border-secondary/15", value: "text-secondary" },
  rose:    { bg: "bg-crimson-50", border: "border-crimson/15", value: "text-crimson" },
  neutral: { bg: "bg-neutral-100", border: "border-neutral-300/40", value: "text-neutral-700" },
  teal:    { bg: "bg-primary-50", border: "border-primary/15", value: "text-primary-500" },
};

export interface MiniStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  color?: MiniStatColor;
}

export function MiniStat({ label, value, color = "neutral", className, ...props }: MiniStatProps) {
  const { bg, border, value: valueCls } = colorMap[color];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-2xl border px-1 py-1 w-[102px] h-[57px]",
        bg, border,
        className
      )}
      {...props}
    >
      <span className="font-sans font-semibold text-[7px] tracking-[0.1em] uppercase text-[#8a7888] leading-none">
        {label}
      </span>
      <span className={cn("font-display font-black text-[16px] leading-tight", valueCls)}>
        {value}
      </span>
    </div>
  );
}
