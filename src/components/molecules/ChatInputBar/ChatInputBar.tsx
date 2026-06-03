"use client";
import { useState, useRef } from "react";
import { ArrowRight, Mic, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterPill } from "@/components/atoms/FilterPill";
import { Button } from "@/components/atoms/Button";

export interface ChatChip {
  label: string;
  onClick?: () => void;
}

export interface ChatInputBarProps {
  chips?: ChatChip[];
  /** true mientras el servicio genera los chips de contexto dinámicos */
  isLoadingChips?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
  placeholder?: string;
  disclaimer?: string;
  className?: string;
}

const DEFAULT_PLACEHOLDER = "Escribe tu pregunta aquí...";
const DEFAULT_DISCLAIMER =
  "ResearchAI puede producir errores. Verifica los fragmentos de audio originales adjuntos en cada respuesta.";

export function ChatInputBar({
  chips = [],
  isLoadingChips = false,
  value: controlledValue,
  onChange,
  onSend,
  placeholder = DEFAULT_PLACEHOLDER,
  disclaimer = DEFAULT_DISCLAIMER,
  className,
}: ChatInputBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  }

  function handleSend() {
    if (!value.trim()) return;
    onSend?.(value);
    if (!isControlled) setInternalValue("");
    else onChange?.("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className={cn(
        "w-full p-8",
        "bg-[linear-gradient(to_bottom,transparent_0%,white_40%)]",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {isLoadingChips ? (
          // Skeletons mientras el servicio genera los chips de contexto
          <div className="flex flex-wrap gap-2">
            {[100, 130, 115, 90].map((w) => (
              <div
                key={w}
                className="h-8 rounded-full bg-neutral-200 animate-pulse"
                style={{ width: w }}
              />
            ))}
          </div>
        ) : chips.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, i) => (
              <FilterPill
                key={i}
                variant="teal"
                className="text-base h-auto py-1 px-3 font-normal"
                onClick={chip.onClick}
              >
                {chip.label}
              </FilterPill>
            ))}
          </div>
        ) : null}

        <div className="rounded-lg border border-[#18181b] bg-white p-2">
          <div className="overflow-hidden rounded bg-white">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={2}
              className="w-full resize-none bg-white px-4 pt-4 pb-10 font-sans text-base font-normal text-[#111111] placeholder:text-[#a1a1aa] outline-none"
              style={{ minHeight: "56px", fontSize: "16px" }}
            />
          </div>

          <div className="flex items-center justify-between px-4 pb-2">
            <div className="flex items-center gap-2">
              <Button
                variant="icon"
                color="neutral"
                iconLeft={Mic}
                aria-label="Micrófono"
                className="border-none bg-transparent text-[#a1a1aa] hover:bg-transparent hover:text-[#708b8d] w-9 h-9"
              />
              <Button
                variant="icon"
                color="neutral"
                iconLeft={Paperclip}
                aria-label="Adjuntar archivo"
                className="border-none bg-transparent text-[#a1a1aa] hover:bg-transparent hover:text-[#708b8d] w-9 h-9"
              />
            </div>

            <Button
              color="teal"
              variant="primary"
              radius="sm"
              iconRight={ArrowRight}
              onClick={handleSend}
              className="normal-case tracking-normal font-normal text-base h-auto py-2 px-6"
            >
              Enviar consulta
            </Button>
          </div>
        </div>

        <p
          className="text-center font-sans font-normal text-[#a1a1aa]"
          style={{ fontSize: "16px", lineHeight: "1.5" }}
        >
          {disclaimer}
        </p>
      </div>
    </div>
  );
}
