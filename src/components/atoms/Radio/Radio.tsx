import { useId } from "react";
import { cn } from "@/lib/utils";

type RadioColor = "teal" | "crimson" | "navy";

const colorMap: Record<RadioColor, { ring: string; dot: string }> = {
  teal:    { ring: "border-primary peer-checked:border-primary",    dot: "bg-primary" },
  crimson: { ring: "border-crimson peer-checked:border-crimson",    dot: "bg-crimson" },
  navy:    { ring: "border-secondary peer-checked:border-secondary", dot: "bg-secondary" },
};

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  color?: RadioColor;
}

export function Radio({ label, description, color = "teal", className, disabled, id, ...props }: RadioProps) {
  const { ring, dot } = colorMap[color];
  const generatedId = useId();
  const inputId = id ?? `radio-${generatedId}`;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex items-start gap-2.5 cursor-pointer select-none",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          id={inputId}
          type="radio"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        {/* outer ring */}
        <div className={cn(
          "w-4 h-4 rounded-full border-2 border-neutral-300 transition-colors",
          "peer-checked:border-2",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary",
          ring
        )} />
        {/* inner dot */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-1.5 h-1.5 rounded-full scale-0 transition-transform",
          "peer-checked:scale-100",
          dot
        )} />
      </div>

      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="font-sans text-[13px] text-neutral-900 leading-tight">{label}</span>
          )}
          {description && (
            <span className="font-sans text-[11px] text-neutral-500">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}
