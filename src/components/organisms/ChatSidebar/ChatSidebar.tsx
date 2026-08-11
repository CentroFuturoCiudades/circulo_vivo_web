import { ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatTopicButton } from "@/components/atoms/ChatTopicButton";
import { Button } from "@/components/atoms/Button";

export interface ChatTopic {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface ChatSidebarProps {
  topics?: ChatTopic[];
  methodologyNote?: string;
  methodologyLink?: string;
  onMethodologyClick?: () => void;
  /**
   * Controls the slide-over drawer below the `lg` breakpoint. Ignored at `lg`
   * and up, where the sidebar is always visible inline (unchanged desktop design).
   */
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

const DEFAULT_TOPICS: ChatTopic[] = [
  { label: "Barreras" },
  { label: "Estrategias" },
  { label: "Actor" },
];

const DEFAULT_NOTE =
  "Basado en el análisis cualitativo de XX horas de entrevistas semiestructuradas realizado mediante LLM locales y validado por investigadoras humanas.";

const DEFAULT_LINK =
  "Metodología de análisis cualitativo combinado con algoritmos de inteligencia artificial";

export function ChatSidebar({
  topics = DEFAULT_TOPICS,
  methodologyNote = DEFAULT_NOTE,
  methodologyLink = DEFAULT_LINK,
  onMethodologyClick,
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
        <div className="flex items-center justify-between gap-4">
          <span
            className="font-sans font-normal text-[#708b8d]"
            style={{ fontSize: "16px", letterSpacing: "1.6px", lineHeight: "1.5" }}
          >
            EXPLORAR TEMAS
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#71717a] transition-colors hover:bg-black/5 lg:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {topics.map((topic, i) => (
            <ChatTopicButton
              key={i}
              active={topic.active}
              onClick={topic.onClick}
            >
              {topic.label}
            </ChatTopicButton>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-[#e4e4e7] pt-6">
        <p
          className="font-sans font-normal text-[#71717a]"
          style={{ fontSize: "16px", lineHeight: "1.625" }}
        >
          {methodologyNote}
        </p>

        <Button
          variant="link"
          color="teal"
          iconRight={ExternalLink}
          onClick={onMethodologyClick}
          className="normal-case tracking-normal font-normal text-base text-[#18181b] hover:text-primary justify-start gap-2 transition-all active:opacity-60 active:scale-95 [&>svg]:shrink-0 [&>svg]:w-[10.5px]! [&>svg]:h-[10.5px]! text-left"
        >
          {methodologyLink}
        </Button>
      </div>
    </div>
  );
}
