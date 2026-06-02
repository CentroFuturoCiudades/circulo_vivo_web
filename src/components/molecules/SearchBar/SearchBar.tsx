"use client";
import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function SearchBar({
  placeholder = "Muéstrame iniciativas de producción agroecológica en el centro del país...",
  value,
  defaultValue = "",
  onChange,
  onSearch,
  disabled,
  className,
}: SearchBarProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const inputRef = useRef<HTMLInputElement>(null);

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
        "relative flex items-center w-full h-16 bg-white rounded-full transition-all",
        "border-2 border-[#708b8d1a] shadow-[0_1px_1.75px_#0000000d]",
        "focus-within:border-[#708b8d40] focus-within:shadow-[0_0_0_3px_#708b8d14]",
        disabled && "opacity-60 pointer-events-none",
        className
      )}
    >
      <Search size={20} className="absolute left-6 text-[#747878] pointer-events-none" />

      <input
        ref={inputRef}
        type="text"
        value={current}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-full bg-transparent font-sans text-[18px] text-neutral-900 placeholder:text-[#747878] focus:outline-none pl-16 pr-10"
      />

      {current && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-6 text-[#747878] hover:text-[#211f19] transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
