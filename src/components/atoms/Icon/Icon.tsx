import { cva } from "class-variance-authority";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Matches the design exactly: outlined border (crimson), no fill, cornerRadius: 4
const iconContainerVariants = cva(
  "inline-flex items-center justify-center flex-shrink-0 rounded",
  {
    variants: {
      // Border color / icon color
      color: {
        crimson:   "border border-crimson text-crimson",
        teal:      "border border-primary text-primary",
        secondary: "border border-secondary text-secondary",
        gold:      "border border-gold-600 text-gold-700",
        neutral:   "border border-neutral-400 text-neutral-600",
        // Filled variant for special cases (e.g. solid CTA icon)
        solid:     "bg-crimson border border-crimson text-white",
      },
      size: {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
      },
    },
    defaultVariants: { color: "crimson", size: "md" },
  }
);

const iconSizeMap = { sm: 14, md: 18, lg: 26 } as const;

export interface IconContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  color?: "crimson" | "teal" | "secondary" | "gold" | "neutral" | "solid";
  size?: "sm" | "md" | "lg";
  icon: LucideIcon;
}

export function IconContainer({ className, color = "crimson", size = "md", icon: Icon, ...props }: IconContainerProps) {
  return (
    <div className={cn(iconContainerVariants({ color, size }), className)} {...props}>
      <Icon size={iconSizeMap[size]} />
    </div>
  );
}

// Bare icon wrapper (no container)
export interface IconProps {
  icon: LucideIcon;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const rawSizeMap = { xs: 12, sm: 14, md: 16, lg: 20 };

export function Icon({ icon: LIcon, size = "md", className }: IconProps) {
  return <LIcon size={rawSizeMap[size]} className={className} />;
}
