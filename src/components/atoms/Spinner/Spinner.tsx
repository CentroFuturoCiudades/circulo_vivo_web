import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerSize  = "sm" | "md" | "lg" | "xl";
type SpinnerColor = "crimson" | "teal" | "navy" | "gold" | "white" | "neutral";

const sizeMap: Record<SpinnerSize, number> = { sm: 14, md: 20, lg: 32, xl: 48 };

const colorMap: Record<SpinnerColor, string> = {
  crimson: "text-crimson",
  teal:    "text-primary",
  navy:    "text-secondary",
  gold:    "text-[#bcb884]",
  white:   "text-white",
  neutral: "text-neutral-400",
};

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
}

export function Spinner({ size = "md", color = "teal", label, className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label ?? "Cargando..."}
      className={cn("inline-flex flex-col items-center gap-2", className)}
      {...props}
    >
      <Loader2 size={sizeMap[size]} className={cn("animate-spin", colorMap[color])} />
      {label && (
        <span className="font-sans text-[11px] text-neutral-500 tracking-wide">{label}</span>
      )}
    </div>
  );
}
