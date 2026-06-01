import { cn } from "@/lib/utils";

// Heights match common navbar sizes; width scales proportionally (SVG ratio ≈ 216:141 = 1.53)
const sizeMap = {
  xs: "h-5",
  sm: "h-7",
  md: "h-9",
  lg: "h-12",
};

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  color?: "black" | "white";
  size?: keyof typeof sizeMap;
}

export function Logo({ color = "black", size = "sm", className, ...props }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="Círculo Vivo"
      className={cn(
        "w-auto object-contain select-none flex-shrink-0",
        sizeMap[size],
        color === "white" && "brightness-0 invert",
        className
      )}
      draggable={false}
      {...props}
    />
  );
}
