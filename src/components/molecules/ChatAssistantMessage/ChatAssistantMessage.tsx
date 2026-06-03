import { cn } from "@/lib/utils";
import { FilterPill } from "@/components/atoms/FilterPill";
import { ChatMarkdownContent } from "@/components/molecules/ChatMarkdownContent";
import { Sparkles } from "lucide-react";

export interface ChatAssistantItem {
  number: string;
  title: string;
  description?: string;
}

export interface ChatFollowUp {
  text: string;
  onClick?: () => void;
}

export interface ChatAssistantMessageProps {
  /** Respuesta completa del LLM en formato markdown — se renderiza con ChatMarkdownContent */
  markdown?: string;
  /** Alternativa estructurada (intro + items) para casos donde se conoce el formato */
  intro?: string;
  items?: ChatAssistantItem[];
  citation?: string;
  followUps?: ChatFollowUp[];
  isLoading?: boolean;
  className?: string;
}

export function ChatAssistantMessage({
  markdown,
  intro,
  items,
  citation,
  followUps,
  isLoading = false,
  className,
}: ChatAssistantMessageProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-white border border-[#d7d7d7] p-4 flex flex-col gap-4",
        className
      )}
    >
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

      {isLoading ? (
        <div className="flex items-center gap-1.5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-2 h-2 rounded-full bg-[#708b8d] animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {/* Respuesta markdown del LLM */}
            {markdown && <ChatMarkdownContent content={markdown} />}

            {/* Contenido estructurado (fallback / predefinido) */}
            {!markdown && (
              <>
                {intro && (
                  <p className="font-sans font-normal text-[14px] text-[#1a1c1c] leading-[1.5]">
                    {intro}
                  </p>
                )}

                {items && items.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {items.map((item) => (
                      <div key={item.number} className="flex flex-col gap-0.5">
                        <div className="flex items-baseline gap-2">
                          <span className="font-['Inter',sans-serif] font-bold text-[14px] text-[#708b8d]">
                            {item.number}
                          </span>
                          <span className="font-['Inter',sans-serif] font-bold text-[14px] text-[#1a1c1c]">
                            {item.title}
                          </span>
                        </div>
                        {item.description && (
                          <p
                            className="font-['Inter',sans-serif] font-normal text-[14px] text-[#6b7280] leading-[1.5]"
                            style={{ paddingLeft: 22 }}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {citation && (
              <p className="font-sans italic font-normal text-[10px] text-[#a1a1aa]">
                {citation}
              </p>
            )}
          </div>

          {followUps && followUps.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-[#f3f4f6] pt-4">
              <span
                className="font-sans font-medium italic text-[12px] text-[#708b8d]"
                style={{ letterSpacing: "0.24px" }}
              >
                Preguntas sugeridas basadas en la respuesta:
              </span>
              <div className="flex flex-wrap gap-2">
                {followUps.map((followUp, i) => (
                  <FilterPill
                    key={i}
                    variant="tealOutline"
                    onClick={followUp.onClick}
                    className="h-[26px] text-xs font-semibold tracking-[0.02em] px-3"
                  >
                    {followUp.text}
                  </FilterPill>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
