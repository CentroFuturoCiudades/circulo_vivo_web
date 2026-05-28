"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Initiative } from "@/types/initiative";

interface MapState {
  selectedInitiative: Initiative | null;
  filters: {
    category: string | null;
    region: string | null;
    year: number | null;
  };
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  setSelectedInitiative: (initiative: Initiative | null) => void;
  setFilter: (key: keyof MapState["filters"], value: string | number | null) => void;
  setViewState: (viewState: Partial<MapState["viewState"]>) => void;
  resetFilters: () => void;
}

export const useMapStore = create<MapState>()(
  immer((set) => ({
    selectedInitiative: null,
    filters: { category: null, region: null, year: null },
    viewState: { longitude: -99.1332, latitude: 23.6345, zoom: 5 },
    setSelectedInitiative: (initiative) =>
      set((state) => { state.selectedInitiative = initiative; }),
    setFilter: (key, value) =>
      set((state) => { state.filters[key] = value as never; }),
    setViewState: (vs) =>
      set((state) => { Object.assign(state.viewState, vs); }),
    resetFilters: () =>
      set((state) => { state.filters = { category: null, region: null, year: null }; }),
  }))
);
