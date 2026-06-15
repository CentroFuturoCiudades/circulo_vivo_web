"use client";
import { AlertCircle, Clock, Gauge, RefreshCw, ServerCrash, ShieldAlert, Sparkles, WifiOff, MessageSquareOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

// ── Variant config ─────────────────────────────────────────

export type ChatFallbackVariant =
  | "no-response"
  | "timeout"
  | "api-error"
  | "network-error"
  | "rate-limit"
  | "content-filtered"
  | "stream-interrupted";

interface VariantConfig {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  canRetry: boolean;
}

const VARIANTS: Record<ChatFallbackVariant, VariantConfig> = {
  "no-response": {
    icon: MessageSquareOff,
    iconColor: "#6b7280",
    iconBg: "#f3f4f6",
    title: "Sin respuesta",
    description: "El asistente no generó una respuesta. Esto puede ocurrir con preguntas muy cortas o ambiguas. Intenta reformular tu consulta con más contexto.",
    canRetry: true,
  },
  "timeout": {
    icon: Clock,
    iconColor: "#8a8654",
    iconBg: "#fef4ce",
    title: "Tiempo de espera agotado",
    description: "La solicitud tardó demasiado en procesarse. Esto puede deberse a alta demanda o una consulta muy extensa. Intenta de nuevo en unos momentos.",
    canRetry: true,
  },
  "api-error": {
    icon: ServerCrash,
    iconColor: "#852038",
    iconBg: "#f5e8ea",
    title: "Error del servidor",
    description: "Ocurrió un problema interno al procesar tu solicitud. Nuestro equipo ha sido notificado. Por favor intenta de nuevo más tarde.",
    canRetry: true,
  },
  "network-error": {
    icon: WifiOff,
    iconColor: "#444748",
    iconBg: "#f0f1f1",
    title: "Sin conexión a internet",
    description: "No fue posible conectarse al servicio. Verifica tu conexión a internet y vuelve a intentarlo.",
    canRetry: true,
  },
  "rate-limit": {
    icon: Gauge,
    iconColor: "#395284",
    iconBg: "#e8edf5",
    title: "Límite de solicitudes alcanzado",
    description: "Has enviado demasiadas consultas en poco tiempo. Espera unos segundos antes de enviar otra pregunta.",
    canRetry: false,
  },
  "content-filtered": {
    icon: ShieldAlert,
    iconColor: "#8a8654",
    iconBg: "#fef4ce",
    title: "Contenido no disponible",
    description: "La respuesta fue moderada por nuestros filtros de seguridad. Reformula tu pregunta evitando términos que puedan ser interpretados fuera del contexto de sistemas alimentarios.",
    canRetry: false,
  },
  "stream-interrupted": {
    icon: AlertCircle,
    iconColor: "#852038",
    iconBg: "#f5e8ea",
    title: "Respuesta interrumpida",
    description: "La transmisión de la respuesta se cortó antes de completarse. Esto puede ocurrir por inestabilidad en la conexión. Intenta enviar la consulta nuevamente.",
    canRetry: true,
  },
};

// ── Props ──────────────────────────────────────────────────

export interface ChatFallbackMessageProps {
  variant: ChatFallbackVariant;
  /** Override the default title for this variant */
  title?: string;
  /** Override the default description for this variant */
  description?: string;
  onRetry?: () => void;
  className?: string;
}

// ── Component ──────────────────────────────────────────────

export function ChatFallbackMessage({
  variant,
  title,
  description,
  onRetry,
  className,
}: ChatFallbackMessageProps) {
  const cfg = VARIANTS[variant];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-white border border-[#d7d7d7] p-4 flex flex-col gap-4",
        className
      )}
    >
      {/* Header — same as ChatAssistantMessage for visual consistency */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#708b8d] flex items-center justify-center flex-shrink-0">
          <Sparkles size={11} color="white" />
        </div>
        <span
          className="font-sans font-bold text-[#708b8d] text-xs"
          style={{ letterSpacing: "1.2px" }}
        >
          ASISTENTE CÍRCULO VIVO
        </span>
      </div>

      {/* Error body */}
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
          style={{ backgroundColor: cfg.iconBg }}
        >
          <Icon size={16} color={cfg.iconColor} strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <span
            className="font-sans font-semibold text-[#1a1c1c]"
            style={{ fontSize: "14px", lineHeight: "1.4" }}
          >
            {title ?? cfg.title}
          </span>
          <p
            className="font-sans font-normal text-[#6b7280]"
            style={{ fontSize: "13px", lineHeight: "1.6" }}
          >
            {description ?? cfg.description}
          </p>
        </div>
      </div>

      {/* Retry action */}
      {cfg.canRetry && onRetry && (
        <div className="pl-12">
          <Button
            variant="outline"
            color="neutral"
            radius="full"
            iconLeft={RefreshCw}
            onClick={onRetry}
            className="h-8 text-xs font-medium px-4 text-[#444748] border-[#c4c7c7] hover:border-[#708b8d] hover:text-[#708b8d]"
          >
            Reintentar
          </Button>
        </div>
      )}
    </div>
  );
}
