import { cn } from "@/lib/utils";
import { FilterPill } from "@/components/atoms/FilterPill";

export interface ChatSuggestion {
  text: string;
  onClick?: () => void;
}

export interface ChatWelcomePromptProps {
  question?: string;
  subtitle?: string;
  suggestions?: ChatSuggestion[];
  /** true mientras el servicio genera las sugerencias dinámicas */
  isLoadingSuggestions?: boolean;
  className?: string;
}

const defaultQuestion =
  "¿Qué quieres saber sobre las iniciativas que están transformado los sistemas alimentarios?";

const defaultSubtitle =
  "Selecciona un tema a la izquierda o escribe una pregunta\npara analizar nuestra base de datos cualitativa.";

export function ChatWelcomePrompt({
  question = defaultQuestion,
  subtitle = defaultSubtitle,
  suggestions = [],
  isLoadingSuggestions = false,
  className,
}: ChatWelcomePromptProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="flex flex-col items-center gap-4">
        <p
          className="font-serif font-bold text-[#303f40] text-center"
          style={{ fontSize: "23.82px", lineHeight: 1.538, maxWidth: 586 }}
        >
          {question}
        </p>
        <p
          className="font-sans font-normal text-[#000000] text-center whitespace-pre-line text-base"
          style={{ lineHeight: 1.6, maxWidth: 500, padding: "0 7.69px" }}
        >
          {subtitle}
        </p>
      </div>

      <div
        className="flex flex-wrap justify-center gap-2 md:gap-3 px-4 md:px-[67px]"
        style={{ paddingTop: 16 }}
      >
        {isLoadingSuggestions ? (
          // Skeletons mientras el servicio genera sugerencias
          [140, 220, 280].map((w) => (
            <div
              key={w}
              className="h-7 md:h-8 rounded-full bg-neutral-200 animate-pulse"
              style={{ width: w }}
            />
          ))
        ) : (
          suggestions.map((suggestion, i) => {
            const isLast = i === suggestions.length - 1;
            return (
              <FilterPill
                key={i}
                variant="default"
                onClick={suggestion.onClick}
                className={cn(
                  "h-auto min-h-7 md:min-h-8 max-w-full whitespace-normal px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white border font-sans text-xs md:text-sm font-medium text-[#000000] text-center",
                  isLast ? "border-[#e1e1e6]" : "border-[#f0efef]"
                )}
              >
                {suggestion.text}
              </FilterPill>
            );
          })
        )}
      </div>
    </div>
  );
}
