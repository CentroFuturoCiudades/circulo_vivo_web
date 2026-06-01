import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ variant = "rectangular", width, height, className, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-200",
        variant === "circular"    && "rounded-full",
        variant === "text"        && "rounded h-4",
        variant === "rectangular" && "rounded-md",
        className
      )}
      style={{
        width:  width  !== undefined ? (typeof width  === "number" ? `${width}px`  : width)  : undefined,
        height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}
