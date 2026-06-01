import { cn } from "@/lib/utils";

type AvatarSize  = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarColor = "teal" | "crimson" | "navy" | "gold" | "neutral";

const sizeMap: Record<AvatarSize, { dims: string; text: string }> = {
  xs: { dims: "w-6 h-6",   text: "text-[9px]" },
  sm: { dims: "w-8 h-8",   text: "text-[11px]" },
  md: { dims: "w-10 h-10", text: "text-[13px]" },
  lg: { dims: "w-14 h-14", text: "text-[17px]" },
  xl: { dims: "w-20 h-20", text: "text-[22px]" },
};

const colorMap: Record<AvatarColor, string> = {
  teal:    "bg-primary-100 text-primary-600",
  crimson: "bg-crimson-50 text-crimson",
  navy:    "bg-secondary-100 text-secondary-700",
  gold:    "bg-gold-50 text-gold-700",
  neutral: "bg-neutral-200 text-neutral-600",
};

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: AvatarSize;
  color?: AvatarColor;
}

export function Avatar({ name, src, size = "md", color = "teal", className, ...props }: AvatarProps) {
  const { dims, text } = sizeMap[size];

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 select-none",
        dims,
        !src && colorMap[color],
        className
      )}
      aria-label={name}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className={cn("font-sans font-semibold leading-none", text)}>
          {initials(name)}
        </span>
      )}
    </div>
  );
}
