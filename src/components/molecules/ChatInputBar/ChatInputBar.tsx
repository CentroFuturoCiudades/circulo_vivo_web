"use client";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterPill } from "@/components/atoms/FilterPill";
import { Button } from "@/components/atoms/Button";

export interface ChatChip {
  label: string;
  /** Question sent to the chatbot on click. Falls back to `label` if omitted. */
  question?: string;
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
  className?: string;
}

const DEFAULT_PLACEHOLDER = "Escribe tu pregunta aquí...";

export function ChatInputBar({
  chips = [],
  isLoadingChips = false,
  value: controlledValue,
  onChange,
  onSend,
  placeholder = DEFAULT_PLACEHOLDER,
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
        "w-full p-4 md:p-8",
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
          <div data-tour="chat-chips" className="flex flex-wrap gap-2">
            {chips.map((chip, i) => (
              <FilterPill
                key={i}
                variant="teal"
                className="text-sm md:text-lg h-auto py-1 px-2.5 md:px-3 font-normal"
                onClick={chip.onClick}
              >
                {chip.label}
              </FilterPill>
            ))}
          </div>
        ) : null}

        <div data-tour="chat-input" className="rounded-lg border border-[#c1c8c8] bg-white p-2">
          <div className="overflow-hidden rounded bg-white">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={2}
              className="w-full resize-none bg-white px-4 pt-4 pb-10 font-sans text-lg font-normal text-[#111111] placeholder:text-[#a1a1aa] outline-none"
              style={{ minHeight: "56px", fontSize: "18px" }}
            />
          </div>

          <div className="flex items-center justify-end px-4 pb-2">
            <Button
              color="teal"
              variant="icon"
              radius="full"
              iconLeft={ArrowRight}
              onClick={handleSend}
              aria-label="Enviar consulta"
              className="md:hidden w-10 h-10"
            />

            <Button
              color="teal"
              variant="primary"
              radius="sm"
              iconRight={ArrowRight}
              onClick={handleSend}
              className="hidden md:inline-flex normal-case tracking-normal font-normal text-lg h-auto py-2 px-6"
            >
              Enviar consulta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
