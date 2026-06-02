import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconContainer } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";

type FeatureCardAccent = "crimson" | "purple" | "teal";

const accentColor: Record<FeatureCardAccent, "crimson" | "solid" | "teal"> = {
  crimson: "crimson",
  purple:  "solid",
  teal:    "teal",
};

const accentBtnColor: Record<FeatureCardAccent, "crimson" | "teal" | "navy"> = {
  crimson: "crimson",
  purple:  "navy",
  teal:    "teal",
};

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  accent?: FeatureCardAccent;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  ctaLabel = "Saber más",
  ctaHref = "#",
  accent = "crimson",
  className,
}: FeatureCardProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Icon container atom */}
      <IconContainer icon={icon} color={accentColor[accent]} size="md" />

      {/* Title */}
      <h3
        className="font-serif font-bold text-[#1a1c1c] leading-[1.3]"
        style={{ fontSize: "24px" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="font-sans font-normal text-[#5e5e5e] leading-[1.5]"
        style={{ fontSize: "16px" }}
      >
        {description}
      </p>

      {/* CTA — Button atom inside anchor */}
      <a href={ctaHref} className="self-start">
        <Button
          color={accentBtnColor[accent]}
          size="sm"
          iconRight={ArrowRight}
        >
          {ctaLabel}
        </Button>
      </a>
    </div>
  );
}
