import { cn } from "@/lib/utils";

type KPIAccent = "teal" | "navy" | "gold";

const accentBorder: Record<KPIAccent, string> = {
  teal: "border-l-[#708b8d]",
  navy: "border-l-[#395284]",
  gold: "border-l-[#bcb884]",
};

const accentValue: Record<KPIAccent, string> = {
  teal: "text-[#708b8d]",
  navy: "text-[#395284]",
  gold: "text-[#bcb884]",
};

export interface KPICardProps {
  label: string;
  value: string;
  change?: string;
  target?: string;
  sourcesLabel?: string;
  sources?: string;
  accent?: KPIAccent;
  className?: string;
}

export function KPICard({
  label,
  value,
  change,
  target,
  sourcesLabel,
  sources,
  accent = "teal",
  className,
}: KPICardProps) {
  const hasBottom = target || sourcesLabel || sources;

  return (
    <div
      className={cn(
        "bg-white rounded-xl border-l-4 flex flex-col gap-4",
        "shadow-[0_1px_1.75px_rgba(0,0,0,0.05)]",
        accentBorder[accent],
        className
      )}
      style={{ padding: 24 }}
    >
      {/* Label + value */}
      <div className="flex flex-col gap-1">
        <p
          className="font-sans font-bold uppercase text-[#6b7280] leading-none"
          style={{ fontSize: 12, letterSpacing: 1.2 }}
        >
          {label}
        </p>

        <div className="flex items-end gap-2 mt-1">
          <span
            className={cn("font-serif font-bold leading-none", accentValue[accent])}
            style={{ fontSize: 36 }}
          >
            {value}
          </span>
          {change && (
            <span
              className="font-sans font-bold text-[#1c1c18] leading-none mb-0.5"
              style={{ fontSize: 14 }}
            >
              {change}
            </span>
          )}
        </div>
      </div>

      {hasBottom && <div className="border-t border-[#e5e7eb]" />}

      {hasBottom && (
        <div className="flex flex-col gap-4">
          {target && (
            <p className="font-sans text-[#9ca3af]" style={{ fontSize: 14, lineHeight: 1.43 }}>
              {target}
            </p>
          )}

          {(sourcesLabel || sources) && (
            <div className="flex flex-col gap-1">
              {sourcesLabel && (
                <p
                  className="font-sans text-[#395284] uppercase"
                  style={{ fontSize: 10, lineHeight: 1.5, letterSpacing: 0.6 }}
                >
                  {sourcesLabel}
                </p>
              )}
              {sources && (
                <p
                  className="font-sans text-[#6b7280]"
                  style={{ fontSize: 12, lineHeight: 1.625 }}
                >
                  {sources}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
