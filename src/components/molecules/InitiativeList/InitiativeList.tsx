"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ListFilter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { InitiativeCard, type InitiativeCardProps } from "@/components/molecules/InitiativeCard";

// ── Types ──────────────────────────────────────────────────

export interface InitiativeListFilter {
  label: string;
  /** If omitted, options are auto-derived from the items' chips at that index. */
  options?: string[];
}

export interface InitiativeListItem extends Omit<InitiativeCardProps, "selected" | "onClick"> {
  id: string;
}

export interface InitiativeListProps {
  label?: string;
  items: InitiativeListItem[];
  /**
   * Filter definitions. By default two filters are shown:
   *   - "Estado"  → derived from chips[0] across all items
   *   - "Tema"    → derived from chips[1+] across all items
   *
   * Pass explicit `options` to override auto-derivation.
   */
  filters?: InitiativeListFilter[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  /** Called whenever the active filter values change, with the full current values map. */
  onFilterChange?: (values: Record<string, string>) => void;
  className?: string;
}

const ALL = "Todos";

// ── Component ──────────────────────────────────────────────

export function InitiativeList({
  label = "Iniciativas",
  items,
  filters: filterDefs = [
    { label: "Estado" },
    { label: "Tema" },
  ],
  selectedId,
  onSelect,
  onFilterChange,
  className,
}: InitiativeListProps) {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    Object.fromEntries(filterDefs.map((f) => [f.label, ALL]))
  );

  // ── Derive options from chips ──────────────────────────

  const resolvedFilters = useMemo<Array<{ label: string; options: string[] }>>(() => {
    return filterDefs.map((f, filterIndex) => {
      if (f.options) return { label: f.label, options: f.options };

      // First filter → first chip of each item (location / estado)
      // Remaining filters → remaining chips (category / tema)
      const labelsSet = new Set<string>();
      items.forEach((item) => {
        const chips = item.chips ?? [];
        if (filterIndex === 0) {
          if (chips[0]) labelsSet.add(chips[0].label);
        } else {
          chips.slice(1).forEach((c) => labelsSet.add(c.label));
        }
      });

      return {
        label: f.label,
        options: [ALL, ...Array.from(labelsSet).sort()],
      };
    });
  }, [filterDefs, items]);

  // ── Apply filters ──────────────────────────────────────

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      resolvedFilters.every((f) => {
        const val = filterValues[f.label];
        if (!val || val === ALL) return true;
        return item.chips?.some((c) => c.label === val) ?? false;
      })
    );
  }, [items, resolvedFilters, filterValues]);

  // ── Helpers ────────────────────────────────────────────

  const isFiltered = resolvedFilters.some((f) => filterValues[f.label] !== ALL);
  const countLabel = isFiltered
    ? `${filteredItems.length}/${items.length}`
    : String(items.length);
  const displayLabel = `${label} (${countLabel})`.toUpperCase();

  // Notify parent of initial filter state (all "Todos")
  useEffect(() => {
    onFilterChange?.(filterValues);
    // Run once on mount — intentionally omitting filterValues from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFilterChange(filterLabel: string, value: string) {
    const next = { ...filterValues, [filterLabel]: value };
    setFilterValues(next);
    onFilterChange?.(next);
  }

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
            {resolvedFilters.map((f) => {
              const active = filterValues[f.label] !== ALL;
              return (
                <div key={f.label} className="flex-1 min-w-0">
                  <Select
                    size="sm"
                    value={filterValues[f.label] ?? ALL}
                    options={f.options.map((o) => ({ value: o, label: o }))}
                    onChange={(e) => handleFilterChange(f.label, e.target.value)}
                    className={active ? "ring-1 ring-[#708b8d] border-[#708b8d]" : ""}
                  />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

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
