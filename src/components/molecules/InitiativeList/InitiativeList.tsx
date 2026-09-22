"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { InitiativeCard, type InitiativeCardProps } from "@/components/molecules/InitiativeCard";

// ── Types ──────────────────────────────────────────────────

export interface InitiativeListItem extends Omit<InitiativeCardProps, "selected" | "onClick"> {
  id: string;
}

export interface InitiativeListProps {
  label?: string;
  items: InitiativeListItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  /** Called whenever the active Estado filter changes, as `{ Estado: value }`. */
  onFilterChange?: (values: Record<string, string>) => void;
  /**
   * Location filter, driven from outside (the shared filter bar, or a map click).
   * Pass an empty string / undefined to clear back to "Todos".
   */
  selectedState?: string;
  className?: string;
}

const ALL = "Todos";

// ── Component ──────────────────────────────────────────────

export function InitiativeList({
  label = "Iniciativas",
  items,
  selectedId,
  onSelect,
  onFilterChange,
  selectedState,
  className,
}: InitiativeListProps) {
  const [estadoFilter, setEstadoFilter] = useState(ALL);

  // Keep a stable ref to onFilterChange to avoid stale closure in effects
  const onFilterChangeRef = useRef(onFilterChange);
  useLayoutEffect(() => { onFilterChangeRef.current = onFilterChange; });

  // Notify parent whenever the Estado filter changes
  useEffect(() => {
    onFilterChangeRef.current?.({ Estado: estadoFilter });
  }, [estadoFilter]);

  // Sync external selectedState (e.g. a map click) into the Estado filter
  useEffect(() => {
    const val = !selectedState ? ALL : selectedState;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEstadoFilter((prev) => (prev === val ? prev : val));
  }, [selectedState]);

  // ── Apply filter ─────────────────────────────────────

  const filteredItems = useMemo(() => {
    if (estadoFilter === ALL) return items;
    return items.filter((item) => item.chips?.[0]?.label === estadoFilter);
  }, [items, estadoFilter]);

  // ── Helpers ────────────────────────────────────────────

  const isFiltered = estadoFilter !== ALL;
  const countLabel = isFiltered
    ? `${filteredItems.length}/${items.length}`
    : String(items.length);
  const displayLabel = `${label} (${countLabel})`.toUpperCase();

  // ── Render ─────────────────────────────────────────────

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl overflow-hidden border border-[#c4c7c7] bg-white/50",
        className
      )}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center px-4 py-4 border-b border-[#c4c7c7]"
        style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(112,139,141,0.2))" }}
      >
        <span
          className="font-sans font-bold text-[#211f19] leading-[1.5]"
          style={{ fontSize: "16px", letterSpacing: "1.6px" }}
        >
          {displayLabel}
        </span>
      </div>

      {/* ── List — scrollable ── */}
      <div className="flex flex-col overflow-y-auto flex-1 bg-white/5">
        {filteredItems.length === 0 ? (
          <div className="flex items-center justify-center py-12 px-4 text-center">
            <p className="font-sans text-sm text-[#9ca3af]">
              No hay iniciativas que coincidan con los filtros seleccionados.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <InitiativeCard
              key={item.id}
              title={item.title}
              chips={item.chips}
              selected={item.id === selectedId}
              onClick={() => onSelect?.(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
