import { cn } from "@/lib/utils";

export interface ScaleStop {
  range: string;
  label: string;
}

export interface GradientScaleProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  optimalLabel?: string;
  stops?: ScaleStop[];
  gradient?: string;
}

const DEFAULT_STOPS: ScaleStop[] = [
  { range: "0.0–0.35",  label: "Crítico" },
  { range: "0.35–0.55", label: "Vulnerable" },
  { range: "0.55–0.70", label: "Transición" },
  { range: "0.75–1.0",  label: "Resiliente" },
];

const DEFAULT_GRADIENT =
  "linear-gradient(to right, #561427, #582a56 33%, #708b8d 67%, #bcb884)";

export function GradientScale({
  title = "ESCALA DE VALOR IISE",
  optimalLabel = "ÓPTIMO (1.0)",
  stops = DEFAULT_STOPS,
  gradient = DEFAULT_GRADIENT,
  className,
  ...props
}: GradientScaleProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-sans font-semibold text-[9px] tracking-[0.13em] uppercase text-[#9ca3af]">
          {title}
        </span>
        <span className="font-sans font-semibold text-[9px] tracking-[0.13em] uppercase text-[#bcb884]">
          {optimalLabel}
        </span>
      </div>

      {/* Gradient bar */}
      <div
        className="w-full h-[7px] rounded-full opacity-85"
        style={{ background: gradient }}
        role="img"
        aria-label={title}
      />

      {/* Labels */}
      <div className="flex items-start justify-between">
        {stops.map((stop) => (
          <div key={stop.range} className="flex flex-col gap-0.5">
            <span className="font-sans text-[9px] text-[#9ca3af] leading-tight">{stop.range}</span>
            <span className="font-sans text-[9px] text-[#9ca3af] leading-tight">{stop.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
