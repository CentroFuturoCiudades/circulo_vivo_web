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
          style={{ lineHeight: 1.6, maxWidth: 448, padding: "0 7.69px" }}
        >
          {subtitle}
        </p>
      </div>

      <div
        className="flex flex-wrap justify-center gap-3"
        style={{ paddingTop: 16, paddingLeft: 67, paddingRight: 67 }}
      >
        {isLoadingSuggestions ? (
          // Skeletons mientras el servicio genera sugerencias
          [140, 220, 280].map((w) => (
            <div
              key={w}
              className="h-8 rounded-full bg-neutral-200 animate-pulse"
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
                  "h-8 px-4 rounded-full bg-white border font-sans text-sm font-medium text-[#000000]",
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
