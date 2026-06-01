"use client";
import { useState, useMemo } from "react";
import type { Initiative } from "@/types/initiative";
import { useMapStore } from "@/stores/useMapStore";
import data from "@/data/initiatives.json";

export function useInitiatives() {
  const [initiatives] = useState<Initiative[]>(data as Initiative[]);
  const filters = useMapStore((s) => s.filters);

  const filtered = useMemo(() => {
    return initiatives.filter((i) => {
      if (filters.category && i.category !== filters.category) return false;
      if (filters.region && i.region !== filters.region) return false;
      if (filters.year && i.year !== filters.year) return false;
      return true;
    });
  }, [initiatives, filters]);

  return { initiatives, filtered };
}
