"use client";
import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeConfig = {
  sm: {
    wrapper:  "h-9",
    iconSize: 14,
    iconPos:  "left-3.5",
    input:    "text-[12px] pl-9 pr-8",
    clearPos: "right-3",
    clearSize: 13,
  },
  md: {
    wrapper:  "h-11",
    iconSize: 16,
    iconPos:  "left-4",
    input:    "text-[13px] pl-10 pr-9",
    clearPos: "right-4",
    clearSize: 15,
  },
  lg: {
    wrapper:  "h-16",
    iconSize: 20,
    iconPos:  "left-6",
    input:    "text-[18px] pl-16 pr-10",
    clearPos: "right-6",
    clearSize: 18,
  },
} as const;

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  disabled?: boolean;
  size?: keyof typeof sizeConfig;
  className?: string;
}

export function SearchBar({
  placeholder = "Muéstrame iniciativas de producción agroecológica en el centro del país...",
  value,
  defaultValue = "",
  onChange,
  onSearch,
  disabled,
  size = "lg",
  className,
}: SearchBarProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const inputRef = useRef<HTMLInputElement>(null);
  const cfg = sizeConfig[size];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    if (!isControlled) setInternal(v);
    onChange?.(v);
  }

  function handleClear() {
    if (!isControlled) setInternal("");
    onChange?.("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") onSearch?.(current);
  }

  return (
    <div
      className={cn(
        "relative flex items-center w-full bg-white rounded-full transition-all",
        "border-2 border-[#708b8d1a] shadow-[0_1px_1.75px_#0000000d]",
        "focus-within:border-[#708b8d40] focus-within:shadow-[0_0_0_3px_#708b8d14]",
        disabled && "opacity-60 pointer-events-none",
        cfg.wrapper,
        className
      )}
    >
      <Search size={cfg.iconSize} className={cn("absolute text-[#747878] pointer-events-none", cfg.iconPos)} />

      <input
        ref={inputRef}
        type="text"
        value={current}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn("w-full h-full bg-transparent font-sans text-neutral-900 placeholder:text-[#747878] focus:outline-none", cfg.input)}
      />

      {current && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className={cn("absolute text-[#747878] hover:text-[#211f19] transition-colors", cfg.clearPos)}
        >
          <X size={cfg.clearSize} />
        </button>
      )}
    </div>
  );
}
