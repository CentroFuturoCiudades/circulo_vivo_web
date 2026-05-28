"use client";
import { useMapStore } from "@/stores/useMapStore";

export function useMapFilters() {
  const filters = useMapStore((s) => s.filters);
  const setFilter = useMapStore((s) => s.setFilter);
  const resetFilters = useMapStore((s) => s.resetFilters);

  const hasActiveFilters = Object.values(filters).some((v) => v !== null);

  return { filters, setFilter, resetFilters, hasActiveFilters };
}
