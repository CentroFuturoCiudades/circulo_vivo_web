import { cn } from "@/lib/utils";

export interface MapFooterProps {
  versionLabel?: string;
  copyrightLabel?: string;
  className?: string;
}

export function MapFooter({
  versionLabel = "CÍRCULO VIVO V3.0 // SISTEMA DE EXPLORACIÓN TERRITORIAL",
  copyrightLabel = "2024 © CÍRCULO VIVO",
  className,
}: MapFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-[#c4c7c7] opacity-60",
        "px-8 py-3",
        className
      )}
    >
      <span
        className="font-sans font-normal text-[#444748]"
        style={{ fontSize: 10, lineHeight: 1.5 }}
      >
        {versionLabel}
      </span>
      <span
        className="font-sans font-normal text-[#444748]"
        style={{ fontSize: 10, lineHeight: 1.5 }}
      >
        {copyrightLabel}
      </span>
    </div>
  );
}
