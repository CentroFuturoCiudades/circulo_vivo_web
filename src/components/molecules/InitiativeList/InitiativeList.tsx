"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ListFilter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { InitiativeCard, type InitiativeCardProps } from "@/components/molecules/InitiativeCard";

export interface InitiativeListFilter {
  label: string;
  options: string[];
}

export interface InitiativeListItem extends Omit<InitiativeCardProps, "selected" | "onClick"> {
  id: string;
}

export interface InitiativeListProps {
  label?: string;
  items: InitiativeListItem[];
  filters?: InitiativeListFilter[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function InitiativeList({
  label = "Iniciativas",
  items,
  filters = [
    { label: "Estado", options: ["Todos", "Nuevo León", "CDMX", "Oaxaca"] },
    { label: "Tema",   options: ["Todos", "Alimentación", "Agua", "Semillas"] },
  ],
  selectedId,
  onSelect,
  className,
}: InitiativeListProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    Object.fromEntries(filters.map((f) => [f.label, f.options[0] ?? "Todos"]))
  );

  const displayLabel = `${label} (${items.length})`.toUpperCase();

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl overflow-hidden border border-[#c4c7c7] bg-white/50",
        className
      )}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 py-4 border-b border-[#c4c7c7]"
        style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(112,139,141,0.2))" }}
      >
        <span
          className="font-sans font-bold text-[#211f19] leading-[1.5]"
          style={{ fontSize: "16px", letterSpacing: "1.6px" }}
        >
          {displayLabel}
        </span>

        <Button
          variant="icon"
          color="neutral"
          size="sm"
          iconLeft={filtersOpen ? X : ListFilter}
          aria-label={filtersOpen ? "Cerrar filtros" : "Abrir filtros"}
          onClick={() => setFiltersOpen((v) => !v)}
          className="border-0 text-[#211f19] hover:opacity-60 hover:bg-transparent"
        />
      </div>

      {/* ── Filter panel ── */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex items-center gap-2.5 px-4 py-4 border-b border-[#c4c7c7] bg-white/80"
          >
            {filters.map((f) => (
              <div key={f.label} className="w-[90px]">
                <Select
                  size="sm"
                  value={filterValues[f.label] ?? f.options[0]}
                  options={f.options.map((o) => ({ value: o, label: o }))}
                  onChange={(e) =>
                    setFilterValues((prev) => ({ ...prev, [f.label]: e.target.value }))
                  }
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── List — scrollable ── */}
      <div className="flex flex-col overflow-y-auto flex-1 bg-white/5">
        {items.map((item) => (
          <InitiativeCard
            key={item.id}
            title={item.title}
            chips={item.chips}
            selected={item.id === selectedId}
            onClick={() => onSelect?.(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
