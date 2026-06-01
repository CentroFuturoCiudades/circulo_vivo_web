import { cn } from "@/lib/utils";

type EyebrowColor = "secondary" | "teal" | "gold" | "white" | "neutral";

const colorMap: Record<EyebrowColor, { text: string; dot: string }> = {
  secondary: { text: "text-secondary",  dot: "bg-secondary" },
  teal:      { text: "text-primary",    dot: "bg-primary" },
  gold:      { text: "text-[#bcb884]",  dot: "bg-[#bcb884]" },
  white:     { text: "text-white",      dot: "bg-white" },
  neutral:   { text: "text-neutral-500", dot: "bg-neutral-400" },
};

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: EyebrowColor;
  dot?: boolean;
  children: React.ReactNode;
}

export function Eyebrow({ color = "secondary", dot = true, children, className, ...props }: EyebrowProps) {
  const { text, dot: dotColor } = colorMap[color];

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColor)} />}
      <span className={cn("font-sans font-bold text-[12px] tracking-[0.2em] uppercase leading-none", text)}>
        {children}
      </span>
    </div>
  );
}
