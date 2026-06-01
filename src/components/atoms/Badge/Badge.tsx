import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-sans font-semibold tracking-[0.1em] uppercase",
  {
    variants: {
      variant: {
        label:   "bg-primary-50 text-primary-500 rounded-[3px]",
        live:    "bg-crimson-50 text-crimson rounded-[3px]",
        success: "bg-green-50 text-green-800 rounded-[3px]",
        warning: "bg-yellow-50 text-yellow-800 rounded-[3px]",
        neutral: "border border-neutral-300 text-neutral-500 rounded-[3px]",
        count:   "bg-crimson text-white rounded-full justify-center",
        // File size / type badges — cornerRadius: 8
        file:         "bg-[#f4f4f5] text-[#1a1c1c] rounded-lg",
        "file-navy":  "bg-secondary-50 text-secondary-600 rounded-lg font-semibold tracking-wide",
        "file-gold":  "bg-gold-50 text-gold-700 rounded-lg font-semibold tracking-wide",
      },
      size: {
        sm: "text-[9px] px-2 h-5",
        md: "text-[10px] px-2.5 h-6",
      },
    },
    defaultVariants: { variant: "label", size: "sm" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  count?: number;
}

export function Badge({ className, variant, size, dot, count, children, ...props }: BadgeProps) {
  if (variant === "count") {
    return (
      <span className={cn(badgeVariants({ variant, size }), "w-5 h-5 text-[10px] p-0", className)} {...props}>
        {count ?? children}
      </span>
    );
  }

  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", {
          "bg-primary-500": variant === "label",
          "bg-crimson": variant === "live",
          "bg-green-600": variant === "success",
          "bg-yellow-600": variant === "warning",
          "bg-neutral-400": variant === "neutral",
        })} />
      )}
      {children}
    </span>
  );
}
