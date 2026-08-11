import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";
import { MiniStat, type MiniStatColor } from "@/components/atoms/MiniStat";

export interface DataCardMiniStat {
  label: string;
  value: string;
  color?: MiniStatColor;
}

export interface DataCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: "purple" | "teal" | "gold" | "secondary" | "neutral";
  miniStats?: DataCardMiniStat[];
  children?: React.ReactNode;
  className?: string;
}

export function DataCard({
  title,
  subtitle,
  badge,
  badgeColor = "purple",
  miniStats,
  children,
  className,
}: DataCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-[#d1c6cf] overflow-hidden transition-shadow duration-200 hover:shadow-lg",
        className
      )}
      style={{ boxShadow: "0 1px 2px #0000000a, 0 2px 10px #39528412" }}
    >
      <div className="flex flex-col gap-4 p-[25px]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-serif font-bold text-[18px] leading-snug text-[#1c1018]">
              {title}
            </h3>
            {subtitle && (
              <p className="font-sans text-[12px] text-[#8a7888] leading-snug">
                {subtitle}
              </p>
            )}
          </div>

          {/* Badge — Chip atom */}
          {badge && (
            <Chip
              color={badgeColor === "secondary" ? "secondary" : badgeColor}
              selected
              className="pointer-events-none flex-shrink-0 text-[10px] h-6"
            >
              {badge}
            </Chip>
          )}
        </div>

        {/* Content slot */}
        {children && <div>{children}</div>}

        {/* MiniStats — MiniStat atoms */}
        {miniStats && miniStats.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {miniStats.map((stat, i) => (
              <MiniStat
                key={i}
                label={stat.label}
                value={stat.value}
                color={stat.color ?? "neutral"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
