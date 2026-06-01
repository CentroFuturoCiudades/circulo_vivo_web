import { cn } from "@/lib/utils";

type DividerColor = "light" | "dark";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
  color?: DividerColor;
}

export function Divider({ orientation = "horizontal", label, color = "light", className, ...props }: DividerProps) {
  const line = color === "dark" ? "bg-neutral-400" : "bg-neutral-200";

  if (orientation === "vertical") {
    return (
      <div
        className={cn("w-px self-stretch", line, className)}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)} role="separator" {...props}>
        <span className={cn("flex-1 h-px", line)} />
        <span className="font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-400 whitespace-nowrap">
          {label}
        </span>
        <span className={cn("flex-1 h-px", line)} />
      </div>
    );
  }

  return (
    <div
      className={cn("h-px w-full", line, className)}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  );
}
