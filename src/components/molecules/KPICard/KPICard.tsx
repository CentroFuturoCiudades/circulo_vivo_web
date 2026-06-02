import { cn } from "@/lib/utils";

type KPIAccent = "teal" | "navy" | "gold";

const accentBorder: Record<KPIAccent, string> = {
  teal: "border-l-primary",
  navy: "border-l-secondary",
  gold: "border-l-[#bcb884]",
};

const accentValue: Record<KPIAccent, string> = {
  teal: "text-primary",
  navy: "text-secondary",
  gold: "text-[#1c1c18]",
};

export interface KPICardProps {
  label: string;
  value: string;
  change?: string;
  changeSuffix?: string;
  subtext?: string;
  /** 0–100, renders a progress bar below value */
  progress?: number;
  accent?: KPIAccent;
  className?: string;
}

export function KPICard({
  label,
  value,
  change,
  changeSuffix,
  subtext,
  progress,
  accent = "teal",
  className,
}: KPICardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border-l-4 flex flex-col justify-between gap-1 transition-shadow duration-200 hover:shadow-md",
        accentBorder[accent],
        className
      )}
    >
      {/* Label */}
      <p className="font-sans font-bold text-[12px] tracking-[0.1em] uppercase text-neutral-400 leading-none">
        {label}
      </p>

      {/* Value + change */}
      <div className="relative flex items-end gap-0 mt-1">
        <span
          className={cn(
            "font-serif font-bold text-[36px] leading-none",
            accentValue[accent]
          )}
        >
          {value}
        </span>
        {change && (
          <span className="font-sans font-bold text-[14px] text-[#1c1c18] leading-none ml-2 mb-0.5">
            {change}
          </span>
        )}
        {changeSuffix && (
          <span className="font-sans text-[14px] text-neutral-400 leading-none ml-1 mb-0.5">
            {changeSuffix}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-2 w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full", {
              "bg-primary": accent === "teal",
              "bg-secondary": accent === "navy",
              "bg-[#bcb884]": accent === "gold",
            })}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}

      {/* Subtext */}
      {subtext && (
        <p className="font-sans text-[14px] text-neutral-400 leading-snug mt-1">
          {subtext}
        </p>
      )}
    </div>
  );
}
