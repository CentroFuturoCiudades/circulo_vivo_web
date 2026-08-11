import { AlertTriangle, Inbox } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DataUnavailableVariant = "empty" | "error";

interface VariantConfig {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  defaultTitle: string;
  defaultDescription: string;
}

const VARIANTS: Record<DataUnavailableVariant, VariantConfig> = {
  empty: {
    icon: Inbox,
    iconColor: "#708b8d",
    iconBg: "#e8eeef",
    defaultTitle: "No hay datos disponibles",
    defaultDescription: "Todavía no hay información publicada para esta sección.",
  },
  error: {
    icon: AlertTriangle,
    iconColor: "#852038",
    iconBg: "#f5e8ea",
    defaultTitle: "No se pudo cargar la información",
    defaultDescription: "Ocurrió un error al obtener los datos. Intenta de nuevo más tarde.",
  },
};

export interface DataUnavailableMessageProps {
  variant?: DataUnavailableVariant;
  title?: string;
  description?: string;
  className?: string;
}

/** Inline placeholder shown in place of a section/list when its data failed to load or is empty. */
export function DataUnavailableMessage({
  variant = "empty",
  title,
  description,
  className,
}: DataUnavailableMessageProps) {
  const cfg = VARIANTS[variant];
  const Icon = cfg.icon;

  return (
    <div className={cn("flex flex-col items-center justify-center text-center gap-3 py-16 px-6", className)}>
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full"
        style={{ backgroundColor: cfg.iconBg }}
      >
        <Icon size={20} color={cfg.iconColor} strokeWidth={2} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-sans font-semibold text-[#1a1c1c]" style={{ fontSize: 16 }}>
          {title ?? cfg.defaultTitle}
        </p>
        <p className="font-sans font-normal text-[#6b7280] max-w-md" style={{ fontSize: 14, lineHeight: 1.6 }}>
          {description ?? cfg.defaultDescription}
        </p>
      </div>
    </div>
  );
}
