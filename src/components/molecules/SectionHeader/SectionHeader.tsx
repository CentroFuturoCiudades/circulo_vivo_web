import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import type { EyebrowProps } from "@/components/atoms/Eyebrow";

export interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowColor?: EyebrowProps["color"];
  eyebrowDot?: boolean;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleColor?: string;
  descriptionColor?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowColor = "secondary",
  eyebrowDot = true,
  title,
  description,
  align = "left",
  titleColor,
  descriptionColor,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow color={eyebrowColor} dot={eyebrowDot}>
          {eyebrow}
        </Eyebrow>
      )}

      <h2
        className="font-serif font-bold text-[32px] leading-[1.2] tracking-[-0.02em]"
        style={titleColor ? { color: titleColor } : undefined}
      >
        {title}
      </h2>

      {description && (
        <p
          className="font-sans text-[16px] leading-relaxed text-neutral-500 max-w-2xl"
          style={descriptionColor ? { color: descriptionColor } : undefined}
        >
          {description}
        </p>
      )}
    </div>
  );
}
