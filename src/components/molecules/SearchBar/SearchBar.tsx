"use client";
import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarSize = "sm" | "md" | "lg";

const sizeMap: Record<SearchBarSize, { height: string; text: string; icon: number }> = {
  sm: { height: "h-9",      text: "text-[12px]", icon: 14 },
  md: { height: "h-[44px]", text: "text-[13px]", icon: 16 },
  lg: { height: "h-[52px]", text: "text-[15px]", icon: 18 },
};

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  size?: SearchBarSize;
  disabled?: boolean;
  className?: string;
}

export function SearchBar({
  placeholder = "Buscar...",
  value,
  defaultValue = "",
  onChange,
  onSearch,
  size = "md",
  disabled,
  className,
}: SearchBarProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const inputRef = useRef<HTMLInputElement>(null);
  const { height, text, icon } = sizeMap[size];

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
        "relative flex items-center w-full bg-white rounded-md border-[1.5px] border-neutral-300",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all",
        disabled && "opacity-60 pointer-events-none",
        height,
        className
      )}
    >
      <Search size={icon} className="absolute left-3 text-neutral-400 pointer-events-none" />

      <input
        ref={inputRef}
        type="text"
        value={current}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full h-full bg-transparent font-sans text-neutral-900 placeholder:text-neutral-400",
          "focus:outline-none pl-9 pr-9",
          text
        )}
      />

      {current && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-3 text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <X size={icon - 2} />
        </button>
      )}
    </div>
  );
}
