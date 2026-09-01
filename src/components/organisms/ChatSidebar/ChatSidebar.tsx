import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatTopic {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface ChatSidebarProps {
  topics?: ChatTopic[];
  title?: string;
  description?: string;
  methodologyNote?: string;
  /**
   * Controls the slide-over drawer below the `lg` breakpoint. Ignored at `lg`
   * and up, where the sidebar is always visible inline (unchanged desktop design).
   */
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

const DEFAULT_NOTE =
  "Basado en el análisis cualitativo de XX horas de entrevistas semiestructuradas realizado mediante LLM locales y validado por investigadoras humanas.";

const DEFAULT_TITLE = "Asistente de investigación";

const DEFAULT_DESCRIPTION =
  "Responde tus preguntas a partir del análisis cualitativo de entrevistas con iniciativas de sistemas alimentarios. Escribe una pregunta o elige un tema para explorar los hallazgos.";

export function ChatSidebar({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  methodologyNote = DEFAULT_NOTE,
  open = true,
  onClose,
  className,
}: ChatSidebarProps) {
  return (
    <div
      className={cn(
        // Mobile/tablet: fixed slide-over drawer, off-canvas by default.
        "fixed inset-y-0 left-0 z-[70] flex h-full w-[85%] max-w-[360px] flex-col justify-between overflow-y-auto rounded-r-2xl bg-white p-4 pt-6 shadow-2xl transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full",
        // Desktop (lg+): original inline, always-visible design — unchanged.
        "lg:static lg:z-auto lg:h-full lg:w-[384px] lg:max-w-none lg:translate-x-0 lg:shrink-0 lg:justify-between lg:overflow-visible lg:rounded-2xl lg:border-r lg:border-[#e4e4e7] lg:bg-white/80 lg:p-6 lg:shadow-none",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-semibold text-[#18181b]" style={{ fontSize: "18px", lineHeight: "1.4" }}>
              {title}
            </h2>
            <p className="font-sans font-normal text-[#71717a]" style={{ fontSize: "14px", lineHeight: "1.6" }}>
              {description}
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#71717a] transition-colors hover:bg-black/5 lg:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-[#e4e4e7] pt-6">
        <p
          className="font-sans font-normal text-[#71717a]"
          style={{ fontSize: "16px", lineHeight: "1.625" }}
        >
          {methodologyNote}
        </p>
      </div>
    </div>
  );
}
