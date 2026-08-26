"use client";

import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { tier } from "@/lib/indicadores/tier";

export interface DomainPillProps {
  label: string;
  value: number;
  active?: boolean;
  onSelect?: () => void;
  onInfo?: () => void;
  className?: string;
}

/**
 * One of the 5 domain "pills" at the top of the indicadores dashboard — a
 * chevron-shaped tab showing the domain's semáforo tier and score bar.
 * Clicking selects the domain everywhere else on the page; the small ⓘ opens
 * a modal explaining what the domain measures.
 */
export function DomainPill({ label, value, active = false, onSelect, onInfo, className }: DomainPillProps) {
  const t = tier(value);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.();
        }
      }}
      className={cn(
        "relative flex-1 min-w-[160px] text-left rounded-lg border-2 bg-[#c3d2d9]/40 px-5 py-3.5 transition-transform hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
        active ? "border-[#1a1c1c]" : "border-transparent",
        className
      )}
    >
      {onInfo && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onInfo();
          }}
          aria-label={`¿Qué mide ${label}?`}
          title="¿Qué mide este tema?"
          className="absolute top-2.5 right-2.5 text-neutral-400 hover:text-neutral-700"
        >
          <Info size={14} />
        </button>
      )}
      <p className="font-sans font-bold text-[13px] text-[#1a1c1c] pr-4">{label}</p>
      <p className="font-sans font-bold text-[12px] mt-1" style={{ color: t.color }}>
        {t.label}
      </p>
      <div className="mt-2 h-1.5 rounded-full bg-black/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: t.color }}
        />
      </div>
    </div>
  );
}
