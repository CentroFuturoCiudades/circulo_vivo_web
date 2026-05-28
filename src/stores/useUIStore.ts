"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()(
  immer((set) => ({
    sidebarOpen: false,
    activeModal: null,
    setSidebarOpen: (open) =>
      set((state) => { state.sidebarOpen = open; }),
    toggleSidebar: () =>
      set((state) => { state.sidebarOpen = !state.sidebarOpen; }),
    openModal: (id) =>
      set((state) => { state.activeModal = id; }),
    closeModal: () =>
      set((state) => { state.activeModal = null; }),
  }))
);
