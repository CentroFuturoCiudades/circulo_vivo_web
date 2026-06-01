import { cn } from "@/lib/utils";

type ToggleColor = "teal" | "crimson" | "navy";
type ToggleSize  = "sm" | "md";

const trackColor: Record<ToggleColor, string> = {
  teal:    "bg-primary",
  crimson: "bg-crimson",
  navy:    "bg-secondary",
};

const sizeMap: Record<ToggleSize, { track: string; thumb: string; translate: string }> = {
  sm: { track: "w-8 h-4",   thumb: "w-3 h-3 top-0.5 left-0.5",   translate: "translate-x-4" },
  md: { track: "w-11 h-6",  thumb: "w-5 h-5 top-0.5 left-0.5",   translate: "translate-x-5" },
};

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  color?: ToggleColor;
  label?: string;
  className?: string;
}

export function Toggle({ checked, onChange, disabled, size = "md", color = "teal", label, className }: ToggleProps) {
  const { track, thumb, translate } = sizeMap[size];

  return (
    <label className={cn("inline-flex items-center gap-2 cursor-pointer select-none", disabled && "opacity-40 pointer-events-none", className)}>
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => onChange(!checked)}
        onKeyDown={(e) => (e.key === " " || e.key === "Enter") && onChange(!checked)}
        className={cn(
          "relative rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          track,
          checked ? trackColor[color] : "bg-neutral-300"
        )}
      >
        <span
          className={cn(
            "absolute rounded-full bg-white shadow-sm transition-transform duration-200",
            thumb,
            checked && translate
          )}
        />
      </div>
      {label && (
        <span className="font-sans text-[13px] text-neutral-700">{label}</span>
      )}
    </label>
  );
}
